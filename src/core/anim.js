// Tiệm Cận — animation có kiểm soát.
// Nguyên tắc: chuyển động chỉ dùng để diễn đạt một quá trình toán học
// (n tăng dần, ε co lại, h → 0). Không có hiệu ứng trang trí.
// Người dùng bật "giảm chuyển động" → mọi tween nhảy thẳng tới trạng thái cuối.

import { signal } from './signal.js';

const mq = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
export const reducedMotion = signal(mq ? mq.matches : false);
mq?.addEventListener?.('change', (e) => reducedMotion.set(e.matches));

/**
 * Số quá trình chuyển động đang chạy (tween, kéo điểm). Khi > 0, các thành phần
 * đắt tiền tự hạ chất lượng tạm thời (lấy mẫu thưa hơn, cập nhật chữ chậm hơn),
 * rồi vẽ lại sắc nét ngay khi chuyển động dừng — kỹ thuật "tinh chỉnh dần".
 */
export const busy = signal(0);
export const beginBusy = () => busy.set(busy.peek() + 1);
export const endBusy = () => busy.set(Math.max(0, busy.peek() - 1));

export const ease = {
  linear: (t) => t,
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  // dùng cho quá trình tiến dần (h → 0): chậm lại ở cuối để mắt kịp thấy
  approach: (t) => 1 - Math.pow(1 - t, 4),
};

export const CANCEL = Symbol('tc-cancel');

/** Gọi onFrame(k) với k ∈ [0,1] trong `duration` ms. */
export function frames(duration, onFrame, { easing = ease.inOut, token } = {}) {
  return new Promise((resolve, reject) => {
    if (reducedMotion.peek() || duration <= 0) { onFrame(1); resolve(); return; }
    beginBusy();
    let t0 = null;
    const step = (now) => {
      if (token?.cancelled) { endBusy(); reject(CANCEL); return; }
      // đo từ khung hình đầu tiên (không phải lúc gọi) để không nhảy cóc khi trang đang bận
      if (t0 === null) t0 = now;
      const t = Math.min(1, (now - t0) / duration);
      onFrame(easing(t));
      if (t < 1) requestAnimationFrame(step); else { endBusy(); resolve(); }
    };
    requestAnimationFrame(step);
  });
}

/**
 * Tween một signal số tới giá trị đích.
 * scale: 'log' nội suy theo thang logarit — hợp với ε, h, δ (giá trị co về 0).
 */
export function tween(sig, to, { duration = 600, easing = ease.inOut, scale = 'linear', token } = {}) {
  const from = sig.peek();
  if (scale === 'log' && from > 0 && to > 0) {
    const a = Math.log(from), b = Math.log(to);
    return frames(duration, (k) => sig.set(Math.exp(a + (b - a) * k)), { easing, token });
  }
  return frames(duration, (k) => sig.set(from + (to - from) * k), { easing, token });
}

export function wait(ms, token) {
  return new Promise((resolve, reject) => {
    if (reducedMotion.peek()) { resolve(); return; }
    setTimeout(() => (token?.cancelled ? reject(CANCEL) : resolve()), ms);
  });
}

/**
 * Runner: điều khiển một kịch bản animation async có thể dừng / chạy lại.
 *   const r = runner(async ({ tween, wait }) => { … });
 *   r.play(); r.stop(); r.running.get()
 */
export function runner(script, { onReset } = {}) {
  let token = null;
  const running = signal(false);
  return {
    running,
    async play() {
      if (token) token.cancelled = true;
      const tk = (token = { cancelled: false });
      running.set(true);
      onReset?.();
      const ctx = {
        tween: (s, v, o) => tween(s, v, { ...o, token: tk }),
        frames: (d, f, o) => frames(d, f, { ...o, token: tk }),
        wait: (ms) => wait(ms, tk),
        get cancelled() { return tk.cancelled; },
      };
      let done = false;
      try { await script(ctx); done = !tk.cancelled; }
      catch (e) { if (e !== CANCEL) throw e; }
      finally { if (token === tk) { token = null; running.set(false); } }
      return done;   // true nếu kịch bản chạy hết, false nếu bị dừng giữa chừng
    },
    stop() {
      if (token) { token.cancelled = true; token = null; }
      running.set(false);
    },
  };
}
