// Tiệm Cận — mô phỏng theo thời gian (vật lý, hóa học, phương trình vi phân).
// Giải trước toàn bộ quỹ đạo bằng Runge–Kutta bậc 4 với bước nhỏ, rồi tra cứu
// theo thời gian t. Cách này cho phép tua, lùi và vẽ đồ thị đầy đủ ngay lập tức,
// và kết quả không phụ thuộc tốc độ khung hình của máy.

/** Một bước RK4 cho hệ y' = f(t, y), y là mảng. */
export function rk4Step(f, t, y, dt) {
  const add = (a, b, k) => a.map((v, i) => v + b[i] * k);
  const k1 = f(t, y);
  const k2 = f(t + dt / 2, add(y, k1, dt / 2));
  const k3 = f(t + dt / 2, add(y, k2, dt / 2));
  const k4 = f(t + dt, add(y, k3, dt));
  return y.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}

/**
 * Giải y' = f(t, y) trên [t0, t1] với n bước.
 * Trả về { t: [...], y: [[...], ...], at(t) → y nội suy tuyến tính, comp(i) → (t) => y_i(t) }.
 */
export function solveODE(f, y0, [t0, t1], n = 2000) {
  const dt = (t1 - t0) / n;
  const T = [t0], Y = [y0.slice()];
  let y = y0.slice();
  for (let i = 1; i <= n; i++) {
    y = rk4Step(f, t0 + (i - 1) * dt, y, dt);
    T.push(t0 + i * dt); Y.push(y);
  }
  const at = (t) => {
    if (t <= t0) return Y[0];
    if (t >= t1) return Y[n];
    const s = (t - t0) / dt, i = Math.floor(s), k = s - i;
    return Y[i].map((v, j) => v + (Y[i + 1][j] - v) * k);
  };
  return { t: T, y: Y, at, comp: (j) => (t) => at(t)[j] };
}
