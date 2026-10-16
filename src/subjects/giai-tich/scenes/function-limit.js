// Cảnh: giới hạn hàm số tại x₀ (Dạng 3)
// Hai điểm chạy dọc đồ thị từ bên trái (x₀ − h) và bên phải (x₀ + h); khi h → 0
// cả hai cùng dồn về điểm rỗng (x₀; L). Hàm có thể không xác định tại x₀ (dạng 0/0).

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, sampleExtent, isNum } from '../../../core/math.js';

defineScene('function-limit', {
  params: { f: 'expr:x', x0: 'number', L: 'number', x: 'range', y: 'range', h: 'number', ftex: 'string', defined: 'bool' },
  defaults: { x0: 0, h: 0.6, ftex: 'f(x)', defined: false },
  mount(host, p) {
    const F = figure(host, p);
    const { f, x0, L } = p;
    const xr = p.x || [x0 - 2, x0 + 2];
    const yr = p.y || sampleExtent(f, xr[0], xr[1], 300, 0.15);
    const brd = F.board({ x: xr, y: yr, title: 'Giới hạn của hàm số tại một điểm' });
    const h = signal(p.h);
    const xl = () => x0 - h.get(), xr_ = () => x0 + h.get();

    brd.vband(xl, xr_, { color: 'muted', opacity: 0.07 });
    brd.curve(f, { breaks: [x0], color: 'main', width: 2.25 });
    brd.hline(L, { color: 'limit', dash: '6 5', width: 1.25, opacity: 0.8 });
    brd.point(x0, L, { hollow: !p.defined, color: 'limit', r: 5 });
    brd.label(x0, L, `L = ${fmt(L)}`, { anchor: 'nw', color: 'limit' });

    // đường gióng từ hai điểm chạy xuống trục hoành
    const yOf = (xf) => () => f(xf());
    for (const [xf, tone, anchor, tex] of [[xl, 'lower', 'nw', 'x_0 - h'], [xr_, 'upper', 'se', 'x_0 + h']]) {
      brd.segment(() => [xf(), 0], () => [xf(), f(xf())], { color: tone, dash: '3 4', width: 1, opacity: 0.7 });
      brd.segment(() => [x0, f(xf())], () => [xf(), f(xf())], { color: tone, dash: '3 4', width: 1, opacity: 0.5 });
      brd.point(xf, yOf(xf), { color: tone, r: 5 });
      brd.label(xf, () => 0, tex, { anchor: anchor === 'nw' ? 'sw' : 'se', color: tone, className: 'tc-label-sm' });
    }

    // kéo điểm bên phải dọc đồ thị: đổi h, điểm bên trái đối xứng theo
    brd.handle(() => [xr_(), f(xr_())], ([x]) => { run.stop(); h.set(Math.max(p.h / 1000, Math.min(p.h, x - x0))); },
      { color: 'upper', label: 'Điểm x₀ + h, kéo để đổi h', valueText: () => `h = ${fmt(h.get(), 5)}`, step: [p.h / 100, 0] });

    const run = runner(async ({ tween, wait }) => {
      h.set(p.h);
      await wait(250);
      await tween(h, p.h / 500, { duration: 4000, scale: 'log' });
    });

    F.play(run, { label: 'Cho h → 0' });
    F.slider({ label: 'h', min: p.h / 1000, max: p.h, value: h, scale: 'log', digits: 6 });
    F.readout(`${p.ftex.replace('x', 'x_0 - h')}`, () => fmt(f(xl()), 7), { tone: 'lower' });
    F.readout(`${p.ftex.replace('x', 'x_0 + h')}`, () => fmt(f(xr_()), 7), { tone: 'upper' });
    F.readout(`${p.ftex.replace('x', 'x_0')}`, () => (isNum(f(x0)) ? fmt(f(x0), 7) : 'không xác định'));
    F.status(() => {
      const gap = Math.max(Math.abs(f(xl()) - L), Math.abs(f(xr_()) - L));
      return { text: `Khi $h = ${fmt(h.get(), 6)}$, cả hai giá trị lệch khỏi $L$ không quá ${fmt(gap, 6)}. Giới hạn chỉ phụ thuộc giá trị gần $x_0$, không cần $f(x_0)$.`, tone: 'ok' };
    });
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { h } };
  },
});
