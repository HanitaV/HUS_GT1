// Cảnh: nguyên lý kẹp (Dạng 2 – dãy số; Dạng 4 – hàm số)
// Hai "hàm kẹp" a ≤ u ≤ b khép lại tại cùng giới hạn L; u bị nhốt giữa hai hàm nên buộc phải về L.

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner } from '../../../core/anim.js';
import { fmt, extent, isNum } from '../../../core/math.js';

defineScene('squeeze', {
  params: {
    mode: 'string',
    a: 'expr:n', u: 'expr:n', b: 'expr:n', nMax: 'int',
    lower: 'expr:x', f: 'expr:x', upper: 'expr:x', x0: 'number', delta: 'number', hole: 'bool',
    L: 'number', aTex: 'string', uTex: 'string', bTex: 'string',
  },
  defaults: { mode: 'sequence', nMax: 30, L: 1, aTex: 'a_n', uTex: 'u_n', bTex: 'b_n', x0: 0, delta: 1, hole: false },
  mount(host, p) {
    return p.mode === 'function' ? mountFunction(host, p) : mountSequence(host, p);
  },
});

function mountSequence(host, p) {
  const F = figure(host, p);
  const { a, u, b: bb, L, nMax } = p;
  const A = [], U = [], B = [];
  for (let n = 1; n <= nMax; n++) { A.push(a(n)); U.push(u(n)); B.push(bb(n)); }
  const [y0, y1] = extent([...A, ...U, ...B, L], 0.12);
  const view0 = { x: [0, nMax + 2], y: [y0, y1] };
  const brd = F.board({ ...view0, xTicks: 'int', xLabel: 'n', yLabel: '', origin: false, title: 'Nguyên lý kẹp cho dãy số' });
  const shown = signal(nMax);

  brd.region((x) => bb(x), (x) => a(x), { from: 1, to: () => Math.max(1, shown.get()), color: 'muted', opacity: 0.1 });
  brd.curve((x) => a(x), { from: 1, to: nMax, color: 'lower', width: 1.25, opacity: 0.55 });
  brd.curve((x) => bb(x), { from: 1, to: nMax, color: 'upper', width: 1.25, opacity: 0.55 });
  brd.hline(L, { color: 'limit', dash: '6 5', width: 1.5 });
  brd.label(() => brd.view.get().x[1], L, 'L', { anchor: 'nw', color: 'limit' });

  const series = (arr, tone) => () => arr.slice(0, shown.get()).map((y, i) => ({ x: i + 1, y, tone }));
  brd.dots(series(A, 'lower'), { r: 3.2 });
  brd.dots(series(B, 'upper'), { r: 3.2 });
  brd.dots(series(U, 'main'), { r: 4.2 });
  const nl = Math.max(2, Math.round(nMax * 0.12));
  brd.label(nl, () => bb(nl), p.bTex, { anchor: 'nw', color: 'upper' });
  brd.label(nl, () => a(nl), p.aTex, { anchor: 'se', color: 'lower' });

  const zoomed = signal(false);
  const zoomTarget = () => {
    const k = Math.max(3, Math.floor(nMax / 2));
    const span = Math.max(...B.slice(k - 1).map((v) => Math.abs(v - L)), ...A.slice(k - 1).map((v) => Math.abs(v - L)), 1e-6);
    return { x: [k - 1, nMax + 2], y: [L - span * 1.5, L + span * 1.5] };
  };

  const run = runner(async ({ wait, frames }) => {
    if (zoomed.peek()) { zoomed.set(false); await brd.resetView({ duration: 400, frames }); }
    shown.set(0);
    const dt = Math.max(40, Math.min(120, 2600 / nMax));
    for (let n = 1; n <= nMax; n++) { shown.set(n); await wait(dt); }
    await wait(600);
    zoomed.set(true);
    await brd.setView(zoomTarget(), { duration: 1600, frames });
  });

  F.play(run);
  F.button({
    label: 'Phóng to phần đuôi',
    pressed: zoomed,
    onClick: () => { const z = !zoomed.peek(); zoomed.set(z); z ? brd.setView(zoomTarget()) : brd.resetView(); },
  });
  const cur = () => Math.max(1, shown.get());
  F.readout(p.aTex, () => fmt(A[cur() - 1], 6), { tone: 'lower' });
  F.readout(p.uTex, () => fmt(U[cur() - 1], 6), { tone: 'main' });
  F.readout(p.bTex, () => fmt(B[cur() - 1], 6), { tone: 'upper' });
  F.readout(`${p.bTex} - ${p.aTex}`, () => fmt(B[cur() - 1] - A[cur() - 1], 6));
  F.status(() => {
    const k = cur();
    const ok = A[k - 1] <= U[k - 1] + 1e-12 && U[k - 1] <= B[k - 1] + 1e-12;
    return ok
      ? { text: `Tại $n = ${k}$: $${p.aTex} \\le ${p.uTex} \\le ${p.bTex}$, và khe kẹp chỉ còn rộng ${fmt(B[k - 1] - A[k - 1], 5)}. Khe co về 0 nên $${p.uTex} \\to L$.`, tone: 'ok' }
      : { text: `Tại $n = ${k}$ bất đẳng thức kẹp chưa đúng — nguyên lý chỉ cần đúng từ một chỉ số $n_0$ nào đó trở đi.`, tone: 'bad' };
  });
  return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: {} };
}

function mountFunction(host, p) {
  const F = figure(host, p);
  const { lower, f, upper, x0, L } = p;
  const delta = signal(p.delta);

  const viewFor = (d) => {
    let k = 0;
    for (let i = 0; i <= 60; i++) {
      const x = x0 - d + (2 * d * i) / 60;
      for (const g of [lower, upper]) { const v = Math.abs(g(x) - L); if (isNum(v)) k = Math.max(k, v); }
    }
    k = Math.max(k * 1.25, d * 1e-3, 1e-12);
    return { x: [x0 - d, x0 + d], y: [L - k, L + k] };
  };
  const brd = F.board({ ...viewFor(p.delta), aspect: 16 / 10, title: 'Nguyên lý kẹp cho hàm số' });
  F.track(() => brd.view.set(viewFor(delta.get())));

  brd.region((x) => upper(x), (x) => lower(x), { color: 'muted', opacity: 0.1 });
  brd.curve((x) => lower(x), { color: 'lower', width: 1.6 });
  brd.curve((x) => upper(x), { color: 'upper', width: 1.6 });
  brd.curve((x) => f(x), { color: 'main', width: 2, resolution: 0.8 });
  brd.hline(L, { color: 'limit', dash: '6 5', width: 1.25, opacity: 0.8 });
  brd.point(x0, L, { color: 'limit', hollow: p.hole, r: 4.5 });

  const lab = (g, tex, tone, anchor) => brd.label(
    () => brd.view.get().x[1] - (brd.view.get().x[1] - brd.view.get().x[0]) * 0.03,
    () => g(brd.view.get().x[1] - (brd.view.get().x[1] - brd.view.get().x[0]) * 0.03),
    tex, { anchor, color: tone },
  );
  lab(upper, p.bTex === 'b_n' ? 'g(x)' : p.bTex, 'upper', 'nw');
  lab(lower, p.aTex === 'a_n' ? 'h(x)' : p.aTex, 'lower', 'sw');

  const run = runner(async ({ tween, wait }) => {
    delta.set(p.delta);
    await wait(300);
    await tween(delta, p.delta / 400, { duration: 4200, scale: 'log' });
  });

  F.play(run, { label: 'Phóng to về x₀' });
  F.slider({ label: '\\delta', min: p.delta / 1000, max: p.delta, value: delta, scale: 'log', digits: 6 });
  F.readout('Khung nhìn', () => `${fmt(x0 - delta.get(), 6)} … ${fmt(x0 + delta.get(), 6)}`);
  F.readout('Độ rộng khe', () => {
    const d = delta.get();
    return fmt(Math.abs(upper(x0 + d) - lower(x0 + d)), 6);
  });
  F.status(() => ({
    text: `Dù phóng to tới đâu, đồ thị của $f$ vẫn nằm trong khe giữa hai hàm kẹp, và khe khép lại tại điểm $(${fmt(x0)};\\,${fmt(L)})$.`,
    tone: 'ok',
  }));
  return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { delta } };
}
