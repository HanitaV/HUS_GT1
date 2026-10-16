# Tiệm Cận

> Session hoặc model mới: đọc `AGENTS.md` trước, rồi `docs/CONTENT-GUIDE.md` nếu viết nội dung.

Framework dựng hình minh họa động cho các môn đại cương, bắt đầu từ Giải tích I (MAT1091). Chạy thẳng trên GitHub Pages.

Bản 0.2 tách lõi khỏi nội dung môn học: mỗi môn là một **gói** (pack) nạp theo nhu cầu. Hiện có `giai-tich` (đầy đủ theo đề cương), và các gói mẫu `dai-so`, `vat-ly`, `hoa`, `thuat-toan`. Xem `mon-hoc.html` và `PEDAGOGY.md`.

- ES module thuần, không bước build, không phụ thuộc React/Vue/D3.
- Một thẻ HTML cho mỗi hình: `<tc-scene preset="dang02-kep"></tc-scene>`.
- Hàm viết như trên giấy: `f="(sqrt(1 + 2x) - cbrt(1 - 3x)) / x"`.
- Công thức hiển thị bằng KaTeX (tùy chọn — không có KaTeX vẫn chạy, nhãn hiện dạng chữ).
- Tôn trọng chế độ giảm chuyển động của hệ điều hành; điều khiển được bằng bàn phím; sáng/tối.

Mở `index.html` qua một máy chủ tĩnh bất kỳ (`python3 -m http.server`) để xem toàn bộ hình mẫu.

## Cài vào một trang

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>

<link rel="stylesheet" href="/tiemcan/tiemcan.css">
<script type="module" src="/tiemcan/src/tiemcan.js"></script>
```

KaTeX phải được nạp **trước** module (`defer` và `type="module"` chạy theo thứ tự xuất hiện).

Khi nhúng vào Markdown (Jekyll/kramdown trên GitHub Pages), đặt mỗi thẻ `<tc-scene>` trên dòng riêng, cách đoạn văn bằng dòng trống, và kiểm tra HTML sinh ra không bị bọc trong `<p>` — đây là việc cần xác nhận ở giai đoạn dựng website. Thuộc tính chứa `$...$` luôn đặt trong dấu nháy kép.

## Viết một hình

```html
<!-- dùng hình dựng sẵn: "gói/tên" -->
<tc-scene preset="giai-tich/dang05-tham-so"></tc-scene>
<tc-scene preset="vat-ly/dao-dong-tat-dan"></tc-scene>

<!-- không ghi gói → dùng gói mặc định (giai-tich, hoặc <html data-tc-pack="…">) -->
<tc-scene preset="dang05-tham-so"></tc-scene>

<!-- ghi đè vài tham số của preset -->
<tc-scene preset="dang05-tham-so" answer="4" aRange="0, 6"></tc-scene>

<!-- tự khai báo đầy đủ -->
<tc-scene kind="squeeze" mode="function"
  lower="-abs(x)" f="x sin(1/x)" upper="abs(x)" x0="0" L="0" delta="0.6"
  heading="$x\sin\frac1x$ bị kẹp giữa $\pm|x|$"
  caption="Vì $|\sin\frac1x| \le 1$ nên $-|x| \le x\sin\frac1x \le |x|$."
  autoplay></tc-scene>
```

Thuộc tính chung cho mọi cảnh:

| Thuộc tính | Ý nghĩa |
|---|---|
| `kind` | tên cảnh (bảng dưới) |
| `preset` | tên hình dựng sẵn trong `src/presets.js` |
| `heading` | tiêu đề hình, hỗ trợ `$...$` (không dùng `title` vì trình duyệt sẽ hiện tooltip) |
| `number` | số hình, hiển thị "Hình 2.1" |
| `caption` | chú thích dưới hình, hỗ trợ `$...$` |
| `autoplay` | tự chạy animation một lần khi cuộn tới |
| `pack` | gói mặc định cho thẻ này khi `kind`/`preset` không ghi gói |
| `predict`, `predictOptions`, `predictAnswer`, `predictExplain` | câu hỏi dự đoán trước khi xem; `predictOptions` ngăn bởi `\|`, `predictAnswer` đếm từ 1 |

## Khối học tập

```html
<tc-steps heading="Lời giải ĐT01">
  <ol>
    <li>Trên $(-\infty;1)$ và $(1;+\infty)$, $f$ là hàm sơ cấp nên liên tục.</li>
    <li>$L^+ = f(1) = 2$, $L^- = a - 2$.</li>
    <li>Liên tục tại 1 $\iff a = 4$.</li>
  </ol>
</tc-steps>

<tc-check answer="3/(4e^2)" explain="Từng phần với $u = x$, $dv = e^{-2x}dx$.">
  Tính $\int_1^{+\infty} x e^{-2x}\,dx$.
</tc-check>

<tc-check options="Hội tụ|Phân kỳ|Chưa kết luận được" answer="1">…</tc-check>
```

`<tc-steps>` ẩn mọi bước cho tới khi người học bấm mở (`show="k"` để mở sẵn k bước). `<tc-check>` chấm đáp số bằng bộ đọc biểu thức (sai số tương đối `tol`, mặc định 1e-6), cho xem đáp án sau hai lần sai.

Hình chỉ được dựng khi cuộn tới gần (IntersectionObserver), và được dọn sạch khi phần tử bị gỡ khỏi trang.

### Cú pháp biểu thức

`+ - * / ^`, nhân ngầm (`2x`, `3sin(x)`, `(x+1)(x-1)`), giai thừa `n!`, trị tuyệt đối `|x|`, hằng `pi`, `e`.
Hàm: `sin cos tan cot asin acos atan arcsin arccos arctan arccot sinh cosh tanh exp ln log log10 log2 sqrt cbrt root(x,k) abs sign floor ceil round min max fact`.
`-x^2` là `-(x^2)`; `sin x^2` là `sin(x^2)`; `2^x^2` là `2^(x^2)`.
Tham số kiểu số cũng nhận biểu thức: `L="sqrt(2)"`, `exact="3 / (4 e^2)"`.

## Văn bản phản ứng và thao tác trực tiếp (0.3)

```html
Với $\varepsilon$ = <tc-var name="eps" value="0.2" min="0.005" max="1" step="0.005" scale="log"></tc-var>,
cần $n > \frac1\varepsilon$ = <tc-show expr="1/eps" digits="2"></tc-show>.
<tc-show when="eps < 0.03">Dải rất hẹp, nhưng $n_0$ vẫn hữu hạn.</tc-show>

<tc-scene preset="dang02-dinh-nghia" bind="eps:eps"></tc-scene>
```

- `<tc-var>`: số kéo ngang được trong câu (hoặc Tab + mũi tên). Thuộc tính `name value min max step digits unit scale="log" label`.
- `<tc-show expr="…">` hiện giá trị biểu thức theo các biến trang; `<tc-show when="a < b">` hiện/ẩn đoạn văn theo điều kiện.
- `bind="tham_số:biến, …"` trên `<tc-scene>` nối hai chiều tham số của hình với biến trang. Tham số liên kết được của mỗi cảnh là các signal nó trả về trong `signals` (ví dụ `limit-sequence`: `eps`; `derivative`: `h`; `linear-map`: `a b c d t`).
- `<tc-steps>`: `<li data-set="d=0.05; eps=0.01">` — mở bước nào thì biến trang chuyển (mượt) tới giá trị đó; hình nối bằng `bind` đi theo lời giải.
- `<tc-term tip="…">thuật ngữ</tc-term>`: giải thích tại chỗ khi rê chuột, chọn bằng bàn phím hoặc chạm.
- Trong `<tc-check>`: `<tc-hint>` (gợi ý mở từng cái), `rationales="…|…"` (giải thích từng phương án), `vars="k=2..6; m=-3..3!0"` + `{k}` trong đề + `answer="k^2/2"` (đề sinh tự động, nút "Bài khác").
- Mọi hình có nút **Đặt lại**; nhiều hình có **điểm kéo được** (vòng nét đứt) — xem `Board.handle`.

## Các cảnh

### Gói `giai-tich`

| `kind` | Dạng | Tham số chính |
|---|---|---|
| `limit-sequence` | 2 | `u` (theo `n`), `L`, `nMax`, `eps`, `tex` |
| `squeeze` | 2, 4 | `mode="sequence"`: `a`, `u`, `b`, `L`, `nMax`, `aTex`, `uTex`, `bTex` · `mode="function"`: `lower`, `f`, `upper`, `x0`, `L`, `delta`, `hole` |
| `cobweb` | 2 | `g`, `u1`, `L`, `steps`, `x`, `y`, `gTex` |
| `function-limit` | 3 | `f`, `x0`, `L`, `x`, `y`, `h`, `defined` |
| `continuity` | 4, 5 | `left`, `right`, `at` (theo `x, a`), `x0`, `a`, `aRange`, `aStep`, `aTex`, `answer` |
| `derivative` | 6, 7 | `f`, `x0`, `f0`, `slope`, `h`, `x`, `y` |
| `taylor` | 10, 20 | `fn` ∈ `exp sin cos ln1p geom atan`, `n`, `nMax` |
| `riemann` | 2, 13 | `f`, `a`, `b`, `n`, `nMax`, `rule` ∈ `left mid right`, `exact`, `exactTex` |
| `improper` | 15 | `f`, `a`, `Amax`, `exact`, `exactTex`, `ftex`, `y` |
| `series` | 16, 17 | `u` (theo `n`), `n1`, `nMax`, `S`, `STex`, `uTex` |
| `vcb` | 3, 10 | `mode="ratio"`: `f`, `g`, `ftex`, `gtex` · `mode="difference"`: `f1`, `f2`, `g`, `p`, `c`, `ctex`; chung: `delta` |
| `fourier` | 20 | `f` trên `[-π, π]`, `N`, `nMax`, `ftex`, `y`, `periods` |

Kiểu `range` viết `"a, b"` — ví dụ `x="-1.2, 2.4"`.

### Các gói mẫu

| Cảnh | Tham số chính | Preset |
|---|---|---|
| `dai-so/linear-map` | `m="a, b, c, d"` (ma trận theo hàng), `vector`, `range`, `showEigen` | `truot`, `xoay`, `gia-tri-rieng`, `suy-bien` |
| `vat-ly/oscillator` | `m`, `k`, `c`, `x0`, `v0`, `T`, `cMax` | `dao-dong-tat-dan` |
| `hoa/kinetics` | `order` ∈ 0, 1, 2; `k`, `A0`, `T` | `bac-phan-ung` |
| `thuat-toan/sorting` | `data="7, 3, 9, …"`, `algo` ∈ `bubble insertion selection`, `interval` | `sap-xep`, `da-sap-xep` |

Một số giới hạn hiện có, cần biết khi viết bài:

- `continuity` tính giới hạn một phía bằng số (ngoại suy Richardson). Đúng cho các hàm ghép nhánh trong đề thi; với hàm dao động như $\sin\frac1x$ thì phân loại loại 2 không đáng tin — dùng `squeeze` hoặc viết chú thích.
- `derivative` tự phát hiện đạo hàm trái khác phải; với hàm có dạng $\frac00$ tại $x_0$ cần truyền `f0` (và nên truyền `slope` là đáp số đúng).
- `taylor` dùng công thức hệ số dựng sẵn cho 6 hàm, không lấy đạo hàm cấp cao bằng số (sai số số học quá lớn).

## Dùng bằng JavaScript

Mọi thứ trong thẻ đều có thể ghép lại bằng tay khi cần một hình đặc biệt:

```js
import { figure, signal, runner, compile } from './tiemcan/src/tiemcan.js';

const f = compile('x^2 * sin(1/x)');
const F = figure(document.querySelector('#hinh'), { heading: 'Ví dụ', number: '9.1' });
const b = F.board({ x: [-0.5, 0.5], y: [-0.2, 0.2] });
const h = signal(0.3);

b.curve(f, { color: 'main' });
b.vband(() => -h.get(), () => h.get());          // tự vẽ lại khi h đổi
b.point(0, 0, { hollow: true, color: 'limit' });

const run = runner(async ({ tween }) => {
  await tween(h, 0.001, { duration: 3000, scale: 'log' });
});
F.play(run);
F.slider({ label: 'h', min: 0.001, max: 0.3, value: h, scale: 'log' });
F.readout('f(h)', () => f(h.get()), { tone: 'main' });
```

## Thêm một môn học

1. Tạo `src/subjects/<id>/index.js`. Chỉ import từ `../../api.js`.
2. Đăng ký cảnh bằng `scope('<id>')`, preset bằng `definePack('<id>', { name, presets })`.
3. Khai báo gói trong `src/tiemcan.js`: `registerPack('<id>', { name, load: () => import('./subjects/<id>/index.js') })`.

```js
// src/subjects/xac-suat/index.js
import { definePack, scope, figure, signal } from '../../api.js';
const scene = scope('xac-suat');

scene('luat-so-lon', {
  params: { p: 'number', n: 'int' },        // heading, caption, predict… được thêm tự động
  defaults: { p: 0.5, n: 500 },
  mount(host, p) {
    const F = figure(host, p);
    // … dựng hình bằng F.board / F.stage, F.slider, F.readout, F.status …
    return { destroy: () => F.destroy(), play: () => F._play?.() };
  },
});

definePack('xac-suat', { name: 'Xác suất thống kê', presets: { /* 'ten': { kind: 'luat-so-lon', … } */ } });
```

Kiểu tham số: `number`, `int`, `bool`, `string`, `range`, `list`, `expr:x`, `expr:n`, `expr:x,a` (danh sách biến sau dấu hai chấm).

### API tóm tắt

**Lõi**

- `signal(v)` → `{ get, set, update, peek }`; `computed(fn)`; `effect(fn)` → hàm hủy.
- `compile(src, vars)` → hàm JS. Ném `SyntaxError` tiếng Việt khi biểu thức sai.
- `tween(sig, to, { duration, easing, scale: 'log' })`, `frames(ms, k => …)`, `wait(ms)`.
- `runner(async ({ tween, wait, frames }) => …)` → `{ play, stop, running }`.
- `reducedMotion` — signal, `true` khi người dùng bật giảm chuyển động.
- `stepper(trace, { interval })` → `{ index, state, total, next, prev, seek, setTrace, run }` — phát từng bước một vết trạng thái tính sẵn.
- `solveODE(f, y0, [t0, t1], n)` → `{ t, y, at(t), comp(i) }` — giải hệ $y' = f(t, y)$ bằng RK4.

**Board** (`F.board(opts)` hoặc `new Board(host, opts)`)

Tùy chọn: `x`, `y` (khoảng), `aspect`, `mobileAspect`, `minHeight`, `maxHeight`, `grid`, `axes`, `xLabel`, `yLabel`, `xTicks`/`yTicks` ∈ `'auto' | 'int' | 'pi' | false`, `origin`, `title` (nhãn trợ năng), `heading`.

Phần tử — mọi tham số số học nhận giá trị, hàm `() => …`, hoặc signal:

| Phương thức | Vẽ |
|---|---|
| `curve(f, { from, to, breaks, color, width, dash, resolution })` | đồ thị; tự nhấc bút ở tiệm cận đứng và tại `breaks` |
| `region(top, bottom, { from, to, color, opacity })` | miền giữa hai đồ thị |
| `point(x, y, { hollow, color, r })` | một điểm; `hollow` cho giá trị không đạt được |
| `dots(() => [{ x, y, tone, hollow }], { r })` | tập điểm (dãy số) |
| `hline(y)`, `vline(x)`, `segment(p, q)`, `line(p, slope)`, `polyline(() => pts)` | đường |
| `hband(y0, y1)`, `vband(x0, x1)` | dải ε, lân cận δ |
| `rects(() => [{ x0, x1, y1, tone }])` | tổng Riemann, cột số hạng |
| `label(x, y, tex, { anchor, color })` | nhãn KaTeX; `anchor` ∈ `n s e w ne nw se sw c` |
| `arrow(p, q)`, `polygon(() => pts)` | vectơ, lực; đa giác lấp đầy |
| `handle(() => [x, y], ([x, y]) => …, { color, label, step, onEnd })` | điểm kéo được (chuột, cảm ứng, bàn phím); cảnh tự áp ràng buộc trong `onDrag` |
| `setView({ x, y }, { animate })`, `resetView()` | phóng to mượt theo thang log |

Tùy chọn `equal: true` giữ tỉ lệ 1:1 giữa hai trục (vectơ, hình học); `columns: true` đặt các khung cạnh nhau.

**Stage** (`F.stage(opts)`) — sân khấu theo điểm ảnh, không hệ trục, cho mảng, cây, sơ đồ:
`items(() => [{ key, … }], { create(g, item), update(g, item, size) })` giữ nút theo khóa nên CSS transition cho thấy phần tử di chuyển; `draw(render)`; `label(x, y, tex)`.

Màu nhận tên vai trò (`main`, `lower`, `upper`, `limit`, `ink`, `muted`, `ok`, `bad`) hoặc mã màu CSS.

**Khung hình** (`figure(host, { heading, number, caption })`)

`board()`, `stage()`, `play(runner)`, `steps(stepper)`, `code(lines, activeLine)`, `slider()`, `segmented()`, `button()`, `readout(labelTex, valueFn, { tone })`, `status(() => ({ text, tone }))`, `caption()`, `destroy()`.

## Tùy biến giao diện

Toàn bộ màu và phông là biến CSS trên `:root` (xem đầu `tiemcan.css`). Chế độ tối tự theo hệ điều hành, hoặc ép bằng `<html data-theme="dark">` / `"light"`.

## Cấu trúc thư mục

```
tiemcan.css                  giao diện framework
src/tiemcan.js               điểm vào: lõi + phần tử HTML + khai báo các gói (nạp lười)
src/api.js                   API lõi dùng chung — gói môn học chỉ import từ đây
src/registry.js              cảnh, preset, gói; phần tử <tc-scene>
src/core/                    signal, expr, anim, math, stepper, sim (RK4), vars (biến trang)
src/render/                  board (hệ trục SVG), stage (không trục), tex (KaTeX)
src/ui/controls.js           figure, slider, segmented, button, readout, status, dự đoán, từng bước, mã giả
src/learn/                   <tc-steps>, <tc-check>, <tc-var>, <tc-show>, <tc-term>
src/subjects/giai-tich/      gói Giải tích I: scenes/, presets.js
src/subjects/dai-so/         gói mẫu Đại số tuyến tính
src/subjects/vat-ly/         gói mẫu Vật lý đại cương
src/subjects/hoa/            gói mẫu Hóa đại cương
src/subjects/thuat-toan/     gói mẫu Giải thuật
index.html, mon-hoc.html     trang trình diễn (không thuộc framework)
tools/                       check.py (lỗi, ảnh chụp), perf.py (độ mượt)
AGENTS.md                    bàn giao cho session/model khác — đọc trước tiên
docs/CONTENT-GUIDE.md        quy tắc viết nội dung và diễn giải kiến thức
ARCHITECTURE.md              nghiên cứu và quyết định thiết kế
RESEARCH.md                  khảo sát Khan Academy, 3Blue1Brown, PhET, VisuAlgo… và những gì đã áp dụng
PEDAGOGY.md                  đánh giá hiệu quả học tập và cấu trúc bài học
```
