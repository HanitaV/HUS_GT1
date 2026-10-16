// <tc-check> — câu hỏi tự kiểm tra (luyện truy xuất), chấm ngay trên trang.
//
// Đáp số là số hoặc biểu thức ("3/(4e^2)", "pi^2/6", "sqrt(2)"):
//   <tc-check answer="2" explain="Tử số $\sim 2x$ nên giới hạn bằng 2.">
//     Tính $\lim_{x\to0}\frac{\sqrt{1+2x}-\sqrt[3]{1-3x}}{x}$.
//     <tc-hint>Thêm bớt 1 ở tử số để tách thành hai giới hạn chuẩn.</tc-hint>
//     <tc-hint>Dùng $\sqrt[k]{1+u} - 1 \sim \frac uk$.</tc-hint>
//   </tc-check>
//
// Trắc nghiệm, có lời giải thích cho từng phương án (như "rationale" của Khan Academy):
//   <tc-check options="Hội tụ|Phân kỳ" answer="1" rationales="Đúng: C = 3/4 < 1.|Sai: …">…</tc-check>
//
// Bài sinh ngẫu nhiên (như bộ sinh câu hỏi của VisuAlgo): tham số trong {…}, đáp án là biểu thức theo tham số.
//   <tc-check vars="k=2..6" answer="k^2/2">
//     Cho $f(x) = \frac{e^{ {k}x } - 1}{x}$, $f(0) = {k}$. Tính $f'(0)$.
//   </tc-check>
//
// Gợi ý mở từng cái một; sau 2 lần sai mới có nút "Xem đáp án".

import { compile } from '../core/expr.js';
import { renderRich, renderMathIn } from '../render/tex.js';
import { fmt } from '../core/math.js';

const t = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
let uid = 0;

/** "a=2..6; b=1..4; c=-3..3" → bộ sinh giá trị nguyên ngẫu nhiên (bỏ 0 nếu có dấu !0). */
function parseVars(src) {
  return String(src || '').split(/[;,]/).map((s) => s.trim()).filter(Boolean).map((s) => {
    const m = s.match(/^([A-Za-z_]\w*)\s*=\s*(-?\d+)\s*\.\.\s*(-?\d+)\s*(!0)?$/);
    if (!m) throw new Error(`Không đọc được tham số "${s}" (dạng đúng: k=2..6)`);
    return { name: m[1], lo: +m[2], hi: +m[3], nonzero: !!m[4] };
  });
}
const pick = ({ lo, hi, nonzero }) => { let v; do { v = lo + Math.floor(Math.random() * (hi - lo + 1)); } while (nonzero && v === 0); return v; };

if (typeof customElements !== 'undefined' && !customElements.get('tc-check')) {
  customElements.define('tc-check', class extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      const options = (this.getAttribute('options') || '').split('|').map((s) => s.trim()).filter(Boolean);
      const rationales = (this.getAttribute('rationales') || '').split('|').map((s) => s.trim());
      const answerRaw = this.getAttribute('answer') || '';
      const tol = parseFloat(this.getAttribute('tol') || '1e-6');
      const explainRaw = this.getAttribute('explain') || '';
      let vars;
      try { vars = parseVars(this.getAttribute('vars')); } catch (e) { this.textContent = e.message; return; }

      // tách gợi ý ra khỏi đề
      const hints = [...this.querySelectorAll('tc-hint')].map((h) => { h.remove(); return h.innerHTML; });
      const template = this.innerHTML;
      this.textContent = '';
      const tag = t('span', 'tc-check-tag', 'Tự kiểm tra');
      const q = t('div', 'tc-check-q');
      const hintBox = t('ol', 'tc-check-hints');
      const row = t('div', 'tc-check-row');
      const fb = t('p', 'tc-check-feedback');
      fb.setAttribute('aria-live', 'polite');
      this.append(tag, q, hintBox, row, fb);

      let values = {}, wrong = 0, done = false, hintShown = 0;
      const subst = (s) => String(s).replace(/\{([A-Za-z_]\w*)\}/g, (m, n) => (n in values ? String(values[n]) : m));
      const target = () => compile(answerRaw, vars.map((v) => v.name))(...vars.map((v) => values[v.name]));

      const hintBtn = t('button', 'tc-btn tc-btn-quiet');
      hintBtn.type = 'button';
      const reveal = t('button', 'tc-btn tc-btn-quiet', 'Xem đáp án');
      reveal.type = 'button';
      const again = t('button', 'tc-btn tc-btn-quiet', 'Bài khác');
      again.type = 'button';

      const renderHints = () => {
        hintBox.textContent = '';
        hints.slice(0, hintShown).forEach((h) => { const li = t('li'); li.innerHTML = subst(h); renderMathIn(li); hintBox.appendChild(li); });
        hintBtn.textContent = `Gợi ý ${Math.min(hintShown + 1, hints.length)}/${hints.length}`;
        hintBtn.hidden = !hints.length || hintShown >= hints.length || done;
      };
      hintBtn.addEventListener('click', () => { hintShown++; renderHints(); });

      const finish = (ok, shown, chosen) => {
        done = ok || shown;
        this.dataset.result = ok ? 'ok' : shown ? 'shown' : 'bad';
        const ans = options.length ? options[+answerRaw - 1] : fmt(target(), 6);
        const why = chosen !== undefined && rationales[chosen] ? ' ' + subst(rationales[chosen]) : '';
        const head = ok ? 'Đúng.' : shown ? `Đáp án: ${ans}.` : wrong >= 2 ? 'Chưa đúng.' : 'Chưa đúng — thử lại.';
        renderRich(fb, `${head}${why} ${ok || shown ? subst(explainRaw) : ''}`.trim());
        reveal.hidden = !(wrong >= 2 && !done);
        again.hidden = !(vars.length && done);
        renderHints();
      };
      reveal.addEventListener('click', () => finish(false, true));

      const build = () => {
        values = Object.fromEntries(vars.map((v) => [v.name, pick(v)]));
        wrong = 0; done = false; hintShown = 0;
        delete this.dataset.result;
        q.innerHTML = subst(template);
        renderMathIn(q);
        fb.textContent = hints.length ? 'Thử tự làm trước; cần thì mở từng gợi ý.' : '';
        row.textContent = '';
        if (options.length) {
          const g = t('div', 'tc-seg');
          g.setAttribute('role', 'radiogroup');
          options.forEach((o, i) => {
            const b = t('button');
            b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
            renderRich(b, subst(o));
            b.addEventListener('click', () => {
              if (done) return;
              g.querySelectorAll('button').forEach((x) => x.setAttribute('aria-checked', String(x === b)));
              const ok = i === +answerRaw - 1;
              if (!ok) wrong++;
              finish(ok, false, i);
            });
            g.appendChild(b);
          });
          row.append(g);
        } else {
          const id = `tc-c${++uid}`;
          const lab = t('label', 'tc-control-label', 'Đáp số');
          lab.htmlFor = id;
          const input = t('input', 'tc-check-input');
          input.id = id; input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off';
          input.placeholder = 'ví dụ 2, 1/4, pi^2/6';
          const go = t('button', 'tc-btn tc-btn-primary', 'Kiểm tra');
          go.type = 'button';
          const check = () => {
            if (done) return;
            let v;
            try { v = compile(input.value.replace(/(\d),(\d)/g, '$1.$2'), [])(); }
            catch { renderRich(fb, 'Không đọc được biểu thức. Ví dụ cách nhập: 0,25 hoặc 1/4 hoặc sqrt(2)/2.'); return; }
            const T = target();
            const ok = Math.abs(v - T) <= tol * Math.max(1, Math.abs(T));
            if (!ok) wrong++;
            finish(ok, false);
            if (!ok && Number.isFinite(v)) fb.append(` (Bạn nhập ≈ ${fmt(v, 6)}.)`);
          };
          go.addEventListener('click', check);
          input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
          row.append(lab, input, go);
        }
        row.append(hintBtn, reveal, again);
        reveal.hidden = true; again.hidden = true;
        renderHints();
      };
      again.addEventListener('click', build);
      build();
    }
  });
}
