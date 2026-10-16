# AGENTS.md — bàn giao cho session / model tiếp theo

Đọc tệp này trước khi sửa bất cứ thứ gì. Nó tóm tắt mục tiêu, kiến trúc, quy ước bắt buộc, những gì đã học được từ các nền tảng khác, và các cạm bẫy đã gặp. Chi tiết nằm ở các tệp được dẫn.

## 1. Dự án là gì

- **Tiệm Cận**: framework dựng hình minh họa động cho môn đại cương, chạy trên **GitHub Pages** (trang tĩnh, ES module thuần, **không bước build**, không React/D3).
- Người dùng: sinh viên Việt Nam ôn **Giải tích I (MAT1091, ĐHKHTN – ĐHQGHN)**; nội dung theo tài liệu *Hướng dẫn ôn tập Giải tích I* (5 chương, 20 dạng, đề ĐT01–ĐT06). Ngôn ngữ giao diện và nội dung: **tiếng Việt**.
- Thứ tự công việc đã thống nhất: **xây framework trước, website sau**. Hiện ở bản 0.3.x; website ôn tập chưa dựng.
- Định hướng mở rộng: nhiều môn (đại số tuyến tính, vật lý, hóa, giải thuật) qua cơ chế **gói môn học**.

## 2. Bản đồ tệp

```
AGENTS.md            ← tệp này
README.md            cách dùng, API, bảng cảnh và tham số
ARCHITECTURE.md      nghiên cứu ban đầu, quyết định kiến trúc, mục 7–8: gói môn học, bản 0.3
PEDAGOGY.md          bằng chứng về hiệu quả học tập và cấu trúc một bài học
RESEARCH.md          khảo sát Khan Academy, 3Blue1Brown, PhET, VisuAlgo, Bret Victor… (có nguồn)
docs/CONTENT-GUIDE.md quy tắc viết nội dung và diễn giải kiến thức  ← bắt buộc đọc trước khi viết bài
tiemcan.css          toàn bộ giao diện framework (biến CSS, sáng/tối)
src/tiemcan.js       điểm vào: lõi + phần tử HTML + khai báo gói (nạp lười)
src/api.js           API duy nhất mà gói môn học được import
src/registry.js      cảnh, preset, gói, <tc-scene>, bind với biến trang
src/core/            signal · expr (đọc biểu thức, không eval) · anim (tween, runner, busy) · math · stepper · sim (RK4) · vars (biến trang)
src/render/          board (hệ trục SVG, handle kéo được) · stage (không trục, phần tử có khóa) · tex (KaTeX)
src/ui/controls.js   figure: board/stage, slider, segmented, play, steps, code, readout, status, dự đoán, Đặt lại
src/learn/           <tc-steps> <tc-check> <tc-hint> <tc-var> <tc-show> <tc-term>
src/subjects/<id>/   gói môn học; giai-tich đầy đủ, dai-so / vat-ly / hoa / thuat-toan là gói mẫu
index.html, mon-hoc.html, docs.css   trang trình diễn (không thuộc framework)
tools/               check.py (lỗi + ảnh chụp), perf.py (đo độ mượt)
```

## 3. Chạy và kiểm thử

```bash
python3 -m http.server 8765                 # ở gốc repo, rồi mở http://localhost:8765
python3 tools/check.py                      # mọi trang: lỗi console, hộp .tc-error, số hình dựng được
python3 tools/perf.py 4                     # độ mượt khi CPU chậm 4 lần
```

Không ra được mạng: `KATEX_DIR=<node_modules/katex/dist>` (katex@0.16.9). Chromium tùy chỉnh: `CHROME=<đường dẫn>`.
Sau mỗi thay đổi: chạy `check.py`; nếu đụng tới vẽ hoặc animation, chạy thêm `perf.py`.

Mốc đo hiện tại (0.3.1, Chromium trong container): ở tốc độ thật, mọi hình 0 % khung > 25 ms. Giả lập CPU chậm 4×: trung vị vẫn 16,7 ms; các hình chỉ đổi vài phần tử ≤ 10 %; các hình *phóng to toàn khung* (kẹp $x\sin\frac1x$, `vcb`) 10–40 % vì phải tô lại toàn bộ SVG mỗi khung — giới hạn của SVG, muốn hơn phải chuyển sang canvas. Số đo ở 4× dao động mạnh giữa các lần chạy; so sánh trước/sau trên cùng máy. Trước tối ưu: hình kẹp 53 %.

## 4. Quy ước bắt buộc

**Kiến trúc**
- Gói môn học chỉ import từ `src/api.js`. Đăng ký cảnh bằng `scope('<gói>')`, preset bằng `definePack`, khai báo gói trong `src/tiemcan.js` bằng `registerPack(… load: () => import(…))`.
- Cảnh trả về `{ destroy, play: () => F._play?.(), signals: { … } }`. `signals` là các signal có thể nối với biến trang qua `bind=`.
- Mọi thứ phụ thuộc tham số phải đọc signal *bên trong* hàm vẽ — không tự gọi redraw.
- Ràng buộc khi kéo (giữ trên đồ thị, chặn phạm vi, hút lưới) viết trong `onDrag` của cảnh, không trong bộ xử lý sự kiện.
- Biểu thức từ HTML đi qua `compile()`; tuyệt đối không dùng `eval`/`new Function`.

**Hình ảnh**
- Màu theo vai trò, không theo hình: `main` đối tượng khảo sát · `lower` cận dưới / phía trái · `upper` cận trên / phía phải / xấp xỉ · `limit` giá trị đích, dải ε · `ok`/`bad` trạng thái. Readout dùng đúng `tone` đó làm chú giải.
- Đường giới hạn: nét đứt. Điểm rỗng: giá trị không đạt / không xác định.
- Không dùng màu kem + đất nung, gradient trang trí, thẻ bo góc đổ bóng hàng loạt, nhãn VIẾT HOA giãn chữ.

**Chuyển động**
- Chỉ đại lượng đang tiến tới giới hạn mới chuyển động (n, ε, h, δ, A, N, t). Không hiệu ứng bay vào, nảy, phát sáng, hover trang trí.
- Đại lượng co về 0 tween theo thang log (`scale: 'log'`). Phóng to dùng `setView` (nội suy log của độ rộng).
- Mọi animation có điều khiển tay tương ứng (thanh trượt hoặc điểm kéo), có Dừng, có Đặt lại; tôn trọng `prefers-reduced-motion`.

**Hiệu năng** (bài học từ lần tối ưu 0.3.1)
- Đang chuyển động thì `busy > 0`: `curve`/`region` tự lấy mẫu thưa gấp đôi, vẽ sắc nét lại khi dừng. Thao tác kéo gọi `beginBusy/endBusy`.
- Chữ (readout, status) cập nhật qua `paced` — tối đa ~12 lần/giây khi đang chạy; `renderRich` chỉ dựng lại đoạn đã đổi, giữ nguyên KaTeX cũ. Không gọi KaTeX trong vòng lặp khung hình.
- Nhãn đặt bằng `transform`, không bằng `left/top`. Trục dùng lại nút `<text>`.
- Lưới mẫu đường cong neo theo tọa độ thế giới với bước lũy thừa 2 để đường không "rung" khi phóng to.
- Hình dựng lúc trình duyệt rảnh (`requestIdleCallback`) và dừng animation khi cuộn ra khỏi màn hình.
- Tính toán nặng lúc dựng (hệ số Fourier, bảng tích phân) giữ dưới ~25 ms ở tốc độ thật.

**Nội dung** — xem `docs/CONTENT-GUIDE.md`. Tóm tắt: kiến thức chuẩn tắc viết chính xác theo giáo trình; phần diễn giải tham khảo bài giảng ngôn ngữ đời thường và *gắn vào chi tiết trên hình*; mỗi nhận định có nguồn; đồ thị phải phục vụ lập luận, không chỉ minh họa đáp số.

## 5. Những gì đã học từ các nền tảng khác (chi tiết: RESEARCH.md)

| Nguồn | Bài học | Đã áp dụng thành |
|---|---|---|
| Bret Victor, Idyll | Văn bản là môi trường để suy nghĩ: số trong câu kéo được, kết luận tự tính lại | `<tc-var>`, `<tc-show>`, `bind=` |
| Immersive Math, Red Blob, PhET | Thao tác trực tiếp lên hình | `Board.handle` (chuột, cảm ứng, bàn phím) |
| Red Blob Games | Liên kết nhiều sơ đồ là phần khó nhất → cần theo dõi phụ thuộc tự động; ràng buộc kéo đặt ở tầng trạng thái | hệ signal + `core/vars.js` |
| Khan Academy | Thử trước, gợi ý từng bước, tự giải thích, giải thích từng phương án | `<tc-hint>`, `rationales`, `<tc-steps>` mở dần |
| VisuAlgo | Đề sinh tự động, chấm tự động, luyện không giới hạn | `<tc-check vars="k=2..6">` + "Bài khác" |
| PhET | Giàn giáo ngầm: phạm vi bị chặn, nút đặt lại, phản hồi tức thì, màu liên kết | nút Đặt lại, phạm vi chặn, màu vai trò |
| Mathigon | Mỗi bước người học phải làm gì đó | hộp dự đoán trước khi chạy hình |
| 3Blue1Brown / Manim | Biến đổi liên tục thể hiện bản chất khái niệm | `linear-map` biến đổi từ I tới A; nhưng giữ tương tác thay vì video |
| Nghiên cứu (PEDAGOGY.md) | Animation chỉ hơn hình tĩnh khi mang nghĩa; xem lại kém tự kiểm tra | chuyển động chỉ cho quá trình giới hạn; `<tc-check>` |

Cố ý chưa làm: xuất video, khóa nội dung tuần tự, gia sư ảo, theo dõi tiến độ, 3D.

## 6. Cạm bẫy đã gặp

- Thuộc tính `title` trên `<tc-scene>` gây tooltip của trình duyệt → dùng `heading`.
- `.tc-btn { display: inline-flex }` thắng thuộc tính `hidden` → đã có quy tắc `[hidden] { display: none !important }` trong phạm vi framework.
- KaTeX cảnh báo khi có chữ Việt trong `\text{}` → nhãn thuần tiếng Việt truyền dạng chữ thường (renderTex tự nhận ra).
- Dấu phẩy thập phân trong TeX phải là `{,}` (renderTex tự đổi `2,5` → `2{,}5`).
- Thuộc tính HTML bị chữ thường hóa (`nMax` → `nmax`); registry tự khớp lại theo lược đồ tham số.
- Gần 0, hiệu hai số gần bằng nhau mất chữ số có nghĩa (vd. $(\tan x - x)/x^3$ khi $|x| < 10^{-5}$) → trả NaN ở vùng đó.
- Giới hạn một phía tính số dùng ngoại suy Richardson; không đáng tin với hàm dao động ($\sin\frac1x$).
- Hàm hằng/hàm khai báo sau dùng trong closure: được, miễn closure chỉ chạy sau khi khai báo (TDZ).
- Artifact claude.ai: CSP chỉ cho script từ cdnjs…; CSS/font KaTeX phải phát hành kèm (`.artifact/katex/`). Trên GitHub Pages thì dùng CDN bình thường.
- Markdown (kramdown/Jekyll) có thể bọc thẻ tùy biến trong `<p>` — chưa xác nhận, việc của giai đoạn website.

## 7. Thêm một cảnh mới — danh sách kiểm

1. Cảnh trả lời câu hỏi *vì sao* nào? (Xem CONTENT-GUIDE §3.) Nếu chỉ minh họa đáp số, cân nhắc lại.
2. Viết trong `src/subjects/<gói>/…`, import từ `api.js`, dùng màu vai trò.
3. Có ít nhất: một điều khiển tay hoặc điểm kéo, một dòng `status` kết luận từ số liệu, `signals` để nối.
4. Preset ghi nguồn đề/dạng bài; caption theo CONTENT-GUIDE.
5. Chạy `tools/check.py` và `tools/perf.py`.
6. Cập nhật bảng cảnh trong README và bản đồ phủ trong `index.html`.

## 8. Việc tiếp theo đã thống nhất

- Cảnh còn thiếu cho Giải tích: `power-series` (Dạng 18–19), `mean-value` (Dạng 8), `optimize` (Dạng 11), `inverse` (Dạng 1), lát cắt tròn xoay (Dạng 14), mở rộng `derivative` cho Dạng 7.
- Dựng website ôn tập theo cấu trúc bài học trong PEDAGOGY.md §4 và CONTENT-GUIDE.
- Tự host phông và KaTeX trong repo; xác nhận quy trình Markdown → HTML.
