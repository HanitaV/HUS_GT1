// Tiệm Cận — Board: hệ trục tọa độ SVG phản ứng.
//
// Mọi phần tử (đường cong, điểm, dải ε, miền tích phân…) được vẽ trong một effect.
// Khi signal mà phần tử đọc thay đổi — tham số a, số hạng n, khung nhìn (zoom),
// kích thước khung — chỉ phần tử đó được vẽ lại. Tác giả cảnh không phải tự gọi redraw.
//
// Kích thước SVG luôn bằng kích thước điểm ảnh thực (ResizeObserver), nên nét vẽ và
// chữ giữ nguyên độ dày trên mọi màn hình thay vì co giãn theo viewBox.

import { signal, effect, val, untrack, isSignal } from '../core/signal.js';
import { frames, ease, busy, beginBusy, endBusy } from '../core/anim.js';
import { ticks, isNum, clamp, fmt } from '../core/math.js';
import { renderTex } from './tex.js';

const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  parent?.appendChild(n);
  return n;
};

/** Màu: tên vai trò ngữ nghĩa → biến CSS; chuỗi màu thô giữ nguyên. */
export const color = (c) => (!c ? 'var(--tc-main)' : /^(#|rgb|hsl|var\(|oklch)/.test(c) ? c : `var(--tc-${c})`);

const r1 = (v) => Math.round(v * 10) / 10;

const ANCHOR = { ne: '0,-100%', nw: '-100%,-100%', se: '0,0', sw: '-100%,0', n: '-50%,-100%', s: '-50%,0', e: '0,-50%', w: '-100%,-50%', c: '-50%,-50%' };
/** Đặt nhãn bằng transform (chỉ tái hợp lớp, không tính lại bố cục trang mỗi khung hình). */
export const placeLabel = (div, px, py, anchor) => {
  div.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px) translate(${ANCHOR[anchor] || ANCHOR.ne})`;
};


export class Board {
  constructor(host, opts = {}) {
    this.o = {
      x: [-5, 5], y: [-3, 3],
      aspect: 16 / 9, mobileAspect: 1.15, minHeight: 220, maxHeight: 460,
      grid: true, axes: true,
      xLabel: 'x', yLabel: 'y',
      xTicks: 'auto',          // 'auto' | 'int' | 'pi' | false
      yTicks: 'auto',
      origin: true,            // ghi chữ O ở gốc tọa độ
      title: '',
      ...opts,
    };
    this.view = signal({ x: [...this.o.x], y: [...this.o.y] });
    this.size = signal({ w: 640, h: 400 });
    this._stops = [];

    this.el = document.createElement('div');
    this.el.className = 'tc-board';
    this.svg = svgEl('svg', { role: 'img', 'aria-label': this.o.title || 'Đồ thị' }, this.el);
    this.overlay = document.createElement('div');
    this.overlay.className = 'tc-overlay';
    this.overlay.setAttribute('aria-hidden', 'true');
    this.el.appendChild(this.overlay);
    host.appendChild(this.el);

    this.layers = {};
    for (const name of ['grid', 'under', 'area', 'axes', 'main', 'over', 'points', 'handles']) {
      this.layers[name] = svgEl('g', { class: `tc-layer-${name}` }, this.svg);
    }

    const measure = () => {
      const w = Math.max(200, Math.round(this.el.clientWidth || host.clientWidth || 640));
      // màn hình hẹp: khung cao hơn để trục tung không bị ép dẹt
      const aspect = w < 560 ? Math.min(this.o.aspect, this.o.mobileAspect) : this.o.aspect;
      const h = Math.round(clamp(w / aspect, this.o.minHeight, this.o.maxHeight));
      const cur = this.size.peek();
      if (cur.w !== w || cur.h !== h) {
        this.size.set({ w, h });
        // equal: một đơn vị trên trục x dài bằng một đơn vị trên trục y (vectơ, hình học)
        if (this.o.equal) {
          const v = this.view.peek(), cy = (v.y[0] + v.y[1]) / 2, half = ((v.x[1] - v.x[0]) * h) / w / 2;
          this.view.set({ x: v.x, y: [cy - half, cy + half] });
        }
      }
    };
    measure();
    this._ro = new ResizeObserver(measure);
    this._ro.observe(this.el);

    this.track(() => {
      const { w, h } = this.size.get();
      this.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      this.svg.setAttribute('width', w);
      this.svg.setAttribute('height', h);
      this.el.style.height = h + 'px';
    });

    if (this.o.grid || this.o.axes) this._drawAxes();
  }

  // ── Chuyển đổi tọa độ (đọc signal → tự động được theo dõi trong effect) ──
  X(x) { const { x: [a, b] } = this.view.get(); return ((x - a) / (b - a)) * this.size.get().w; }
  Y(y) { const { y: [c, d] } = this.view.get(); const { h } = this.size.get(); return h - ((y - c) / (d - c)) * h; }
  /** Độ dài một điểm ảnh theo đơn vị x — dùng chọn bước lấy mẫu. */
  pxX() { const { x: [a, b] } = this.view.get(); return (b - a) / this.size.get().w; }

  track(fn) { const stop = effect(fn); this._stops.push(stop); return stop; }

  /** Đổi khung nhìn; animate=true thì nội suy mượt (dùng để "phóng to quanh giới hạn"). */
  setView(target, { animate = true, duration = 900, token, frames: fr } = {}) {
    const from = this.view.peek();
    const to = { x: target.x ?? from.x, y: target.y ?? from.y };
    if (!animate) { this.view.set(to); return Promise.resolve(); }
    // nội suy theo log của độ rộng để phóng to cảm giác đều
    const mix = (p, q, k) => {
      const cp = (p[0] + p[1]) / 2, cq = (q[0] + q[1]) / 2;
      const wp = p[1] - p[0], wq = q[1] - q[0];
      const c = cp + (cq - cp) * k, w = Math.exp(Math.log(wp) + (Math.log(wq) - Math.log(wp)) * k);
      return [c - w / 2, c + w / 2];
    };
    const run = fr || ((d, f, o) => frames(d, f, { ...o, token }));
    return run(duration, (k) => this.view.set({ x: mix(from.x, to.x, k), y: mix(from.y, to.y, k) }), { easing: ease.inOut });
  }

  resetView(opts) {
    let y = [...this.o.y];
    if (this.o.equal) {
      const { w, h } = this.size.peek(), cy = (y[0] + y[1]) / 2, half = ((this.o.x[1] - this.o.x[0]) * h) / w / 2;
      y = [cy - half, cy + half];
    }
    return this.setView({ x: [...this.o.x], y }, opts);
  }

  destroy() {
    this._stops.forEach((s) => s());
    this._ro.disconnect();
    this.el.remove();
  }

  // ── Lưới và trục ──
  _drawAxes() {
    const g = this.layers.grid, ax = this.layers.axes;
    const gridPath = svgEl('path', { class: 'tc-grid' }, g);
    const axisPath = svgEl('path', { class: 'tc-axis' }, ax);
    const arrows = svgEl('path', { class: 'tc-axis-arrow' }, ax);
    const tickG = svgEl('g', { class: 'tc-ticks' }, ax);
    const tickPath = svgEl('path', { class: 'tc-axis' }, tickG);
    const pool = [];
    const labX = svgEl('text', { class: 'tc-axis-label', 'text-anchor': 'end' }, ax);
    const labY = svgEl('text', { class: 'tc-axis-label', 'text-anchor': 'start' }, ax);
    const labO = svgEl('text', { class: 'tc-tick', 'text-anchor': 'end' }, ax);

    this.track(() => {
      const { x: [a, b], y: [c, d] } = this.view.get();
      const { w, h } = this.size.get();
      const tx = this._ticks('x', a, b, w), ty = this._ticks('y', c, d, h);

      let gd = '';
      if (this.o.grid) {
        for (const t of tx) gd += `M${r1(this.X(t.v))},0V${h}`;
        for (const t of ty) gd += `M0,${r1(this.Y(t.v))}H${w}`;
      }
      gridPath.setAttribute('d', gd);

      if (!this.o.axes) return;
      const y0 = clamp(this.Y(0), 0.5, h - 0.5);
      const x0 = clamp(this.X(0), 0.5, w - 0.5);
      axisPath.setAttribute('d', `M0,${r1(y0)}H${w}M${r1(x0)},0V${h}`);
      arrows.setAttribute('d', `M${w - 8},${r1(y0 - 4)}L${w},${r1(y0)}L${w - 8},${r1(y0 + 4)}M${r1(x0 - 4)},8L${r1(x0)},0L${r1(x0 + 4)},8`);

      // dùng lại các nút <text> thay vì xóa/tạo mỗi khung hình (quan trọng khi phóng to liên tục)
      let used = 0, tickD = '';
      const text = (x, y, anchor, label) => {
        let s = pool[used];
        if (!s) { s = pool[used] = svgEl('text', { class: 'tc-tick' }, tickG); }
        s.setAttribute('x', r1(x)); s.setAttribute('y', r1(y)); s.setAttribute('text-anchor', anchor);
        if (s.textContent !== label) s.textContent = label;
        s.style.display = '';
        used++;
      };
      const below = y0 < h - 22;
      for (const t of tx) {
        const X = this.X(t.v);
        if (Math.abs(t.v) < 1e-12 || X < 14 || X > w - 22) continue;
        tickD += `M${r1(X)},${r1(y0 - 3)}v6`;
        text(X, below ? y0 + 17 : y0 - 8, 'middle', t.label);
      }
      const left = x0 > 34;
      for (const t of ty) {
        const Y = this.Y(t.v);
        if (Math.abs(t.v) < 1e-12 || Y < 14 || Y > h - 14) continue;
        tickD += `M${r1(x0 - 3)},${r1(Y)}h6`;
        text(left ? x0 - 7 : x0 + 7, Y + 4, left ? 'end' : 'start', t.label);
      }
      for (let i = used; i < pool.length; i++) pool[i].style.display = 'none';
      tickPath.setAttribute('d', tickD);
      labX.setAttribute('x', w - 4); labX.setAttribute('y', r1(below ? y0 - 9 : y0 + 18));
      labX.textContent = this.o.xLabel;
      labY.setAttribute('x', r1(x0 + 9)); labY.setAttribute('y', 14);
      labY.textContent = this.o.yLabel;
      const showO = this.o.origin && this.X(0) > 10 && this.X(0) < w - 10 && this.Y(0) > 10 && this.Y(0) < h - 10;
      labO.textContent = showO ? 'O' : '';
      labO.setAttribute('x', r1(x0 - 5)); labO.setAttribute('y', r1(y0 + 15));
    });
  }

  _ticks(axis, lo, hi, px) {
    const mode = axis === 'x' ? this.o.xTicks : this.o.yTicks;
    if (mode === false) return [];
    const target = Math.max(3, Math.min(12, Math.floor(px / (axis === 'x' ? 70 : 48))));
    if (mode === 'pi') {
      const span = (hi - lo) / Math.PI;
      const div = span > 8 ? 1 : 2;
      const out = [];
      for (let k = Math.ceil((lo * div) / Math.PI); k <= Math.floor((hi * div) / Math.PI); k++) {
        if (k === 0) continue;
        out.push({ v: (k * Math.PI) / div, label: piLabel(k, div) });
      }
      return out;
    }
    let { step, values } = ticks(lo, hi, target);
    if (mode === 'int' && step < 1) { step = 1; values = []; for (let v = Math.ceil(lo); v <= hi; v++) values.push(v); }
    const digits = Math.max(0, -Math.floor(Math.log10(step)) + 1);
    return values.map((v) => ({ v, label: fmt(v, digits) }));
  }

  // ── Phần tử ──
  _el(layer, tag, cls, render, o = {}) {
    const node = svgEl(tag, { class: cls }, this.layers[o.layer || layer]);
    if (o.className) node.classList.add(...o.className.split(' '));
    const stop = this.track(() => {
      const visible = o.visible === undefined ? true : val(o.visible);
      node.style.display = visible ? '' : 'none';
      if (visible) render(node);
    });
    return { node, remove: () => { stop(); node.remove(); } };
  }

  _stroke(node, o, defColor = 'main') {
    node.style.stroke = color(val(o.color) || defColor);
    if (o.width) node.style.strokeWidth = val(o.width);
    if (o.dash) node.style.strokeDasharray = o.dash === true ? '5 5' : o.dash;
    if (o.opacity !== undefined) node.style.opacity = val(o.opacity);
  }

  /**
   * Đồ thị y = f(x). f được gọi bên trong effect, nên nếu f đọc signal (tham số a)
   * thì đường cong tự vẽ lại khi tham số đổi.
   *  from/to: miền vẽ; breaks: các điểm gãy (hàm ghép nhánh) để không nối liền nhánh.
   */
  curve(f, o = {}) {
    return this._el('main', 'path', 'tc-curve', (node) => {
      this._stroke(node, o);
      const fn = isSignal(f) ? f.get() : f;
      const { x: [a, b] } = this.view.get();
      const { h } = this.size.get();
      const lo = Math.max(a, val(o.from) ?? -Infinity), hi = Math.min(b, val(o.to) ?? Infinity);
      if (!(hi > lo)) { node.setAttribute('d', ''); return; }
      const brk = (val(o.breaks) || []).filter((t) => t > lo && t < hi).sort((p, q) => p - q);
      const edges = [lo, ...brk, hi];
      // đang chuyển động: lấy mẫu thưa gấp đôi; dừng lại thì effect chạy lại ở độ phân giải đầy đủ
      const step = this.pxX() * (o.resolution || 1.25) * (busy.get() ? 2 : 1);
      const eps = (b - a) * 1e-9;
      let d = '';
      for (let s = 0; s < edges.length - 1; s++) {
        const s0 = edges[s] + (s > 0 ? eps : 0), s1 = edges[s + 1] - (s < edges.length - 2 ? eps : 0);
        let pen = false, prevY = 0, prevX = 0;
        // Lưới mẫu neo vào tọa độ thế giới với bước là lũy thừa của 2: khi khung nhìn trượt
        // hay phóng to, các điểm mẫu đứng yên trên đường cong thay vì trượt theo — tránh hiện
        // tượng đường cong "rung" (nhất là đường dao động như x·sin(1/x)).
        const st = Math.pow(2, Math.round(Math.log2(step)));
        const k0 = Math.ceil(s0 / st), k1 = Math.floor(s1 / st);
        const n = Math.max(1, k1 - k0 + 2);
        for (let i = 0; i <= n; i++) {
          const x = i === 0 ? s0 : i === n ? s1 : (k0 + i - 1) * st;
          const y = fn(x);
          if (!isNum(y)) { pen = false; continue; }
          const Y = clamp(this.Y(y), -h * 3, h * 4), X = this.X(x);
          if (pen && Math.abs(Y - prevY) > h * 1.1) pen = false;   // tiệm cận đứng: nhấc bút
          // bỏ điểm cách điểm trước dưới 0,6 px theo cả hai trục: đường nhẹ hơn nhiều, mắt không thấy khác
          if (pen && i < n && Math.abs(X - prevX) < 0.6 && Math.abs(Y - prevY) < 0.6) continue;
          d += `${pen ? 'L' : 'M'}${r1(X)},${r1(Y)}`;
          pen = true; prevY = Y; prevX = X;
        }
      }
      node.setAttribute('d', d);
    }, o);
  }

  /** Miền giữa hai đồ thị top(x) và bottom(x) (mặc định trục Ox) trên [from, to]. */
  region(top, bottom = () => 0, o = {}) {
    return this._el('area', 'path', 'tc-region', (node) => {
      node.style.fill = color(val(o.color) || 'main');
      node.style.fillOpacity = val(o.opacity) ?? 0.14;
      const { x: [a, b] } = this.view.get();
      const lo = Math.max(a, val(o.from) ?? a), hi = Math.min(b, val(o.to) ?? b);
      if (!(hi > lo)) { node.setAttribute('d', ''); return; }
      const n = Math.max(2, Math.ceil((hi - lo) / (this.pxX() * (busy.get() ? 4 : 2))));
      const T = [], B = [];
      for (let i = 0; i <= n; i++) {
        const x = lo + ((hi - lo) * i) / n;
        const yt = top(x), yb = bottom(x);
        if (isNum(yt) && isNum(yb)) { T.push(`${r1(this.X(x))},${r1(this.Y(yt))}`); B.push(`${r1(this.X(x))},${r1(this.Y(yb))}`); }
      }
      node.setAttribute('d', T.length ? `M${T.join('L')}L${B.reverse().join('L')}Z` : '');
    }, o);
  }

  /** Một điểm. hollow = điểm rỗng (giá trị không đạt được / hàm không xác định). */
  point(x, y, o = {}) {
    return this._el('points', 'circle', 'tc-point', (node) => {
      const X = val(x), Y = val(y);
      if (!isNum(X) || !isNum(Y)) { node.setAttribute('r', 0); return; }
      const c = color(val(o.color) || 'main');
      node.setAttribute('cx', r1(this.X(X)));
      node.setAttribute('cy', r1(this.Y(Y)));
      node.setAttribute('r', val(o.r) ?? 4.5);
      const hollow = val(o.hollow);
      node.style.fill = hollow ? 'var(--tc-surface)' : c;
      node.style.stroke = c;
    }, o);
  }

  /**
   * Tập điểm (dãy số). list() trả về [{x, y, tone, hollow}].
   * Tái sử dụng nút theo chỉ số: điểm mới xuất hiện có hiệu ứng "đặt xuống" ngắn.
   */
  dots(list, o = {}) {
    const g = svgEl('g', { class: 'tc-dots' }, this.layers[o.layer || 'points']);
    const nodes = [];
    const stop = this.track(() => {
      const items = val(list) || [];
      const r = val(o.r) ?? 4;
      for (let i = 0; i < items.length; i++) {
        let n = nodes[i];
        if (!n) {
          n = nodes[i] = svgEl('circle', { class: 'tc-dot' }, g);
          if (!o.noEnter) n.classList.add('tc-enter');
        }
        const it = items[i];
        if (!isNum(it.x) || !isNum(it.y)) { n.setAttribute('r', 0); continue; }
        const c = color(it.tone || val(o.color) || 'main');
        n.setAttribute('cx', r1(this.X(it.x)));
        n.setAttribute('cy', r1(clamp(this.Y(it.y), -50, this.size.get().h + 50)));
        n.setAttribute('r', it.r ?? r);
        n.style.fill = it.hollow ? 'var(--tc-surface)' : c;
        n.style.stroke = c;
        n.style.opacity = it.opacity ?? 1;
      }
      while (nodes.length > items.length) nodes.pop().remove();
    });
    return { node: g, remove: () => { stop(); g.remove(); } };
  }

  /** Đường nằm ngang y = const (toàn khung hoặc trên [from,to]). */
  hline(y, o = {}) {
    return this._el('over', 'path', 'tc-line', (node) => {
      this._stroke(node, o, 'ink');
      const { x: [a, b] } = this.view.get();
      const Y = r1(this.Y(val(y)));
      node.setAttribute('d', `M${r1(this.X(val(o.from) ?? a))},${Y}H${r1(this.X(val(o.to) ?? b))}`);
    }, o);
  }

  vline(x, o = {}) {
    return this._el('over', 'path', 'tc-line', (node) => {
      this._stroke(node, o, 'ink');
      const { y: [c, d] } = this.view.get();
      const X = r1(this.X(val(x)));
      node.setAttribute('d', `M${X},${r1(this.Y(val(o.from) ?? c))}V${r1(this.Y(val(o.to) ?? d))}`);
    }, o);
  }

  segment(p, q, o = {}) {
    return this._el('over', 'path', 'tc-line', (node) => {
      this._stroke(node, o, 'ink');
      const [x1, y1] = val(p), [x2, y2] = val(q);
      if (![x1, y1, x2, y2].every(isNum)) { node.setAttribute('d', ''); return; }
      node.setAttribute('d', `M${r1(this.X(x1))},${r1(this.Y(y1))}L${r1(this.X(x2))},${r1(this.Y(y2))}`);
    }, o);
  }

  /** Đường thẳng vô hạn đi qua điểm p với hệ số góc slope (cát tuyến, tiếp tuyến). */
  line(p, slope, o = {}) {
    return this._el('over', 'path', 'tc-line', (node) => {
      this._stroke(node, o, 'ink');
      const [x0, y0] = val(p), m = val(slope);
      if (![x0, y0, m].every(isNum)) { node.setAttribute('d', ''); return; }
      const { x: [a, b] } = this.view.get();
      const { h } = this.size.get();
      const Ya = clamp(this.Y(y0 + m * (a - x0)), -h * 20, h * 20), Yb = clamp(this.Y(y0 + m * (b - x0)), -h * 20, h * 20);
      node.setAttribute('d', `M${r1(this.X(a))},${r1(Ya)}L${r1(this.X(b))},${r1(Yb)}`);
    }, o);
  }

  /** Dải ngang [y0, y1] — dùng cho lân cận ε của giới hạn. */
  hband(y0, y1, o = {}) {
    return this._el('under', 'rect', 'tc-band', (node) => {
      node.style.fill = color(val(o.color) || 'limit');
      node.style.fillOpacity = val(o.opacity) ?? 0.12;
      const { w } = this.size.get();
      const A = this.Y(val(y1)), B = this.Y(val(y0));
      node.setAttribute('x', 0); node.setAttribute('width', w);
      node.setAttribute('y', r1(Math.min(A, B))); node.setAttribute('height', r1(Math.abs(B - A)));
    }, o);
  }

  /** Dải dọc [x0, x1] — lân cận δ của x₀. */
  vband(x0, x1, o = {}) {
    return this._el('under', 'rect', 'tc-band', (node) => {
      node.style.fill = color(val(o.color) || 'muted');
      node.style.fillOpacity = val(o.opacity) ?? 0.08;
      const { h } = this.size.get();
      const A = this.X(val(x0)), B = this.X(val(x1));
      node.setAttribute('y', 0); node.setAttribute('height', h);
      node.setAttribute('x', r1(Math.min(A, B))); node.setAttribute('width', r1(Math.abs(B - A)));
    }, o);
  }

  /** Các hình chữ nhật (tổng Riemann, cột số hạng chuỗi). list() → [{x0, x1, y0?, y1, tone}] */
  rects(list, o = {}) {
    const g = svgEl('g', { class: 'tc-rects' }, this.layers[o.layer || 'area']);
    const nodes = [];
    const stop = this.track(() => {
      const items = val(list) || [];
      for (let i = 0; i < items.length; i++) {
        const n = nodes[i] || (nodes[i] = svgEl('rect', { class: 'tc-rect' }, g));
        const it = items[i];
        const X0 = this.X(it.x0), X1 = this.X(it.x1), A = this.Y(it.y0 ?? 0), B = this.Y(it.y1);
        if (![X0, X1, A, B].every(isNum)) { n.setAttribute('width', 0); continue; }
        const c = color(it.tone || val(o.color) || 'main');
        n.setAttribute('x', r1(Math.min(X0, X1))); n.setAttribute('width', r1(Math.abs(X1 - X0)));
        n.setAttribute('y', r1(Math.min(A, B))); n.setAttribute('height', r1(Math.abs(B - A)));
        n.style.fill = c; n.style.stroke = c;
        n.style.fillOpacity = it.opacity ?? val(o.opacity) ?? 0.16;
      }
      while (nodes.length > items.length) nodes.pop().remove();
    });
    return { node: g, remove: () => { stop(); g.remove(); } };
  }

  /** Đường gấp khúc qua danh sách điểm [[x,y],…] (mạng nhện của dãy truy hồi). */
  polyline(list, o = {}) {
    return this._el('over', 'path', 'tc-line', (node) => {
      this._stroke(node, o, 'main');
      const pts = (val(list) || []).filter(([x, y]) => isNum(x) && isNum(y));
      node.setAttribute('d', pts.length ? 'M' + pts.map(([x, y]) => `${r1(this.X(x))},${r1(this.Y(y))}`).join('L') : '');
    }, o);
  }

  /** Tọa độ thế giới tại vị trí con trỏ (sự kiện chuột/cảm ứng). */
  toWorld(e) {
    const r = this.svg.getBoundingClientRect();
    const { x: [a, b], y: [c, d] } = this.view.peek();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    return [a + px * (b - a), d - py * (d - c)];
  }

  /**
   * Điểm kéo được — thao tác trực tiếp lên hình thay vì qua thanh trượt.
   *   pos()         → [x, y] vị trí hiển thị (đọc signal nên tự cập nhật)
   *   onDrag([x,y]) → cảnh tự áp ràng buộc rồi ghi vào signal của mình
   * Ràng buộc đặt ở cảnh, không ở bộ xử lý sự kiện (cách Red Blob Games khuyên),
   * nên điểm có thể bị giữ trên đồ thị, trên một trục, hay hút về lưới.
   * Bàn phím: Tab để chọn, mũi tên để dịch (Shift: bước lớn).
   */
  handle(pos, onDrag, o = {}) {
    const g = svgEl('g', { class: 'tc-handle', tabindex: '0', role: 'slider', 'aria-label': o.label || 'Điểm kéo được' }, this.layers.handles);
    svgEl('circle', { class: 'tc-handle-hit', r: 20 }, g);
    const ring = svgEl('circle', { class: 'tc-handle-ring', r: 10 }, g);
    const dot = svgEl('circle', { class: 'tc-handle-dot', r: 5.5 }, g);
    const stop = this.track(() => {
      const visible = o.visible === undefined ? true : val(o.visible);
      const P = val(pos);
      if (!visible || !P || !isNum(P[0]) || !isNum(P[1])) { g.style.display = 'none'; return; }
      g.style.display = '';
      const { h } = this.size.get();
      g.setAttribute('transform', `translate(${r1(this.X(P[0]))},${r1(clamp(this.Y(P[1]), -h, 2 * h))})`);
      const c = color(val(o.color) || 'main');
      ring.style.stroke = c; dot.style.fill = c;
      if (o.valueText) g.setAttribute('aria-valuetext', val(o.valueText));
    });
    let dragging = false;
    const move = (e) => onDrag(this.toWorld(e), e);
    g.addEventListener('pointerdown', (e) => {
      dragging = true; g.setPointerCapture(e.pointerId); g.classList.add('is-dragging'); beginBusy();
      o.onStart?.(); e.preventDefault();
    });
    g.addEventListener('pointermove', (e) => { if (dragging) move(e); });
    const end = () => { if (!dragging) return; dragging = false; g.classList.remove('is-dragging'); endBusy(); o.onEnd?.(); };
    g.addEventListener('pointerup', end);
    g.addEventListener('pointercancel', end);
    g.addEventListener('keydown', (e) => {
      const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (!k) return;
      e.preventDefault();
      const { x: [a, b], y: [c, d] } = this.view.peek();
      const [sx, sy] = o.step ? val(o.step) : [(b - a) / 200, (d - c) / 200];
      const m = e.shiftKey ? 10 : 1, P = untrack(() => val(pos));
      o.onStart?.();
      onDrag([P[0] + k[0] * sx * m, P[1] + k[1] * sy * m], e);
    });
    return { node: g, remove: () => { stop(); g.remove(); } };
  }

  /** Mũi tên từ p tới q (vectơ, lực, vận tốc). Đầu mũi tên có kích thước cố định theo điểm ảnh. */
  arrow(p, q, o = {}) {
    return this._el('over', 'path', 'tc-line tc-arrow', (node) => {
      this._stroke(node, o, 'main');
      const [x1, y1] = val(p), [x2, y2] = val(q);
      if (![x1, y1, x2, y2].every(isNum)) { node.setAttribute('d', ''); return; }
      const X1 = this.X(x1), Y1 = this.Y(y1), X2 = this.X(x2), Y2 = this.Y(y2);
      const len = Math.hypot(X2 - X1, Y2 - Y1);
      if (len < 0.5) { node.setAttribute('d', ''); return; }
      const ux = (X2 - X1) / len, uy = (Y2 - Y1) / len, s = Math.min(val(o.head) ?? 9, len * 0.45);
      const hx1 = X2 - s * ux + s * 0.5 * uy, hy1 = Y2 - s * uy - s * 0.5 * ux;
      const hx2 = X2 - s * ux - s * 0.5 * uy, hy2 = Y2 - s * uy + s * 0.5 * ux;
      node.setAttribute('d', `M${r1(X1)},${r1(Y1)}L${r1(X2)},${r1(Y2)}M${r1(hx1)},${r1(hy1)}L${r1(X2)},${r1(Y2)}L${r1(hx2)},${r1(hy2)}`);
    }, o);
  }

  /** Đa giác lấp đầy qua danh sách điểm (hình bình hành ảnh, miền nghiệm…). */
  polygon(list, o = {}) {
    return this._el('area', 'path', 'tc-region', (node) => {
      node.style.fill = color(val(o.color) || 'main');
      node.style.fillOpacity = val(o.opacity) ?? 0.14;
      if (o.stroke) { node.style.stroke = color(val(o.stroke)); node.style.strokeWidth = 1.2; }
      const pts = (val(list) || []).filter(([x, y]) => isNum(x) && isNum(y));
      node.setAttribute('d', pts.length > 2 ? 'M' + pts.map(([x, y]) => `${r1(this.X(x))},${r1(this.Y(y))}`).join('L') + 'Z' : '');
    }, o);
  }

  /**
   * Nhãn HTML phủ lên đồ thị (hỗ trợ KaTeX).
   * anchor: hướng đặt nhãn so với điểm — 'n','s','e','w','ne','nw','se','sw','c'.
   */
  label(x, y, content, o = {}) {
    const div = document.createElement('div');
    div.className = 'tc-label';
    if (o.className) div.classList.add(...o.className.split(' '));
    this.overlay.appendChild(div);
    const inner = document.createElement('span');
    div.appendChild(inner);
    const stop = this.track(() => {
      const visible = o.visible === undefined ? true : val(o.visible);
      const X = val(x), Y = val(y);
      if (!visible || !isNum(X) || !isNum(Y)) { div.style.display = 'none'; return; }
      div.style.display = '';
      const { w, h } = this.size.get();
      let px = this.X(X), py = this.Y(Y);
      if (o.clamp !== false) { px = clamp(px, 6, w - 6); py = clamp(py, 6, h - 6); }
      placeLabel(div, px, py, val(o.anchor) || 'ne');
      div.style.color = color(val(o.color) || 'ink');
      const text = val(content);
      untrack(() => renderTex(inner, text));
    });
    return { node: div, remove: () => { stop(); div.remove(); } };
  }
}

function piLabel(k, div) {
  // k·π/div dưới dạng gọn: π/2, π, 3π/2, −π …
  let num = k, den = div;
  if (num % den === 0) { num /= den; den = 1; }
  const sign = num < 0 ? '−' : '';
  const n = Math.abs(num);
  const head = n === 1 ? 'π' : `${n}π`;
  return sign + (den === 1 ? head : `${head}/${den}`);
}
