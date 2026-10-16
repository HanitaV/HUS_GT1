// Tiệm Cận — Stage: sân khấu SVG theo điểm ảnh, không có hệ trục.
// Dành cho những hình không phải đồ thị hàm số: mảng và cây trong thuật toán,
// sơ đồ mạch, ống nghiệm, phân tử dạng sơ đồ…
//
// Phần tử được khóa theo `key`: cùng một khóa giữ nguyên nút SVG qua các lần vẽ,
// nên khi vị trí đổi, CSS transition cho thấy phần tử *di chuyển* (hai phần tử
// đổi chỗ trong sắp xếp) thay vì biến mất rồi hiện lại.

import { signal, effect, val, untrack } from '../core/signal.js';
import { clamp } from '../core/math.js';
import { renderTex } from './tex.js';
import { color, placeLabel } from './board.js';

const NS = 'http://www.w3.org/2000/svg';
export const svg = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  parent?.appendChild(n);
  return n;
};

export class Stage {
  constructor(host, o = {}) {
    this.o = { aspect: 2.4, mobileAspect: 1.4, minHeight: 180, maxHeight: 420, title: '', ...o };
    this.size = signal({ w: 640, h: 260 });
    this._stops = [];
    this.el = document.createElement('div');
    this.el.className = 'tc-board tc-stage-canvas';
    this.svg = svg('svg', { role: 'img', 'aria-label': this.o.title || 'Hình minh họa' }, this.el);
    this.overlay = document.createElement('div');
    this.overlay.className = 'tc-overlay';
    this.overlay.setAttribute('aria-hidden', 'true');
    this.el.appendChild(this.overlay);
    host.appendChild(this.el);
    this.layers = {};
    for (const name of ['back', 'main', 'front']) this.layers[name] = svg('g', {}, this.svg);

    const measure = () => {
      const w = Math.max(200, Math.round(this.el.clientWidth || host.clientWidth || 640));
      const aspect = w < 560 ? Math.min(this.o.aspect, this.o.mobileAspect) : this.o.aspect;
      const h = Math.round(clamp(w / aspect, this.o.minHeight, this.o.maxHeight));
      const c = this.size.peek();
      if (c.w !== w || c.h !== h) this.size.set({ w, h });
    };
    measure();
    this._ro = new ResizeObserver(measure);
    this._ro.observe(this.el);
    this.track(() => {
      const { w, h } = this.size.get();
      this.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      this.svg.setAttribute('width', w); this.svg.setAttribute('height', h);
      this.el.style.height = h + 'px';
    });
  }

  track(fn) { const s = effect(fn); this._stops.push(s); return s; }

  /**
   * Danh sách phần tử có khóa.
   *   stage.items(() => [{ key, ... }], {
   *     create(g, item)       — dựng nút con một lần
   *     update(g, item, size) — cập nhật thuộc tính mỗi lần dữ liệu đổi
   *   })
   * Mỗi phần tử là một <g class="tc-item">; đặt vị trí bằng g.style.transform để có transition.
   */
  items(list, { create, update, layer = 'main' } = {}) {
    const root = svg('g', {}, this.layers[layer]);
    const nodes = new Map();
    const stop = this.track(() => {
      const items = val(list) || [];
      const size = this.size.get();
      const seen = new Set();
      for (const it of items) {
        seen.add(it.key);
        let g = nodes.get(it.key);
        if (!g) { g = svg('g', { class: 'tc-item' }, root); nodes.set(it.key, g); untrack(() => create?.(g, it, size)); }
        untrack(() => update?.(g, it, size));
      }
      for (const [k, g] of nodes) if (!seen.has(k)) { g.remove(); nodes.delete(k); }
    });
    return { node: root, remove: () => { stop(); root.remove(); } };
  }

  /** Vẽ tự do: render(g, size) chạy lại mỗi khi signal nó đọc thay đổi (g được làm rỗng trước). */
  draw(render, { layer = 'back' } = {}) {
    const g = svg('g', {}, this.layers[layer]);
    const stop = this.track(() => { const size = this.size.get(); g.textContent = ''; render(g, size); });
    return { node: g, remove: () => { stop(); g.remove(); } };
  }

  /** Nhãn KaTeX tại tọa độ điểm ảnh (hàm của size cũng được). */
  label(x, y, content, o = {}) {
    const div = document.createElement('div');
    div.className = 'tc-label' + (o.className ? ' ' + o.className : '');
    const inner = document.createElement('span');
    div.appendChild(inner);
    this.overlay.appendChild(div);
    const stop = this.track(() => {
      const size = this.size.get();
      const X = typeof x === 'function' ? x(size) : x, Y = typeof y === 'function' ? y(size) : y;
      placeLabel(div, X, Y, val(o.anchor) || 'c');
      div.style.color = color(val(o.color) || 'ink');
      const text = val(content);
      untrack(() => renderTex(inner, text));
    });
    return { node: div, remove: () => { stop(); div.remove(); } };
  }

  destroy() { this._stops.forEach((s) => s()); this._ro.disconnect(); this.el.remove(); }
}
