// Tiệm Cận — sổ đăng ký cảnh, preset và gói môn học.
//
// Mỗi môn học là một "gói" (pack) nạp lười: trang Giải tích không phải tải mã của
// Vật lý hay Thuật toán. Tên cảnh và preset được đặt theo không gian tên của gói:
//
//   <tc-scene kind="giai-tich/squeeze">             cảnh của gói giai-tich
//   <tc-scene preset="vat-ly/dao-dong-tat-dan">     preset của gói vat-ly
//   <tc-scene kind="squeeze">                        không có "/": dùng gói mặc định
//
// Gói mặc định lấy từ thuộc tính pack="…" trên thẻ, rồi <html data-tc-pack="…">,
// rồi DEFAULT_PACK. Nhờ vậy trang Giải tích cũ vẫn chạy nguyên vẹn.

import { compile } from './core/expr.js';
import { link } from './core/vars.js';

export const DEFAULT_PACK = 'giai-tich';

const scenes = new Map();     // 'pack/ten' → định nghĩa cảnh
const presets = new Map();    // 'pack/ten' → tham số
const packs = new Map();      // id → { name, load, promise, meta }

/** Tham số dùng chung cho mọi cảnh — cảnh không cần tự khai báo. */
export const COMMON_PARAMS = {
  title: 'string', heading: 'string', number: 'string', caption: 'string',
  // lớp sư phạm: câu hỏi dự đoán trước khi chạy (xem ui/predict.js)
  predict: 'string', predictOptions: 'string', predictAnswer: 'int', predictExplain: 'string',
};

/** Khai báo một gói có thể nạp lười. load: () => import('./subjects/x/index.js') */
export function registerPack(id, { name, load, description } = {}) {
  packs.set(id, { id, name: name || id, description, load, promise: null });
}

/** Gọi bên trong module của gói: đăng ký toàn bộ cảnh và preset dưới không gian tên id. */
export function definePack(id, { name, description, presets: ps = {} } = {}) {
  const p = packs.get(id) || { id, load: null, promise: Promise.resolve() };
  Object.assign(p, { name: name || p.name || id, description: description || p.description });
  packs.set(id, p);
  for (const key in ps) presets.set(`${id}/${key}`, { ...ps[key], kind: qualify(ps[key].kind, id) });
}

export const listPacks = () => [...packs.values()].map(({ id, name, description }) => ({ id, name, description }));

/** defineScene('giai-tich/squeeze', def) — tên phải có không gian tên. */
export function defineScene(name, def) {
  if (!name.includes('/')) name = `${DEFAULT_PACK}/${name}`;
  scenes.set(name, def);
}
/** Trả về hàm defineScene gắn sẵn không gian tên của một gói: const scene = scope('vat-ly'). */
export const scope = (id) => (name, def) => defineScene(`${id}/${name}`, def);
export const sceneNames = () => [...scenes.keys()];
export const getScene = (name) => scenes.get(qualify(name));
export const getPreset = (name) => presets.get(qualify(name));

export const qualify = (name, pack) => (!name || name.includes('/') ? name : `${pack || DEFAULT_PACK}/${name}`);

/** Đảm bảo gói chứa tên này đã được nạp. */
export async function loadPackFor(name) {
  const id = name.split('/')[0];
  const p = packs.get(id);
  if (!p) throw new Error(`Không có gói môn học "${id}". Các gói hiện có: ${[...packs.keys()].join(', ')}`);
  if (!p.promise) p.promise = p.load ? p.load() : Promise.resolve();
  await p.promise;
}

const evalNumber = (s) => (typeof s === 'number' ? s : compile(String(s), [])());

export function coerce(type, raw) {
  if (raw === undefined || raw === null) return raw;
  if (typeof raw !== 'string') return raw;                 // đã là giá trị JS (gọi từ API)
  const [kind, spec] = type.split(':');
  switch (kind) {
    case 'number': return evalNumber(raw);
    case 'int': return Math.round(evalNumber(raw));
    case 'bool': return raw === '' || raw === 'true' || raw === '1';
    case 'expr': return compile(raw, spec ? spec.split(',') : ['x']);
    case 'range':
    case 'list': return raw.split(/[,;]/).map((t) => evalNumber(t.trim()));
    default: return raw;
  }
}

/** Gắn cảnh đã nạp vào host (đồng bộ). Dùng mountAsync nếu chưa chắc gói đã nạp. */
export function mount(host, kind, params = {}) {
  const name = qualify(kind);
  const def = scenes.get(name);
  if (!def) throw new Error(`Không có cảnh "${name}". Các cảnh đã nạp: ${sceneNames().join(', ')}`);
  const schema = { ...COMMON_PARAMS, ...(def.params || {}) };
  const all = { ...(def.defaults || {}), ...params };
  const p = {};
  for (const key in all) {
    const type = schema[key] || 'string';
    p[key] = coerce(type, all[key]);
    if (typeof all[key] === 'string' && type.startsWith('expr')) p[key + 'Src'] = all[key];
  }
  return def.mount(host, p) || {};
}

export async function mountAsync(host, kind, params = {}) {
  const name = qualify(kind);
  if (!scenes.has(name)) await loadPackFor(name);
  return mount(host, name, params);
}

const SKIP = new Set(['kind', 'preset', 'pack', 'autoplay', 'bind', 'class', 'style', 'id']);

// Thuộc tính HTML luôn bị chữ thường hóa; khớp lại với tên tham số (nMax, x0…).
function attrParams(el, def) {
  const out = {};
  const names = Object.keys({ ...COMMON_PARAMS, ...(def?.params || {}), ...(def?.defaults || {}) });
  for (const { name, value } of el.attributes) {
    if (SKIP.has(name)) continue;
    const key = names.find((n) => n.toLowerCase() === name) || name;
    out[key] = value;
  }
  return out;
}

const packOf = (el) => el.getAttribute('pack') || document.documentElement.dataset.tcPack || DEFAULT_PACK;

if (typeof customElements !== 'undefined' && !customElements.get('tc-scene')) {
  customElements.define('tc-scene', class extends HTMLElement {
    connectedCallback() {
      if (this._api || this._io) return;
      this._io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          // dựng hình lúc trình duyệt rảnh, để việc tính toán ban đầu (hệ số Fourier, bảng tích phân…)
          // không chen vào giữa một animation đang chạy ở hình khác
          if (e.isIntersecting && !this._started) {
            this._started = true;
            const go = () => this._mount();
            if ('requestIdleCallback' in globalThis) requestIdleCallback(go, { timeout: 400 }); else setTimeout(go, 0);
          }
          // ra khỏi màn hình: dừng animation để không tốn CPU cho thứ không ai nhìn thấy
          if (!e.isIntersecting) this.querySelectorAll('.tc-figure').forEach((f) => f.__tc?.stop());
          if (e.intersectionRatio > 0.45 && this.hasAttribute('autoplay') && !this._played) {
            this._wantPlay = true;
            this._api?.play && (this._played = true, this._api.play());
          }
        }
      }, { rootMargin: '200px 0px', threshold: [0, 0.5] });
      this._io.observe(this);
    }
    async _mount() {
      this._started = true;
      const pack = packOf(this);
      try {
        const presetName = this.getAttribute('preset') && qualify(this.getAttribute('preset'), pack);
        if (presetName && !presets.has(presetName)) await loadPackFor(presetName);
        const base = presetName ? presets.get(presetName) : null;
        if (presetName && !base) throw new Error(`Không có preset "${presetName}".`);
        const kind = qualify(this.getAttribute('kind'), pack) || base.kind;
        if (!scenes.has(kind)) await loadPackFor(kind);
        if (!this.isConnected) return;
        const { kind: _k, ...presetParams } = base || {};
        this._api = mount(this, kind, { ...presetParams, ...attrParams(this, scenes.get(kind)) });
        if (this._wantPlay && !this._played && this._api.play) { this._played = true; this._api.play(); }
        // bind="eps:eps, h:buoc" — nối signal của cảnh với biến trang (<tc-var>, <tc-show>)
        this._unlink = (this.getAttribute('bind') || '').split(',').map((s) => s.trim()).filter(Boolean).map((pair) => {
          const [param, name] = pair.split(':').map((x) => x.trim());
          const sig = this._api.signals?.[param];
          if (!sig) { console.warn(`[tiemcan] cảnh "${kind}" không có tham số liên kết được tên "${param}". Có: ${Object.keys(this._api.signals || {}).join(', ')}`); return null; }
          return link(sig, name || param);
        }).filter(Boolean);
      } catch (err) {
        this._api = {};
        const box = document.createElement('div');
        box.className = 'tc-error';
        box.textContent = `Không dựng được hình minh họa: ${err.message}`;
        this.appendChild(box);
        console.error('[tiemcan]', err);
      }
    }
    disconnectedCallback() {
      this._io?.disconnect(); this._io = null;
      this._unlink?.forEach((u) => u()); this._unlink = null;
      this._api?.destroy?.(); this._api = null; this._started = false;
    }
  });
}
