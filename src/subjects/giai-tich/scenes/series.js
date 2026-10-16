// Cảnh chuỗi và dãy truy hồi:
//  • series  — số hạng uₙ (cột) và tổng riêng S_N (điểm) tiến về tổng S (Dạng 16, 17)
//  • cobweb  — sơ đồ mạng nhện cho dãy truy hồi u_{n+1} = g(uₙ) (Dạng 2, định lý Weierstrass)
//  • fourier — tổng riêng chuỗi Fourier S_N(x) và định lý Dirichlet (Dạng 20)

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, extent, integrate, isNum } from '../../../core/math.js';

defineScene('series', {
  params: { u: 'expr:n', n1: 'int', nMax: 'int', S: 'number', STex: 'string', uTex: 'string' },
  defaults: { n1: 1, nMax: 30, uTex: 'u_n' },
  mount(host, p) {
    const F = figure(host, p);
    const { u, n1, nMax } = p;
    const terms = [], sums = [];
    let s = 0;
    for (let n = n1; n <= nMax; n++) { const t = u(n); terms.push(t); s += t; sums.push(s); }
    const target = isNum(p.S) ? p.S : null;
    const [lo, hi] = extent([...terms, ...sums, 0, target ?? 0], 0.1);
    const brd = F.board({ x: [n1 - 1.2, nMax + 1.5], y: [lo, hi], xTicks: 'int', xLabel: 'N', yLabel: '', origin: false, title: 'Số hạng và tổng riêng của chuỗi' });
    const shown = signal(nMax - n1 + 1);

    if (target !== null) {
      brd.hline(target, { color: 'limit', dash: '6 5', width: 1.5 });
      brd.label(() => brd.view.get().x[1], target, p.STex || `S = ${fmt(target, 4)}`, { anchor: 'nw', color: 'limit' });
    }
    brd.rects(() => terms.slice(0, shown.get()).map((t, i) => ({ x0: n1 + i - 0.28, x1: n1 + i + 0.28, y1: t, tone: 'lower' })), { opacity: 0.35 });
    brd.polyline(() => sums.slice(0, shown.get()).map((v, i) => [n1 + i, v]), { color: 'upper', width: 1.2, opacity: 0.55 });
    brd.dots(() => sums.slice(0, shown.get()).map((v, i) => ({ x: n1 + i, y: v, tone: 'upper' })), { r: 4 });

    const run = runner(async ({ wait }) => {
      shown.set(0);
      const dt = Math.max(50, Math.min(160, 3000 / (nMax - n1 + 1)));
      for (let k = 1; k <= nMax - n1 + 1; k++) { shown.set(k); await wait(dt); }
    });
    F.play(run, { label: 'Cộng dồn' });
    const k = () => Math.max(1, shown.get());
    F.readout('N', () => String(n1 + k() - 1));
    F.readout(p.uTex.replace(/n/g, 'N'), () => fmt(terms[k() - 1], 6), { tone: 'lower' });
    F.readout('S_N', () => fmt(sums[k() - 1], 7), { tone: 'upper' });
    if (target !== null) F.readout('|S - S_N|', () => fmt(Math.abs(target - sums[k() - 1]), 7));
    F.caption(p.caption || 'Cột: số hạng $u_n$. Điểm: tổng riêng $S_N = u_1 + \\dots + u_N$. Chuỗi hội tụ khi dãy điểm có giới hạn hữu hạn.');
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: {} };
  },
});

defineScene('cobweb', {
  params: { g: 'expr:x', u1: 'number', L: 'number', steps: 'int', x: 'range', y: 'range', gTex: 'string' },
  defaults: { steps: 8, gTex: 'g(x)' },
  mount(host, p) {
    const F = figure(host, p);
    const { g, u1, steps } = p;
    const seq = [u1];
    for (let i = 0; i < steps; i++) seq.push(g(seq[i]));
    const span = extent([...seq, p.L ?? seq[seq.length - 1]], 0.4);
    const xr = p.x || [Math.min(0, span[0]), span[1]];
    const brd = F.board({ x: xr, y: p.y || xr, aspect: 4 / 3, maxHeight: 480, title: 'Sơ đồ mạng nhện của dãy truy hồi' });
    const k = signal(steps);
    const axisY = () => Math.max(0, brd.view.get().y[0]);   // trục hoành, hoặc mép dưới nếu 0 nằm ngoài khung

    brd.curve((x) => x, { color: 'muted', width: 1.25 });
    brd.curve(g, { color: 'main', width: 2.25 });
    brd.label(() => { const [l, r] = brd.view.get().x; return r - (r - l) * 0.04; }, () => { const [l, r] = brd.view.get().x; return r - (r - l) * 0.04; }, 'y = x', { anchor: 'nw', color: 'muted', className: 'tc-label-sm' });
    if (isNum(p.L)) {
      brd.point(p.L, p.L, { color: 'limit', r: 5 });
      brd.label(p.L, p.L, `L = ${fmt(p.L, 4)}`, { anchor: 'se', color: 'limit' });
      brd.vline(p.L, { color: 'limit', dash: '4 4', width: 1, opacity: 0.6, from: axisY, to: p.L });
    }
    brd.polyline(() => {
      const pts = [[seq[0], axisY()]];
      for (let i = 0; i < k.get(); i++) { pts.push([seq[i], seq[i + 1]]); pts.push([seq[i + 1], seq[i + 1]]); }
      return pts;
    }, { color: 'upper', width: 1.5 });
    brd.dots(() => seq.slice(0, k.get() + 1).map((v, i) => ({ x: v, y: axisY(), tone: i === 0 ? 'ink' : 'upper', r: 3.5 })));
    brd.label(seq[0], axisY, 'u_1', { anchor: 'sw', className: 'tc-label-sm' });

    const run = runner(async ({ wait }) => {
      k.set(0);
      for (let i = 1; i <= steps; i++) { await wait(700); k.set(i); }
    });
    F.play(run, { label: 'Lặp' });
    F.slider({ label: 'n', min: 0, max: steps, step: 1, value: k, digits: 0 });
    F.readout('u_{n+1}', () => fmt(seq[k.get()], 8), { tone: 'upper' });
    if (isNum(p.L)) F.readout('|u_{n+1} - L|', () => fmt(Math.abs(seq[k.get()] - p.L), 8));
    const inc = seq[1] > seq[0];
    F.status(() => ({
      text: `Dãy ${inc ? 'tăng' : 'giảm'} và bị chặn ${inc ? 'trên' : 'dưới'} bởi điểm bất động $L$ (giao của $y = ${p.gTex}$ với $y = x$), nên hội tụ về nghiệm của $L = g(L)$.`,
      tone: 'ok',
    }));
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { k } };
  },
});

defineScene('fourier', {
  params: { f: 'expr:x', N: 'int', nMax: 'int', ftex: 'string', y: 'range', periods: 'number' },
  defaults: { N: 3, nMax: 40, ftex: 'f(x)', periods: 1.5 },
  mount(host, p) {
    const F = figure(host, p);
    const { f, nMax } = p;
    const PI = Math.PI;
    const per = (x) => f(((((x + PI) % (2 * PI)) + 2 * PI) % (2 * PI)) - PI);
    const a = [], b = [];
    for (let n = 0; n <= nMax; n++) {
      const an = integrate((x) => f(x) * Math.cos(n * x), -PI, PI, 1000) / PI;
      const bn = n ? integrate((x) => f(x) * Math.sin(n * x), -PI, PI, 1000) / PI : 0;
      a.push(Math.abs(an) < 1e-9 ? 0 : an);              // bỏ nhiễu số (hàm chẵn/lẻ)
      b.push(Math.abs(bn) < 1e-9 ? 0 : bn);
    }
    const N = signal(p.N);
    const S = (x) => { let s = a[0] / 2; for (let n = 1; n <= N.get(); n++) s += a[n] * Math.cos(n * x) + b[n] * Math.sin(n * x); return s; };
    const W = PI * p.periods * 2 * 0.985;   // tránh đặt đúng điểm nhảy ở mép khung
    const yr = p.y || extent(Array.from({ length: 200 }, (_, i) => f(-PI + (2 * PI * i) / 199)), 0.3);
    const brd = F.board({ x: [-W, W], y: yr, xTicks: 'pi', aspect: 2.2, title: 'Tổng riêng chuỗi Fourier' });

    const jumpL = f(PI - 1e-9), jumpR = f(-PI + 1e-9);
    const jump = Math.abs(jumpL - jumpR) > 1e-6;
    const breaks = [];
    for (let k = -5; k <= 5; k++) breaks.push((2 * k + 1) * PI);

    brd.curve(per, { breaks: jump ? breaks : [], color: 'main', width: 2.25, opacity: 0.55 });
    brd.curve(S, { color: 'upper', width: 2 });
    if (jump) {
      const mid = (jumpL + jumpR) / 2;
      brd.dots(breaks.filter((x) => Math.abs(x) <= W).map((x) => ({ x, y: mid, tone: 'limit', r: 4.5 })), { noEnter: true });
    }

    const run = runner(async ({ wait }) => {
      for (let k = 1; k <= Math.min(nMax, 25); k++) { N.set(k); await wait(k < 6 ? 700 : 260); }
    });
    F.play(run, { label: 'Thêm số hạng' });
    F.slider({ label: 'N', min: 0, max: nMax, step: 1, value: N, digits: 0 });
    F.readout('a_0 / 2', () => fmt(a[0] / 2, 6));
    F.readout('a_N', () => fmt(a[N.get()] ?? 0, 6));
    F.readout('b_N', () => fmt(b[N.get()] ?? 0, 6));
    F.status(() => ({
      text: jump
        ? `Tại các điểm gián đoạn $x = \\pm\\pi$, mọi $S_N$ đi qua trung bình cộng hai giới hạn một phía (điểm màu vàng) — đúng như định lý Dirichlet.`
        : `$${p.ftex}$ liên tục khi thác triển tuần hoàn, nên $S_N(x)$ hội tụ đều về $f(x)$ trên toàn trục.`,
      tone: 'ok',
    }));
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { N } };
  },
});
