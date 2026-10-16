// Cảnh: đạo hàm theo định nghĩa (Dạng 6, Dạng 7)
// Cát tuyến qua P(x₀; f(x₀)) và Q(x₀+h; f(x₀+h)) xoay dần về tiếp tuyến khi h → 0.
// Tam giác Δx, Δy cho thấy hệ số góc chính là tỉ số sai phân.

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, sampleExtent, isNum } from '../../../core/math.js';

defineScene('derivative', {
  params: { f: 'expr:x', x0: 'number', f0: 'number', slope: 'number', h: 'number', x: 'range', y: 'range', side: 'string' },
  defaults: { x0: 0, h: 1.2, side: 'both' },
  mount(host, p) {
    const F = figure(host, p);
    const { f, x0 } = p;
    const y0 = isNum(p.f0) ? p.f0 : f(x0);
    const fx = (x) => (Math.abs(x - x0) < 1e-12 ? y0 : f(x));
    // đạo hàm một phía (ngoại suy Richardson); nếu khác nhau → điểm gãy, không khả vi
    const side1 = (sg) => { const h1 = 1e-4 * sg, d1 = (fx(x0 + h1) - y0) / h1, d2 = (fx(x0 + h1 / 2) - y0) / (h1 / 2); return 2 * d2 - d1; };
    const mR = isNum(p.slope) ? p.slope : side1(1), mL = isNum(p.slope) ? p.slope : side1(-1);
    const kink = Math.abs(mR - mL) > 1e-4 * Math.max(1, Math.abs(mR));
    const mOf = () => (h.get() < 0 ? mL : mR);
    const xr = p.x || [x0 - 2, x0 + 2];
    const yr = p.y || sampleExtent(fx, xr[0], xr[1], 300, 0.2);
    const brd = F.board({ x: xr, y: yr, title: 'Cát tuyến tiến về tiếp tuyến' });

    const h = signal(p.h);
    const Q = () => [x0 + h.get(), fx(x0 + h.get())];
    const k = computed(() => (fx(x0 + h.get()) - y0) / h.get());

    brd.curve(fx, { color: 'main', width: 2.25 });
    brd.line([x0, y0], mOf, { color: 'limit', dash: '6 5', width: 1.4, opacity: 0.85 });
    brd.line([x0, y0], () => k.get(), { color: 'ink', width: 1.6 });
    // tam giác sai phân
    brd.segment([x0, y0], () => [x0 + h.get(), y0], { color: 'lower', width: 1.6 });
    brd.segment(() => [x0 + h.get(), y0], Q, { color: 'upper', width: 1.6 });
    brd.label(() => x0 + h.get() / 2, y0, '\\Delta x = h', { anchor: h.peek() > 0 ? 's' : 's', color: 'lower', className: 'tc-label-sm' });
    brd.label(() => x0 + h.get(), () => (y0 + Q()[1]) / 2, '\\Delta y', { anchor: () => (h.get() > 0 ? 'e' : 'w'), color: 'upper', className: 'tc-label-sm' });
    brd.point(x0, y0, { color: 'ink', r: 5 });
    brd.point(() => Q()[0], () => Q()[1], { color: 'main', r: 5 });
    brd.label(x0, y0, 'P', { anchor: 'nw' });
    // kéo Q dọc theo đồ thị: ràng buộc x ∈ [x0 − h₀, x0 + h₀], h ≠ 0
    brd.handle(Q, ([x]) => {
      let hv = Math.max(-p.h, Math.min(p.h, x - x0));
      if (Math.abs(hv) < p.h / 400) hv = (hv < 0 ? -1 : 1) * (p.h / 400);
      run.stop(); h.set(hv);
    }, { color: 'main', label: 'Điểm Q trên đồ thị, kéo để đổi h', valueText: () => `h = ${fmt(h.get(), 4)}`, step: [p.h / 100, 0] });
    brd.label(() => Q()[0], () => Q()[1], 'Q', { anchor: 'nw' });

    const run = runner(async ({ tween, wait }) => {
      const both = p.side === 'both';
      h.set(p.h);
      await wait(250);
      await tween(h, p.h / 300, { duration: 3200, scale: 'log' });
      if (!both) return;
      await wait(500);
      h.set(-p.h);
      await wait(400);
      await tween(h, -p.h / 300, { duration: 3200, scale: 'linear', easing: (t) => 1 - Math.pow(1 - t, 5) });
    });

    F.play(run, { label: 'Cho h → 0' });
    F.slider({ label: 'h', min: -p.h, max: p.h, step: p.h / 400, value: h, digits: 5 });
    F.readout('\\dfrac{f(x_0+h)-f(x_0)}{h}', () => fmt(k.get(), 7), { tone: 'main' });
    if (kink) {
      F.readout("f'_-(x_0)", () => fmt(mL, 7), { tone: 'lower' });
      F.readout("f'_+(x_0)", () => fmt(mR, 7), { tone: 'upper' });
    } else {
      F.readout("f'(x_0)", () => fmt(mR, 7), { tone: 'limit' });
      F.readout('Chênh lệch', () => fmt(Math.abs(k.get() - mR), 7));
    }
    F.status(() => ({
      text: h.get() === 0
        ? 'Tại $h = 0$ tỉ số sai phân có dạng $0/0$ — chỉ có giới hạn của nó mới có nghĩa.'
        : kink
          ? `Từ phía ${h.get() > 0 ? 'phải' : 'trái'}, hệ số góc cát tuyến tiến về ${fmt(mOf(), 5)}. Hai đạo hàm một phía khác nhau ($${fmt(mL, 4)} \\ne ${fmt(mR, 4)}$) nên $f$ không khả vi tại $x_0$.`
          : `Hệ số góc cát tuyến ${fmt(k.get(), 6)} tiến về $f'(x_0) = ${fmt(mR, 6)}$ ${h.get() > 0 ? 'từ phía phải' : 'từ phía trái'}.`,
      tone: h.get() === 0 || kink ? 'bad' : 'ok',
    }));
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { h } };
  },
});
