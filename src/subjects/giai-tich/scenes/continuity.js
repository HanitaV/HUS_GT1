// Cảnh: liên tục tại điểm ghép nhánh và tìm tham số (Dạng 4, Dạng 5)
// Kéo tham số a: nhánh trái/phải và giá trị f(x₀) dịch chuyển; khi ba đại lượng
// L⁻, L⁺, f(x₀) trùng nhau thì hàm liên tục. Ngược lại, cảnh tự phân loại điểm gián đoạn.

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, sampleExtent, isNum } from '../../../core/math.js';

const near = (p, q) => Math.abs(p - q) < 1e-6 * Math.max(1, Math.abs(p), Math.abs(q));

defineScene('continuity', {
  params: {
    
    left: 'expr:x,a', right: 'expr:x,a', at: 'expr:x,a',
    x0: 'number', a: 'number', aRange: 'range', aStep: 'number', aTex: 'string', answer: 'number',
    x: 'range', y: 'range',
  },
  defaults: { x0: 1, a: 1, aRange: '-2,8', aStep: 0.1, aTex: 'a' },
  mount(host, p) {
    const F = figure(host, p);
    const { left, right, x0 } = p;
    const at = p.at || right;                       // mặc định f(x₀) thuộc nhánh phải (x ≥ x₀)
    const a = signal(p.a);
    const xr = p.x || [x0 - 2.5, x0 + 2];
    const yr = p.y || sampleExtent((x) => (x < x0 ? left(x, p.a) : right(x, p.a)), xr[0], xr[1], 200, 0.3);
    const brd = F.board({ x: xr, y: yr, title: 'Hàm ghép nhánh tại điểm x₀' });

    // giới hạn một phía tính số: tiến sát x₀ theo dãy h giảm dần
    const oneSided = (g, side) => {
      // ngoại suy Richardson: g(h) ≈ L + c·h  ⇒  L ≈ 2·g(h/2) − g(h), sai số cỡ h²
      const A = a.get(), h = 1e-4;
      const v1 = g(x0 + side * h, A), v2 = g(x0 + side * h / 2, A);
      if (!isNum(v1) || !isNum(v2) || Math.abs(v2) > 1e6) return NaN;
      const L = 2 * v2 - v1;
      return Math.abs(L - Math.round(L * 1e6) / 1e6) < 1e-7 ? Math.round(L * 1e6) / 1e6 : L;
    };
    const Lm = computed(() => oneSided(left, -1));
    const Lp = computed(() => oneSided(right, +1));
    const fx0 = computed(() => at(x0, a.get()));

    brd.vline(x0, { color: 'muted', dash: '2 4', width: 1, opacity: 0.6 });
    brd.curve((x) => left(x, a.get()), { to: x0, color: 'main', width: 2.25 });
    brd.curve((x) => right(x, a.get()), { from: x0, color: 'main', width: 2.25 });

    // bước nhảy: đoạn thẳng đứng nối L⁻ và L⁺
    brd.segment(() => [x0, Lm.get()], () => [x0, Lp.get()], { color: 'bad', width: 2, dash: '4 3', visible: () => !near(Lm.get(), Lp.get()) });
    brd.point(x0, () => Lm.get(), { color: 'lower', hollow: () => !near(Lm.get(), fx0.get()), r: 5 });
    brd.point(x0, () => Lp.get(), { color: 'upper', hollow: () => !near(Lp.get(), fx0.get()), r: 5 });
    brd.point(x0, () => fx0.get(), { color: 'ink', r: 4 });
    brd.label(x0, () => Lm.get(), 'L^-', { anchor: 'w', color: 'lower', visible: () => !near(Lm.get(), Lp.get()) });
    brd.label(x0, () => Lp.get(), 'L^+', { anchor: 'e', color: 'upper', visible: () => !near(Lm.get(), Lp.get()) });

    const [amin, amax] = p.aRange;
    const run = runner(async ({ tween, wait }) => {
      if (!isNum(p.answer)) return;
      a.set(amin);
      await wait(300);
      await tween(a, p.answer, { duration: 2600 });
    });
    if (isNum(p.answer)) F.play(run, { label: 'Tìm tham số' });
    F.slider({ label: p.aTex, min: amin, max: amax, step: p.aStep, value: a, digits: 3 });

    F.readout('L^- = \\lim_{x\\to x_0^-} f(x)', () => fmt(Lm.get(), 6), { tone: 'lower' });
    F.readout('L^+ = \\lim_{x\\to x_0^+} f(x)', () => fmt(Lp.get(), 6), { tone: 'upper' });
    F.readout('f(x_0)', () => fmt(fx0.get(), 6));
    F.status(() => {
      const m = Lm.get(), q = Lp.get(), v = fx0.get();
      const A = `$${p.aTex} = ${fmt(a.get(), 4)}$`;
      if (!isNum(m) || !isNum(q)) return { text: `${A}: một giới hạn một phía không tồn tại hữu hạn — gián đoạn loại 2.`, tone: 'bad' };
      if (!near(m, q)) return { text: `${A}: $L^- \\ne L^+$ — gián đoạn loại 1 có bước nhảy $|L^+ - L^-| = ${fmt(Math.abs(q - m), 5)}$.`, tone: 'bad' };
      if (!near(m, v)) return { text: `${A}: $L^- = L^+ \\ne f(x_0)$ — gián đoạn bỏ được.`, tone: 'bad' };
      return { text: `${A}: $L^- = L^+ = f(x_0) = ${fmt(v, 5)}$ — hàm số liên tục tại $x_0 = ${fmt(x0)}$.`, tone: 'ok' };
    });
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { a } };
  },
});
