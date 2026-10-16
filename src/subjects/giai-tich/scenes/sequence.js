// Cảnh: giới hạn dãy số theo định nghĩa ε – n₀ (Dạng 2)
// Các điểm u_n tiến về L; dải [L−ε, L+ε] cho thấy từ chỉ số n₀ trở đi mọi điểm nằm trong dải.
// Phóng to quanh L để thấy khoảng cách |u_n − L| luôn dương: dãy tiến tới L nhưng không chạm.

import { defineScene } from '../pack.js';
import { figure } from '../../../ui/controls.js';
import { signal, computed } from '../../../core/signal.js';
import { runner, ease } from '../../../core/anim.js';
import { fmt, extent, isNum } from '../../../core/math.js';


defineScene('limit-sequence', {
  params: { u: 'expr:n', L: 'number', nMax: 'int', eps: 'number', tex: 'string' },
  defaults: { u: '1 + (-1)^n / n', L: 1, nMax: 40, eps: 0.2, tex: 'u_n' },
  mount(host, p) {
    const F = figure(host, p);
    const { u, L, nMax } = p;
    const values = Array.from({ length: nMax }, (_, i) => u(i + 1));
    const [y0, y1] = extent([...values, L], 0.15);
    const b = F.board({ x: [0, nMax + 1.5], y: [y0, y1], xTicks: 'int', xLabel: 'n', yLabel: '', origin: false, title: 'Dãy số tiến về giới hạn L' });

    const eps = signal(p.eps);
    const shown = signal(nMax);
    const zoomed = signal(false);

    // n₀(ε): chỉ số cuối cùng (trong phạm vi kiểm tra) còn nằm ngoài dải.
    const n0 = computed(() => {
      const e = eps.get();
      let last = 0;
      for (let n = 1; n <= 20000; n++) if (!(Math.abs(u(n) - L) < e)) last = n;
      return last;
    });

    b.hband(() => L - eps.get(), () => L + eps.get(), { color: 'limit', opacity: 0.13 });
    b.hline(() => L + eps.get(), { color: 'limit', opacity: 0.45, width: 1 });
    b.hline(() => L - eps.get(), { color: 'limit', opacity: 0.45, width: 1 });
    b.hline(L, { color: 'limit', dash: '6 5', width: 1.5 });
    b.label(() => b.view.get().x[1], L, 'L', { anchor: 'nw', color: 'limit' });

    b.vline(() => n0.get() + 0.5, { color: 'muted', dash: '3 4', width: 1, visible: () => n0.get() < nMax });
    b.label(() => n0.get() + 0.5, () => b.view.get().y[1], () => `n_0 = ${n0.get()}`, { anchor: 'se', color: 'muted', visible: () => n0.get() < nMax });

    // kéo mép trên của dải để đổi ε
    b.handle(() => { const [l, r] = b.view.get().x; return [l + (r - l) * 0.05, L + eps.get()]; },
      ([, y]) => { run.stop(); eps.set(Math.max(0.005, Math.min(1, Math.abs(y - L)))); },
      { color: 'limit', label: 'Mép dải ε, kéo lên xuống để đổi ε', valueText: () => `ε = ${fmt(eps.get(), 4)}`, step: [0, 0.005] });

    b.dots(() => {
      const k = shown.get(), e = eps.get(), out = [];
      for (let n = 1; n <= k; n++) {
        const inside = Math.abs(values[n - 1] - L) < e;
        out.push({ x: n, y: values[n - 1], tone: inside ? 'main' : 'muted', hollow: !inside });
      }
      return out;
    }, { r: 4 });

    const run = runner(async ({ wait, tween }) => {
      if (zoomed.peek()) { zoomed.set(false); await b.resetView({ duration: 500 }); }
      shown.set(0);
      const dt = Math.max(35, Math.min(110, 2400 / nMax));
      for (let n = 1; n <= nMax; n++) { shown.set(n); await wait(dt); }
      await wait(500);
      // thu hẹp ε nhưng giữ n₀ trong khung hình để câu chuyện kết thúc rõ ràng
      const keep = Math.abs(u(Math.round(nMax * 0.7)) - L) * 1.05;
      await tween(eps, Math.max(eps.peek() / 4, keep), { duration: 1800, scale: 'log', easing: ease.inOut });
    });

    F.play(run, { label: 'Chạy' });
    F.slider({ label: '\\varepsilon', min: 0.005, max: 1, value: eps, scale: 'log', digits: 3 });
    F.button({
      label: 'Phóng to quanh L',
      pressed: zoomed,
      onClick: () => {
        const z = !zoomed.peek();
        zoomed.set(z);
        const e = eps.peek();
        if (z) b.setView({ x: [Math.max(0, n0.peek() - 3), nMax + 1.5], y: [L - 3 * e, L + 3 * e] });
        else b.resetView();
      },
    });

    F.readout('n_0(\\varepsilon)', () => String(n0.get()));
    F.readout(`${p.tex}`, () => { const k = shown.get(); return k ? `${fmt(values[k - 1], 6)}  (n = ${k})` : '—'; });
    F.readout(`|${p.tex} - L|`, () => { const k = shown.get(); return k ? fmt(Math.abs(values[k - 1] - L), 6) : '—'; });
    F.status(() => {
      const k = shown.get();
      const gaps = values.slice(0, k).map((v) => Math.abs(v - L)).filter(isNum);
      const minGap = gaps.length ? Math.min(...gaps) : NaN;
      if (n0.get() >= nMax) return { text: `Với $\\varepsilon = ${fmt(eps.get(), 4)}$, cần xét $n > ${n0.get()}$ — vượt khung hình. Hãy tăng $\\varepsilon$.`, tone: 'note' };
      if (minGap === 0) return { text: `Mọi $n > ${n0.get()}$ đều cho $|${p.tex} - L| < \\varepsilon$. Dãy này có số hạng bằng đúng $L$ — điều đó không ảnh hưởng tới giới hạn.`, tone: 'ok' };
      return {
        text: `Mọi $n > ${n0.get()}$ đều cho $|${p.tex} - L| < \\varepsilon$. Khoảng cách nhỏ nhất đã thấy là ${fmt(minGap, 6)} — dương, nên các điểm chưa từng chạm $L$.`,
        tone: 'ok',
      };
    });

    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { eps } };
  },
});
