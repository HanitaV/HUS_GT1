# Học bằng hình động có thực sự hiệu quả?

Ghi chú này đánh giá cách trình bày của Tiệm Cận dựa trên các nghiên cứu về học tập, rồi rút ra những điều chỉnh đã đưa vào bản 0.2.

## 1. Bằng chứng nói gì

**Hình động không tự động tốt hơn hình tĩnh.** Tversky, Morrison và Bétrancourt (2002) rà soát các nghiên cứu so sánh animation với hình tĩnh và kết luận animation thường không vượt trội khi hai bên được so sánh công bằng; nhiều lợi thế từng được báo cáo thực ra đến từ việc animation chứa nhiều thông tin hơn, hoặc đi kèm tương tác và nhiệm vụ dự đoán. Hai nguyên tắc họ đề xuất: hình phải *tương thích* với cấu trúc khái niệm (nguyên tắc congruence) và phải *được người xem nắm bắt kịp* — chậm, đơn giản, có chú thích (nguyên tắc apprehension). [1]

**Nhưng hình động mang nghĩa thì có lợi.** Phân tích gộp của Höffler và Leutner (2007), 26 nghiên cứu với 76 cặp so sánh, cho thấy animation có lợi thế trung bình d = 0,37 so với hình tĩnh; lợi thế cao hơn khi animation mang tính *biểu diễn* (bản thân chuyển động thể hiện nội dung, d = 0,40) thay vì trang trí. [2]

**Xem không bằng tự nhớ lại.** Roediger và Karpicke (2006): sau một tuần, nhóm học một lần rồi tự kiểm tra ba lần nhớ tốt hơn nhóm đọc lại bốn lần — dù ngay sau khi học kết quả ngược lại, và chính người học dự đoán sai rằng đọc lại hiệu quả hơn. [3] Hệ quả với Tiệm Cận: xem hình đẹp tạo cảm giác "đã hiểu", nhưng điều đó không đảm bảo làm được bài.

**Hướng dẫn chi tiết giúp người mới, cản người giỏi.** Hiệu ứng đảo ngược chuyên môn (Kalyuga, Ayres, Chandler, Sweller 2003): lời giải mẫu đầy đủ giúp người mới học, nhưng với người đã thạo lại thành gánh nặng thừa. [4] Lời giải nên mở dần, để người học tự quyết định cần bao nhiêu trợ giúp.

## 2. Đối chiếu với Tiệm Cận bản 0.1

| Điểm | Đánh giá |
|---|---|
| Chuyển động chỉ dành cho đại lượng tiến tới giới hạn | Đúng hướng: đây là animation biểu diễn, khớp nguyên tắc congruence — giới hạn *là* một quá trình. |
| Thanh trượt cho mọi tham số, tua được | Đúng hướng: tương tác do người học điều khiển là yếu tố có lợi đã được tách riêng trong [1]. |
| Dòng kết luận đọc từ số liệu | Hữu ích: là chú thích gắn liền với hình, giúp nắm bắt (apprehension). |
| Bấm Chạy rồi xem | **Điểm yếu**: người học thụ động; dễ tạo ảo giác hiểu bài. |
| Hình đứng riêng, không nối với bài tập | **Điểm yếu lớn nhất** với mục tiêu thi tự luận MAT1091: đề chấm *trình bày lời giải*, không chấm trực giác. |
| Không có kiểm tra | **Thiếu**: không có luyện truy xuất, không biết mình hiểu thật hay chưa. |

Kết luận: cách trình bày này **hiệu quả cho hiểu khái niệm** (ε–n₀, kẹp, liên tục tại điểm ghép nhánh, cát tuyến → tiếp tuyến) — đúng những chỗ sinh viên hay học thuộc mà không hiểu. Nó **không đủ để làm được bài thi** nếu chỉ dừng ở xem hình.

## 3. Điều chỉnh đã làm trong bản 0.2

1. **Dự đoán trước khi xem** — mọi cảnh nhận `predict`, `predictOptions`, `predictAnswer`, `predictExplain`. Người học chọn trước; đáp án chỉ hiện khi hình chạy xong. Biến việc xem thành kiểm chứng một giả thuyết của chính mình.
2. **`<tc-steps>` — lời giải mở dần.** Mặc định ẩn hết, nhắc tự làm ra giấy trước, rồi mở từng bước để đối chiếu. Người giỏi mở ít, người mới mở nhiều (phù hợp [4]). Lời giải viết theo đúng văn phong trình bày bài thi.
3. **`<tc-check>` — tự kiểm tra.** Nhập đáp số (chấp nhận biểu thức như `3/(4e^2)`) hoặc trắc nghiệm; sau hai lần sai mới cho xem đáp án.
4. **Trình phát từng bước** cho quá trình rời rạc (thuật toán): tiến, lùi, tua — người học tự quyết nhịp, thay vì một animation chạy liền.

## 4. Cấu trúc một bài học đề xuất cho website

```
Lý thuyết ngắn (định nghĩa, định lý — khối tĩnh)
  → Dự đoán (câu hỏi trong cảnh)
  → Hình động: chạy, rồi tự kéo tham số
  → Ví dụ đề thi: tự làm → <tc-steps> mở dần
  → <tc-check> 1–2 câu tương tự, không nhìn lời giải
  → "Lỗi hay gặp" (thay VCB trong tổng, tách ∞ − ∞ …)
```

Tỉ lệ thời gian nên nghiêng hẳn về hai bước cuối. Hình động phục vụ hiểu; điểm thi đến từ luyện giải và tự kiểm tra.

## 5. Khi nào *không* dùng hình động

- Biến đổi đại số thuần (Dạng 9 đạo hàm cấp cao, Dạng 12 nguyên hàm): dùng lời giải từng bước, không cần hình.
- Khi một hình tĩnh có chú thích nói đủ (bảng VCB tương đương, bảng chuỗi Maclaurin): hình tĩnh rẻ hơn và dễ in.
- Khi animation nhanh hơn tốc độ đọc số liệu: luôn có thanh trượt để dừng.

## 6. Đánh giá thực tế với các môn khác

| Môn | Mức phù hợp | Lý do |
|---|---|---|
| Đại số tuyến tính | Cao | Ánh xạ tuyến tính, định thức, vectơ riêng có nghĩa hình học trực tiếp trên mặt phẳng. Phần khử Gauss, hạng, không gian con trừu tượng nên dùng trình phát từng bước trên ma trận. |
| Vật lý đại cương | Cao | Hầu hết là quá trình theo thời gian (dao động, chuyển động, mạch RC). Lõi đã có bộ giải RK4. Phần trường 3D (điện từ) cần renderer khác — chưa có. |
| Hóa đại cương | Trung bình | Động học, cân bằng, chuẩn độ, khí lý tưởng: hợp. Cấu trúc phân tử, orbital 3D: không hợp với SVG 2D, nên dùng công cụ chuyên dụng. |
| Giải thuật | Cao | Thuật toán là quá trình rời rạc: trình phát từng bước + mã giả đồng bộ là cách trình bày quen thuộc và hiệu quả. Cây, đồ thị cần thêm bố cục nút trên Stage. |
| Xác suất thống kê | Cao | Luật số lớn, định lý giới hạn trung tâm, khoảng tin cậy — chính là "tiến tới giới hạn". |

## Nguồn

1. Tversky, B., Morrison, J. B., & Bétrancourt, M. (2002). Animation: can it facilitate? *International Journal of Human-Computer Studies*, 57, 247–262. [PDF](https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf)
2. Höffler, T. N., & Leutner, D. (2007). Instructional animation versus static pictures: A meta-analysis. *Learning and Instruction*, 17(6), 722–738. [Tóm tắt](https://www.leibniz-ipn.de/en/research/publications/instructional-animation-versus-static-pictures-a-meta-analysis)
3. Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*, 17, 249–255; mô tả thiết kế trong bài hồi cứu của chính các tác giả, *Perspectives on Psychological Science* 13(2), 2018. [PDF](https://moodle2.units.it/pluginfile.php/572734/mod_resource/content/1/testing.pdf)
4. Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. *Educational Psychologist*, 38(1). [Bản lưu trữ](https://ro.uow.edu.au/edupapers/136)
