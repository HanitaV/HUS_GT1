# Hướng dẫn viết nội dung và diễn giải kiến thức

Áp dụng cho mọi người (và mọi model) viết bài, caption, câu kết luận, gợi ý và lời giải trên các trang dùng Tiệm Cận.

## 1. Hai loại kiến thức, hai cách viết

### Loại A — kiến thức chuẩn tắc

Định nghĩa, định lý, công thức, điều kiện áp dụng, quy tắc trình bày bài thi: những điều **ai cũng thừa nhận là đúng với mọi trường hợp** và **không thể nghĩ sai nếu đã hiểu đúng**.

- Viết **chính xác, đầy đủ điều kiện**, theo giáo trình / đề cương học phần / tài liệu ôn tập gốc. Ghi nguồn.
- Không "đời thường hóa" phần này. Ví dụ: định nghĩa giới hạn dãy phải giữ nguyên thứ tự lượng từ "với mọi $\varepsilon > 0$, tồn tại $n_0$ sao cho với mọi $n > n_0$…".
- Ký hiệu thống nhất với tài liệu ôn tập (vd. $\lim_{n\to+\infty}$, VCB, $f'_+(x_0)$).

### Loại B — diễn giải, trực giác, cách nghĩ

Vì sao định nghĩa lại viết như vậy, hình dung khái niệm thế nào, khi nào nên dùng phương pháp nào, lỗi hay gặp vì đâu.

- **Tham khảo các bài giảng, tài liệu diễn giải bằng ngôn ngữ đời thường, thân thuộc hơn** (bài giảng của giảng viên, sách giáo khoa, kênh/website giải thích trực quan — xem các nguồn đã khảo sát trong `RESEARCH.md`), rồi viết lại bằng lời của mình và ghi nguồn đã tham khảo.
- **Kết hợp với đồ thị, hình ảnh đang có**: mỗi câu diễn giải đời thường phải chỉ được vào một chi tiết cụ thể trên hình (một đường, một điểm, một dải màu, một con số trong thanh số liệu). Câu không chỉ được vào đâu trên hình thì hoặc cần một hình khác, hoặc nên bỏ.
- Dùng đúng màu vai trò khi nhắc tới đối tượng trên hình ("đường màu tím là cận trên $b_n$").

### Quy tắc an toàn khi đời thường hóa

Một cách nói đời thường **không được mâu thuẫn với loại A**. Nếu chỉ đúng trong một số trường hợp, phải nói rõ phạm vi.

| Cách nói đời thường | Vấn đề | Cách viết an toàn |
|---|---|---|
| "Dãy tiến tới $L$ nhưng không bao giờ chạm $L$" | Sai trong trường hợp tổng quát: dãy hằng $u_n = L$ có giới hạn $L$; dãy $\frac{(-1)^n}{n} + 1$ không chạm, nhưng $u_n = 1 + \frac{\sin(n\pi/2)}{n}$ chạm $1$ vô số lần | "Các số hạng *đến gần $L$ tùy ý*. Có dãy không bao giờ chạm $L$ (như hình này), có dãy chạm — giới hạn không quan tâm điều đó." Cảnh `limit-sequence` tự đổi câu kết luận khi có số hạng bằng đúng $L$. |
| "Giới hạn là giá trị hàm số tại điểm đó" | Chỉ đúng khi hàm liên tục | "Giới hạn chỉ phụ thuộc giá trị *gần* $x_0$, không cần $f(x_0)$." |
| "VCB tương đương thì thay được cho nhau" | Chỉ trong tích và thương | Luôn kèm điều kiện; dùng cảnh `vcb` mode `difference` để cho thấy trường hợp sai. |
| "Đạo hàm là độ dốc" | Đúng về hình học, nhưng dễ quên phải tính bằng định nghĩa tại điểm ghép nhánh | Nói độ dốc *và* chỉ vào tỉ số sai phân trên hình `derivative`. |

Ghi chú: cách nói ở dòng đầu bảng xuất hiện ngay trong mô tả ban đầu của dự án. Hình mở đầu ($\left(1+\frac1n\right)^n \to e$) đúng là không chạm $e$, nhưng caption phải nói rõ đó là tính chất *của dãy này*.

## 2. Mỗi nhận định có nguồn

- Đề bài, công thức: ghi mã nguồn như tài liệu gốc (TL01, TL02, ĐT01–ĐT06).
- Nhận định về hiệu quả học tập, về nền tảng khác: ghi tác giả, năm, và đường dẫn (như PEDAGOGY.md, RESEARCH.md).
- Nhận định về "trọng tâm", "tần suất" của đề: ghi là định hướng của bản tổng hợp, không phải thống kê độc lập (đúng như tài liệu gốc đã lưu ý).

## 3. Đồ thị phải tham gia vào lập luận

Một hình chỉ vẽ lại đáp số mà người học đã biết thì giúp rất ít cho việc làm bài. Trước khi thêm hình, trả lời được ít nhất một câu:

1. **Hình cho thấy *vì sao* một bước lời giải hợp lệ?** (cảnh `vcb` ratio: vì sao được thay VCB trong thương.)
2. **Hình làm lộ ra một lỗi hay gặp?** (cảnh `vcb` difference: thay VCB trong hiệu cho ra 0; cảnh `derivative` với trị tuyệt đối: hai phía khác nhau.)
3. **Hình cho người học tự kiểm tra kết quả tính tay?** (thanh số liệu cho giá trị số của giới hạn, của tích phân.)
4. **Hình gắn với một bước cụ thể của lời giải?** (`<tc-steps>` với `<li data-set="…">`: mở bước nào, hình chuyển tới trạng thái của bước đó.)

Nếu không câu nào đúng, dùng văn bản, công thức hoặc hình tĩnh thay vì hình động.

## 4. Cấu trúc một bài (một dạng bài)

```
1. Kiến thức chuẩn tắc (loại A) — ngắn, chính xác, có nguồn
2. Diễn giải (loại B) — lời đời thường gắn vào hình; dùng <tc-var> nếu có tham số đáng kéo
3. Hình + câu dự đoán (predict) trước khi chạy
4. Ví dụ đề thi: tự làm → <tc-steps> mở dần, bước nào gắn với hình thì data-set
5. <tc-check> 1–2 câu, ưu tiên đề sinh tự động (vars) và có <tc-hint>
6. Lỗi hay gặp — mỗi lỗi một câu, chỉ vào hình hoặc vào bước lời giải
```

## 5. Văn phong

- Câu ngắn, chủ động, nói thẳng điều cần nói. Không mở đầu bằng "Như chúng ta đã biết".
- Câu kết luận (`status`) đọc từ số liệu hiện tại và nói ra điều hình đang chứng minh.
- Gợi ý (`<tc-hint>`) mỗi cái một bước, không lộ đáp số ở gợi ý đầu.
- Lời giải (`<tc-steps>`) theo đúng văn phong trình bày bài thi tự luận (nêu tính liên tục của hàm sơ cấp trên từng khoảng, ghi rõ giới hạn một phía…).
- Số thập phân dùng dấu phẩy (2,5); trong TeX framework tự xử lý.
