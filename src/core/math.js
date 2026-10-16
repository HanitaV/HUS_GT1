// Tiệm Cận — tiện ích số học dùng chung.

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
export const range = (a, b, step = 1) => { const r = []; for (let i = a; i <= b; i += step) r.push(i); return r; };

/** Bước chia "đẹp" cho trục: 1, 2, 5 × 10^k. */
export function niceStep(span, target = 8) {
  const raw = span / target;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

export function ticks(min, max, target = 8) {
  const step = niceStep(max - min, target);
  const out = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) {
    out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  }
  return { step, values: out };
}

const nf = new Map();
/** Định dạng số kiểu Việt Nam: dấu phẩy thập phân, tối đa `digits` chữ số. */
export function fmt(x, digits = 4) {
  if (x === Infinity) return '+∞';
  if (x === -Infinity) return '−∞';
  if (!isNum(x)) return '—';
  if (x !== 0 && (Math.abs(x) < 1e-4 || Math.abs(x) >= 1e7)) {
    const [m, e] = x.toExponential(Math.max(1, digits - 2)).split('e');
    return `${m.replace('.', ',').replace('-', '−')}·10${sup(e)}`;
  }
  const key = digits;
  if (!nf.has(key)) nf.set(key, new Intl.NumberFormat('vi-VN', { maximumFractionDigits: digits, useGrouping: false }));
  return nf.get(key).format(x).replace('-', '−');
}
const SUP = { '-': '⁻', '+': '', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (s) => [...s].map((c) => SUP[c] ?? c).join('');

/** Tích phân Simpson trên [a,b] với n khoảng (n chẵn). Bỏ qua điểm NaN ở biên. */
export function integrate(f, a, b, n = 400) {
  if (a === b) return 0;
  if (n % 2) n++;
  const h = (b - a) / n;
  const F = (x) => { const y = f(x); return isNum(y) ? y : f(x + h * 1e-3 * (x === a ? 1 : -1)); };
  let s = F(a) + F(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * F(a + i * h);
  return (s * h) / 3;
}

/** Đạo hàm số (sai phân trung tâm). */
export const derivative = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);

/** Tìm khoảng giá trị y (bỏ ngoại lai) của f trên [a,b] để tự căn trục. */
export function extent(values, pad = 0.12) {
  const v = values.filter(isNum).sort((p, q) => p - q);
  if (!v.length) return [-1, 1];
  const lo = v[Math.floor(v.length * 0.01)], hi = v[Math.ceil(v.length * 0.99) - 1];
  const span = hi - lo || Math.abs(hi) || 1;
  return [lo - span * pad, hi + span * pad];
}

export function sampleExtent(f, a, b, n = 200, pad) {
  const ys = [];
  for (let i = 0; i <= n; i++) ys.push(f(a + ((b - a) * i) / n));
  return extent(ys, pad);
}
