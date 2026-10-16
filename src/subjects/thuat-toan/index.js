// Gói Cấu trúc dữ liệu và giải thuật — cảnh mẫu: thuật toán sắp xếp chạy từng bước.
//
// Thuật toán được chạy thật một lần để ghi "vết" (trace): mỗi bước là một ảnh chụp
// gồm mảng, cặp phần tử đang so sánh, dòng mã giả đang chạy và một câu giải thích.
// Người học tiến/lùi/tua trên vết đó; mỗi cột giữ nguyên danh tính (khóa) nên khi
// hai phần tử đổi chỗ, ta thấy chúng trượt qua nhau.

import { definePack, scope, figure, stepper, signal, computed, svg } from '../../api.js';

const PACK = 'thuat-toan';
const scene = scope(PACK);

const ALGOS = {
  bubble: {
    name: 'Nổi bọt',
    code: [
      'for i ← 0 … n−2',
      '  for j ← 0 … n−2−i',
      '    if a[j] > a[j+1]',
      '      swap(a[j], a[j+1])',
      '  // a[n−1−i] đã đúng chỗ',
    ],
    *run(a) {
      const n = a.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
          yield { cmp: [j, j + 1], line: 2, note: `So sánh a[${j}] = ${a[j].v} với a[${j + 1}] = ${a[j + 1].v}.` };
          if (a[j].v > a[j + 1].v) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            yield { cmp: [j, j + 1], swap: true, line: 3, note: `${a[j + 1].v} > ${a[j].v} nên đổi chỗ: phần tử lớn "nổi" dần sang phải.` };
          }
        }
        yield { done: n - 1 - i, line: 4, note: `Sau lượt ${i + 1}, phần tử lớn thứ ${i + 1} đã nằm đúng vị trí cuối.` };
      }
    },
  },
  insertion: {
    name: 'Chèn',
    code: [
      'for i ← 1 … n−1',
      '  key ← a[i];  j ← i−1',
      '  while j ≥ 0 and a[j] > key',
      '    a[j+1] ← a[j];  j ← j−1',
      '  a[j+1] ← key',
    ],
    *run(a) {
      for (let i = 1; i < a.length; i++) {
        let j = i - 1;
        yield { cmp: [i], line: 1, note: `Lấy key = ${a[i].v}; đoạn a[0…${i - 1}] đã được sắp.` };
        while (j >= 0) {
          yield { cmp: [j, j + 1], line: 2, note: `So sánh a[${j}] = ${a[j].v} với key = ${a[j + 1].v}.` };
          if (a[j].v <= a[j + 1].v) break;
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          yield { cmp: [j, j + 1], swap: true, line: 3, note: `${a[j + 1].v} lớn hơn key nên dịch sang phải.` };
          j--;
        }
        yield { line: 4, sortedPrefix: i, note: `Đặt key vào vị trí ${j + 1}. Đoạn a[0…${i}] đã được sắp.` };
      }
    },
  },
  selection: {
    name: 'Chọn',
    code: [
      'for i ← 0 … n−2',
      '  min ← i',
      '  for j ← i+1 … n−1',
      '    if a[j] < a[min]:  min ← j',
      '  swap(a[i], a[min])',
    ],
    *run(a) {
      const n = a.length;
      for (let i = 0; i < n - 1; i++) {
        let mi = i;
        yield { cmp: [i], mark: i, line: 1, note: `Tìm phần tử nhỏ nhất trong a[${i}…${n - 1}]; tạm coi min = a[${i}] = ${a[i].v}.` };
        for (let j = i + 1; j < n; j++) {
          yield { cmp: [mi, j], mark: mi, line: 3, note: `So sánh a[${j}] = ${a[j].v} với min hiện tại ${a[mi].v}.` };
          if (a[j].v < a[mi].v) mi = j;
        }
        if (mi !== i) { [a[i], a[mi]] = [a[mi], a[i]]; yield { cmp: [i, mi], swap: true, line: 4, note: `Đưa ${a[i].v} về vị trí ${i}.` }; }
        yield { done: i, line: 4, note: `a[0…${i}] đã đúng chỗ và không bao giờ bị động tới nữa.` };
      }
    },
  },
};

/** Chạy thuật toán trên bản sao, ghi lại vết các trạng thái. */
function trace(algo, values) {
  const a = values.map((v, id) => ({ v, id }));
  const out = [{ arr: a.slice(), cmp: [], line: -1, note: 'Mảng ban đầu.', comps: 0, swaps: 0, fixed: new Set() }];
  let comps = 0, swaps = 0;
  const fixed = new Set();
  for (const s of ALGOS[algo].run(a)) {
    if (s.cmp?.length === 2 && !s.swap) comps++;
    if (s.swap) swaps++;
    if (s.done !== undefined) fixed.add(s.done);
    out.push({ ...s, arr: a.slice(), comps, swaps, fixed: new Set(fixed) });
  }
  out.push({ arr: a.slice(), cmp: [], line: -1, note: `Xong: ${comps} phép so sánh, ${swaps} lần đổi chỗ.`, comps, swaps, fixed: new Set(a.map((_, i) => i)) });
  return out;
}

scene('sorting', {
  params: { data: 'list', algo: 'string', interval: 'int' },
  defaults: { data: '7, 3, 9, 1, 6, 2, 8, 4', algo: 'bubble', interval: 650 },
  mount(host, p) {
    const F = figure(host, p);
    const algo = signal(ALGOS[p.algo] ? p.algo : 'bubble');
    const st = stepper(trace(algo.peek(), p.data), { interval: p.interval });
    F.track(() => st.setTrace(trace(algo.get(), p.data)));
    const max = Math.max(...p.data);
    const n = p.data.length;

    const stage = F.stage({ aspect: 2.6, mobileAspect: 1.5, maxHeight: 300, title: 'Các phần tử của mảng' });
    stage.items(() => {
      const s = st.state.get();
      return s.arr.map((it, idx) => ({ key: it.id, v: it.v, idx, s }));
    }, {
      create(g, it) {
        svg('rect', { class: 'tc-bar', rx: 3 }, g);
        svg('text', { class: 'tc-bar-value', 'text-anchor': 'middle' }, g).textContent = it.v;
        svg('text', { class: 'tc-bar-index', 'text-anchor': 'middle' }, g);
      },
      update(g, it, { w, h }) {
        const gap = 10, padTop = 26, padBot = 24;
        const bw = Math.max(14, (w - gap * (n + 1)) / n);
        const bh = ((h - padTop - padBot) * it.v) / max;
        g.style.transform = `translate(${gap + it.idx * (bw + gap)}px, ${h - padBot - bh}px)`;
        const [rect, val, ix] = g.children;
        rect.setAttribute('width', bw); rect.setAttribute('height', bh);
        val.setAttribute('x', bw / 2); val.setAttribute('y', -7);
        ix.setAttribute('x', bw / 2); ix.setAttribute('y', bh + 17); ix.textContent = it.idx;
        const s = it.s;
        const role = s.fixed.has(it.idx) || (s.sortedPrefix !== undefined && it.idx <= s.sortedPrefix) ? 'done'
          : s.cmp.includes(it.idx) ? (s.swap ? 'swap' : 'cmp') : s.mark === it.idx ? 'mark' : 'idle';
        g.dataset.role = role;
      },
    });

    F.code(ALGOS[algo.peek()].code, () => st.state.get().line, { title: 'Mã giả' });
    // đổi thuật toán → thay mã giả
    F.track(() => {
      const lines = ALGOS[algo.get()].code;
      const pre = F.el.querySelector('.tc-code pre');
      if (!pre) return;
      [...pre.children].forEach((r, i) => { r.textContent = (lines[i] ?? '') + '\n'; });
    });

    F.steps(st);
    F.segmented({ label: 'Thuật toán', options: Object.entries(ALGOS).map(([v, a]) => ({ value: v, label: a.name })), value: algo });
    F.readout('Số phép so sánh', () => String(st.state.get().comps), { tone: 'main' });
    F.readout('Số lần đổi chỗ', () => String(st.state.get().swaps), { tone: 'upper' });
    F.status(() => ({ text: st.state.get().note, tone: st.state.get().swap ? 'bad' : 'note' }));
    return { destroy: () => { st.run.stop(); F.destroy(); }, play: () => F._play?.(), signals: { algo } };
  },
});

definePack(PACK, {
  name: 'Cấu trúc dữ liệu và giải thuật',
  presets: {
    'sap-xep': {
      kind: 'sorting', number: 'A.1', data: '7, 3, 9, 1, 6, 2, 8, 4', algo: 'bubble',
      heading: 'Ba thuật toán sắp xếp $O(n^2)$',
      caption: 'Cột tím: cặp đang so sánh. Cột đỏ: vừa đổi chỗ. Cột xanh lục: đã nằm đúng vị trí cuối cùng. Dòng mã giả đang chạy được tô sáng.',
    },
    'da-sap-xep': {
      kind: 'sorting', number: 'A.2', data: '1, 2, 3, 4, 5, 6, 7, 8', algo: 'insertion',
      heading: 'Đầu vào đã được sắp sẵn',
      predict: 'Với mảng đã sắp xếp 8 phần tử, sắp xếp chèn cần bao nhiêu phép so sánh?',
      predictOptions: '7|28|0', predictAnswer: 1,
      predictExplain: 'Mỗi key chỉ so sánh một lần rồi dừng: $n - 1 = 7$ phép, tức $O(n)$ — trường hợp tốt nhất. Đổi sang "Nổi bọt" để thấy bản cài đặt này vẫn tốn 28 phép.',
    },
  },
});
