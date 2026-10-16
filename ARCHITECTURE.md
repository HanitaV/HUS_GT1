# Tiệm Cận — nghiên cứu và quyết định thiết kế

Tài liệu này ghi lại vì sao framework có hình dạng như hiện nay, để giai đoạn dựng website (và các cảnh mới) không phải quyết định lại từ đầu.

## 1. Yêu cầu rút ra từ tài liệu ôn tập

Nguồn nội dung: *Hướng dẫn ôn tập Giải tích I (MAT1091)* — 5 chương, 20 dạng bài, đề ĐT01–ĐT06. Đọc toàn bộ 20 dạng, các khái niệm cần hình động chia làm bốn họ:

| Họ | Bản chất hình ảnh | Dạng |
|---|---|---|
| **Tiến tới giới hạn** | một đại lượng ($n$, $h$, $\varepsilon$, $\delta$, $A$, $N$) chạy về giá trị tới hạn, các đại lượng khác hội tụ theo | 2, 3, 6, 13, 15, 16, 17, 18, 19 |
| **Kẹp và chặn** | đối tượng bị nhốt giữa hai biên cùng khép về một điểm | 2, 4, 8 (bất đẳng thức Lagrange) |
| **Ghép nhánh, tham số** | kéo tham số để hai nhánh khớp nhau (liên tục, khả vi) | 4, 5, 7 |
| **Xấp xỉ** | dãy đa thức/hàm xấp xỉ bám dần một hàm | 10, 20 |

Các dạng thuần biến đổi đại số (9 — đạo hàm cấp cao, 12 — nguyên hàm) không hưởng lợi từ hình động; chúng cần khối công thức tĩnh trình bày tốt, việc của website.

Từ đó, yêu cầu kỹ thuật:

1. **Tham số liên tục là trung tâm.** Gần như mọi hình là "một đồ thị phụ thuộc một tham số đang chạy". Kiến trúc phải làm cho việc "đồ thị phụ thuộc tham số" rẻ nhất có thể → hệ phản ứng (signal).
2. **Tham số tiến về 0 phải chạy theo thang log.** $h$ từ 0,5 về 0,001 theo thang tuyến tính sẽ dành 99% thời gian ở vùng không quan trọng → tween và thanh trượt có `scale: 'log'`.
3. **Phóng to là một phép chứng minh.** "Tiến tới nhưng không chạm" và "vẫn bị kẹp dù phóng to" chỉ thấy được khi khung nhìn co lại quanh điểm giới hạn → khung nhìn là signal, phóng to nội suy theo log độ rộng.
4. **Hàm có điểm kỳ dị là bình thường.** $\frac{e^{2x}-1}{x}$, $x\sin\frac1x$, hàm ghép nhánh, tiệm cận đứng, thác triển Fourier có bước nhảy → bộ vẽ đường cong phải tự nhấc bút ở NaN, ở bước nhảy lớn và tại điểm gãy khai báo.
5. **Người viết bài không phải lập trình viên JS.** Website là trang tĩnh viết bằng Markdown → hình phải khai báo được bằng thẻ HTML với hàm viết như trên giấy.
6. **Tiếng Việt và ký hiệu toán.** Dấu phẩy thập phân, nhãn tiếng Việt, KaTeX.

## 2. Khảo sát giải pháp có sẵn

| Công cụ | Điểm mạnh | Vì sao không dùng làm nền |
|---|---|---|
| JSXGraph | Thư viện hình học động đầy đủ, không phụ thuộc thư viện khác, vẽ bằng SVG/canvas, giấy phép LGPL hoặc MIT ([README](https://cdn.jsdelivr.net/npm/jsxgraph@1.14.0/README.md), [trang chủ](https://jsxgraph.uni-bayreuth.de/home/)) | Rất rộng (hình học phẳng, dựng hình) và giao diện mặc định mang phong cách công cụ; muốn có ngôn ngữ hình ảnh thống nhất, animation có kịch bản và thẻ khai báo vẫn phải viết một lớp riêng dày gần bằng framework này. Là lựa chọn dự phòng tốt nếu cần dựng hình học. |
| Mafs | Thành phần React cho hình toán tương tác, thẩm mỹ tốt, MIT ([gittrend](https://gittrend.io/repo/stevenpetryk/mafs)) | Gắn với hệ sinh thái React, cần bước build — trái với yêu cầu trang tĩnh viết bằng Markdown. Tiệm Cận học cách Mafs coi hệ trục là "sân khấu" và phần tử là khai báo. |
| Desmos API | Máy tính đồ thị quen thuộc với sinh viên | Mã nhúng cần API key ([desmos.com/api](https://www.desmos.com/api)), điều khoản sử dụng riêng, giao diện là của Desmos; khó kể một câu chuyện có kịch bản. |
| Manim | Animation toán chính xác, xuất ảnh và video ([tài liệu Manim CE](https://docs.manim.community/en/stable/)) | Thư viện Python tạo video: người học xem chứ không kéo được tham số. Phù hợp làm video bổ trợ, không phải hình tương tác trong trang. |

Kết luận: tự viết một lõi nhỏ, chuyên cho bốn họ khái niệm ở mục 1, thay vì bọc một thư viện tổng quát. Quy mô hiện tại khoảng 2 300 dòng gồm cả CSS.

## 3. Kiến trúc

```
              ┌──────────────── <tc-scene kind=… preset=…> ────────────────┐
  Tầng cảnh   │ registry.js: lược đồ tham số → chuyển kiểu → mount khi cuộn tới │
              │ scenes/*.js: limit-sequence, squeeze, continuity, …            │
              └───────────────┬───────────────────────────┬────────────────┘
  Tầng vẽ/UI      render/board.js (SVG)            ui/controls.js (figure, slider, readout, status)
                  render/tex.js (KaTeX)
              ┌───────────────┴───────────────────────────┴────────────────┐
  Tầng lõi    │ signal.js   expr.js   anim.js   math.js                      │
              └────────────────────────────────────────────────────────────┘
```

**signal.js** — `signal / computed / effect` tự theo dõi phụ thuộc; các effect bị đánh dấu trong cùng một microtask chỉ chạy một lần. Hệ quả quan trọng: hàm vẽ `f` được gọi *bên trong* effect, nên `b.curve(x => a.get() * x - 2)` tự vẽ lại khi `a` đổi mà người viết cảnh không cần gọi `redraw`.

**expr.js** — bộ phân tích Pratt sinh cây closure; không dùng `eval`/`new Function` nên an toàn với chính sách CSP và không thực thi mã lạ từ thuộc tính HTML. Hỗ trợ nhân ngầm vì sinh viên viết `2x`, `x e^(-2x)`.

**anim.js** — `frames` (vòng rAF có hủy), `tween` (tuyến tính hoặc log), `runner` (kịch bản `async` có thể dừng giữa chừng; bấm Chạy lần hai sẽ hủy lần một). Khi `prefers-reduced-motion`, mọi tween nhảy tới trạng thái cuối và `wait` trả về ngay — kịch bản vẫn chạy đúng logic, chỉ bỏ phần chuyển động.

**board.js** — SVG có kích thước bằng điểm ảnh thật (ResizeObserver), không dùng viewBox co giãn, để nét 1,5 px và chữ 12 px giữ nguyên trên điện thoại. Bảy lớp vẽ cố định (lưới → dải → miền → trục → đường → đường phủ → điểm) nên thứ tự chồng không phụ thuộc thứ tự gọi. Nhãn là HTML phủ lên trên để dùng KaTeX. Màn hình hẹp dùng tỉ lệ khung cao hơn.

**Lấy mẫu đường cong** — mỗi 1,25 px một mẫu theo chiều ngang của khung *hiện tại*, nên khi phóng to $x\sin\frac1x$ quanh 0 đường cong vẫn mịn. Nhấc bút khi: giá trị không hữu hạn; hai mẫu liên tiếp cách nhau hơn chiều cao khung (tiệm cận đứng); tại các điểm `breaks` khai báo.

**registry.js** — `<tc-scene>` là Custom Element: đọc thuộc tính (đã chữ thường hóa) và khớp lại với tên tham số trong lược đồ (`nmax` → `nMax`), chuyển kiểu, dựng khi cách khung nhìn 200 px, hủy toàn bộ effect và ResizeObserver khi bị gỡ. Lỗi cấu hình hiện thành hộp báo lỗi tiếng Việt ngay tại chỗ, giúp người viết bài sửa nhanh.

## 4. Ngôn ngữ hình ảnh

**Màu theo vai trò, không theo hình.** Bốn màu ngữ nghĩa dùng chung cho mọi cảnh:

| Vai trò | Sáng | Tối | Dùng cho |
|---|---|---|---|
| `main` | `#2350c8` | `#82a6ff` | đối tượng khảo sát: $u_n$, $f$, cát tuyến |
| `lower` | `#0b8574` | `#3cc2ae` | cận dưới, phía trái: $a_n$, $x_0-h$, $L^-$ |
| `upper` | `#7a3fc4` | `#bb9bff` | cận trên, phía phải, xấp xỉ: $b_n$, $x_0+h$, $P_n$, $S_N$ |
| `limit` | `#bf7400` | `#f0b54a` | đích đến: $L$, dải $\varepsilon$, $f'(x_0)$, giá trị tích phân |

Thanh số liệu dưới mỗi hình đánh dấu dòng bằng đúng màu đó — chú giải nằm ngay trong số liệu, không cần hộp chú thích.

**Quy ước nét:** đường giới hạn luôn là nét đứt; điểm rỗng = giá trị không đạt được hoặc hàm không xác định (đúng quy ước sách giáo khoa); điểm đặc = giá trị thực.

**Chữ:** Be Vietnam Pro cho giao diện (thiết kế cho tiếng Việt, dấu không bị chồng), Literata cho lời giảng và chú thích (serif dễ đọc dài), KaTeX cho công thức. Số trong bảng dùng chữ số đều chiều rộng (`tabular-nums`) để giá trị chạy không bị nhảy.

**Chuyển động.** Chỉ có ba loại, đều mang nghĩa toán học:
1. Tham số chạy (tween log/tuyến tính) — $h \to 0$, $\varepsilon$ co lại, $A \to +\infty$.
2. Rời rạc tăng dần (`wait` giữa các bước) — $n = 1, 2, 3, \dots$; bậc Taylor; số hạng Fourier.
3. Phóng khung nhìn — để thấy khoảng cách tới giới hạn luôn dương.

Điểm mới của dãy xuất hiện bằng một hiệu ứng "đặt xuống" 240 ms tại đúng vị trí, không bay vào. Không có hiệu ứng khi cuộn trang, không có hover trang trí.

**Mỗi hình kết thúc bằng một câu.** Dòng trạng thái đọc số liệu hiện tại và nói ra kết luận ("$a = 4$: $L^- = L^+ = f(x_0) = 2$ — hàm số liên tục tại $x_0 = 1$"), đổi màu viền theo đúng/sai. Đây là phần biến hình minh họa thành bài giảng.

## 5. Kiểm thử đã làm

- Bộ đọc biểu thức: 15 biểu thức lấy từ đề (căn khác bậc, $(-1)^n$, giai thừa, nhân ngầm) so với giá trị tính tay.
- Trình duyệt Chromium, 1280 px và 390 px, sáng và tối: toàn bộ 19 hình trên trang trình diễn dựng không lỗi console.
- Bấm Chạy trên 4 cảnh với chuyển động bình thường và với `prefers-reduced-motion: reduce`: trạng thái cuối giống nhau (ví dụ cảnh tham số dừng đúng $a = 4$, kết luận "liên tục").
- Thanh trượt điều khiển được bằng phím mũi tên.

Chưa kiểm thử: Safari/iOS thật, trình đọc màn hình, in ấn. Bản 0.2: đã kiểm thử thêm trang `mon-hoc.html` (4 gói mẫu, dự đoán, lời giải từng bước, tự kiểm tra) trên Chromium.

## 6. Việc tiếp theo trước khi dựng website

1. **Cảnh còn thiếu** (theo bản đồ trong `index.html`): `mean-value` (Dạng 8 — Rolle/Lagrange), `optimize` (Dạng 11 — hộp hành lý ĐT01, lon 330 ml), `power-series` (Dạng 18–19 — miền hội tụ trên trục số, xét hai đầu mút), `inverse` (Dạng 1), lát cắt tròn xoay (Dạng 14), mở rộng `derivative` với hai tham số $(a, b)$ cho Dạng 7.
2. **Khối nội dung tĩnh** dùng chung ngôn ngữ hình ảnh: hộp định lý, hộp "lỗi hay gặp" (ví dụ cảnh báo $\infty - \infty$ ở Dạng 15), lời giải từng bước có thể mở/đóng.
3. **Quy trình Markdown → trang**: xác nhận kramdown giữ nguyên `<tc-scene>`, hoặc chuyển sang một bộ dựng tĩnh khác nếu không.
4. **Tự host phông và KaTeX** trong repo để trang không phụ thuộc CDN khi thi gần.

## 7. Bản 0.2 — một lõi, nhiều môn học

### Có thực tế không?

Đối chiếu các môn đại cương với bốn khả năng của lõi:

| Khả năng lõi | Giải tích | Đại số TT | Vật lý | Hóa | Giải thuật |
|---|---|---|---|---|---|
| Hệ trục + đồ thị phụ thuộc tham số (`Board`) | ●●● | ●● (mặt phẳng) | ●●● | ●●● | ● |
| Quá trình liên tục theo thời gian (`tween`, `solveODE`) | ●● | ● | ●●● | ●●● | — |
| Quá trình rời rạc, tiến/lùi (`stepper`) | ● | ●● (khử Gauss) | ● | ● | ●●● |
| Sơ đồ không trục (`Stage`) | — | ● | ●● | ●● | ●●● |

Phần chung lớn hơn hẳn phần riêng, nên tách lõi là đáng làm. Giới hạn thật: lõi là 2D. Trường điện từ 3D, orbital, cấu trúc phân tử cần WebGL — nếu cần, viết thành renderer thứ ba bên cạnh `Board` và `Stage`, không đổi các tầng khác.

### Thay đổi cấu trúc

```
src/api.js            mọi thứ gói môn học được phép dùng (lõi, vẽ, UI, đăng ký)
src/registry.js       không gian tên "gói/tên"; registerPack (nạp lười) + definePack
src/subjects/<id>/    mỗi môn một thư mục, chỉ import từ api.js
```

- **Không gian tên**: `giai-tich/squeeze`, `vat-ly/oscillator`. Tên không có `/` thuộc gói mặc định (`giai-tich`, hoặc `<html data-tc-pack>`), nên trang 0.1 chạy nguyên vẹn.
- **Nạp lười**: `registerPack(id, { load: () => import(...) })`. Thẻ `<tc-scene>` gặp tên chưa có sẽ tải gói tương ứng trước khi dựng. Trang Giải tích không tải mã Vật lý.
- **Tham số chung tự động**: `heading`, `number`, `caption`, `predict…` được registry thêm vào mọi cảnh.

### Phần lõi mới

- `core/stepper.js` — phát một vết trạng thái tính sẵn (thuật toán, khử Gauss). Bước rời rạc vẫn chạy theo nhịp khi bật giảm chuyển động; chỉ hiệu ứng trượt bị tắt.
- `core/sim.js` — RK4, giải trước cả quỹ đạo rồi tra theo `t`, nên tua/lùi được và không phụ thuộc tốc độ khung hình.
- `render/stage.js` — sân khấu theo điểm ảnh, phần tử có khóa: cùng khóa giữ cùng nút SVG nên CSS transition thể hiện *di chuyển* (hai phần tử đổi chỗ).
- `Board.arrow`, `Board.polygon`, tùy chọn `equal` (tỉ lệ 1:1) và `columns` (khung cạnh nhau).
- `figure`: `stage()`, `steps(stepper)`, `code(lines, activeLine)`, hộp dự đoán.
- `learn/`: `<tc-steps>`, `<tc-check>` — xem `PEDAGOGY.md` để biết vì sao.

### Quy ước màu mở rộng cho môn khác

Bốn vai trò giữ nguyên nghĩa trừu tượng: `main` = đối tượng khảo sát (vật, nồng độ, mảng), `lower`/`upper` = hai thành phần đối xứng (e₁/e₂, trái/phải, cặp đang so sánh dùng `upper`), `limit` = giá trị đích hoặc bất biến (định thức, chu kỳ bán hủy, vị trí cân bằng). Thêm `ok`/`bad` cho trạng thái (đã đúng chỗ / vừa đổi chỗ).

## 8. Bản 0.3 — sau khi khảo sát các nền tảng khác

Chi tiết ở `RESEARCH.md`. Bổ sung vào lõi:

- `Board.handle` — điểm kéo được; bộ xử lý sự kiện chỉ đổi tọa độ chuột thành tọa độ thế giới, còn ràng buộc (giữ trên đồ thị, hút về 0,1, chặn phạm vi) nằm trong cảnh.
- `core/vars.js` — kho biến trang và `link(signal, tên)` nối hai chiều. Vì toàn bộ framework đã chạy trên signal, liên kết văn bản ↔ hình ↔ nhiều hình không cần cơ chế quan sát thủ công.
- Cảnh trả thêm `signals` để có thể liên kết từ ngoài.
- `figure` tự thêm nút "Đặt lại" cho mọi signal gắn với điều khiển.
- `render/tex.js: renderMathIn` — các khối học tập tự hiển thị công thức, không phụ thuộc script auto-render của trang.
