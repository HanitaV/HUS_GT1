// Cảnh: khai triển Taylor – Maclaurin (Dạng 10, Dạng 20)
// Đa thức Pₙ ôm sát f quanh 0 và vùng ôm sát rộng dần khi n tăng; với chuỗi có bán kính
// hội tụ hữu hạn (ln(1+x), 1/(1−x), arctan x) thì ngoài (−R; R) đa thức tách khỏi f.

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt } from '../../../core/math.js';
import { factorial } from '../../../core/expr.js';

const FUNCS = {
  exp: { f: Math.exp, tex: 'e^x', c: (k) => 1 / factorial(k), R: Infinity, x: [-4, 4], y: [-2, 12] },
  sin: { f: Math.sin, tex: '\\sin x', c: (k) => (k % 2 ? (-1) ** ((k - 1) / 2) / factorial(k) : 0), R: Infinity, x: [-9, 9], y: [-3, 3] },
  cos: { f: Math.cos, tex: '\\cos x', c: (k) => (k % 2 ? 0 : (-1) ** (k / 2) / factorial(k)), R: Infinity, x: [-9, 9], y: [-3, 3] },
  ln1p: { f: Math.log1p, tex: '\\ln(1+x)', c: (k) => (k === 0 ? 0 : (-1) ** (k - 1) / k), R: 1, x: [-1.6, 2.6], y: [-3, 2.5] },
  geom: { f: (x) => 1 / (1 - x), tex: '\\dfrac{1}{1-x}', c: () => 1, R: 1, x: [-2.2, 1.8], y: [-2, 8] },
  atan: { f: Math.atan, tex: '\\arctan x', c: (k) => (k % 2 ? (-1) ** ((k - 1) / 2) / k : 0), R: 1, x: [-2.6, 2.6], y: [-2.2, 2.2] },
};

const DENS = [...Array.from({ length: 30 }, (_, i) => i + 1), ...Array.from({ length: 16 }, (_, i) => factorial(i + 5))];
function frac(c) {
  // biểu diễn hệ số dạng phân số gọn cho TeX: 1/6, -1/120 …
  const s = c < 0 ? '-' : '+', a = Math.abs(c);
  for (const d of DENS) {
    const n = a * d, N = Math.round(n);
    if (N >= 1 && Math.abs(n - N) < 1e-6 * N) return { s, t: d === 1 ? (N === 1 ? '' : String(N)) : `\\tfrac{${N}}{${d}}` };
  }
  return { s, t: fmt(a, 4) };
}

defineScene('taylor', {
  params: { fn: 'string', n: 'int', nMax: 'int' },
  defaults: { fn: 'sin', n: 3, nMax: 15 },
  mount(host, p) {
    const F = figure(host, p);
    const which = signal(FUNCS[p.fn] ? p.fn : 'sin');
    const n = signal(p.n);
    const def = () => FUNCS[which.get()];
    const brd = F.board({ x: FUNCS[which.peek()].x, y: FUNCS[which.peek()].y, title: 'Đa thức Taylor tiến dần về hàm số' });
    F.track(() => { const d = def(); brd.view.set({ x: d.x, y: d.y }); });

    const coeffs = computed(() => { const d = def(); return Array.from({ length: p.nMax + 1 }, (_, k) => d.c(k)); });
    const P = (x) => { const c = coeffs.get(), N = n.get(); let s = 0, xp = 1; for (let k = 0; k <= N; k++) { s += c[k] * xp; xp *= x; } return s; };

    brd.vband(() => -Math.min(def().R, 1e6), () => Math.min(def().R, 1e6), { color: 'limit', opacity: () => (isFinite(def().R) ? 0.08 : 0) });
    brd.region((x) => def().f(x), P, { color: 'bad', opacity: 0.08 });
    brd.curve((x) => def().f(x), { color: 'main', width: 2.5 });
    brd.curve(P, { color: 'upper', width: 2 });
    brd.label(() => brd.view.get().x[0], () => brd.view.get().y[1], () => `f(x) = ${def().tex}`, { anchor: 'se', color: 'main' });
    brd.label(() => brd.view.get().x[0], () => brd.view.get().y[1] - (brd.view.get().y[1] - brd.view.get().y[0]) * 0.09, () => `P_{${n.get()}}(x)`, { anchor: 'se', color: 'upper' });

    const run = runner(async ({ wait }) => {
      for (let k = 0; k <= p.nMax; k++) {
        if (def().c(k) === 0 && k > 0) continue;
        n.set(k);
        await wait(650);
      }
    });
    F.play(run, { label: 'Tăng bậc n' });
    F.segmented({
      options: Object.entries(FUNCS).map(([k, v]) => ({ value: k, label: v.tex.replace('\\dfrac', '\\tfrac') })),
      value: which,
    });
    F.slider({ label: 'n', min: 0, max: p.nMax, step: 1, value: n, digits: 0 });
    F.readout('P_n(x)', () => {
      const c = coeffs.get(), terms = [];
      for (let k = 0; k <= n.get(); k++) {
        if (Math.abs(c[k]) < 1e-15) continue;
        const { s, t } = frac(c[k]);
        const xp = k === 0 ? (t || '1') : `${t}${k === 1 ? 'x' : `x^{${k}}`}`;
        terms.push(terms.length ? ` ${s} ${xp}` : `${s === '-' ? '-' : ''}${xp}`);
      }
      return terms.length ? (terms.length > 6 ? terms.slice(0, 5).join('') + ' + \\cdots' : terms.join('')) : '0';
    }, { tex: true });
    F.readout('Bán kính hội tụ', () => (isFinite(def().R) ? fmt(def().R) : '+∞'));
    F.readout('|f(1) - P_n(1)|', () => fmt(Math.abs(def().f(1) - P(1)), 8));
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { n } };
  },
});
