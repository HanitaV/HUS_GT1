// Gói Hóa đại cương — cảnh mẫu: động học phản ứng A → sản phẩm, bậc 0, 1, 2.
// Khung trái: nồng độ [A] theo thời gian và các mốc chu kỳ bán hủy liên tiếp.
// Khung phải: đồ thị tuyến tính hóa ([A], ln[A] hoặc 1/[A] theo t) — cách xác định
// bậc phản ứng từ số liệu thực nghiệm: chỉ đúng bậc mới cho đường thẳng.

import { definePack, scope, figure, signal, computed, runner, fmt, ease } from '../../api.js';

const PACK = 'hoa';
const scene = scope(PACK);

const LAW = {
  0: { A: (A0, k, t) => Math.max(0, A0 - k * t), half: (A0, k) => A0 / (2 * k), lin: (a) => a, linTex: '[A]', slopeTex: '-k', halfTex: 't_{1/2} = \\dfrac{[A]_0}{2k}' },
  1: { A: (A0, k, t) => A0 * Math.exp(-k * t), half: (A0, k) => Math.LN2 / k, lin: (a) => Math.log(a), linTex: '\\ln[A]', slopeTex: '-k', halfTex: 't_{1/2} = \\dfrac{\\ln 2}{k}' },
  2: { A: (A0, k, t) => A0 / (1 + A0 * k * t), half: (A0, k) => 1 / (k * A0), lin: (a) => 1 / a, linTex: '\\dfrac{1}{[A]}', slopeTex: '+k', halfTex: 't_{1/2} = \\dfrac{1}{k[A]_0}' },
};

scene('kinetics', {
  params: { order: 'int', k: 'number', A0: 'number', T: 'number' },
  defaults: { order: 1, k: 0.35, A0: 1, T: 10 },
  mount(host, p) {
    const F = figure(host, p);
    const order = signal(p.order), k = signal(p.k), A0 = signal(p.A0), t = signal(p.T * 0.4);
    const law = () => LAW[order.get()];
    const conc = (tt) => law().A(A0.get(), k.get(), tt);
    const halves = computed(() => {
      // các mốc t mà [A] giảm còn 1/2, 1/4, 1/8 … (tính bằng định luật tích phân của bậc đang chọn)
      const out = []; let tt = 0, a = A0.get();
      for (let i = 0; i < 4; i++) {
        const h = law().half(a, k.get());
        if (!isFinite(h) || tt + h > p.T) break;
        tt += h; a /= 2; out.push({ t: tt, a });
      }
      return out;
    });

    const left = F.board({ x: [0, p.T], y: [0, p.A0 * 2.1], aspect: 1.3, columns: true, xLabel: 't (phút)', yLabel: '[A] (M)', heading: 'Nồng độ theo thời gian', title: 'Nồng độ A theo thời gian' });
    for (const o of [0, 1, 2]) left.curve((tt) => LAW[o].A(A0.get(), k.get(), tt), { color: 'muted', width: 1.2, opacity: 0.45, visible: () => o !== order.get() });
    left.curve(conc, { color: 'main', width: 2.5 });
    left.dots(() => halves.get().map((h) => ({ x: h.t, y: h.a, tone: 'limit', r: 4 })), { noEnter: true });
    left.vline(() => t.get(), { color: 'ink', dash: '3 4', width: 1, from: 0, to: () => conc(t.get()) });
    left.point(() => t.get(), () => conc(t.get()), { color: 'main', r: 5 });

    const right = F.board({ x: [0, p.T], y: [-3, 3], aspect: 1.3, columns: true, xLabel: 't', yLabel: '', heading: 'Đồ thị tuyến tính hóa', title: 'Đồ thị tuyến tính hóa' });
    F.track(() => {
      const L = law(), vals = [];
      for (let i = 0; i <= 40; i++) { const v = L.lin(conc((p.T * i) / 40)); if (isFinite(v)) vals.push(v); }
      const lo = Math.min(...vals), hi = Math.max(...vals), pad = (hi - lo || 1) * 0.15;
      right.view.set({ x: [0, p.T], y: [lo - pad, hi + pad] });
    });
    right.curve((tt) => law().lin(conc(tt)), { color: 'upper', width: 2.5 });
    right.dots(() => Array.from({ length: 9 }, (_, i) => { const tt = ((i + 0.5) * p.T) / 9; return { x: tt, y: law().lin(conc(tt)), tone: 'upper', r: 3.5 }; }), { noEnter: true });

    const run = runner(async ({ tween }) => { t.set(0); await tween(t, p.T, { duration: 4500, easing: ease.linear }); });
    F.play(run, { label: 'Cho phản ứng chạy' });
    F.segmented({ label: 'Bậc', options: [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }], value: order });
    F.slider({ label: 'k', min: 0.05, max: 1, step: 0.01, value: k, digits: 2 });
    F.slider({ label: '[A]_0', min: 0.2, max: 2, step: 0.05, value: A0, digits: 2 });
    F.readout('[A](t)', () => `${fmt(conc(t.get()), 4)} M  (t = ${fmt(t.get(), 2)})`, { tone: 'main' });
    F.readout('t_{1/2}', () => law().halfTex, { tex: true, tone: 'limit' });
    F.readout('Hai chu kỳ đầu', () => { const h = halves.get(); return h.length >= 2 ? `${fmt(h[0].t, 3)} và ${fmt(h[1].t - h[0].t, 3)}` : '—'; });
    F.status(() => {
      const o = order.get();
      const txt = o === 1
        ? 'Bậc 1: mỗi chu kỳ bán hủy dài như nhau, không phụ thuộc $[A]_0$ (các điểm vàng cách đều).'
        : o === 0 ? 'Bậc 0: chu kỳ sau ngắn bằng nửa chu kỳ trước — tốc độ phản ứng không đổi.'
          : 'Bậc 2: chu kỳ sau dài gấp đôi chu kỳ trước — phản ứng chậm dần rất nhanh.';
      return { text: `${txt} Chỉ đồ thị $${law().linTex}$ theo $t$ mới thẳng, với hệ số góc $${law().slopeTex}$.`, tone: 'ok' };
    });
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { order, k, A0, t } };
  },
});

definePack(PACK, {
  name: 'Hóa đại cương',
  presets: {
    'bac-phan-ung': {
      kind: 'kinetics', number: 'H.1', order: 1, k: 0.35, A0: 1, T: 10,
      heading: 'Bậc phản ứng và chu kỳ bán hủy',
      predict: 'Với phản ứng bậc 1, nếu tăng gấp đôi $[A]_0$ thì chu kỳ bán hủy…',
      predictOptions: 'Tăng gấp đôi|Giảm một nửa|Không đổi', predictAnswer: 3,
      predictExplain: '$t_{1/2} = \\ln 2 / k$ không chứa $[A]_0$. Kéo thanh $[A]_0$ để kiểm chứng.',
      caption: 'Đường mờ là hai bậc còn lại với cùng $k$ và $[A]_0$. Đổi bậc để thấy chỉ một trong ba cách biểu diễn ở khung phải cho đường thẳng.',
    },
  },
});
