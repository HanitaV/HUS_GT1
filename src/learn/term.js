// <tc-term> — thuật ngữ có giải thích tại chỗ (ý "contextual information" của Bret Victor).
//
//   Thay <tc-term tip="Vô cùng bé: $\alpha(x) \to 0$ khi $x \to x_0$.">VCB</tc-term> tương đương …
//
// Hiện khi rê chuột, khi được chọn bằng bàn phím, hoặc khi chạm trên điện thoại.

import { renderRich, renderMathIn } from '../render/tex.js';

let uid = 0;

if (typeof customElements !== 'undefined' && !customElements.get('tc-term')) {
  customElements.define('tc-term', class extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      renderMathIn(this);
      const tip = document.createElement('span');
      tip.className = 'tc-term-tip';
      tip.id = `tc-t${++uid}`;
      tip.setAttribute('role', 'tooltip');
      renderRich(tip, this.getAttribute('tip') || '');
      this.appendChild(tip);
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-describedby', tip.id);
      const toggle = (on) => this.classList.toggle('is-open', on);
      this.addEventListener('mouseenter', () => toggle(true));
      this.addEventListener('mouseleave', () => toggle(false));
      this.addEventListener('focus', () => toggle(true));
      this.addEventListener('blur', () => toggle(false));
      this.addEventListener('click', () => toggle(!this.classList.contains('is-open')));
      this.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
    }
  });
}
