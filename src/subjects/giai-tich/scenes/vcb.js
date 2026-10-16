// Cảnh: vô cùng bé tương đương (Dạng 3; Dạng 10 bài 2).
//
// Hình này không minh họa đáp số mà minh họa *lý do* của quy tắc thi:
//   • mode "ratio":  f ~ g nghĩa là f/g → 1. Phóng to về 0, đồ thị f và g trùng khít nhau —
//     đó là lý do được thay f bằng g trong tích và thương.
//   • mode "difference": f₁ ~ g và f₂ ~ g nhưng f₁ − f₂ KHÔNG ~ g − g = 0. Phóng to thì
//     hai đường trùng nhau, nhưng hiệu của chúng (khung dưới, phóng đại theo x^p) vẫn có
//     dạng rõ ràng khác 0 — đó là lý do cấm thay tương đương trong tổng/hiệu khi bị triệt tiêu.

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, isNum } from '../../../core/math.js';

defineScene('vcb', {
  params: {
    mode: 'string', f: 'expr:x', g: 'expr:x', f1: 'expr:x', f2: 'expr:x',
    ftex: 'string', gtex: 'string', f1tex: 'string', f2tex: 'string',
    p: 'int', c: 'number', ctex: 'string', delta: 'number',
  },
  defaults: { mode: 'ratio', delta: 1.2, p: 3, ftex: 'f(x)', gtex: 'g(x)', f1tex: 'f_1(x)', f2tex: 'f_2(x)' },
  mount(host, p) {
    const F = figure(host, p);
    const delta = signal(p.delta);
    const diff = p.mode === 'difference';
    const A = diff ? p.f1 : p.f, B = diff ? p.f2 : p.g;

    // khung trên: hai hàm (và hàm tương đương chung), phóng to quanh 0 với tỉ lệ 1:1
    const top = F.board({ x: [-p.delta, p.delta], y: [-p.delta * 0.62, p.delta * 0.62], aspect: 2, mobileAspect: 1.3,
      heading: diff ? `$${p.f1tex}$ và $${p.f2tex}$ gần $x = 0$` : `$${p.ftex}$ và $${p.gtex}$ gần $x = 0$`, title: 'Hai vô cùng bé gần 0' });
    F.track(() => { const d = delta.get(); top.view.set({ x: [-d, d], y: [-d * 0.62, d * 0.62] }); });
    if (diff && p.g) top.curve(p.g, { color: 'muted', width: 1.2, dash: '4 4' });
    top.curve(A, { color: 'main', width: 2.4 });
    top.curve(B, { color: 'upper', width: 2.4, dash: diff ? undefined : '7 5' });

    // khung dưới
    let bottom;
    if (!diff) {
      bottom = F.board({ x: [-p.delta, p.delta], y: [0.4, 1.6], aspect: 2.6, mobileAspect: 1.6, xLabel: 'x', yLabel: '',
        heading: `Tỉ số $\\dfrac{${p.ftex}}{${p.gtex}}$`, title: 'Tỉ số hai vô cùng bé' });
      F.track(() => { const d = delta.get(); bottom.view.set({ x: [-d, d], y: [0.4, 1.6] }); });
      bottom.hline(1, { color: 'limit', dash: '6 5', width: 1.4 });
      bottom.curve((x) => A(x) / B(x), { color: 'main', width: 2.4, breaks: [0] });
      bottom.point(0, 1, { color: 'limit', hollow: true });
    } else {
      // phóng đại hiệu theo x^p để thấy hệ số bậc thấp nhất còn sót lại
      // rất sát 0, phép trừ hai số gần bằng nhau mất hết chữ số có nghĩa: bỏ qua vùng đó
      const scaled = (x) => (Math.abs(x) < 1e-5 ? NaN : (A(x) - B(x)) / Math.pow(x, p.p));
      const cAbs = Math.abs(p.c ?? 1);
      bottom = F.board({ x: [-p.delta, p.delta], y: [-cAbs * 2.2, cAbs * 2.2], aspect: 2.6, mobileAspect: 1.6, xLabel: 'x', yLabel: '',
        heading: `Hiệu đã phóng đại: $\\dfrac{${p.f1tex} - ${p.f2tex}}{x^{${p.p}}}$ — nếu thay tương đương ta sẽ được đường 0`, title: 'Hiệu của hai vô cùng bé' });
      F.track(() => { const d = delta.get(); bottom.view.set({ x: [-d, d], y: [-cAbs * 2.2, cAbs * 2.2] }); });
      bottom.hline(0, { color: 'bad', dash: '6 5', width: 1.6 });
      if (isNum(p.c)) bottom.hline(p.c, { color: 'limit', dash: '3 4', width: 1.2 });
      bottom.curve(scaled, { color: 'main', width: 2.4, breaks: [0] });
      if (isNum(p.c)) bottom.point(0, p.c, { color: 'limit', hollow: true });
    }

    const run = runner(async ({ tween, wait }) => {
      delta.set(p.delta); await wait(300);
      await tween(delta, p.delta / 200, { duration: 4200, scale: 'log' });
    });
    F.play(run, { label: 'Phóng to về 0' });
    F.slider({ label: '\\delta', min: p.delta / 1000, max: p.delta, value: delta, scale: 'log', digits: 5 });

    const at = () => delta.get() * 0.5;
    if (!diff) {
      F.readout(`${p.ftex}`, () => fmt(A(at()), 7), { tone: 'main' });
      F.readout(`${p.gtex}`, () => fmt(B(at()), 7), { tone: 'upper' });
      F.readout(`\\dfrac{${p.ftex}}{${p.gtex}}`, () => fmt(A(at()) / B(at()), 7), { tone: 'limit' });
      F.status(() => ({
        text: `Tại $x = ${fmt(at(), 5)}$ tỉ số là ${fmt(A(at()) / B(at()), 6)}: càng gần 0, hai đồ thị càng khó phân biệt. Vì vậy trong **tích và thương** được thay $${p.ftex}$ bởi $${p.gtex}$ — sai số chỉ là một thừa số tiến về 1.`.replace(/\*\*/g, ''),
        tone: 'ok',
      }));
    } else {
      F.readout(`${p.f1tex} - ${p.f2tex}`, () => fmt(A(at()) - B(at()), 9), { tone: 'main' });
      F.readout('Nếu thay tương đương', () => '0', { tone: 'lower' });
      F.readout(`\\dfrac{${p.f1tex} - ${p.f2tex}}{x^{${p.p}}}`, () => fmt((A(at()) - B(at())) / Math.pow(at(), p.p), 6), { tone: 'limit' });
      F.status(() => ({
        text: `Ở khung trên hai đường gần như trùng nhau, nên dễ tưởng hiệu bằng 0. Nhưng hiệu thật cỡ $${p.ctex || fmt(p.c ?? NaN)}\\,x^{${p.p}}$ — khác 0. Khi các số hạng bậc thấp triệt tiêu nhau, phải dùng khai triển Taylor hoặc L'Hospital.`,
        tone: 'bad',
      }));
    }
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { delta } };
  },
});
