// <tc-var> và <tc-show> — văn bản phản ứng.
//
//   Với $\varepsilon$ = <tc-var name="eps" value="0.1" min="0.005" max="1" step="0.005"></tc-var>,
//   cần lấy $n_0$ = <tc-show expr="ceil(1/eps)"></tc-show> số hạng đầu.
//   <tc-show when="eps < 0.02">Dải đã rất hẹp, nhưng $n_0$ vẫn hữu hạn.</tc-show>
//   <tc-scene preset="dang02-dinh-nghia" bind="eps:eps"></tc-scene>
//
// Số trong <tc-var> kéo ngang được bằng chuột/ngón tay, hoặc chọn bằng Tab rồi dùng mũi tên.
// bind="tham_số_cảnh:biến_trang" trên <tc-scene> nối hai chiều hình với câu chữ.

import { effect } from '../core/signal.js';
import { compile, identifiers } from '../core/expr.js';
import { fmt } from '../core/math.js';
import { pageVar } from '../core/vars.js';
import { renderMathIn } from '../render/tex.js';

const num = (el, name, d) => { const v = el.getAttribute(name); if (v == null || v === '') return d; try { return compile(v, [])(); } catch { return d; } };

if (typeof customElements !== 'undefined' && !customElements.get('tc-var')) {
  customElements.define('tc-var', class extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      const name = this.getAttribute('name');
      const min = num(this, 'min', -Infinity), max = num(this, 'max', Infinity);
      const step = num(this, 'step', 0.01), digits = num(this, 'digits', 4);
      const log = this.getAttribute('scale') === 'log';
      const unit = this.getAttribute('unit') || '';
      const v = pageVar(name, num(this, 'value', 0));
      const clampv = (x) => { const s = Math.round(x / step) * step; return Math.min(max, Math.max(min, +s.toPrecision(12))); };

      this.setAttribute('role', 'slider');
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-label', this.getAttribute('label') || name);
      if (Number.isFinite(min)) this.setAttribute('aria-valuemin', min);
      if (Number.isFinite(max)) this.setAttribute('aria-valuemax', max);
      this._stop = effect(() => {
        const x = v.get();
        this.textContent = fmt(x, digits) + unit;
        this.setAttribute('aria-valuenow', x);
      });

      // kéo ngang: mỗi 4 px là một bước (thang log: nhân/chia theo tỉ lệ)
      let startX = 0, startV = 0, drag = false;
      this.addEventListener('pointerdown', (e) => { drag = true; startX = e.clientX; startV = v.peek(); this.setPointerCapture(e.pointerId); this.classList.add('is-dragging'); e.preventDefault(); });
      this.addEventListener('pointermove', (e) => {
        if (!drag) return;
        const dx = (e.clientX - startX) / 4;
        v.set(clampv(log ? startV * Math.pow(1.02, dx) : startV + dx * step));
      });
      const end = () => { drag = false; this.classList.remove('is-dragging'); };
      this.addEventListener('pointerup', end);
      this.addEventListener('pointercancel', end);
      this.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const m = e.shiftKey ? 10 : 1;
        v.set(clampv(log ? v.peek() * Math.pow(1.1, d * m) : v.peek() + d * step * m));
      });
    }
    disconnectedCallback() { this._stop?.(); this._ready = false; }
  });

  customElements.define('tc-show', class extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      const expr = this.getAttribute('expr'), when = this.getAttribute('when');
      const digits = num(this, 'digits', 4), unit = this.getAttribute('unit') || '';
      const src = expr || when;
      const names = identifiers(src);
      const sigs = names.map((n) => pageVar(n));
      const evaluate = when ? compileCondition(when, names) : compile(expr, names);
      if (when) renderMathIn(this);
      this._stop = effect(() => {
        const vals = sigs.map((s) => s.get());
        const r = evaluate(...vals);
        if (when) this.hidden = !r;
        else this.textContent = fmt(r, digits) + unit;
      });
    }
    disconnectedCallback() { this._stop?.(); this._ready = false; }
  });
}

/** Điều kiện dạng "a < b", "a >= b", "a == b" (hai vế là biểu thức). */
function compileCondition(src, names) {
  const m = String(src).match(/^(.*?)(<=|>=|==|!=|<|>)(.*)$/);
  if (!m) { const f = compile(src, names); return (...a) => !!f(...a); }
  const L = compile(m[1], names), R = compile(m[3], names), op = m[2];
  return (...a) => {
    const l = L(...a), r = R(...a);
    return op === '<' ? l < r : op === '>' ? l > r : op === '<=' ? l <= r : op === '>=' ? l >= r : op === '==' ? Math.abs(l - r) < 1e-9 : Math.abs(l - r) >= 1e-9;
  };
}
