// Tiệm Cận — khung hình (figure) và các điều khiển.
// Điều khiển luôn gắn với một signal: kéo thanh trượt → signal đổi → đồ thị vẽ lại.

import { effect, val, toSignal, untrack } from '../core/signal.js';
import { busy } from '../core/anim.js';
import { fmt } from '../core/math.js';
import { renderTex, renderRich } from '../render/tex.js';
import { Board } from '../render/board.js';
import { Stage } from '../render/stage.js';

const h = (tag, cls, parent, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  parent?.appendChild(n);
  return n;
};

let uid = 0;

/**
 * Cập nhật chữ có nhịp: khi hình đang chuyển động, số liệu và câu kết luận chỉ được
 * viết lại tối đa ~12 lần/giây (mắt không đọc nhanh hơn thế, và mỗi lần viết lại chữ
 * buộc trình duyệt tính lại bố cục). Giá trị cuối cùng luôn được viết.
 */
function paced(track, compute, write, gap = 80) {
  let last = 0, timer = 0, pending;
  track(() => {
    pending = compute();
    const moving = busy.get() > 0;
    const now = performance.now();
    clearTimeout(timer);
    if (!moving || now - last >= gap) { last = now; untrack(() => write(pending)); }
    else timer = setTimeout(() => { last = performance.now(); write(pending); }, gap - (now - last));
  });
}

/**
 * Khung một hình minh họa. Trả về các vùng để cảnh gắn nội dung và
 * một hàm destroy gom toàn bộ effect/board/stage đã tạo.
 *
 * Tham số sư phạm (tùy chọn, mọi cảnh đều nhận):
 *   predict="Khi ε nhỏ đi, n₀ sẽ thế nào?"  predictOptions="Tăng|Giảm|Không đổi"
 *   predictAnswer="1" (thứ tự từ 1)        predictExplain="…"
 * Người học chọn trước, chạy hình, rồi mới thấy đáp án.
 */
export function figure(host, p = {}) {
  const { title: t1, heading, number, caption } = p;
  // thuộc tính HTML `title` gây tooltip của trình duyệt, nên trong HTML dùng `heading`
  const title = heading || t1;
  const stops = [];
  const surfaces = [];
  const fig = h('figure', 'tc-figure', host);
  if (title || number) {
    const head = h('div', 'tc-head', fig);
    if (number) h('span', 'tc-fignum', head, `Hình ${number}`);
    if (title) renderRich(h('span', 'tc-title', head), title);
  }
  const predictBox = p.predict ? h('div', 'tc-predict', fig) : null;
  const stage = h('div', 'tc-stage', fig);
  const panel = h('div', 'tc-panel', fig);
  const controls = h('div', 'tc-controls', panel);
  const readouts = h('dl', 'tc-readouts', panel);
  const status = h('p', 'tc-status', fig);
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;
  const cap = h('figcaption', 'tc-caption', fig);
  if (caption) renderRich(cap, caption); else cap.hidden = true;

  const track = (fn) => { const s = effect(fn); stops.push(s); return s; };
  // "Đặt lại" (PhET: khám phá ít rủi ro): ghi giá trị đầu của mọi signal gắn với điều khiển
  const initial = new Map(), runs = [];
  const keep = (sig) => { if (sig && sig.__signal && sig.set && !initial.has(sig)) initial.set(sig, sig.peek()); return sig; };
  queueMicrotask(() => {
    if (!initial.size) return;
    const b = button({ label: 'Đặt lại', onClick: () => api.reset() }, track);
    b.classList.add('tc-reset');
    controls.appendChild(b);
  });
  const predict = predictBox ? buildPredict(predictBox, p) : null;
  let hasPlay = false;
  queueMicrotask(() => predict?.setMode(hasPlay));

  const cell = (opts) => {
    const wrap = h('div', 'tc-stage-cell', stage);
    if (opts.columns) stage.classList.add('is-cols');   // đặt các khung cạnh nhau trên màn hình rộng
    if (opts.heading) renderRich(h('div', 'tc-cell-heading', wrap), opts.heading);
    return wrap;
  };

  const api = {
    el: fig, stage, controls, readouts, track,

    /** Hệ trục tọa độ (đồ thị hàm, vectơ, quỹ đạo). */
    board(opts = {}) { const b = new Board(cell(opts), opts); surfaces.push(b); return b; },
    /** Sân khấu không hệ trục (mảng, cây, sơ đồ). */
    stage(opts = {}) { const s = new Stage(cell(opts), opts); surfaces.push(s); return s; },

    slider(o) { keep(o.value); const n = slider(o, track); controls.appendChild(n); return n; },
    segmented(o) { keep(o.value); const n = segmented(o, track); controls.appendChild(n); return n; },
    /** Ghi nhận thêm signal cần khôi phục khi bấm "Đặt lại". */
    keep,
    /** Dừng mọi animation của hình (dùng khi hình cuộn ra khỏi màn hình). */
    stop() { runs.forEach((r) => r.stop()); },
    /** Khôi phục trạng thái ban đầu: dừng animation, trả tham số và khung nhìn về như cũ. */
    reset() {
      runs.forEach((r) => r.stop());
      for (const [sig, v] of initial) sig.set(v);
      surfaces.forEach((b) => b.resetView?.({ animate: false }));
    },
    button(o) { const n = button(o, track); controls.appendChild(n); return n; },

    /** Nút Chạy/Dừng gắn với một runner. Khi kịch bản chạy hết, câu dự đoán (nếu có) được chấm. */
    play(run, o) {
      hasPlay = true; runs.push(run);
      const wrapped = { running: run.running, stop: () => run.stop(), play: async () => { const done = await run.play(); if (done) predict?.reveal(); return done; } };
      const n = playButton(wrapped, o, track);
      controls.prepend(n);
      api._play = wrapped.play;
      return n;
    },

    /** Điều khiển từng bước cho một stepper: lùi, chạy, tiến, thanh tua. */
    steps(st, { label = 'Bước' } = {}) {
      hasPlay = true; runs.push(st.run); keep(st.index);
      const wrap = h('div', 'tc-control tc-steps');
      const back = button({ label: '◀ Lùi', onClick: () => st.prev() }, track);
      const fwd = button({ label: 'Tiến ▶', onClick: () => { st.next(); if (st.index.peek() >= st.total() - 1) predict?.reveal(); } }, track);
      const wrapped = { running: st.run.running, stop: () => st.run.stop(), play: async () => { const d = await st.run.play(); if (d) predict?.reveal(); return d; } };
      const playB = playButton(wrapped, {}, track);
      wrap.append(playB, back, fwd);
      controls.appendChild(wrap);
      const idx = { get: () => st.index.get() + 1, peek: () => st.index.peek() + 1, set: (v) => st.seek(Math.round(v) - 1), __signal: true };
      const sl = slider({ label, min: 1, max: Math.max(1, st.total()), step: 1, value: idx, format: (v) => `${v} / ${st.total()}` }, track);
      track(() => { sl.querySelector('input').max = Math.max(1, st.total()); });
      controls.appendChild(sl);
      track(() => {
        const i = st.index.get(), n = st.total();
        back.disabled = i <= 0; fwd.disabled = i >= n - 1;
      });
      api._play = wrapped.play;
      return wrap;
    },

    /** Khối mã giả, dòng đang chạy được tô sáng. active() → chỉ số dòng (từ 0) hoặc -1. */
    code(lines, active, { title } = {}) {
      const box = h('div', 'tc-code', stage.parentNode.insertBefore(h('div', 'tc-code-wrap'), panel));
      if (title) renderRich(h('div', 'tc-code-title', box), title);
      const pre = h('pre', '', box);
      const rows = lines.map((ln) => h('span', 'tc-code-line', pre, ln + '\n'));
      track(() => { const a = val(active); rows.forEach((r, i) => r.classList.toggle('is-active', i === a)); });
      return box;
    },

    /** Một dòng số liệu sống: nhãn (TeX) — giá trị. */
    readout(label, value, o = {}) {
      const row = h('div', 'tc-readout', readouts);
      renderTex(h('dt', '', row), label);
      const dd = h('dd', '', row);
      paced(track, () => [val(value), val(o.tone)], ([v, tone]) => {
        if (o.tex) renderTex(dd, v);
        else { const s = typeof v === 'number' ? fmt(v, o.digits ?? 5) : v; if (dd.textContent !== s) dd.textContent = s; }
        dd.dataset.tone = tone || '';
      });
      return row;
    },

    /** Dòng trạng thái (kết luận): fn → { text, tone: 'ok' | 'bad' | 'note' } */
    status(fn) {
      status.hidden = false;
      paced(track, () => fn() || {}, (r) => {
        renderRich(status, r.text || '');
        status.dataset.tone = r.tone || 'note';
      }, 250);
      return status;
    },

    caption(text) { cap.hidden = false; renderRich(cap, text); },

    destroy() { stops.forEach((s) => s()); surfaces.forEach((b) => b.destroy()); fig.remove(); },
  };
  fig.__tc = api;
  return api;
}

/** Hộp "Dự đoán trước khi xem": chọn một phương án, đáp án hiện sau khi hình chạy xong. */
function buildPredict(box, p) {
  const opts = String(p.predictOptions || '').split('|').map((s) => s.trim()).filter(Boolean);
  const answer = (p.predictAnswer || 0) - 1;
  const q = h('p', 'tc-predict-q', box);
  h('span', 'tc-predict-tag', q, 'Dự đoán trước');
  renderRich(h('span', '', q), p.predict);
  const group = h('div', 'tc-seg tc-predict-options', box);
  group.setAttribute('role', 'radiogroup');
  const fb = h('p', 'tc-predict-feedback', box);
  fb.setAttribute('aria-live', 'polite');
  let chosen = -1, revealed = false, withPlay = false;
  const btns = opts.map((o, i) => {
    const b = h('button', '', group);
    b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
    renderRich(b, o);
    b.addEventListener('click', () => {
      if (revealed) return;
      chosen = i;
      btns.forEach((x, j) => x.setAttribute('aria-checked', String(j === i)));
      if (!withPlay) api.reveal();
      else renderRich(fb, 'Đã ghi nhận. Bấm **Chạy** để kiểm tra dự đoán.'.replace(/\*\*/g, ''));
    });
    return b;
  });
  renderRich(fb, opts.length ? 'Chọn một phương án trước khi chạy hình.' : '');
  const api = {
    setMode(play) { withPlay = play; },
    reveal() {
      if (revealed || answer < 0) return;
      if (chosen < 0) { renderRich(fb, `Đáp án: ${opts[answer]}. ${p.predictExplain || ''}`); box.dataset.result = 'skip'; revealed = true; return; }
      revealed = true;
      const ok = chosen === answer;
      box.dataset.result = ok ? 'ok' : 'bad';
      btns[answer].classList.add('is-answer');
      renderRich(fb, `${ok ? 'Đúng.' : `Chưa đúng — đáp án là: ${opts[answer]}.`} ${p.predictExplain || ''}`);
    },
  };
  return api;
}

/** Thanh trượt. scale 'log' cho các đại lượng co về 0 (ε, h, δ). */
export function slider({ label, min = 0, max = 1, step = 0.01, value, scale = 'linear', format, digits = 4, disabled }, track = effect) {
  const sig = toSignal(value);
  const id = `tc-s${++uid}`;
  const wrap = h('div', 'tc-control tc-slider');
  const lab = h('label', 'tc-control-label', wrap);
  lab.htmlFor = id;
  renderTex(lab, label);
  const input = h('input', '', wrap);
  input.type = 'range';
  input.id = id;
  const out = h('output', 'tc-control-value', wrap);
  out.htmlFor = id;

  const isLog = scale === 'log';
  const N = 1000;
  if (isLog) { input.min = 0; input.max = N; input.step = 1; }
  else { input.min = min; input.max = max; input.step = step; }
  const toInput = (v) => (isLog ? Math.round((Math.log(v / min) / Math.log(max / min)) * N) : v);
  const fromInput = (s) => {
    const v = +s;
    if (!isLog) return v;
    const raw = min * Math.pow(max / min, v / N);
    const p = Math.pow(10, Math.floor(Math.log10(raw)) - 1);   // làm tròn 2 chữ số có nghĩa
    return Math.round(raw / p) * p;
  };

  input.addEventListener('input', () => sig.set(fromInput(input.value)));
  track(() => {
    const v = sig.get();
    if (document.activeElement !== input) input.value = toInput(v);
    out.textContent = format ? format(v) : fmt(v, digits);
    const pct = ((toInput(v) - +input.min) / (+input.max - +input.min)) * 100;
    input.style.setProperty('--tc-fill', `${pct}%`);
    input.disabled = !!val(disabled);
  });
  return wrap;
}

/** Nhóm nút chọn một (ví dụ: tổng trái / giữa / phải). */
export function segmented({ label, options, value }, track = effect) {
  const sig = toSignal(value);
  const wrap = h('div', 'tc-control tc-segmented');
  wrap.setAttribute('role', 'radiogroup');
  if (label) { const l = h('span', 'tc-control-label', wrap); renderTex(l, label); }
  const group = h('div', 'tc-seg', wrap);
  const btns = options.map((opt) => {
    const b = h('button', '', group);
    b.type = 'button';
    b.setAttribute('role', 'radio');
    renderTex(b, opt.label);
    b.addEventListener('click', () => sig.set(opt.value));
    return [opt.value, b];
  });
  track(() => {
    const cur = sig.get();
    for (const [v, b] of btns) b.setAttribute('aria-checked', String(v === cur));
  });
  return wrap;
}

export function button({ label, onClick, kind = 'quiet', pressed }, track = effect) {
  const b = h('button', `tc-btn tc-btn-${kind}`);
  b.type = 'button';
  renderTex(h('span', '', b), label);
  b.addEventListener('click', onClick);
  if (pressed) track(() => b.setAttribute('aria-pressed', String(!!val(pressed))));
  return b;
}

const ICON_PLAY = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.8v8.4L10 6z"/></svg>';
const ICON_STOP = '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="2.5" width="7" height="7" rx="1"/></svg>';

export function playButton(run, { label = 'Chạy', stopLabel = 'Dừng' } = {}, track = effect) {
  const b = h('button', 'tc-btn tc-btn-primary tc-play');
  b.type = 'button';
  b.addEventListener('click', () => (run.running.peek() ? run.stop() : run.play()));
  track(() => {
    const on = run.running.get();
    b.innerHTML = (on ? ICON_STOP : ICON_PLAY) + `<span>${on ? stopLabel : label}</span>`;
    b.setAttribute('aria-pressed', String(on));
  });
  return b;
}
