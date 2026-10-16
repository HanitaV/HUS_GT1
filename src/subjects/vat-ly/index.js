// Gói Vật lý đại cương — cảnh mẫu: dao động của con lắc lò xo có ma sát nhớt.
//   m·x'' + c·x' + k·x = 0
// Hai khung đồng bộ theo cùng thời gian t: vật trên lò xo (trên) và đồ thị x(t) (dưới).
// Kéo hệ số cản c qua ngưỡng c = 2√(mk) để thấy ba chế độ: dao động tắt dần,
// tới hạn, và cản quá mức.

import { definePack, scope, figure, signal, computed, runner, solveODE, fmt, ease } from '../../api.js';

const PACK = 'vat-ly';
const scene = scope(PACK);

scene('oscillator', {
  params: { m: 'number', k: 'number', c: 'number', x0: 'number', v0: 'number', T: 'number', cMax: 'number' },
  defaults: { m: 1, k: 4, c: 0.4, x0: 1, v0: 0, T: 12, cMax: 6 },
  mount(host, p) {
    const F = figure(host, p);
    const m = signal(p.m), k = signal(p.k), c = signal(p.c), x0 = signal(p.x0);
    const t = signal(0);
    const sol = computed(() => {
      const M = m.get(), K = k.get(), C = c.get();
      return solveODE((_, [x, v]) => [v, -(K * x + C * v) / M], [x0.get(), p.v0], [0, p.T], 3000);
    });
    const X = (tt) => sol.get().at(tt)[0];
    const V = (tt) => sol.get().at(tt)[1];
    const A = Math.max(Math.abs(p.x0), 0.2) * 1.25;

    // ── khung trên: tường, lò xo, vật ──
    const top = F.board({ x: [-1.6 * A - 1.2, 1.6 * A], y: [-0.9, 0.9], aspect: 3.2, mobileAspect: 2.2, minHeight: 130, axes: false, grid: false, title: 'Vật dao động trên lò xo' });
    const wall = -1.6 * A - 0.6, rest = 0;
    top.segment([wall, -0.7], [wall, 0.7], { color: 'ink', width: 3 });
    top.segment([wall, -0.45], [1.6 * A, -0.45], { color: 'muted', width: 1 });
    top.vline(rest, { color: 'muted', dash: '3 4', width: 1, from: -0.6, to: 0.6 });
    top.label(rest, -0.6, 'x = 0', { anchor: 's', color: 'muted', className: 'tc-label-sm' });
    const W = 0.32;
    top.polyline(() => {
      const end = X(t.get()) - W, n = 14, pts = [[wall, 0]], len = end - wall;
      pts.push([wall + len * 0.06, 0]);
      for (let i = 1; i < n; i++) pts.push([wall + len * (0.06 + (0.88 * i) / n), i % 2 ? 0.16 : -0.16]);
      pts.push([wall + len * 0.94, 0], [end, 0]);
      return pts;
    }, { color: 'ink', width: 1.6 });
    top.polygon(() => { const x = X(t.get()); return [[x - W, -0.32], [x + W, -0.32], [x + W, 0.32], [x - W, 0.32]]; }, { color: 'main', opacity: 0.85, stroke: 'main' });
    // kéo vật để đặt li độ ban đầu, thả tay thì vật bắt đầu dao động
    top.handle(() => [X(t.get()), 0], ([x]) => { run.stop(); t.set(0); x0.set(Math.max(-A, Math.min(A, Math.round(x * 20) / 20))); },
      { color: 'ink', label: 'Vật nặng: kéo sang trái/phải rồi thả', valueText: () => `x₀ = ${fmt(x0.get(), 2)} m`, onEnd: () => F._play?.(), step: [0.05, 0] });
    top.arrow(() => [X(t.get()), 0.52], () => [X(t.get()) + V(t.get()) * 0.35, 0.52], { color: 'upper', width: 2, head: 7 });
    top.label(() => X(t.get()) + V(t.get()) * 0.35, 0.52, '\\vec v', { anchor: 'e', color: 'upper', className: 'tc-label-sm' });

    // ── khung dưới: x(t) ──
    const graph = F.board({ x: [0, p.T], y: [-A, A], aspect: 2.6, mobileAspect: 1.6, xLabel: 't (s)', yLabel: 'x (m)', title: 'Li độ theo thời gian' });
    const gamma = () => c.get() / (2 * m.get());
    const under = () => c.get() < 2 * Math.sqrt(m.get() * k.get()) - 1e-9;
    const env = (s) => (tt) => s * Math.hypot(x0.get(), (p.v0 + gamma() * x0.get()) / Math.sqrt(Math.max(1e-9, k.get() / m.get() - gamma() ** 2))) * Math.exp(-gamma() * tt);
    graph.curve(env(1), { color: 'limit', dash: '5 5', width: 1.2, visible: under });
    graph.curve(env(-1), { color: 'limit', dash: '5 5', width: 1.2, visible: under });
    graph.curve(X, { color: 'main', width: 1.2, opacity: 0.25 });
    graph.curve(X, { to: () => t.get(), color: 'main', width: 2.4 });
    graph.point(() => t.get(), () => X(t.get()), { color: 'main', r: 4.5 });

    const run = runner(async ({ tween }) => {
      t.set(0);
      await tween(t, p.T, { duration: p.T * 650, easing: ease.linear });
    });
    F.play(run, { label: 'Thả vật' });
    F.slider({ label: 't', min: 0, max: p.T, step: p.T / 600, value: t, digits: 2 });
    F.slider({ label: 'c', min: 0, max: p.cMax, step: 0.05, value: c, digits: 2 });
    F.slider({ label: 'k', min: 0.5, max: 10, step: 0.1, value: k, digits: 2 });
    F.slider({ label: 'm', min: 0.2, max: 4, step: 0.1, value: m, digits: 2 });
    F.keep(x0);

    F.readout('\\omega_0 = \\sqrt{k/m}', () => fmt(Math.sqrt(k.get() / m.get()), 4) + ' rad/s');
    F.readout('\\gamma = c / 2m', () => fmt(gamma(), 4) + ' s⁻¹', { tone: 'limit' });
    F.readout('c_{\\text{th}} = 2\\sqrt{mk}', () => fmt(2 * Math.sqrt(m.get() * k.get()), 4));
    F.readout('x(t)', () => fmt(X(t.get()), 4) + ' m', { tone: 'main' });
    F.status(() => {
      const cc = 2 * Math.sqrt(m.get() * k.get()), C = c.get();
      if (Math.abs(C - cc) < 0.03 * cc) return { text: `Cản tới hạn ($c \\approx 2\\sqrt{mk}$): vật về vị trí cân bằng nhanh nhất mà không vượt qua.`, tone: 'ok' };
      if (C < cc) {
        const wd = Math.sqrt(k.get() / m.get() - gamma() ** 2);
        return { text: `Dao động tắt dần ($c < 2\\sqrt{mk}$): biên độ giảm theo $e^{-\\gamma t}$ (đường nét đứt), chu kỳ $T_d = 2\\pi/\\omega_d \\approx ${fmt((2 * Math.PI) / wd, 3)}$ s.`, tone: 'ok' };
      }
      return { text: 'Cản quá mức ($c > 2\\sqrt{mk}$): vật bò chậm về vị trí cân bằng, không dao động.', tone: 'note' };
    });
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { c, k, m, t, x0 } };
  },
});

definePack(PACK, {
  name: 'Vật lý đại cương',
  presets: {
    'dao-dong-tat-dan': {
      kind: 'oscillator', number: 'V.1', m: 1, k: 4, c: 0.4, x0: 1, T: 12,
      heading: 'Con lắc lò xo có lực cản $F_c = -c\\,v$',
      predict: 'Tăng hệ số cản $c$ từ 0,4 lên 4. Vật sẽ…',
      predictOptions: 'Dao động chậm hơn nhưng vẫn qua lại|Về vị trí cân bằng mà không vượt qua|Dao động mạnh hơn',
      predictAnswer: 2,
      predictExplain: 'Với $m = 1$, $k = 4$ thì $2\\sqrt{mk} = 4$: $c = 4$ là cản tới hạn. Kéo thanh $c$ để kiểm chứng.',
      caption: 'Phương trình $m\\ddot x + c\\dot x + kx = 0$ được giải số bằng Runge–Kutta bậc 4. Đây cũng là phương trình vi phân tuyến tính cấp hai hệ số hằng trong Giải tích 2.',
    },
  },
});
