// Tiệm Cận — lõi phản ứng (reactive core)
// signal: giá trị có thể theo dõi; effect: hàm tự chạy lại khi signal nó đọc thay đổi.
// Các effect được gom lại và chạy một lần mỗi microtask, nên nhiều thay đổi
// trong cùng một khung hình chỉ gây ra một lần vẽ lại.

let current = null;
const queue = new Set();
let scheduled = false;

function schedule(e) {
  queue.add(e);
  if (!scheduled) {
    scheduled = true;
    queueMicrotask(flush);
  }
}

function flush() {
  scheduled = false;
  const list = [...queue];
  queue.clear();
  for (const e of list) e.run();
}

export function signal(initial) {
  let value = initial;
  const subs = new Set();
  const s = {
    get() {
      if (current) {
        subs.add(current);
        current.deps.add(subs);
      }
      return value;
    },
    peek: () => value,
    set(v) {
      if (Object.is(v, value)) return;
      value = v;
      for (const e of [...subs]) schedule(e);
    },
    update(fn) { s.set(fn(value)); },
    __signal: true,
  };
  return s;
}

export function effect(fn) {
  const e = {
    deps: new Set(),
    alive: true,
    run() {
      if (!e.alive) return;
      for (const d of e.deps) d.delete(e);
      e.deps.clear();
      const prev = current;
      current = e;
      try { fn(); } finally { current = prev; }
    },
  };
  e.run();
  return () => {
    e.alive = false;
    for (const d of e.deps) d.delete(e);
    e.deps.clear();
  };
}

export function computed(fn) {
  const s = signal(undefined);
  const stop = effect(() => s.set(fn()));
  return { get: s.get, peek: s.peek, stop, __signal: true };
}

/** Chạy fn mà không ghi nhận phụ thuộc. */
export function untrack(fn) {
  const prev = current;
  current = null;
  try { return fn(); } finally { current = prev; }
}

export const isSignal = (v) => v != null && v.__signal === true;

/** Đọc một prop: signal → .get(), hàm thunk → gọi, còn lại giữ nguyên. */
export function val(v) {
  if (isSignal(v)) return v.get();
  if (typeof v === 'function') return v();
  return v;
}

/** Đảm bảo một giá trị là signal. */
export const toSignal = (v) => (isSignal(v) ? v : signal(v));
