// <tc-steps> — lời giải mở dần từng bước (ví dụ mẫu "mờ dần").
//
//   <tc-steps heading="Lời giải ĐT01">
//     <ol>
//       <li>Trên $(-\infty;1)$ và $(1;+\infty)$, $f$ là hàm sơ cấp nên liên tục.</li>
//       <li>$L^+ = f(1) = 2$, $L^- = a - 2$.</li>
//       <li>Liên tục tại 1 $\iff a - 2 = 2 \iff a = 4$.</li>
//     </ol>
//   </tc-steps>
//
// Mặc định ẩn mọi bước để người học tự làm trước (thuộc tính show="k" để mở sẵn k bước).
// Nội dung là HTML thường của trang, nên công thức do KaTeX auto-render của trang xử lý.

import { renderMathIn } from '../render/tex.js';
import { pageVar } from '../core/vars.js';
import { tween } from '../core/anim.js';

const t = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

if (typeof customElements !== 'undefined' && !customElements.get('tc-steps')) {
  customElements.define('tc-steps', class extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      const list = this.querySelector('ol, ul');
      if (!list) return;
      renderMathIn(list);
      const steps = [...list.children];
      let shown = Math.min(steps.length, parseInt(this.getAttribute('show') || '0', 10));

      const head = t('div', 'tc-steps-head');
      head.appendChild(t('span', 'tc-steps-title', this.getAttribute('heading') || 'Lời giải'));
      const hint = t('span', 'tc-steps-hint');
      head.appendChild(hint);
      this.prepend(head);

      const bar = t('div', 'tc-steps-bar');
      const next = t('button', 'tc-btn tc-btn-quiet');
      const all = t('button', 'tc-btn tc-btn-quiet', 'Mở hết');
      const hide = t('button', 'tc-btn tc-btn-quiet', 'Ẩn lại');
      for (const b of [next, all, hide]) { b.type = 'button'; bar.appendChild(b); }
      this.appendChild(bar);
      list.classList.add('tc-steps-list');

      const render = () => {
        steps.forEach((s, i) => { s.hidden = i >= shown; s.classList.toggle('is-new', i === shown - 1); });
        next.textContent = shown === 0 ? 'Xem bước 1' : `Xem bước ${shown + 1}`;
        next.hidden = all.hidden = shown >= steps.length;
        hide.hidden = shown === 0;
        hint.textContent = shown === 0
          ? `${steps.length} bước — tự làm ra giấy trước, rồi mở từng bước để đối chiếu.`
          : `Đã mở ${shown} / ${steps.length} bước`;
      };
      // <li data-set="d=0.05; eps=0.01">: mở bước này thì hình được nối (bind) chuyển tới trạng thái tương ứng
      const apply = (li) => {
        for (const pair of (li?.dataset.set || '').split(';').map((s) => s.trim()).filter(Boolean)) {
          const [name, raw] = pair.split('=').map((s) => s.trim());
          const v = pageVar(name), to = +raw;
          if (!Number.isFinite(to)) continue;
          const from = v.peek();
          if (Number.isFinite(from)) tween(v, to, { duration: 900, scale: from > 0 && to > 0 ? 'log' : 'linear' }); else v.set(to);
        }
      };
      next.addEventListener('click', () => { shown++; render(); apply(steps[shown - 1]); steps[shown - 1]?.focus?.(); });
      all.addEventListener('click', () => { shown = steps.length; render(); });
      hide.addEventListener('click', () => { shown = 0; render(); });
      steps.forEach((s) => s.setAttribute('tabindex', '-1'));
      render();
    }
  });
}
