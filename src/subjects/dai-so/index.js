// Gói Đại số tuyến tính — cảnh mẫu: ánh xạ tuyến tính của mặt phẳng.
// Lưới tọa độ biến dạng liên tục từ ma trận đơn vị I tới ma trận A, nên người học thấy
// cột của A chính là ảnh của e₁, e₂; định thức là hệ số co giãn diện tích (có dấu);
// vectơ riêng là những phương không bị xoay.

import { definePack, scope, figure, signal, computed, runner, fmt } from '../../api.js';

const PACK = 'dai-so';
const scene = scope(PACK);

const mul = ([a, b, c, d], [x, y]) => [a * x + b * y, c * x + d * y];
const det = ([a, b, c, d]) => a * d - b * c;
function eigen([a, b, c, d]) {
  const tr = a + d, D = det([a, b, c, d]), disc = tr * tr - 4 * D;
  if (disc < -1e-12) return { real: false, tr, disc };
  const s = Math.sqrt(Math.max(0, disc)), l1 = (tr + s) / 2, l2 = (tr - s) / 2;
  const vec = (l) => (Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : l === a ? [1, 0] : [0, 1]);
  return { real: true, values: [l1, l2], vectors: [vec(l1), vec(l2)] };
}
const texNum = (v) => fmt(Math.abs(v) < 1e-12 ? 0 : v, 3);

scene('linear-map', {
  params: { m: 'list', range: 'number', showEigen: 'bool', vector: 'list' },
  defaults: { m: '1, 1, 0, 1', range: 4, showEigen: true, vector: '1, 1' },
  mount(host, p) {
    const F = figure(host, p);
    const R = p.range;
    const brd = F.board({ x: [-R * 1.6, R * 1.6], y: [-R, R], equal: true, xTicks: 'int', yTicks: 'int', title: 'Ánh xạ tuyến tính của mặt phẳng' });
    const A = ['a', 'b', 'c', 'd'].map((_, i) => signal(p.m[i]));
    const t = signal(1);
    const M = computed(() => { const k = t.get(), m = A.map((s) => s.get()); return [1 + (m[0] - 1) * k, m[1] * k, m[2] * k, 1 + (m[3] - 1) * k]; });
    const full = computed(() => A.map((s) => s.get()));

    // lưới ảnh: ảnh của các đường x = i và y = i
    const N = Math.ceil(R * 2.2);
    for (let i = -N; i <= N; i++) {
      const tone = i === 0 ? 'ink' : 'muted';
      const op = i === 0 ? 0.55 : 0.35;
      brd.segment(() => mul(M.get(), [i, -N * 2]), () => mul(M.get(), [i, N * 2]), { color: tone, width: 1, opacity: op });
      brd.segment(() => mul(M.get(), [-N * 2, i]), () => mul(M.get(), [N * 2, i]), { color: tone, width: 1, opacity: op });
    }
    brd.polygon(() => [[0, 0], [1, 0], [1, 1], [0, 1]].map((q) => mul(M.get(), q)), { color: 'limit', opacity: 0.18, stroke: 'limit' });

    // phương riêng (chỉ vẽ ở trạng thái cuối, khi lưới đã là ảnh của A)
    const eig = computed(() => eigen(full.get()));
    for (const j of [0, 1]) {
      const vis = () => p.showEigen && t.get() > 0.999 && eig.get().real;
      brd.line([0, 0], () => { const v = eig.get().vectors?.[j]; return v ? (Math.abs(v[0]) < 1e-12 ? 1e6 : v[1] / v[0]) : NaN; }, { color: 'limit', dash: '6 5', width: 1.2, visible: vis });
    }

    const e1 = () => mul(M.get(), [1, 0]), e2 = () => mul(M.get(), [0, 1]);
    brd.arrow([0, 0], e1, { color: 'main', width: 2.5 });
    brd.arrow([0, 0], e2, { color: 'upper', width: 2.5 });
    brd.label(() => e1()[0], () => e1()[1], () => 'A\\mathbf{e}_1', { anchor: 'se', color: 'main' });
    brd.label(() => e2()[0], () => e2()[1], () => 'A\\mathbf{e}_2', { anchor: 'nw', color: 'upper' });
    // kéo đầu mút Ae₁, Ae₂: chính là sửa hai cột của ma trận (hút về bội của 0,1)
    const snap = (v) => Math.max(-3, Math.min(3, Math.round(v * 10) / 10));
    brd.handle(e1, ([x, y]) => { run.stop(); t.set(1); A[0].set(snap(x)); A[2].set(snap(y)); },
      { color: 'main', label: 'Đầu mút của Ae₁ (cột 1)', valueText: () => `cột 1 = (${fmt(A[0].get(), 2)}; ${fmt(A[2].get(), 2)})`, step: [0.1, 0.1] });
    brd.handle(e2, ([x, y]) => { run.stop(); t.set(1); A[1].set(snap(x)); A[3].set(snap(y)); },
      { color: 'upper', label: 'Đầu mút của Ae₂ (cột 2)', valueText: () => `cột 2 = (${fmt(A[1].get(), 2)}; ${fmt(A[3].get(), 2)})`, step: [0.1, 0.1] });
    if (p.vector?.length === 2) {
      const v = () => mul(M.get(), p.vector);
      brd.arrow([0, 0], v, { color: 'lower', width: 2 });
      brd.label(() => v()[0], () => v()[1], `A\\mathbf{v}`, { anchor: 'ne', color: 'lower' });
    }

    const run = runner(async ({ tween, wait }) => {
      t.set(0); await wait(400);
      await tween(t, 1, { duration: 2200 });
    });
    F.play(run, { label: 'Biến đổi từ I tới A' });
    F.slider({ label: 't', min: 0, max: 1, step: 0.01, value: t, digits: 2 });
    ['a', 'b', 'c', 'd'].forEach((n, i) => F.slider({ label: n, min: -3, max: 3, step: 0.1, value: A[i], digits: 2 }));

    F.readout('A', () => { const [a, b, c, d] = full.get(); return `\\begin{pmatrix} ${texNum(a)} & ${texNum(b)} \\\\ ${texNum(c)} & ${texNum(d)} \\end{pmatrix}`; }, { tex: true });
    F.readout('\\det A', () => fmt(det(full.get()), 4), { tone: 'limit' });
    F.readout('\\lambda_{1,2}', () => {
      const e = eig.get();
      if (!e.real) { const re = e.tr / 2, im = Math.sqrt(-e.disc) / 2; return `${fmt(re, 3)} ± ${fmt(im, 3)}i`; }
      return `${fmt(e.values[0], 4)};  ${fmt(e.values[1], 4)}`;
    });
    F.status(() => {
      const D = det(full.get()), e = eig.get();
      if (Math.abs(D) < 1e-9) return { text: 'Định thức bằng 0: mặt phẳng bị ép xuống một đường thẳng, $A$ không khả nghịch.', tone: 'bad' };
      const area = `Hình vuông đơn vị biến thành hình bình hành có diện tích $|\\det A| = ${fmt(Math.abs(D), 3)}$${D < 0 ? ', và hướng bị lật (det âm)' : ''}.`;
      const ev = e.real ? ' Hai đường nét đứt là các phương riêng: vectơ trên đó chỉ bị kéo dãn, không bị xoay.' : ' Trị riêng phức: không có phương nào được giữ nguyên, phép biến đổi có thành phần quay.';
      return { text: area + ev, tone: 'ok' };
    });
    return { destroy: () => { run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { a: A[0], b: A[1], c: A[2], d: A[3], t } };
  },
});

definePack(PACK, {
  name: 'Đại số tuyến tính',
  presets: {
    'truot': {
      kind: 'linear-map', number: 'Đ.1', m: '1, 1, 0, 1',
      heading: 'Phép trượt $A = \\begin{pmatrix}1 & 1\\\\ 0 & 1\\end{pmatrix}$',
      predict: 'Sau phép trượt, diện tích hình vuông đơn vị sẽ thế nào?',
      predictOptions: 'Tăng|Giảm|Giữ nguyên', predictAnswer: 3,
      predictExplain: '$\\det A = 1\\cdot1 - 1\\cdot0 = 1$: hình bị xiên nhưng diện tích không đổi.',
      caption: 'Cột thứ nhất của $A$ là ảnh của $\\mathbf e_1$, cột thứ hai là ảnh của $\\mathbf e_2$. Chỉ có một phương riêng (trục hoành) vì $\\lambda = 1$ là nghiệm kép.',
    },
    'xoay': {
      kind: 'linear-map', number: 'Đ.2', m: 'cos(pi/4), -sin(pi/4), sin(pi/4), cos(pi/4)',
      heading: 'Phép quay góc $45^\\circ$',
      caption: '$\\det A = 1$ và trị riêng là số phức $e^{\\pm i\\pi/4}$: không có đường thẳng nào qua gốc được giữ nguyên.',
    },
    'gia-tri-rieng': {
      kind: 'linear-map', number: 'Đ.3', m: '2, 1, 1, 2', vector: '1, -1',
      heading: '$A = \\begin{pmatrix}2 & 1\\\\ 1 & 2\\end{pmatrix}$ — trị riêng 3 và 1',
      predict: 'Vectơ $\\mathbf v = (1; -1)$ biến thành gì?',
      predictOptions: 'Bị xoay sang phương khác|Giữ nguyên phương, độ dài không đổi|Gấp 3 lần',
      predictAnswer: 2, predictExplain: '$A\\mathbf v = (1;-1) = 1\\cdot\\mathbf v$: $\\mathbf v$ là vectơ riêng ứng với $\\lambda = 1$.',
      caption: 'Ma trận đối xứng có hai phương riêng vuông góc: $(1;1)$ ứng với $\\lambda = 3$ và $(1;-1)$ ứng với $\\lambda = 1$.',
    },
    'suy-bien': {
      kind: 'linear-map', number: 'Đ.4', m: '1, 2, 0.5, 1',
      heading: 'Ma trận suy biến: $\\det A = 0$',
      caption: 'Hai cột tỉ lệ với nhau nên ảnh của cả mặt phẳng chỉ là một đường thẳng. Hệ $A\\mathbf x = \\mathbf b$ khi đó vô nghiệm hoặc vô số nghiệm.',
    },
  },
});
