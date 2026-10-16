# Khảo sát các nền tảng học tương tác — và Tiệm Cận học được gì

Mục tiêu: xem các dự án giáo dục tương tác tiêu biểu giải quyết cùng bài toán (giúp người học *hiểu* một khái niệm trừu tượng) như thế nào, rồi chọn những cách làm phù hợp với một framework trang tĩnh trên GitHub Pages. Mỗi nhận định dưới đây gắn với nguồn đã đọc; chỗ nào nguồn không nói rõ thì ghi là chưa xác minh.

## 1. Các dự án đã khảo sát

| Dự án | Là gì | Điểm cốt lõi rút ra |
|---|---|---|
| **3Blue1Brown / Manim** | Kênh video toán học; Manim là engine animation Python dùng làm các video đó, có bản cộng đồng ManimCE, giấy phép MIT, xuất ra video ([ManimCE](https://github.com/manimcommunity/manim)) | Hình ảnh biến đổi *liên tục* thể hiện bản chất khái niệm. Nhưng sản phẩm là video: người xem không kéo được tham số. |
| **Khan Academy / Perseus** | Perseus là bộ soạn và hiển thị bài tập tương tác của Khan Academy; bản cộng đồng OpenPerseus giấy phép MIT ([OpenPerseus](https://cdn.jsdelivr.net/npm/openperseus@1.2.0/README.md)) | Khan khuyên thử tự làm trước, dùng gợi ý *từng bước*, tự giải thích sau mỗi gợi ý; xem hết gợi ý là có một lời giải mẫu; trắc nghiệm có lời giải thích cho từng phương án ([blog Khan Academy](https://blog.khanacademy.org/?p=963)). |
| **Explorable Explanations** (Bret Victor) | Bài luận 2011 đề xuất ba ý: tài liệu phản ứng, ví dụ khám phá được, thông tin theo ngữ cảnh; kèm thư viện Tangle ([worrydream](https://worrydream.com/ExplorableExplanations/)) | Văn bản là "môi trường để suy nghĩ": con số trong câu chữ kéo được và các kết luận phụ thuộc tự tính lại; tra nghĩa một từ ngay tại chỗ. |
| **Idyll** | Ngôn ngữ đánh dấu kiểu Markdown cho tài liệu tương tác, được Interactive Data Lab (ĐH Washington) hỗ trợ ([idyll-lang.org](https://idyll-lang.org/)) | `[var]` khai báo biến, `[Range]` gắn điều khiển vào biến, `[derived]` tính biến dẫn xuất; mọi thành phần đọc biến được vẽ lại khi biến đổi. |
| **PhET** (ĐH Colorado) | Mô phỏng HTML5 cho khoa học; mã nguồn TypeScript/JavaScript trên GitHub, giấy phép khác nhau theo từng repo ([phetsims](https://github.com/phetsims)) | "Giàn giáo ngầm" (implicit scaffolding): hướng dẫn nằm trong thiết kế chứ không trong chữ — giới hạn điều khiển, phạm vi thanh trượt, nút đặt lại nổi bật, phản hồi tức thì, biểu diễn liên kết cùng màu, có tạm dừng và bước tới ([Podolefsky, Moore, Perkins](https://arxiv.org/pdf/1306.6544)). |
| **VisuAlgo** (NUS) | 24 mô-đun trực quan hóa cấu trúc dữ liệu và giải thuật, do PGS Steven Halim khởi xướng năm 2011 ([visualgo.net](https://visualgo.net/)) | Bộ sinh câu hỏi ngẫu nhiên theo luật và tự chấm, mỗi mô-đun một bộ câu hỏi, có chế độ luyện tập công khai. |
| **algorithm-visualizer** | Dự án mã nguồn mở; thư viện tracers.js giấy phép MIT ([tracers.js](https://github.com/algorithm-visualizer/tracers.js)) | Lệnh trực quan hóa được chèn vào ngay trong mã thuật toán (tracer + delay). |
| **Red Blob Games** (Amit Patel) | Bài giải thích có sơ đồ tương tác về thuật toán game | Sơ đồ = điều khiển → đầu vào → thuật toán → đầu ra → hình; nỗi khổ lớn nhất là liên kết nhiều sơ đồ trên một trang, tác giả muốn theo dõi phụ thuộc tự động như ObservableHQ ([diagram structure](https://www.redblobgames.com/making-of/diagram-structure/)). Ràng buộc và hút lưới khi kéo nên nằm ở phần trạng thái, không ở bộ xử lý sự kiện ([draggable](https://redblobgames.com/blog/2024-04-17-draggable-examples)). |
| **Mathigon** | Sách giáo khoa toán tương tác | Ở mỗi bước người học phải tham gia rồi nội dung tiếp theo mới hiện ra; có gia sư ảo và cá nhân hóa ([whitepaper](https://static.mathigon.org/whitepaper.pdf)). |
| **Seeing Theory** (ĐH Brown) | Nhập môn xác suất thống kê bằng hình, 6 chương, dựng bằng D3.js; nay đã lưu trữ ([seeing-theory](https://seeing-theory.brown.edu/)) | Mỗi khái niệm một mô phỏng nhỏ đặt cạnh lời giảng. |
| **Immersive Linear Algebra** | Sách đại số tuyến tính, tự giới thiệu là cuốn đầu tiên có hình tương tác hoàn toàn ([immersivemath](https://immersivemath.com/ila/index.html)) | Hình đặt ngay trong mạch sách thay vì tách ra phụ lục. |
| **Interactive Linear Algebra** (Margalit, Rabinoff — Georgia Tech) | Giáo trình mở ([textbooks.math.gatech.edu](https://textbooks.math.gatech.edu/ila/)) | Mô hình "giáo trình đại học mở + hình tương tác" gần nhất với mục tiêu của website ôn tập. Chưa xác minh chi tiết cách nhúng hình. |
| **Distill** | Tạp chí nghiên cứu web-native 2016–2021, nay tạm dừng vô thời hạn ([distill.pub/about](https://distill.pub/about/)) | Biểu đồ phản ứng và "sân chơi" tương tác để xây trực giác; nhấn mạnh viết rõ ràng. |

## 2. Năm mẫu thiết kế lặp lại

1. **Thao tác trực tiếp lên hình** (Immersive Math, Red Blob, PhET): kéo chính điểm, chính vectơ, chính vật — không chỉ kéo thanh trượt bên dưới.
2. **Văn bản và hình dùng chung một trạng thái** (Bret Victor, Idyll, Red Blob): con số trong câu chữ là biến; hình và câu kết luận đổi theo.
3. **Trợ giúp có bậc** (Khan Academy, Mathigon): thử trước → gợi ý từng bước → lời giải đầy đủ → giải thích vì sao từng phương án đúng/sai.
4. **Luyện tập không giới hạn bằng đề sinh tự động** (VisuAlgo): cùng dạng bài, số liệu khác.
5. **Giàn giáo ngầm** (PhET): giới hạn phạm vi, nút đặt lại, phản hồi tức thì, màu liên kết giữa các biểu diễn.

## 3. Đã đưa vào Tiệm Cận 0.3

| Mẫu | Thành phần | Ở đâu trong demo |
|---|---|---|
| Thao tác trực tiếp | `Board.handle(pos, onDrag, opts)` — điểm kéo được bằng chuột, cảm ứng (vùng chạm 40 px) và bàn phím (Tab + mũi tên); ràng buộc đặt trong cảnh theo đúng khuyến nghị của Red Blob | Kéo mép dải ε (1.1), kéo Q dọc đồ thị (3.1), kéo điểm $x_0+h$ (2.1), kéo đầu mút $A\mathbf e_1$, $A\mathbf e_2$ để sửa ma trận (Đ.1–Đ.4), kéo vật nặng rồi thả (V.1) |
| Văn bản phản ứng | `<tc-var>` (số kéo được trong câu), `<tc-show expr>` (giá trị dẫn xuất), `<tc-show when>` (câu hiện theo điều kiện), `bind="tham_số:biến"` trên `<tc-scene>` | Đoạn văn trên Hình 1.1: kéo ε trong câu → hình đổi; kéo dải trong hình → câu đổi |
| Ngữ cảnh tại chỗ | `<tc-term tip="…">` | "VCB tương đương" trong câu hỏi Dạng 3 |
| Trợ giúp có bậc | `<tc-hint>` bên trong `<tc-check>` (mở từng cái), `rationales` cho từng phương án trắc nghiệm | Câu hỏi Dạng 3, Dạng 6 |
| Đề sinh tự động | `<tc-check vars="k=2..6" answer="k^2/2">` với `{k}` trong đề, nút "Bài khác" | Dạng 6 — đúng mẫu đề ĐT02, ĐT04, ĐT06 |
| Giàn giáo ngầm | Nút "Đặt lại" tự động cho mọi hình; phạm vi thanh trượt và điểm kéo luôn bị chặn | Mọi hình |

Hệ phản ứng signal đã có từ bản 0.1 chính là thứ Red Blob Games mô tả là còn thiếu (theo dõi phụ thuộc tự động, chỉ vẽ lại phần bị ảnh hưởng), nên việc liên kết văn bản ↔ hình ↔ nhiều hình chỉ cần thêm một kho biến trang (`core/vars.js`).

## 4. Chủ động không làm

| Ý tưởng | Lý do không làm (lúc này) |
|---|---|
| Xuất video như Manim | Mất tương tác — điều mà bằng chứng ở `PEDAGOGY.md` cho thấy có giá trị. Có thể thêm chế độ ghi lại một `runner` thành video sau này nếu cần đăng mạng xã hội. |
| Mở khóa nội dung tuần tự như Mathigon | Trang ôn thi cần tra cứu nhanh; khóa nội dung gây khó chịu khi ôn lại. `<tc-steps>` đã cho người học tự khóa/mở lời giải. |
| Gia sư ảo, cá nhân hóa | Cần máy chủ và dữ liệu người dùng; ngoài phạm vi trang tĩnh. |
| Theo dõi tiến độ, mức thành thạo | Có thể làm bằng `localStorage` ở giai đoạn website (đánh dấu dạng bài đã làm đúng câu tự kiểm tra), nhưng là việc của trang chứ không của framework. |
| Mô phỏng 3D | Lõi 2D; xem mục 7 của `ARCHITECTURE.md`. |

## 5. Lưu ý về bản quyền khi tham khảo

Chỉ học *cách làm*, không sao chép nội dung, hình vẽ hay mã. Manim, OpenPerseus, tracers.js dùng giấy phép MIT; các repo PhET có repo MIT, có repo GPL-3.0 — nếu sau này muốn tái sử dụng mã của dự án nào, kiểm tra giấy phép của đúng repo đó.
