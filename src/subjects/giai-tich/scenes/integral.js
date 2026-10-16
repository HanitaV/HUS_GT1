// Cảnh tích phân:
//  • riemann   — tổng Riemann tiến về tích phân xác định (Dạng 2 mục tổng Riemann, Dạng 13)
//  • improper  — tích phân suy rộng loại 1: diện tích tích lũy I(A) tiến về giá trị hữu hạn (Dạng 15)

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, sampleExtent, integrate, isNum } from '../../../core/math.js';

defineScene('riemann', {
  params: { f: 'expr:x', a: 'number', b: 'number', n: 'int', nMax: 'int', rule: 'string', x: 'range', y: 'range', exact: 'number', exactTex: 'string' },
  defaults: { a: 0, b: 1, n: 4, nMax: 128, rule: 'right' },
  mount(host, p) {
    const F = figure(host, p);
    const { f, a, b } = p;
    const pad = (b - a) * 0.12;
    const xr = p.x || [a - pad, b + pad];
    const [lo, hi] = p.y || sampleExtent(f, a, b, 200, 0.2);
    const brd = F.board({ x: xr, y: [Math.min(lo, -0.08 * (hi - lo)), hi], title: 'Tổng Riemann' });
    const n = signal(p.n);
    const rule = signal(p.rule);
    const exact = isNum(p.exact) ? p.exact : integrate(f, a, b, 2000);

    const sample = (i, w) => (rule.get() === 'left' ? a + i * w : rule.get() === 'mid' ? a + (i + 0.5) * w : a + (i + 1) * w);
    const S = computed(() => {
      const N = n.get(), w = (b - a) / N;
      let s = 0;
      for (let i = 0; i < N; i++) s += f(sample(i, w)) * w;
      return s;
    });

    brd.region(f, () => 0, { from: a, to: b, color: 'limit', opacity: 0.1 });
    brd.rects(() => {
      const N = n.get(), w = (b - a) / N;
      return Array.from({ length: N }, (_, i) => ({ x0: a + i * w, x1: a + (i + 1) * w, y1: f(sample(i, w)) }));
    }, { color: 'main', opacity: 0.2 });
    brd.curve(f, { color: 'main', width: 2.25 });
    brd.dots(() => {
      const N = n.get(), w = (b - a) / N;
      return N > 64 ? [] : Array.from({ length: N }, (_, i) => ({ x: sample(i, w), y: f(sample(i, w)), tone: 'ink', r: 2.6 }));
    }, { noEnter: true });

    const run = runner(async ({ wait }) => {
      for (let N = 1; N <= p.nMax; N *= 2) { n.set(N); await wait(N < 16 ? 800 : 600); }
    });
    F.play(run, { label: 'Chia mịn dần' });
    F.segmented({ options: [{ value: 'left', label: 'Trái' }, { value: 'mid', label: 'Giữa' }, { value: 'right', label: 'Phải' }], value: rule });
    F.slider({ label: 'n', min: 1, max: p.nMax, step: 1, value: n, digits: 0 });
    F.readout('S_n', () => fmt(S.get(), 7), { tone: 'main' });
    F.readout(p.exactTex || `\\int_{${fmt(a)}}^{${fmt(b)}} f(x)\\,dx`, () => fmt(exact, 7), { tone: 'limit' });
    F.readout('|S_n - I|', () => fmt(Math.abs(S.get() - exact), 7));
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { n, rule } };
  },
});

defineScene('improper', {
  params: { f: 'expr:x', a: 'number', Amax: 'number', exact: 'number', exactTex: 'string', y: 'range', ftex: 'string' },
  defaults: { a: 1, Amax: 8, ftex: 'f(x)' },
  mount(host, p) {
    const F = figure(host, p);
    const { f, a, Amax } = p;
    const A = signal(a + (Amax - a) * 0.35);
    const yr = p.y || sampleExtent(f, a, Amax, 300, 0.15);
    const top = F.board({ x: [a - (Amax - a) * 0.06, Amax], y: [Math.min(0, yr[0]), yr[1]], aspect: 2.4, minHeight: 170, heading: `Đồ thị $y = ${p.ftex}$ và phần diện tích từ $${fmt(a)}$ tới $A$`, title: 'Diện tích dưới đồ thị' });

    // bảng tra I(A) tích lũy để vẽ đồ thị dưới nhanh
    const N = 800, xs = [], Is = [];
    let acc = 0;
    for (let i = 0; i <= N; i++) {
      const x = a + ((Amax - a) * i) / N;
      if (i > 0) acc += integrate(f, xs[i - 1], x, 8);
      xs.push(x); Is.push(acc);
    }
    const I = (x) => {
      if (x <= a) return 0;
      const t = ((x - a) / (Amax - a)) * N, i = Math.min(N - 1, Math.floor(t));
      return Is[i] + (Is[i + 1] - Is[i]) * (t - i);
    };
    const target = isNum(p.exact) ? p.exact : null;
    const Imax = Math.max(...Is.filter(isNum), target ?? 0);
    const Imin = Math.min(0, ...Is.filter(isNum));
    const bottom = F.board({ x: [a - (Amax - a) * 0.06, Amax], y: [Imin - 0.08 * (Imax - Imin), Imax * 1.22], aspect: 2.4, minHeight: 170, heading: `Hàm diện tích $I(A) = \\int_{${fmt(a)}}^{A} ${p.ftex}\\,dx$`, xLabel: 'A', yLabel: '', title: 'Hàm diện tích I(A)' });

    top.region(f, () => 0, { from: a, to: () => A.get(), color: 'main', opacity: 0.18 });
    top.curve(f, { from: a, color: 'main', width: 2.25 });
    top.vline(() => A.get(), { color: 'ink', width: 1, dash: '3 4', from: 0, to: () => f(A.get()) });
    top.label(() => A.get(), 0, 'A', { anchor: 's' });

    if (target !== null) {
      bottom.hline(target, { color: 'limit', dash: '6 5', width: 1.5 });
      bottom.label(() => bottom.view.get().x[1], target, p.exactTex || fmt(target, 5), { anchor: 'nw', color: 'limit' });
    }
    bottom.curve(I, { from: a, to: () => A.get(), color: 'upper', width: 2.25 });
    bottom.point(() => A.get(), () => I(A.get()), { color: 'upper', r: 4.5 });

    const run = runner(async ({ tween }) => {
      A.set(a + 1e-3);
      await tween(A, Amax, { duration: 4200, easing: (t) => t * t * (3 - 2 * t) });
    });
    F.play(run, { label: 'Cho A → +∞' });
    F.slider({ label: 'A', min: a + 1e-3, max: Amax, step: (Amax - a) / 500, value: A, digits: 3 });
    F.readout('I(A)', () => fmt(I(A.get()), 7), { tone: 'upper' });
    if (target !== null) {
      F.readout('\\lim_{A\\to+\\infty} I(A)', () => fmt(target, 7), { tone: 'limit' });
      F.readout('Còn thiếu', () => fmt(target - I(A.get()), 7));
    }
    F.status(() => (target !== null
      ? { text: `Diện tích tăng mãi nhưng chậm dần và không vượt quá ${fmt(target, 6)}: tích phân suy rộng hội tụ.`, tone: 'ok' }
      : { text: 'Theo dõi $I(A)$: nếu đồ thị dưới không có tiệm cận ngang thì tích phân phân kỳ.', tone: 'note' }));
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { A } };
  },
});
