// Tiệm Cận — trình phát từng bước (stepper).
// Dùng cho mọi quá trình rời rạc: các bước của thuật toán, các bước biến đổi ma trận,
// các bước của một phản ứng. Dữ liệu là một "vết" (trace): mảng trạng thái đã tính sẵn,
// nên người học tiến, lùi, tua tùy ý — điều mà một animation liền mạch không cho phép.
//
//   const st = stepper(trace, { interval: 700 });
//   st.state.get()   → trạng thái hiện tại;  st.next(); st.prev(); st.run.play()

import { signal, computed } from './signal.js';
import { runner, CANCEL } from './anim.js';

export function stepper(trace = [], { interval = 700 } = {}) {
  const frames = signal(trace);
  const index = signal(0);
  const total = () => frames.get().length;
  const state = computed(() => {
    const f = frames.get();
    return f[Math.max(0, Math.min(index.get(), f.length - 1))];
  });
  const speed = signal(interval);

  // Bước rời rạc không phải là chuyển động, nên vẫn chạy theo nhịp kể cả khi
  // người dùng bật giảm chuyển động (chỉ hiệu ứng chuyển tiếp CSS bị tắt).
  const pause = (ctx) => new Promise((res, rej) => setTimeout(() => (ctx.cancelled ? rej(CANCEL) : res()), speed.peek()));
  const run = runner(async (ctx) => {
    if (index.peek() >= frames.peek().length - 1) index.set(0);
    while (index.peek() < frames.peek().length - 1) {
      await pause(ctx);
      index.set(index.peek() + 1);
    }
  });

  return {
    frames, index, state, total, speed, run,
    next() { run.stop(); index.set(Math.min(frames.peek().length - 1, index.peek() + 1)); },
    prev() { run.stop(); index.set(Math.max(0, index.peek() - 1)); },
    seek(i) { run.stop(); index.set(Math.max(0, Math.min(frames.peek().length - 1, i))); },
    reset() { run.stop(); index.set(0); },
    setTrace(t) { run.stop(); frames.set(t); index.set(0); },
  };
}
