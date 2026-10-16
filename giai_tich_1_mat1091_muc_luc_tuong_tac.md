# HƯỚNG DẪN ÔN TẬP GIẢI TÍCH I ( phiên bản tinh chỉnh phù hợp với khoa ngoài )

**Học phần:** MAT1091 · **05 chương** · **20 dạng bài** · **Ôn tập tự luận**

**TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN – ĐẠI HỌC QUỐC GIA HÀ NỘI**  
*03 tín chỉ · 30 tiết lý thuyết · 30 tiết bài tập · 90 tiết tự học. Thời gian thi 90 phút, tự luận, không sử dụng tài liệu (theo thông tin ghi trong bản tổng hợp gốc; cần đối chiếu đề cương học phần áp dụng).*

<a id="nguon-tham-khao"></a>

## Nguồn tài liệu và trích dẫn

### Tài liệu được trích dẫn

<a id="nguon-tl01"></a>

**[TL01] Tài liệu của HAMIC**

> **CÂU LẠC BỘ TOÁN TIN HAMIC** - **HƯỚNG DẪN ÔN TẬP GIẢI TÍCH I**  
> **Tác giả: Nguyễn Hoàng Đạt**

*Tài liệu được dẫn làm nguồn tham khảo về cấu trúc ôn tập.*

<a id="nguon-tl02"></a>

**[TL02] Đề cương chi tiết học phần Giải tích 1 (MAT1091)** — Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội. Nguồn này được nêu trong bản Markdown gốc; chưa có bản đề cương đính kèm để xác minh từng thông số.

<a id="nguon-de-thi"></a>

### Các đề thi được dẫn trong tài liệu

| Mã nguồn | Tên bộ đề thi / kỳ thi được ghi trong bản tổng hợp |
|:---:|---|
| <a id="nguon-dt01"></a>**ĐT01** | Đề thi MAT1091 — Học kỳ Hè, năm học 2022–2023 |
| <a id="nguon-dt02"></a>**ĐT02** | Đề thi MAT1091 — Năm học 2023–2024 |
| <a id="nguon-dt03"></a>**ĐT03** | Đề thi MAT1091 — Học kỳ Hè, năm học 2023–2024 |
| <a id="nguon-dt04"></a>**ĐT04** | Đề thi MAT1091 — Năm học 2024–2025 |
| <a id="nguon-dt05"></a>**ĐT05** | Đề thi MAT1091 — Chương trình CLC Hóa, năm học 2025–2026 |
| <a id="nguon-dt06"></a>**ĐT06** | Đề thi MAT1091 — Học kỳ Hè, năm học 2025–2026 |

<a id="muc-luc"></a>

## Mục lục tương tác

*Chọn tên chương hoặc dạng bài để chuyển trực tiếp đến phần tương ứng. Trong bản HTML có thêm mục lục cố định ở bên trái, ô tìm kiếm và chế độ tối.*

- [Nguồn tài liệu và trích dẫn](#nguon-tham-khao)
- [Tổng quan và định hướng ôn tập](#tong-quan)
- **[Chương I. Nhập môn giải tích](#chuong-1)**
  - [Dạng 1: Tập xác định, hàm số hợp và hàm số ngược](#dang-01)
  - [Dạng 2: Giới hạn của dãy số và xét sự hội tụ của dãy số](#dang-02)
- **[Chương II. Giới hạn và sự liên tục của hàm số một biến](#chuong-2)**
  - [Dạng 3: Tính giới hạn của hàm số (Trọng tâm đề thi MAT1091)](#dang-03)
  - [Dạng 4: Xét sự liên tục và phân loại điểm gián đoạn của hàm số](#dang-04)
  - [Dạng 5: Tìm tham số để hàm số liên tục tại một điểm hoặc trên $\mathbb R$ (Trọng tâm đề thi MAT1091)](#dang-05)
- **[Chương III. Phép tính vi phân của hàm số một biến](#chuong-3)**
  - [Dạng 6: Tính đạo hàm cấp 1 bằng định nghĩa và đạo hàm hàm chứa trị tuyệt đối (Trọng tâm đề thi MAT1091)](#dang-06)
  - [Dạng 7: Tìm tham số để hàm số khả vi](#dang-07)
  - [Dạng 8: Các định lý về giá trị trung bình và Quy tắc L'Hospital](#dang-08)
  - [Dạng 9: Tính đạo hàm cấp cao $f^{(n)}(x)$ và $f^{(n)}(x_0)$ (Trọng tâm đề thi MAT1091)](#dang-09)
  - [Dạng 10: Khai triển Taylor – Maclaurin và ứng dụng tính xấp xỉ](#dang-10)
  - [Dạng 11: Ứng dụng đạo hàm vào khảo sát hàm số và bài toán tối ưu thực tế (Trọng tâm đề thi MAT1091)](#dang-11)
- **[Chương IV. Phép tính tích phân của hàm số một biến](#chuong-4)**
  - [Dạng 12: Tính nguyên hàm và tích phân bất định (Trọng tâm đề thi MAT1091)](#dang-12)
  - [Dạng 13: Tính tích phân xác định (Trọng tâm đề thi MAT1091)](#dang-13)
  - [Dạng 14: Ứng dụng hình học của tích phân xác định](#dang-14)
  - [Dạng 15: Xét sự hội tụ và tính giá trị của tích phân suy rộng (Trọng tâm đề thi MAT1091)](#dang-15)
- **[Chương V. Chuỗi số và chuỗi hàm](#chuong-5)**
  - [Dạng 16: Khảo sát sự hội tụ của chuỗi số dương (Trọng tâm đề thi MAT1091)](#dang-16)
  - [Dạng 17: Chuỗi đan dấu, hội tụ tuyệt đối và bán hội tụ](#dang-17)
  - [Dạng 18: Tìm bán kính hội tụ và miền hội tụ của chuỗi lũy thừa (Trọng tâm đề thi MAT1091)](#dang-18)
  - [Dạng 19: Tìm miền hội tụ của chuỗi hàm tổng quát (Trọng tâm phân loại điểm 9–10 MAT1091)](#dang-19)
  - [Dạng 20: Khai triển hàm số thành chuỗi lũy thừa và chuỗi Fourier](#dang-20)

<a id="tong-quan"></a>

## Tổng quan và định hướng ôn tập

| Chương | Nội dung học phần | Phạm vi | Định hướng từ những đề được dẫn |
|:---|:---|:---|:---|
| [**I**](#chuong-1) | Nhập môn giải tích | Dạng 1–2 | Nắm tập xác định, hàm ngược, dãy số và giới hạn. |
| [**II**](#chuong-2) | Giới hạn và sự liên tục của hàm số một biến | Dạng 3–5 | Luyện kỹ giới hạn và điều kiện liên tục tại điểm ghép nhánh. |
| [**III**](#chuong-3) | Phép tính vi phân của hàm số một biến | Dạng 6–11 | Đạo hàm tại một điểm, đạo hàm cấp cao và tối ưu. |
| [**IV**](#chuong-4) | Phép tính tích phân của hàm số một biến | Dạng 12–15 | Tích phân bất định, xác định và suy rộng. |
| [**V**](#chuong-5) | Chuỗi số và chuỗi hàm | Dạng 16–20 | Hội tụ chuỗi, chuỗi lũy thừa và miền hội tụ. |

*Các nhận định về “trọng tâm”, tần suất hay mức độ ưu tiên trong nội dung học tập là định hướng của bản tổng hợp, không thay cho thống kê độc lập toàn bộ đề thi.*

---

<a id="chuong-1"></a>

## Chương I. NHẬP MÔN GIẢI TÍCH


<a id="dang-01"></a>

### Dạng 1: Tập xác định, hàm số hợp và hàm số ngược

#### Phương pháp chủ yếu

**1. Tìm miền xác định (tập xác định) và miền giá trị của hàm số:**

- Phân thức $\dfrac{P(x)}{Q(x)}$ xác định khi $Q(x)\ne 0$.
- Căn thức bậc chẵn $\sqrt[2k]{f(x)}$ xác định khi $f(x)\ge 0$.
- Hàm logarit $\log_a f(x)$ ($0<a\ne 1$) xác định khi $f(x)>0$.
- Hàm lũy thừa - mũ biến số $u(x)^{v(x)} = e^{v(x)\ln u(x)}$ xác định khi $u(x)>0$.
- Hàm lượng giác ngược: $\arcsin u(x)$ và $\arccos u(x)$ xác định khi $-1\le u(x)\le 1$; $\arctan u(x)$ và $\operatorname{arccot} u(x)$ xác định với mọi $u(x)\in\mathbb R$.

**2. Hàm số hợp và hàm số ngược:**

- **Hàm số hợp:** Cho $y=f(u)$ với $u\in D_f$ và $u=g(x)$ với $x\in D_g$. Hàm hợp $(f\circ g)(x)=f(g(x))$ xác định trên tập $\{x\in D_g \mid g(x)\in D_f\}$.
- **Hàm số ngược:** Nếu $f:X\to Y$ là song ánh (mỗi $y\in Y$ tồn tại duy nhất $x\in X$ sao cho $y=f(x)$) thì tồn tại hàm ngược $f^{-1}:Y\to X$ xác định bởi $x=f^{-1}(y)$ (đổi tên biến lại thành $y=f^{-1}(x)$). Đồ thị của $y=f^{-1}(x)$ đối xứng với đồ thị của $y=f(x)$ qua đường phân giác $y=x$.

#### Các bài tập

1. Tìm tập xác định của các hàm số sau:
   - a. $y = \sqrt{\ln\left(\dfrac{5x-x^2}{4}\right)}$.
   - b. $y = \arccos\left(\dfrac{2x}{1+x^2}\right) + \dfrac{1}{\sqrt{x^2-1}}$.
   - c. $y = \ln\left(x + \sqrt{x^2+1}\right) + \arcsin\left(\dfrac{x-1}{2}\right)$.
2. Tìm hàm ngược $y=f^{-1}(x)$ và miền xác định của hàm ngược đối với các hàm số sau:
   - a. $y = \dfrac{2^x - 2^{-x}}{2}$ với $x\in\mathbb R$.
   - b. $y = \dfrac{e^x - 1}{e^x + 1}$ với $x\in\mathbb R$.
   - c. $y = x^2 - 2x + 3$ trên nhánh $x\ge 1$.
3. Cho $f(x) = \dfrac{x}{\sqrt{1+x^2}}$. Tìm biểu thức thu gọn của hàm hợp $f_n(x) = (f\circ f\circ\cdots\circ f)(x)$ ($n$ lần hàm $f$).


<a id="dang-02"></a>

### Dạng 2: Giới hạn của dãy số và xét sự hội tụ của dãy số

#### Phương pháp chủ yếu

**1. Định nghĩa và các phép biến đổi cơ bản:**

- Dãy $\{u_n\}$ có giới hạn hữu hạn $L$ khi $n\to+\infty$ ($\lim_{n\to+\infty} u_n = L$) nếu với mọi $\varepsilon>0$, tồn tại $n_0\in\mathbb N^*$ sao cho $\forall n>n_0$: $|u_n-L|<\varepsilon$.
- Các tốc độ tăng trưởng cơ bản khi $n\to+\infty$ (với $\alpha>0, p>0, a>1$):

  $$(\ln n)^\alpha \ll n^p \ll a^n \ll n! \ll n^n.$$

  Từ đó suy ra: $\displaystyle\lim_{n\to+\infty}\frac{(\ln n)^\alpha}{n^p}=0,\quad \lim_{n\to+\infty}\frac{n^p}{a^n}=0,\quad \lim_{n\to+\infty}\frac{a^n}{n!}=0,\quad \lim_{n\to+\infty}\sqrt[n]{n}=1,\quad \lim_{n\to+\infty}\left(1+\frac{k}{n}\right)^n=e^k.$

**2. Nguyên lý kẹp (Sandwich Theorem):**

- Nếu $a_n \le u_n \le b_n$ với mọi $n\ge n_0$ và $\lim_{n\to+\infty} a_n = \lim_{n\to+\infty} b_n = L$ thì $\lim_{n\to+\infty} u_n = L$.
- Thường áp dụng cho dãy chứa tổng có $n$ số hạng: đánh giá số hạng lớn nhất và nhỏ nhất trong tổng, hoặc dùng tích phân xác định (tổng Riemann):

  $$\lim_{n\to+\infty}\frac{1}{n}\sum_{k=1}^n f\left(\frac{k}{n}\right) = \int_0^1 f(x)\,dx.$$

**3. Định lý Weierstrass cho dãy truy hồi:**

- Dãy $\{u_n\}$ **đơn điệu tăng và bị chặn trên** thì hội tụ; dãy **đơn điệu giảm và bị chặn dưới** thì hội tụ.
- **Các bước giải bài toán dãy truy hồi $u_{n+1}=g(u_n)$:** (1) Chứng minh tính bị chặn bằng quy nạp hoặc bất đẳng thức; (2) Xét hiệu $u_{n+1}-u_n$ (hoặc đạo hàm $g'(x)$) để chứng minh tính đơn điệu; (3) Gọi $L=\lim_{n\to+\infty} u_n$, chuyển qua giới hạn ở hệ thức truy hồi giải phương trình $L=g(L)$ để tìm $L$.

#### Các bài tập

1. Tính giới hạn của các dãy số sau:
   - a. $\displaystyle\lim_{n\to+\infty}\frac{2 + (-2)^n}{3^n}$ và $\displaystyle\lim_{n\to+\infty}\frac{\sqrt{n^2+2n}-n}{\sqrt{4n^2+n}-2n}$.
   - b. $\displaystyle\lim_{n\to+\infty}\left(\frac{1}{1\cdot 2} + \frac{1}{2\cdot 3} + \cdots + \frac{1}{n(n+1)}\right)$.
   - c. $\displaystyle\lim_{n\to+\infty}\left(\frac{1}{\sqrt{n^2+1}} + \frac{1}{\sqrt{n^2+2}} + \cdots + \frac{1}{\sqrt{n^2+n}}\right)$.
   - d. $\displaystyle\lim_{n\to+\infty}\left(\frac{3n+1}{4n+2}\right)^n$ và $\displaystyle\lim_{n\to+\infty}\left(\frac{2n^2+n+1}{2n^2+3}\right)^{n^2}$.
2. Chứng minh các dãy số truy hồi sau hội tụ và tìm giới hạn của chúng:
   - a. $u_1 = \sqrt{2},\quad u_{n+1} = \sqrt{2+u_n}\quad (n\ge 1)$.
   - b. $u_1 = 3,\quad u_{n+1} = \dfrac{u_n^2+u_n+4}{6}\quad (n\ge 1)$.
   - c. $u_1 > 0,\quad u_{n+1} = \dfrac{1}{2}\left(u_n + \dfrac{a}{u_n}\right)\quad (a>0,\ n\ge 1)$.


[↑ Trở về mục lục](#muc-luc)

---

<a id="chuong-2"></a>

## Chương II. GIỚI HẠN VÀ SỰ LIÊN TỤC CỦA HÀM SỐ MỘT BIẾN


<a id="dang-03"></a>

### Dạng 3: Tính giới hạn của hàm số (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Các giới hạn cơ bản và Vô cùng bé (VCB) tương đương khi $u(x)\to 0$:**

- Các giới hạn chuẩn:

  $$\lim_{u\to 0}\frac{\sin u}{u} = 1,\qquad \lim_{u\to 0}\frac{\tan u}{u} = 1,\qquad \lim_{u\to 0}\frac{\arcsin u}{u} = 1,\qquad \lim_{u\to 0}\frac{\arctan u}{u} = 1,$$

  $$\lim_{u\to 0}\frac{e^u - 1}{u} = 1,\qquad \lim_{u\to 0}\frac{a^u - 1}{u} = \ln a,\qquad \lim_{u\to 0}\frac{\ln(1+u)}{u} = 1,\qquad \lim_{u\to 0}\frac{(1+u)^\alpha - 1}{u} = \alpha.$$

- Bảng VCB tương đương khi $u\to 0$ ($f(x)\sim g(x) \iff \lim \frac{f(x)}{g(x)}=1$):
  - $\sin u \sim \tan u \sim \arcsin u \sim \arctan u \sim u$.
  - $1 - \cos u \sim \dfrac{u^2}{2}$.
  - $e^u - 1 \sim u$; $\quad a^u - 1 \sim u\ln a$.
  - $\ln(1+u) \sim u$.
  - $(1+u)^\alpha - 1 \sim \alpha u$; đặc biệt $\sqrt[n]{1+u} - 1 \sim \dfrac{u}{n}$.
- **Quy tắc thay thế VCB tương đương (Rất quan trọng):** Chỉ được thay thế trực tiếp VCB tương đương trong **tích và thương**. Trong **tổng và hiệu**, nếu hai VCB có cùng bậc và triệt tiêu nhau ở bậc thấp nhất thì **không** được thay tương đương trực tiếp mà phải dùng: (1) Tách hằng số trung gian, (2) Nhân lượng liên hợp, (3) Quy tắc L'Hospital, hoặc (4) Khai triển Taylor – Maclaurin.

**2. Kỹ thuật xử lý hiệu hai căn thức trong đề thi MAT1091:**

- **Trường hợp 1: Hai căn cùng bậc tại $x\to x_0$** — ví dụ $\lim_{x\to x_0}\frac{\sqrt{A(x)}-\sqrt{B(x)}}{P(x)}$ với $A(x_0)=B(x_0)>0$:
  Nhân liên hợp tử số và phân tích mẫu số thành nhân tử chứa $(x-x_0)$:

  $$\sqrt{A(x)}-\sqrt{B(x)} = \frac{A(x)-B(x)}{\sqrt{A(x)}+\sqrt{B(x)}}.$$

- **Trường hợp 2: Hai căn khác bậc tại $x\to 0$** — ví dụ $\lim_{x\to 0}\frac{\sqrt[m]{1+ax}-\sqrt[n]{1+bx}}{x}$:
  Thêm bớt số $1$ trên tử để tách thành hai giới hạn chuẩn (hoặc dùng VCB tương đương $\sqrt[k]{1+u}-1\sim \frac{u}{k}$):

  $$\frac{\sqrt[m]{1+ax}-\sqrt[n]{1+bx}}{x} = \frac{\sqrt[m]{1+ax}-1}{x} - \frac{\sqrt[n]{1+bx}-1}{x} \xrightarrow{x\to 0} \frac{a}{m} - \frac{b}{n}.$$

**3. Dạng vô định mũ $1^\infty, 0^0, \infty^0$:**

- Biến đổi $\lim_{x\to x_0} [u(x)]^{v(x)} = \exp\left(\lim_{x\to x_0} v(x)\ln u(x)\right)$.
- Riêng dạng $1^\infty$ (khi $u(x)\to 1$ và $v(x)\to\infty$), ta có: $\ln u(x) = \ln(1 + u(x) - 1) \sim u(x)-1$, do đó:

  $$\lim_{x\to x_0} [u(x)]^{v(x)} = \exp\left[\lim_{x\to x_0} v(x)\big(u(x)-1\big)\right].$$

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Tìm giới hạn:

   $$\lim_{x\to 0}\frac{\sqrt{1+2x}-\sqrt[3]{1-3x}}{x}.$$

2. *(Đề thi MAT1091 – HK Hè 2025-2026; [ĐT06](#nguon-dt06))* Tìm giới hạn:

   $$\lim_{x\to 0}\frac{\sqrt[3]{1+3x}-\sqrt{1-2x}}{x}.$$

3. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Tìm giới hạn:

   $$\lim_{x\to 2}\frac{\sqrt{x^2+2x}-\sqrt{x^2+4}}{x^2-3x+2}.$$

4. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Tìm giới hạn:

   $$L = \lim_{x\to 1}\frac{\sqrt{x^2+2x}-\sqrt{x^2+2}}{x^2-3x+2}.$$

5. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Tìm giới hạn:

   $$L = \lim_{x\to 0}\frac{\sqrt{1+\cos 3x}-\sqrt{1+\cos x}}{x^2}.$$

**B. Bài tập tự luyện mở rộng**

6. Tính các giới hạn chứa căn thức và hàm sơ cấp:
   - a. $\displaystyle\lim_{x\to 0}\frac{\sqrt[3]{1+x/3}-\sqrt[4]{1+x/4}}{x}$.
   - b. $\displaystyle\lim_{x\to 0}\frac{e^{\sin 5x}-e^{\sin x}}{\ln(1+2x)}$.
   - c. $\displaystyle\lim_{x\to 0}\frac{e^{x^2}-\cos(\sqrt{2}x)}{1-\sqrt{1-x^2}}$.
   - d. $\displaystyle\lim_{x\to 0}\frac{1-(\cos x)^{\sin x}}{\ln(1+x^3)}$.
   - e. $\displaystyle\lim_{x\to\pi/3}\frac{\tan^3 x - 3\tan x}{\cos(x+\pi/6)}$.
7. Tính các giới hạn tại vô cùng và dạng mũ $1^\infty$:
   - a. $\displaystyle\lim_{x\to+\infty}\frac{\ln(x^2-x+1)}{\ln(x^{10}+x+1)}$.
   - b. $\displaystyle\lim_{x\to+\infty} x^2\ln\left(\cos\frac{1}{x}\right)$.
   - c. $\displaystyle\lim_{x\to+\infty}\left(\sin\frac{1}{x}+\cos\frac{1}{x}\right)^x$.
   - d. $\displaystyle\lim_{x\to 0}\left(\frac{2-\cos x}{1-\sin x}\right)^{\cot x}$.


<a id="dang-04"></a>

### Dạng 4: Xét sự liên tục và phân loại điểm gián đoạn của hàm số

#### Phương pháp chủ yếu

**1. Điều kiện liên tục tại một điểm:**

- Hàm số $f(x)$ xác định trên khoảng chứa $x_0$ được gọi là **liên tục tại $x_0$** khi và chỉ khi:

  $$\lim_{x\to x_0^+} f(x) = \lim_{x\to x_0^-} f(x) = f(x_0).$$

- Mọi hàm số sơ cấp đều liên tục trên từng khoảng xác định của chúng. Do đó, khi xét tính liên tục trên $\mathbb R$, ta chỉ cần kiểm tra tại các điểm biên ghép nhánh hoặc điểm làm mẫu số bằng $0$.

**2. Phân loại điểm gián đoạn:** Nếu $f$ không liên tục tại $x_0$ thì $x_0$ là điểm gián đoạn:

- **Điểm gián đoạn loại 1:** Tồn tại hữu hạn cả hai giới hạn một phía $f(x_0^+) = \lim_{x\to x_0^+} f(x)$ và $f(x_0^-) = \lim_{x\to x_0^-} f(x)$.
  - **Gián đoạn bỏ được:** Khi $f(x_0^+) = f(x_0^-) \ne f(x_0)$ (hoặc $f$ chưa xác định tại $x_0$).
  - **Gián đoạn có bước nhảy:** Khi $f(x_0^+) \ne f(x_0^-)$. Đại lượng $|f(x_0^+) - f(x_0^-)|$ gọi là bước nhảy của hàm số tại $x_0$.
- **Điểm gián đoạn loại 2:** Ít nhất một trong hai giới hạn một phía $f(x_0^+)$ hoặc $f(x_0^-)$ không tồn tại hoặc bằng $\pm\infty$.

**3. Tính chất của hàm số liên tục trên một đoạn $[a,b]$:**

- **Định lý Weierstrass:** Hàm số liên tục trên đoạn đóng $[a,b]$ thì bị chặn và đạt giá trị lớn nhất, giá trị nhỏ nhất trên đoạn đó.
- **Định lý giá trị trung gian (Bolzano – Cauchy):** Nếu $f$ liên tục trên $[a,b]$ và $f(a)\cdot f(b) < 0$ thì tồn tại ít nhất một điểm $c\in(a,b)$ sao cho $f(c)=0$.

#### Các bài tập

1. Xét tính liên tục và phân loại các điểm gián đoạn (nếu có) của các hàm số sau:
   - a. $\displaystyle f(x)=\begin{cases}\dfrac{\sin x}{|x|},&x\ne 0,\\1,&x=0.\end{cases}$
   - b. $\displaystyle f(x)=\begin{cases}x\sin\dfrac{1}{x},&x\ne 0,\\0,&x=0.\end{cases}$
   - c. $\displaystyle f(x)=\begin{cases}\sin\dfrac{1}{x},&x\ne 0,\\0,&x=0.\end{cases}$
   - d. $\displaystyle f(x)=\begin{cases}\cos\dfrac{\pi x}{2},&|x|\le 1,\\|x-1|,&|x|>1.\end{cases}$
   - e. $\displaystyle f(x)=\begin{cases}\dfrac{1-\cos x}{x^2},&x\ne 0,\\1,&x=0.\end{cases}$
2. Chứng minh phương trình $x^5 - 3x - 1 = 0$ có ít nhất 3 nghiệm thực phân biệt trong khoảng $(-2, 2)$.


<a id="dang-05"></a>

### Dạng 5: Tìm tham số để hàm số liên tục tại một điểm hoặc trên $\mathbb R$ (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Dạng hàm cho bởi công thức khi $x\ne x_0$ và bằng $m$ khi $x=x_0$:**

- Tính $\displaystyle L = \lim_{x\to x_0} f(x)$ (bằng VCB tương đương, L'Hospital hoặc nhân liên hợp).
- Hàm số liên tục tại $x_0 \iff f(x_0) = \lim_{x\to x_0} f(x) \iff m = L$.

**2. Dạng hàm ghép bởi hai nhánh $x\ge x_0$ và $x<x_0$:**

- Tính giới hạn phải $\displaystyle L_+ = \lim_{x\to x_0^+} f(x)$, giới hạn trái $\displaystyle L_- = \lim_{x\to x_0^-} f(x)$ và giá trị $f(x_0)$.
- Giải phương trình $L_+ = L_- = f(x_0)$ để tìm tham số.
- **Lưu ý trình bày trong bài thi tự luận MAT1091:** Luôn nêu rõ "Trên các khoảng $(-\infty, x_0)$ và $(x_0, +\infty)$, $f(x)$ là hàm sơ cấp nên liên tục. Do đó $f(x)$ liên tục trên $\mathbb R$ khi và chỉ khi $f(x)$ liên tục tại $x=x_0$."

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2022–2023; [ĐT01](#nguon-dt01))* Cho hàm số:

   $$f(x)=\begin{cases}2x^2,&x\ge 1,\\ax-2,&x<1.\end{cases}$$

   Tìm $a$ để hàm số $f(x)$ liên tục tại $x=1$.

2. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Cho hàm số:

   $$f(x)=\begin{cases}\dfrac{e^{-3x}-1}{\sin x},&x\ne 0,\\m,&x=0.\end{cases}$$

   Tìm $m$ để $f(x)$ liên tục trên $\mathbb R$.

3. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Tìm giá trị của tham số $m$ để hàm số:

   $$f(x)=\begin{cases}\dfrac{\sin 4x}{x},&x>0,\\x^2+x+m,&x\le 0\end{cases}$$

   liên tục tại $x=0$.

**B. Bài tập tự luyện mở rộng**

4. Tìm tham số $(a,b)$ để các hàm số sau liên tục trên $\mathbb R$:
   - a. $\displaystyle f(x)=\begin{cases}2e^x,&x<0,\\a+2x,&x\ge 0.\end{cases}$
   - b. $\displaystyle f(x)=\begin{cases}2x+a,&x<1,\\ax^2+2,&x\ge 1.\end{cases}$
   - c. $\displaystyle f(x)=\begin{cases}\dfrac{\ln(1+3x)}{\arctan 2x},&x>0,\\ax+b,&x\le 0.\end{cases}$
   - d. $\displaystyle f(x)=\begin{cases}(x-2)\sin\dfrac{1}{x-2},&x<2,\\ax^2-bx-1,&2\le x<3,\\x-a+b-1,&x\ge 3.\end{cases}$


[↑ Trở về mục lục](#muc-luc)

---

<a id="chuong-3"></a>

## Chương III. PHÉP TÍNH VI PHÂN CỦA HÀM SỐ MỘT BIẾN


<a id="dang-06"></a>

### Dạng 6: Tính đạo hàm cấp 1 bằng định nghĩa và đạo hàm hàm chứa trị tuyệt đối (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Tính đạo hàm tại điểm ghép nhánh $x_0$ bằng định nghĩa (Câu hỏi xuất hiện ở hầu hết các đề MAT1091):**

- **Tuyệt đối không** lấy đạo hàm công thức nhánh $x\ne x_0$ rồi thay $x=x_0$ trực tiếp nếu chưa chứng minh giới hạn của đạo hàm tồn tại. Thay vào đó, bắt buộc dùng **định nghĩa đạo hàm tại một điểm**:

  $$f'(x_0) = \lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}.$$

- **Kỹ thuật tính nhanh giới hạn $\lim_{x\to 0}\frac{f(x)-f(0)}{x}$ trong đề thi MAT1091:**
  - Với $f(x) = \dfrac{e^{kx}-1}{x}$ ($x\ne 0$), $f(0)=k$:

    $$f'(0) = \lim_{x\to 0}\frac{\frac{e^{kx}-1}{x} - k}{x} = \lim_{x\to 0}\frac{e^{kx} - 1 - kx}{x^2}.$$

    Áp dụng quy tắc L'Hospital (hoặc khai triển Maclaurin $e^{kx} = 1 + kx + \frac{k^2x^2}{2!} + o(x^2)$), ta được:

    $$f'(0) = \lim_{x\to 0}\frac{ke^{kx}-k}{2x} = \frac{k^2}{2}.$$

  - Với $f(x) = \dfrac{\sin(kx)}{x}$ ($x\ne 0$), $f(0)=k$:

    $$f'(0) = \lim_{x\to 0}\frac{\frac{\sin(kx)}{x} - k}{x} = \lim_{x\to 0}\frac{\sin(kx) - kx}{x^2}.$$

    Áp dụng quy tắc L'Hospital (hoặc khai triển $\sin(kx) = kx - \frac{(kx)^3}{6} + o(x^3)$), ta được $f'(0) = 0$.

**2. Tính đạo hàm của hàm chứa dấu giá trị tuyệt đối:**

- Phá dấu giá trị tuyệt đối để chia hàm số thành các khoảng mở (nơi biểu thức bên trong dấu $|\cdot|$ dương hoặc âm), sau đó tính đạo hàm trên từng khoảng mở.
- Tại các điểm biên làm biểu thức trong dấu $|\cdot|$ bằng $0$ (ví dụ $x=x_0$), xét đạo hàm phải $f'_+(x_0)$ và đạo hàm trái $f'_-(x_0)$:
  - Nếu $f'_+(x_0) = f'_-(x_0) = L$ thì $f'(x_0)=L$.
  - Nếu $f'_+(x_0) \ne f'_-(x_0)$ thì hàm số **không có đạo hàm** tại $x_0$.

**3. Đạo hàm của hàm hợp, hàm ngược, hàm ẩn, hàm tham số và hàm mũ biến chồng biến:**

- Hàm hợp: $[f(g(x))]' = f'(g(x))\cdot g'(x)$.
- Hàm ngược: $(f^{-1})'(y_0) = \dfrac{1}{f'(x_0)}$ với $y_0=f(x_0)$ và $f'(x_0)\ne 0$.
- Hàm ẩn $F(x,y)=0$: Đạo hàm hai vế theo $x$ (coi $y=y(x)$) hoặc dùng công thức $y'_x = -\dfrac{F'_x}{F'_y}$.
- Hàm biến chồng biến $y = u(x)^{v(x)}$ ($u(x)>0$): Lấy $\ln$ hai vế $\ln y = v(x)\ln u(x)$ hoặc viết $y = e^{v(x)\ln u(x)}$ rồi đạo hàm:

  $$y' = u(x)^{v(x)}\left[v'(x)\ln u(x) + \frac{v(x)u'(x)}{u(x)}\right].$$

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Cho hàm số $f(x)=(x+1)|x-1|$. Tìm đạo hàm của $f(x)$.
2. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Cho hàm số:

   $$f(x)=\begin{cases}\dfrac{e^{2x}-1}{x},&x\ne 0,\\2,&x=0.\end{cases}$$

   Tính đạo hàm $f'(0)$.

3. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Cho hàm số:

   $$f(x)=\begin{cases}\dfrac{e^{3x}-1}{x},&x\ne 0,\\3,&x=0.\end{cases}$$

   Tính đạo hàm $f'(0)$.

4. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Cho hàm số:

   $$f(x)=\begin{cases}\dfrac{\sin 4x}{x},&x\ne 0,\\4,&x=0.\end{cases}$$

   Tính đạo hàm $f'(0)$.

5. *(Đề thi MAT1091 – HK Hè 2025-2026; [ĐT06](#nguon-dt06))* Cho hàm số:

   $$f(x)=\begin{cases}\dfrac{e^{3x}-1}{x},&x\ne 0,\\3,&x=0.\end{cases}$$

   Chứng minh rằng hàm số $f(x)$ liên tục và khả vi tại điểm $x=0$.

**B. Bài tập tự luyện mở rộng**

6. Tìm đạo hàm của các hàm số sau tại mọi điểm thuộc miền xác định:
   - a. $y = |(x-1)^2(x+1)^3|$.
   - b. $y = x^x$ ($x>0$) và $y = (\sin x)^{\frac{\cos x}{x}}$ ($x\in(0,\pi)$).
   - c. $\displaystyle f(x)=\begin{cases}\dfrac{\ln(1+2x)}{x},&x\ne 0,\\2,&x=0.\end{cases}$ Tính $f'(0)$.
   - d. $\displaystyle f(x)=\begin{cases}\dfrac{1-\cos 2x}{x},&x\ne 0,\\0,&x=0.\end{cases}$ Tính $f'(0)$.


<a id="dang-07"></a>

### Dạng 7: Tìm tham số để hàm số khả vi

#### Phương pháp chủ yếu

Hàm số $f(x)$ khả vi tại $x_0$ khi và chỉ khi đồng thời thỏa mãn **hai điều kiện**:

1. **Điều kiện cần (liên tục tại $x_0$):** $\lim_{x\to x_0^+} f(x) = \lim_{x\to x_0^-} f(x) = f(x_0)$. *(Nếu không liên tục thì chắc chắn không khả vi).*
2. **Điều kiện đủ (đạo hàm hai phía bằng nhau):**

   $$f'_+(x_0) = \lim_{x\to x_0^+}\frac{f(x)-f(x_0)}{x-x_0} = \lim_{x\to x_0^-}\frac{f(x)-f(x_0)}{x-x_0} = f'_-(x_0).$$

Giải hệ hai phương trình trên để tìm bộ tham số $(a,b)$.

#### Các bài tập

Tìm tham số $(a,b)$ để các hàm số sau khả vi trên toàn trục số $\mathbb R$:

1. $\displaystyle f(x)=\begin{cases}x^2,&x\le m,\\ax+b,&x>m,\end{cases}\quad (m\in\mathbb R\text{ cho trước}).$
2. $\displaystyle f(x)=\begin{cases}(x+a)e^{-bx},&x<0,\\ax^2+bx+1,&x\ge 0.\end{cases}$
3. $\displaystyle f(x)=\begin{cases}\sin 2x + 1,&x\ge 0,\\ax + b,&x<0.\end{cases}$
4. $\displaystyle f(x)=\begin{cases}x^2 + ax + 3,&x\ge 1,\\bx + 2,&x<1.\end{cases}$


<a id="dang-08"></a>

### Dạng 8: Các định lý về giá trị trung bình và Quy tắc L'Hospital

#### Phương pháp chủ yếu

**1. Ba định lý giá trị trung bình cơ bản:**

- **Định lý Fermat:** Nếu $f$ đạt cực trị địa phương tại $c\in(a,b)$ và khả vi tại $c$ thì $f'(c)=0$.
- **Định lý Rolle:** Nếu $f$ liên tục trên $[a,b]$, khả vi trên $(a,b)$ và $f(a)=f(b)$ thì tồn tại $c\in(a,b)$ sao cho $f'(c)=0$.
- **Định lý Lagrange:** Nếu $f$ liên tục trên $[a,b]$ và khả vi trên $(a,b)$ thì tồn tại $c\in(a,b)$ sao cho:

  $$f(b)-f(a) = f'(c)(b-a).$$

- **Định lý Cauchy:** Nếu $f,g$ liên tục trên $[a,b]$, khả vi trên $(a,b)$ và $g'(x)\ne 0\ \forall x\in(a,b)$ thì tồn tại $c\in(a,b)$ sao cho:

  $$\frac{f(b)-f(a)}{g(b)-g(a)} = \frac{f'(c)}{g'(c)}.$$

**2. Quy tắc L'Hospital:**

- Khử dạng vô định $\dfrac{0}{0}$ hoặc $\dfrac{\infty}{\infty}$: Nếu $f,g$ khả vi trong lân cận thủng của $x_0$, $g'(x)\ne 0$ và tồn tại $\lim_{x\to x_0}\dfrac{f'(x)}{g'(x)} = L$ (hữu hạn hoặc $\pm\infty$) thì:

  $$\lim_{x\to x_0}\frac{f(x)}{g(x)} = \lim_{x\to x_0}\frac{f'(x)}{g'(x)} = L.$$

- **Mẹo kết hợp:** Trước khi đạo hàm theo L'Hospital, hãy rút gọn các nhân tử có giới hạn hữu hạn khác $0$ hoặc thay thế VCB tương đương ở mẫu số để giảm độ phức tạp của biểu thức đạo hàm.

#### Các bài tập

1. Áp dụng định lý Lagrange chứng minh các bất đẳng thức sau:
   - a. $\dfrac{b-a}{1+b^2} < \arctan b - \arctan a < \dfrac{b-a}{1+a^2}$ với mọi $0 < a < b$.
   - b. $\dfrac{x}{1+x} < \ln(1+x) < x$ với mọi $x > 0$.
   - c. $|\sin x - \sin y| \le |x-y|$ với mọi $x,y\in\mathbb R$.
2. Cho hàm số $f(x)$ liên tục trên $[a,b]$, khả vi trên $(a,b)$ và $f(a)=f(b)=0$. Chứng minh rằng với mọi $k\in\mathbb R$, tồn tại $c\in(a,b)$ sao cho $f'(c) + kf(c) = 0$ *(Gợi ý: Xét hàm phụ $g(x)=e^{kx}f(x)$)*.
3. Sử dụng quy tắc L'Hospital để tính các giới hạn:
   - a. $\displaystyle\lim_{x\to 0}\left(\frac{1}{x^2} - \frac{1}{\sin^2 x}\right)$.
   - b. $\displaystyle\lim_{x\to 0^+} x^{\sin x}$.
   - c. $\displaystyle\lim_{x\to 0}\frac{e^x - e^{-x} - 2x}{x - \sin x}$.


<a id="dang-09"></a>

### Dạng 9: Tính đạo hàm cấp cao $f^{(n)}(x)$ và $f^{(n)}(x_0)$ (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Bảng công thức đạo hàm cấp $n$ của các hàm sơ cấp cơ bản:**

- $(e^{ax+b})^{(n)} = a^n e^{ax+b}$.
- $[\sin(ax+b)]^{(n)} = a^n\sin\left(ax+b + \dfrac{n\pi}{2}\right)$.
- $[\cos(ax+b)]^{(n)} = a^n\cos\left(ax+b + \dfrac{n\pi}{2}\right)$.
- $\left(\dfrac{1}{ax+b}\right)^{(n)} = \dfrac{(-1)^n n!\,a^n}{(ax+b)^{n+1}}$.
- $[\ln(ax+b)]^{(n)} = \dfrac{(-1)^{n-1}(n-1)!\,a^n}{(ax+b)^n}$.
- $(x^\alpha)^{(n)} = \alpha(\alpha-1)\cdots(\alpha-n+1)x^{\alpha-n}$; đặc biệt $(x^k)^{(n)} = 0$ nếu $n > k$.

**2. Công thức Leibniz cho đạo hàm cấp $n$ của một tích $y = u(x)\cdot v(x)$:**

$$[u(x)\cdot v(x)]^{(n)} = \sum_{k=0}^n \binom{n}{k} u^{(n-k)}(x)\,v^{(k)}(x).$$

- **Kinh nghiệm giải đề thi MAT1091:** Trong đề thi, một trong hai hàm $v(x)$ luôn là đa thức bậc hai như $x^2+1$, $x^2$, $x^2+3$. Khi đó $v^{(k)}(x) = 0$ với mọi $k\ge 3$, nên tổng Leibniz từ $n+1$ số hạng **chỉ còn đúng 3 số hạng đầu tiên** ($k=0, 1, 2$):

  $$(u\cdot v)^{(n)} = u^{(n)}v + n\,u^{(n-1)}v' + \frac{n(n-1)}{2}\,u^{(n-2)}v''.$$

- **Lưu ý đặc biệt với $\sin^2 x$ hoặc $\cos^2 x$:** Trước khi dùng công thức Leibniz, **bắt buộc hạ bậc** trước:

  $$\sin^2 x = \frac{1 - \cos 2x}{2},\qquad \cos^2 x = \frac{1 + \cos 2x}{2}.$$

- **Lưu ý với phân thức hữu tỉ bậc tử $\ge$ bậc mẫu** (như $f(x)=\dfrac{x^2+1}{x+1}$): Chia đa thức để tách thành phần đa thức + phần phân thức thực sự trước khi lấy đạo hàm cấp $n$:

  $$\frac{x^2+1}{x+1} = x - 1 + \frac{2}{x+1}.$$

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2022–2023; [ĐT01](#nguon-dt01))* Tính đạo hàm cấp 2023 tại $x=\dfrac{\pi}{2}$ của hàm số:

   $$f(x) = (x^2+1)\sin^2 x.$$

2. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Cho $f(x) = x^2\sin^2 x$. Tìm $f^{(100)}(\pi)$.
3. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Cho $f(x) = \dfrac{x^2+1}{x+1}$. Tính $f^{(20)}(0)$.
4. *(Đề thi MAT1091 – HK Hè 2025-2026; [ĐT06](#nguon-dt06))* Tính đạo hàm cấp 2023 tại $x=0$ của hàm số:

   $$f(x) = (x^2+3)\sin 2x.$$

**B. Bài tập tự luyện mở rộng**

5. Tìm công thức đạo hàm cấp $n$ của các hàm số sau:
   - a. $y = x\sin x$ và $y = x^2 e^{2x+3}$.
   - b. $y = (5x^2-4x+1)\cos 5x$.
   - c. $y = (x^2+x+1)e^{3x}$.
   - d. $y = \dfrac{2x+3}{x^2-3x+2}$ *(Gợi ý: Tách thành $\dfrac{A}{x-1} + \dfrac{B}{x-2}$)*.


<a id="dang-10"></a>

### Dạng 10: Khai triển Taylor – Maclaurin và ứng dụng tính xấp xỉ

#### Phương pháp chủ yếu

**1. Công thức khai triển Taylor tại $x=x_0$ với số dư Peano:**

$$f(x) = f(x_0) + \frac{f'(x_0)}{1!}(x-x_0) + \frac{f''(x_0)}{2!}(x-x_0)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n + o\big((x-x_0)^n\big).$$

Khi $x_0 = 0$, ta có **khai triển Maclaurin**.

**2. Các khai triển Maclaurin cơ bản cần nhớ (khi $u\to 0$):**

- $\displaystyle e^u = 1 + \frac{u}{1!} + \frac{u^2}{2!} + \frac{u^3}{3!} + \cdots + \frac{u^n}{n!} + o(u^n)$.
- $\displaystyle\sin u = u - \frac{u^3}{3!} + \frac{u^5}{5!} - \cdots + (-1)^m\frac{u^{2m+1}}{(2m+1)!} + o(u^{2m+2})$.
- $\displaystyle\cos u = 1 - \frac{u^2}{2!} + \frac{u^4}{4!} - \cdots + (-1)^m\frac{u^{2m}}{(2m)!} + o(u^{2m+1})$.
- $\displaystyle\ln(1+u) = u - \frac{u^2}{2} + \frac{u^3}{3} - \cdots + (-1)^{n-1}\frac{u^n}{n} + o(u^n)$.
- $\displaystyle\frac{1}{1-u} = 1 + u + u^2 + \cdots + u^n + o(u^n)$.
- $\displaystyle (1+u)^\alpha = 1 + \alpha u + \frac{\alpha(\alpha-1)}{2!}u^2 + \cdots + \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}u^n + o(u^n)$.

**3. Ứng dụng vi phân vào tính xấp xỉ tuyến tính:**

- Tuyến tính hóa hàm $f(x)$ tại $x_0$: $f(x_0 + \Delta x) \approx f(x_0) + f'(x_0)\Delta x$ (với $|\Delta x|$ rất nhỏ).

#### Các bài tập

1. Khai triển Maclaurin (hoặc Taylor tại $x_0$) với số dư Peano cho các hàm số sau:
   - a. $f(x) = \cos x - e^{-x^2/2}$ đến bậc 4 tại $x_0=0$.
   - b. $f(x) = \ln(2x^2+9x+4)$ đến bậc 3 tại $x_0=0$ *(Gợi ý: Phân tích $2x^2+9x+4 = (2x+1)(x+4)$)*.
   - c. $f(x) = \ln(2-\cos x)$ đến bậc 4 tại $x_0=0$.
   - d. $f(x) = \dfrac{7}{2x^2-5x-3}$ đến bậc $n$ tại $x_0=0$.
2. Sử dụng khai triển Maclaurin để tính các giới hạn:
   - a. $\displaystyle\lim_{x\to 0}\frac{\sin x - x}{x(1-\cos x)}$.
   - b. $\displaystyle\lim_{x\to 0}\frac{x^2\sin x}{\tan x - x}$.
3. Áp dụng vi phân để tính gần đúng: $\sin 31^\circ$; $\sqrt{3{,}98}$ và $\sqrt[3]{8{,}06}$.


<a id="dang-11"></a>

### Dạng 11: Ứng dụng đạo hàm vào khảo sát hàm số và bài toán tối ưu thực tế (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Quy trình giải bài toán tối ưu hóa thực tế (Chuẩn đầu ra CK4, CS2 của MAT1091):**

- **Bước 1 (Mô hình hóa):** Chọn ẩn số chính $x$ (ví dụ: cạnh đáy của hình hộp, bán kính hình trụ, ...) và các ẩn phụ (chiều cao $h$, ...), kèm theo điều kiện thực tế của biến ($x>0$).
- **Bước 2 (Khử ẩn phụ):** Sử dụng điều kiện ràng buộc trong đề bài (tổng kích thước, diện tích toàn phần, thể tích cố định) để biểu diễn các ẩn phụ theo $x$, từ đó lập hàm mục tiêu một biến $V(x)$ hoặc $S(x)$ trên đoạn/khoảng xác định $D$.
- **Bước 3 (Tìm cực trị / GTLN – GTNN):** Tính $V'(x)$, giải phương trình $V'(x)=0$, lập bảng biến thiên (hoặc xét dấu $V''(x)$) để kết luận giá trị lớn nhất / nhỏ nhất và kích thước tương ứng.

**2. Cực trị và khảo sát hàm số một biến:**

- **Quy tắc 1:** Nếu $f'(x)$ đổi dấu từ dương sang âm khi qua $x_0$ thì $x_0$ là điểm cực đại; từ âm sang dương thì $x_0$ là điểm cực tiểu.
- **Quy tắc 2:** Nếu $f'(x_0)=0$ và $f''(x_0) < 0$ thì $x_0$ là điểm cực đại; nếu $f''(x_0) > 0$ thì $x_0$ là điểm cực tiểu.
- **Tính lồi, lõm và điểm uốn:** Trên khoảng $(a,b)$, nếu $f''(x) > 0$ thì đồ thị hàm số lõm (bề lõm quay lên trên); nếu $f''(x) < 0$ thì đồ thị lồi. Điểm $M(x_0, f(x_0))$ mà tại đó $f''(x)$ đổi dấu khi qua $x_0$ được gọi là điểm uốn.

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2022–2023; [ĐT01](#nguon-dt01))* Một hãng hàng không đưa ra quy định về hành lý xách tay như sau: Là một hình hộp chữ nhật với đáy là một hình vuông, và có tổng kích thước chiều dài, chiều rộng, chiều cao không vượt quá $90\,\mathrm{cm}$. Hỏi hành khách mang hành lý xách tay có kích thước như thế nào để thể tích hành lý là lớn nhất? Thể tích đó là bao nhiêu?

**B. Bài tập tự luyện mở rộng**

2. Cần sản xuất một lon nước giải khát hình trụ có dung tích không đổi là $V = 330\,\mathrm{ml}$ ($330\,\mathrm{cm}^3$). Hãy xác định bán kính đáy $R$ và chiều cao $h$ của hình trụ để diện tích toàn phần của vỏ lon là nhỏ nhất.
3. Từ một tấm tôn hình vuông cạnh $a$, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh $x$ rồi gập phần còn lại thành một hình hộp chữ nhật không nắp. Tìm $x$ để thể tích hộp thu được là lớn nhất.
4. Tìm khoảng đơn điệu, cực trị, khoảng lồi – lõm và các đường tiệm cận của đồ thị hàm số:
   - a. $y = x e^{-x^2/2}$.
   - b. $y = \dfrac{x^3}{x^2-1}$.


[↑ Trở về mục lục](#muc-luc)

---

<a id="chuong-4"></a>

## Chương IV. PHÉP TÍNH TÍCH PHÂN CỦA HÀM SỐ MỘT BIẾN


<a id="dang-12"></a>

### Dạng 12: Tính nguyên hàm và tích phân bất định (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Phương pháp đổi biến số:**

- **Đổi biến loại 1:** $\displaystyle\int f(g(x))g'(x)\,dx = \int f(u)\,du$ với $u=g(x)$.
  - Biểu thức chứa $\sqrt{ax+b}$: đặt $t = \sqrt{ax+b} \implies ax+b=t^2 \implies a\,dx = 2t\,dt$.
  - Biểu thức chứa $a^x$: đặt $t = a^x \implies dt = a^x\ln a\,dx$.
- **Đổi biến loại 2 (Lượng giác hóa):**
  - Chứa $\sqrt{a^2-x^2}$: đặt $x = a\sin t$, $t\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$.
  - Chứa $\sqrt{x^2+a^2}$ hoặc $\dfrac{1}{x^2+a^2}$: đặt $x = a\tan t$, $t\in\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$ (hoặc với $\int\frac{dx}{x\sqrt{x^2+1}}$, nhân cả tử và mẫu với $x$ rồi đặt $t = \sqrt{x^2+1} \implies t^2-1=x^2, t\,dt=x\,dx$).

**2. Phương pháp tích phân từng phần:**

$$\int u\,dv = u\cdot v - \int v\,du.$$

- **Quy tắc chọn $u$ (Thứ tự ưu tiên "Nhất lô – Nhì đa – Tam lượng – Tứ mũ"):**
  1. Dạng $\int P(x)\ln(ax+b)\,dx$ hoặc $\int P(x)\arctan x\,dx$: Đặt $u = \ln(ax+b)$ (hoặc $\arctan x$), $dv = P(x)\,dx$.
  2. Dạng $\int P(x)e^{ax}\,dx$, $\int P(x)\sin(ax)\,dx$, $\int P(x)\cos(ax)\,dx$: Đặt $u = P(x)$, $dv$ là phần còn lại. *(Lưu ý: Với $\int x\sin^2 x\,dx$, hạ bậc $\sin^2 x = \frac{1-\cos 2x}{2}$ trước khi từng phần!)*
  3. Dạng $\int e^{ax}\sin(bx)\,dx$ hoặc $\int e^{ax}\cos(bx)\,dx$: Tích phân từng phần 2 lần liên tiếp để đưa về phương trình ẩn $I$.

**3. Tích phân hàm phân thức hữu tỉ $\int \frac{P(x)}{Q(x)}\,dx$:**

- Nếu $\deg P \ge \deg Q$: Chia đa thức để tách phần nguyên.
- Nếu $\deg P < \deg Q$: Phân tích mẫu số $Q(x)$ thành nhân tử và đồng nhất hệ số tách thành tổng các phân thức đơn giản dạng $\dfrac{A}{(x-a)^k}$ và $\dfrac{Mx+N}{(x^2+px+q)^m}$ ($\Delta = p^2-4q < 0$).

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Tìm họ nguyên hàm:

   $$I = \int x\sin^2 x\,dx.$$

**B. Bài tập tự luyện mở rộng**

2. Tính các nguyên hàm sau:
   - a. $\displaystyle\int\frac{2x^2+2x+13}{(x-2)(x^2+1)^2}\,dx$.
   - b. $\displaystyle\int e^x\sin x\,dx$.
   - c. $\displaystyle\int\frac{x^3}{x^8-2}\,dx$.
   - d. $\displaystyle\int\sqrt{a^2-x^2}\,dx\quad (a>0)$.
   - e. $\displaystyle\int x\arctan x\,dx$.


<a id="dang-13"></a>

### Dạng 13: Tính tích phân xác định (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Công thức Newton – Leibniz:**

$$\int_a^b f(x)\,dx = F(b) - F(a),\qquad\text{với } F'(x) = f(x)\ \forall x\in[a,b].$$

**2. Đổi biến và từng phần trong tích phân xác định:**

- **Đổi biến:** Khi đặt $t = \varphi(x)$, nhớ **đổi cận** từ $x=a \to t=\varphi(a)$ và $x=b \to t=\varphi(b)$.
- **Tích phân từng phần:**

  $$\int_a^b u\,dv = \big(u\cdot v\big)\Big|_a^b - \int_a^b v\,du.$$

- **Tính chất đối xứng trên đoạn $[-a,a]$:**
  - Nếu $f(x)$ là hàm lẻ ($f(-x)=-f(x)$) và liên tục trên $[-a,a]$ thì $\displaystyle\int_{-a}^a f(x)\,dx = 0$.
  - Nếu $f(x)$ là hàm chẵn ($f(-x)=f(x)$) thì $\displaystyle\int_{-a}^a f(x)\,dx = 2\int_0^a f(x)\,dx$.

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Tính tích phân:

   $$\int_0^1\frac{2^x}{4^x + 4\cdot 2^x + 3}\,dx.$$

   *(Gợi ý: Đặt $t = 2^x \implies dt = 2^x\ln 2\,dx$, mẫu số trở thành $t^2+4t+3 = (t+1)(t+3)$).*

2. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Tính tích phân:

   $$I = \int_0^1\frac{dx}{1+\sqrt{3x+1}}.$$

   *(Gợi ý: Đặt $t = \sqrt{3x+1} \implies 3x+1 = t^2 \implies dx = \frac{2}{3}t\,dt$, cận từ $t=1$ đến $t=2$).*

3. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Tính tích phân:

   $$I = \int_0^1 x\ln(x+1)\,dx.$$

   *(Gợi ý: Đặt $u = \ln(x+1)$, $dv = x\,dx$, chọn $v = \frac{x^2-1}{2}$ để triệt tiêu ngay nhân tử $(x+1)$ trong $\int v\,du$).*

4. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Tính tích phân:

   $$I = \int_{\sqrt{3}}^{2\sqrt{2}}\frac{1}{x\sqrt{x^2+1}}\,dx.$$

   *(Gợi ý: Nhân cả tử và mẫu với $x$, đặt $t = \sqrt{x^2+1} \implies x^2 = t^2-1, x\,dx = t\,dt$, cận từ $t=2$ đến $t=3$).*

**B. Bài tập tự luyện mở rộng**

5. Tính các tích phân xác định sau:
   - a. $\displaystyle\int_{-1}^1\frac{x\,dx}{x^2+x+1}$.
   - b. $\displaystyle\int_0^\pi e^x\cos^2 x\,dx$.
   - c. $\displaystyle\int_0^1 x^{15}\sqrt{1+3x^8}\,dx$ *(Gợi ý: Đặt $t=\sqrt{1+3x^8}$)*.
   - d. $\displaystyle\int_0^a x^2\sqrt{a^2-x^2}\,dx\quad (a>0)$.


<a id="dang-14"></a>

### Dạng 14: Ứng dụng hình học của tích phân xác định

#### Phương pháp chủ yếu

**1. Diện tích hình phẳng:**

- Hình phẳng giới hạn bởi hai đồ thị $y=f(x)$, $y=g(x)$ và hai đường thẳng $x=a, x=b$:

  $$S = \int_a^b \big|f(x) - g(x)\big|\,dx.$$

**2. Thể tích vật thể tròn xoay:**

- Quay hình phẳng giới hạn bởi $y=f(x)$, trục $Ox$ và $x=a, x=b$ quanh trục $Ox$:

  $$V_{Ox} = \pi\int_a^b \big[f(x)\big]^2\,dx.$$

- Quay hình phẳng giới hạn bởi $y=f(x)\ge 0$, trục $Ox$ và $0\le a\le x\le b$ quanh trục $Oy$ (phương pháp lớp vỏ trụ):

  $$V_{Oy} = 2\pi\int_a^b x f(x)\,dx.$$

**3. Độ dài cung phẳng và diện tích mặt tròn xoay:**

- Độ dài đường cong $y=f(x)$ trên đoạn $[a,b]$:

  $$L = \int_a^b \sqrt{1 + \big[f'(x)\big]^2}\,dx.$$

- Diện tích mặt tròn xoay khi quay cung $y=f(x)\ge 0$ ($a\le x\le b$) quanh trục $Ox$:

  $$S_{Ox} = 2\pi\int_a^b f(x)\sqrt{1 + \big[f'(x)\big]^2}\,dx.$$

#### Các bài tập

1. Tính diện tích hình phẳng giới hạn bởi các đường $y = 6 - x^2$ và $y = |x|$.
2. Tính độ dài đường cong $y = \ln(\sin x)$ trên đoạn $\left[\dfrac{\pi}{4}, \dfrac{\pi}{2}\right]$.
3. Tính thể tích khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi $y = x e^x$, $y=0$, $x=0$, $x=1$ quanh trục $Ox$.
4. Tính độ dài cung, diện tích mặt tròn xoay và thể tích vật thể tròn xoay tạo bởi đường astroid $x^{2/3} + y^{2/3} = a^{2/3}$ ($a>0$) khi quay quanh trục $Ox$.


<a id="dang-15"></a>

### Dạng 15: Xét sự hội tụ và tính giá trị của tích phân suy rộng (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

**1. Định nghĩa và cách tính trực tiếp tích phân suy rộng (Dạng bài xuất hiện trong 100% các đề thi MAT1091):**

- **Tích phân suy rộng loại 1 (cận vô hạn):**

  $$\int_a^{+\infty} f(x)\,dx = \lim_{A\to+\infty}\int_a^A f(x)\,dx.$$

  Nếu giới hạn bên phải tồn tại hữu hạn thì tích phân **hội tụ** và có giá trị bằng giới hạn đó; ngược lại thì **phân kỳ**.
- **Tích phân suy rộng loại 2 (hàm không bị chặn tại cận $b$):**

  $$\int_a^b f(x)\,dx = \lim_{\varepsilon\to 0^+}\int_a^{b-\varepsilon} f(x)\,dx.$$

**2. Kỹ thuật xử lý 2 mẫu bài tích phân suy rộng kinh điển trong đề thi MAT1091:**

- **Mẫu 1: Phân thức hữu tỉ dạng $\displaystyle\int_1^{+\infty}\frac{Ax+B}{x^2(x+1)}\,dx$ hoặc $\displaystyle\int_1^{+\infty}\frac{dx}{(x+1)^2(x+2)^2}$:**
  - Phân tích thành phân thức đơn giản:

    $$\frac{Ax+B}{x^2(x+1)} = \frac{A(x+1) + (B-A)\big((x+1)-x\big)}{x^2(x+1)} = \frac{A-B}{x} + \frac{B}{x^2} + \frac{B-A}{x+1}.$$

  - **Cảnh báo lỗi sai hay gặp:** Khi lấy nguyên hàm của $\dfrac{A-B}{x} + \dfrac{B-A}{x+1}$, hai hệ số của $\ln|x|$ và $\ln|x+1|$ luôn đối nhau nên **phải gộp lại thành một logarit của thương** trước khi lấy giới hạn $A\to+\infty$:

    $$(A-B)\ln x - (A-B)\ln(x+1) = (A-B)\ln\left(\frac{x}{x+1}\right) \xrightarrow{x\to+\infty} (A-B)\ln 1 = 0.$$

    *(Nếu tách rời thành $\lim_{x\to+\infty}\ln x - \lim_{x\to+\infty}\ln(x+1)$ sẽ rơi vào dạng vô định $\infty-\infty$!)*
- **Mẫu 2: Tích của đa thức và hàm mũ âm dạng $\displaystyle\int_a^{+\infty} (px+q)e^{-kx}\,dx$ ($k>0$):**
  - Tính $\displaystyle\int_a^A (px+q)e^{-kx}\,dx$ bằng tích phân từng phần (đặt $u=px+q$, $dv=e^{-kx}\,dx$), sau đó chuyển qua giới hạn $A\to+\infty$ và dùng kết quả chuẩn $\lim_{A\to+\infty} A\cdot e^{-kA} = 0$.

**3. Các tiêu chuẩn xét sự hội tụ (khi không yêu cầu tính giá trị chính xác):**

- **Tích phân chuẩn Riemann:**
  - Ở cận $+\infty$ ($a>0$): $\displaystyle\int_a^{+\infty}\frac{dx}{x^\alpha}$ hội tụ $\iff \alpha > 1$; phân kỳ $\iff \alpha \le 1$.
  - Ở cận hữu hạn $x\to a^+$: $\displaystyle\int_a^b\frac{dx}{(x-a)^\alpha}$ hội tụ $\iff \alpha < 1$; phân kỳ $\iff \alpha \ge 1$.
- **Tiêu chuẩn so sánh cho hàm không âm $f(x), g(x) \ge 0$:**
  - Nếu $f(x) \sim g(x)$ khi $x\to+\infty$ (hoặc khi $x\to b^-$ tại điểm kỳ dị) thì $\int f(x)\,dx$ và $\int g(x)\,dx$ có **cùng bản chất hội tụ hoặc phân kỳ**.
- **Hội tụ tuyệt đối và bán hội tụ:** Nếu $\int_a^{+\infty} |f(x)|\,dx$ hội tụ thì $\int_a^{+\infty} f(x)\,dx$ hội tụ (gọi là **hội tụ tuyệt đối**). Nếu $\int_a^{+\infty} f(x)\,dx$ hội tụ (thường chứng minh bằng dấu hiệu Dirichlet) nhưng $\int_a^{+\infty} |f(x)|\,dx$ phân kỳ thì gọi là **bán hội tụ**.

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2022–2023; [ĐT01](#nguon-dt01))* Tính tích phân suy rộng:

   $$\int_1^{+\infty}\frac{x-1}{x^2(x+1)}\,dx.$$

2. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Xét sự hội tụ của tích phân suy rộng sau, tìm giá trị của tích phân trong trường hợp hội tụ:

   $$\int_1^{+\infty} x e^{-2x}\,dx.$$

3. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Chứng minh rằng tích phân:

   $$I = \int_1^\infty\frac{1}{(x^2+3x+2)^2}\,dx$$

   hội tụ và tính giá trị của nó.

4. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Tính tích phân suy rộng:

   $$I = \int_1^\infty\frac{1}{x^2(x+1)}\,dx.$$

5. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Tính tích phân suy rộng:

   $$I = \int_0^\infty\frac{3x+1}{e^{2x}}\,dx.$$

6. *(Đề thi MAT1091 – HK Hè 2025-2026; [ĐT06](#nguon-dt06))* Xét sự hội tụ của tích phân suy rộng sau và tìm giá trị của tích phân trong trường hợp hội tụ:

   $$\int_1^{+\infty}\frac{x-2}{x^2(x+1)}\,dx.$$

**B. Bài tập tự luyện mở rộng**

7. Xét sự hội tụ của các tích phân suy rộng sau:
   - a. $\displaystyle\int_1^{+\infty}\frac{\ln x}{x^2+1}\,dx$.
   - b. $\displaystyle\int_0^1\frac{\ln(1+\sin x)}{(e^x-1)\sqrt{x}}\,dx$.
   - c. $\displaystyle\int_1^{+\infty}\frac{\sin x}{x^\alpha}\,dx\quad (\alpha > 0)$ (xét hội tụ tuyệt đối và bán hội tụ theo $\alpha$).
8. Tính các tích phân suy rộng sau:
   - a. $\displaystyle\int_1^{+\infty}(x^2+1)e^{-x}\,dx$.
   - b. $\displaystyle\int_{-\infty}^{+\infty}\frac{dx}{x^2+2x+5}$.


[↑ Trở về mục lục](#muc-luc)

---

<a id="chuong-5"></a>

## Chương V. CHUỖI SỐ VÀ CHUỖI HÀM


<a id="dang-16"></a>

### Dạng 16: Khảo sát sự hội tụ của chuỗi số dương (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

Cho chuỗi số $\displaystyle\sum_{n=1}^\infty u_n$. Dãy tổng riêng thứ $N$ là $\displaystyle S_N = \sum_{k=1}^N u_k$. Nếu tồn tại giới hạn hữu hạn $\lim_{N\to+\infty} S_N = S$ thì chuỗi **hội tụ** và có tổng bằng $S$; ngược lại chuỗi **phân kỳ**.

**1. Điều kiện cần để chuỗi hội tụ (Kiểm tra đầu tiên):**

- Nếu chuỗi $\sum_{n=1}^\infty u_n$ hội tụ thì $\lim_{n\to+\infty} u_n = 0$.
- **Hệ quả (Dấu hiệu phân kỳ):** Nếu $\lim_{n\to+\infty} u_n \ne 0$ (hoặc không tồn tại) thì chuỗi $\sum_{n=1}^\infty u_n$ **phân kỳ ngay lập tức**.

**2. Hai chuỗi chuẩn cần nhớ:**

- **Chuỗi cấp số nhân:** $\displaystyle\sum_{n=0}^\infty q^n$ hội tụ khi $|q| < 1$ (tổng bằng $\dfrac{1}{1-q}$) và phân kỳ khi $|q|\ge 1$.
- **Chuỗi điều hòa suy rộng (Dirichlet / Riemann):** $\displaystyle\sum_{n=1}^\infty\frac{1}{n^\alpha}$ **hội tụ khi và chỉ khi $\alpha > 1$**, và **phân kỳ khi $\alpha \le 1$**.

**3. Bốn tiêu chuẩn hội tụ của chuỗi số dương ($u_n > 0$):**

- **Tiêu chuẩn Cauchy (Căn số – Dạng bài xuất hiện nhiều nhất trong đề thi MAT1091):**
  Khi $u_n$ có dạng lũy thừa bậc $n$ như $u_n = [a_n]^n$, xét giới hạn:

  $$C = \lim_{n\to+\infty}\sqrt[n]{u_n}.$$

  - Nếu $C < 1$: chuỗi **hội tụ**.
  - Nếu $C > 1$: chuỗi **phân kỳ**.
  - Nếu $C = 1$: chưa kết luận được (cần kiểm tra $\lim u_n$ hoặc dùng tiêu chuẩn so sánh).

- **Tiêu chuẩn D'Alembert (Tỷ số):**
  Khi $u_n$ chứa giai thừa $n!$ hoặc tích kết hợp lũy thừa $a^n$, xét giới hạn:

  $$D = \lim_{n\to+\infty}\frac{u_{n+1}}{u_n}.$$

  - Nếu $D < 1$: chuỗi **hội tụ**; nếu $D > 1$: chuỗi **phân kỳ**; nếu $D = 1$: chưa kết luận được.

- **Tiêu chuẩn so sánh:** Cho hai chuỗi dương $\sum u_n$ và $\sum v_n$ (thường chọn $v_n = \dfrac{1}{n^\alpha}$ hoặc $v_n = q^n$):
  - Nếu $\lim_{n\to+\infty}\dfrac{u_n}{v_n} = k$ với $0 < k < +\infty$ (tức là $u_n \sim k v_n$ khi $n\to+\infty$) thì hai chuỗi $\sum u_n$ và $\sum v_n$ **cùng hội tụ hoặc cùng phân kỳ**.
- **Tiêu chuẩn tích phân Cauchy – Maclaurin:** Nếu $f(x)$ dương, liên tục và đơn điệu giảm trên $[1, +\infty)$ với $u_n = f(n)$ thì chuỗi $\sum_{n=1}^\infty u_n$ và tích phân suy rộng $\int_1^{+\infty} f(x)\,dx$ cùng hội tụ hoặc cùng phân kỳ.

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Khảo sát sự hội tụ của chuỗi số:

   $$\sum_{n=1}^\infty\left(\frac{3n+1}{4n+2}\right)^n.$$

2. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Khảo sát sự hội tụ của chuỗi số:

   $$\sum_{n=1}^\infty\left(\frac{4n+1}{5n+2}\right)^n.$$

3. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Khảo sát sự hội tụ của chuỗi số:

   $$\sum_{n=1}^\infty\left(\frac{2n^2+n+1}{3n^2+2}\right)^n.$$

**B. Bài tập tự luyện mở rộng**

4. Khảo sát sự hội tụ của các chuỗi số dương sau:
   - a. $\displaystyle\sum_{n=1}^\infty\frac{2^n + 3^n}{5^n}$ và $\displaystyle\sum_{n=1}^\infty\frac{n^2+1}{2n^4+3n-1}$.
   - b. $\displaystyle\sum_{n=1}^\infty\frac{n!}{n^n}$ và $\displaystyle\sum_{n=1}^\infty\frac{3^n\cdot n!}{(2n)!}$.
   - c. $\displaystyle\sum_{n=1}^\infty\left(\frac{n}{n+1}\right)^{n^2}$ và $\displaystyle\sum_{n=1}^\infty\left(\frac{n+1}{n+2}\right)^n$.
   - d. $\displaystyle\sum_{n=2}^\infty\frac{1}{n\ln^\alpha n}\quad (\alpha > 0)$.
   - e. $\displaystyle\sum_{n=1}^\infty\sin\left(\frac{\pi}{2^n}\right)$ và $\displaystyle\sum_{n=1}^\infty\ln\left(1 + \frac{1}{n^2}\right)$.


<a id="dang-17"></a>

### Dạng 17: Chuỗi đan dấu, hội tụ tuyệt đối và bán hội tụ

#### Phương pháp chủ yếu

**1. Tiêu chuẩn Leibniz cho chuỗi đan dấu $\displaystyle\sum_{n=1}^\infty (-1)^{n-1} b_n$ (hoặc $\sum_{n=1}^\infty (-1)^n b_n$) với $b_n > 0$:**

Chuỗi đan dấu **hội tụ** nếu thỏa mãn đồng thời **hai điều kiện**:

1. Dãy $\{b_n\}$ **đơn điệu giảm** (với mọi $n\ge n_0$: $b_{n+1} \le b_n$, hoặc xét hàm $f(x)$ tương ứng có $f'(x) \le 0$ khi $x\ge n_0$).
2. $\displaystyle\lim_{n\to+\infty} b_n = 0$.

*(Chú ý: Bước xét tại hai đầu mút $x = x_0 \pm R$ của bài toán tìm miền hội tụ chuỗi lũy thừa ở Dạng 18 và Dạng 19 chính là áp dụng trực tiếp Tiêu chuẩn Leibniz này!)*

**2. Hội tụ tuyệt đối và bán hội tụ:**

- Chuỗi $\sum u_n$ được gọi là **hội tụ tuyệt đối** nếu chuỗi trị tuyệt đối $\sum |u_n|$ hội tụ. *(Định lý: Mọi chuỗi hội tụ tuyệt đối đều hội tụ).*
- Chuỗi $\sum u_n$ được gọi là **bán hội tụ (hội tụ có điều kiện)** nếu bản thân chuỗi $\sum u_n$ hội tụ nhưng chuỗi $\sum |u_n|$ phân kỳ.

#### Các bài tập

Khảo sát sự hội tụ, hội tụ tuyệt đối hay bán hội tụ của các chuỗi số sau:

1. $\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n-1}}{2n+1}$ và $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{3n^2+1}$.
2. $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n\cdot n}{n^2+1}$.
3. $\displaystyle\sum_{n=1}^\infty (-1)^n\frac{2n+1}{3n+2}$ *(Chú ý kiểm tra điều kiện cần $\lim u_n = 0$!)*.
4. $\displaystyle\sum_{n=2}^\infty\frac{(-1)^n}{\sqrt{n} + (-1)^n}$.


<a id="dang-18"></a>

### Dạng 18: Tìm bán kính hội tụ và miền hội tụ của chuỗi lũy thừa (Trọng tâm đề thi MAT1091)

#### Phương pháp chủ yếu

Xét chuỗi lũy thừa có dạng chính tắc:

$$\sum_{n=1}^\infty a_n (x - x_0)^n\qquad (\text{trường hợp riêng } x_0=0:\ \sum_{n=1}^\infty a_n x^n).$$

**Quy trình 3 bước chuẩn mực (Câu hỏi xuất hiện trong 100% các đề thi MAT1091):**

- **Bước 1: Tìm bán kính hội tụ $R$**
  Tính giới hạn tỷ số hoặc căn bậc $n$ của hệ số $|a_n|$:

  $$\rho = \lim_{n\to+\infty}\left|\frac{a_{n+1}}{a_n}\right|\qquad\text{hoặc}\qquad \rho = \lim_{n\to+\infty}\sqrt[n]{|a_n|}.$$

  Khi đó bán kính hội tụ $R$ được xác định bởi:

  $$R = \begin{cases}\dfrac{1}{\rho},&\text{nếu } 0 < \rho < +\infty,\\+\infty,&\text{nếu } \rho = 0,\\0,&\text{nếu } \rho = +\infty.\end{cases}$$

  Suy ra khoảng hội tụ của chuỗi là $(x_0 - R,\, x_0 + R)$.

- **Bước 2: Xét sự hội tụ tại hai đầu mút $x_1 = x_0 - R$ và $x_2 = x_0 + R$**
  - **Tại $x = x_0 + R$:** Thay vào chuỗi đầu bài, thông thường phần lũy thừa $R^n$ triệt tiêu với mẫu số/tử số để trở thành chuỗi số dương dạng $\displaystyle\sum_{n=1}^\infty \frac{P(n)}{Q(n)}$. So sánh với chuỗi Riemann $\sum \frac{1}{n^\alpha}$ để kết luận hội tụ hay phân kỳ.
  - **Tại $x = x_0 - R$:** Thay vào chuỗi đầu bài, xuất hiện nhân tử $(-1)^n$ tạo thành **chuỗi đan dấu** $\displaystyle\sum_{n=1}^\infty (-1)^n b_n$.
    - Nếu ở đầu mút $x_0+R$ chuỗi dương đã hội tụ, thì tại $x_0-R$ chuỗi **hội tụ tuyệt đối** nên hội tụ ngay!
    - Nếu ở đầu mút $x_0+R$ chuỗi dương phân kỳ (ví dụ dạng $\sum \frac{1}{n+1}$ hoặc $\sum \frac{1}{2n+1}$), ta dùng **Tiêu chuẩn Leibniz** để kết luận chuỗi đan dấu tại $x_0-R$ hội tụ.

- **Bước 3: Kết luận miền hội tụ $D$**
  Ghi rõ miền hội tụ là đoạn $[x_0-R, x_0+R]$, nửa khoảng $[x_0-R, x_0+R)$, $(x_0-R, x_0+R]$ hoặc khoảng $(x_0-R, x_0+R)$.

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – HK Hè 2022–2023; [ĐT01](#nguon-dt01))* Tìm miền hội tụ của chuỗi lũy thừa:

   $$\sum_{n=1}^\infty\frac{n}{(n^2+1)3^n}x^n.$$

2. *(Đề thi MAT1091 – HK Hè 2023–2024; [ĐT03](#nguon-dt03))* Tìm miền hội tụ của chuỗi lũy thừa:

   $$\sum_{n=1}^{+\infty}\frac{(x-1)^n}{2^n(3n^2+1)}.$$

3. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Tìm miền hội tụ của chuỗi lũy thừa:

   $$\sum_{n=1}^\infty\frac{2^n}{n+1}(x-1)^n.$$

4. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Tìm miền hội tụ của chuỗi lũy thừa:

   $$\sum_{n=1}^\infty\frac{3^n}{n^2+1}x^n.$$

5. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Tìm miền hội tụ của chuỗi lũy thừa:

   $$\sum_{n=1}^\infty\frac{5^n}{(n+1)(n+2)}x^n.$$

6. *(Đề thi MAT1091 – HK Hè 2025-2026; [ĐT06](#nguon-dt06))* Tìm miền hội tụ của chuỗi lũy thừa:

   $$\sum_{n=1}^\infty\frac{(x+1)^n}{3^n(2n+1)}.$$

**B. Bài tập tự luyện mở rộng**

7. Tìm miền hội tụ của các chuỗi lũy thừa sau:
   - a. $\displaystyle\sum_{n=1}^\infty\frac{(x+2)^n}{n\cdot 4^n}$.
   - b. $\displaystyle\sum_{n=1}^\infty\frac{n!}{n^n}x^n$.
   - c. $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{\sqrt{n}}(x-3)^n$.


<a id="dang-19"></a>

### Dạng 19: Tìm miền hội tụ của chuỗi hàm tổng quát (Trọng tâm phân loại điểm 9–10 MAT1091)

#### Phương pháp chủ yếu

Trong đề thi cuối kỳ MAT1091, câu cuối cùng thường yêu cầu tìm miền hội tụ của chuỗi hàm $\displaystyle\sum_{n=1}^\infty u_n(x)$ không ở dạng chuỗi lũy thừa thuần túy. Có **hai mẫu bài tiêu biểu** và phương pháp xử lý như sau:

**1. Mẫu 1: Chuỗi hàm dạng $\displaystyle\sum_{n=1}^\infty \left[\frac{P(n)}{Q(n)}\,\varphi(x)\right]^n$ (như trong Đề 2023–2024 và Đề 2024–2025):**

- **Bước 1:** Xét chuỗi trị tuyệt đối $\sum_{n=1}^\infty |u_n(x)|$ bằng tiêu chuẩn Cauchy:

  $$C(x) = \lim_{n\to+\infty}\sqrt[n]{|u_n(x)|} = \lim_{n\to+\infty}\left|\frac{P(n)}{Q(n)}\right|\cdot |\varphi(x)| = |\varphi(x)|\quad \left(\text{khi } \lim_{n\to+\infty}\frac{P(n)}{Q(n)}=1\right).$$

  - Với $|\varphi(x)| < 1$: Chuỗi hội tụ tuyệt đối $\implies$ chuỗi hội tụ.
  - Với $|\varphi(x)| > 1$: Chuỗi phân kỳ (do $\lim_{n\to+\infty} |u_n(x)| = +\infty \ne 0$).
- **Bước 2 (Điểm mấu chốt ăn điểm tối đa):** Xét tại biên $|\varphi(x)| = 1$, tức là $\varphi(x) = 1$ và $\varphi(x) = -1$:
  - Thay $\varphi(x) = \pm 1$ vào chuỗi ban đầu, số hạng tổng quát có dạng $\pm\left(\dfrac{n+a}{n+b}\right)^n$.
  - Sử dụng giới hạn chuẩn $\displaystyle\lim_{n\to+\infty}\left(1 + \frac{k}{n+b}\right)^n = e^k \ne 0$.
  - Vì giới hạn của $\big|u_n(x)\big|$ bằng $e^{a-b} \ne 0$, nên $\lim_{n\to+\infty} u_n(x) \ne 0$ (vi phạm điều kiện cần!). Do đó tại cả hai trường hợp $\varphi(x)=1$ và $\varphi(x)=-1$, chuỗi đều **phân kỳ**.
- **Bước 3:** Giải bất phương trình $|\varphi(x)| < 1$ (ví dụ $|x^2-1| < 1 \iff -1 < x^2-1 < 1 \iff 0 < x^2 < 2 \iff x\in(-\sqrt{2}, \sqrt{2})\setminus\{0\}$) để kết luận miền hội tụ. *(Lưu ý: Rất nhiều sinh viên quên loại điểm $x=0$ khi giải $0 < x^2 < 2$!)*

**2. Mẫu 2: Chuỗi hàm chứa $n!$ và $n^n$ dạng $\displaystyle\sum_{n=1}^\infty n!\left(\frac{ax+b}{n}\right)^n$ (như trong Đề CLC Hóa 2025–2026):**

- Với $ax+b = 0 \iff x = -\dfrac{b}{a}$: Chuỗi toàn số $0$ nên hiển nhiên hội tụ.
- Với $ax+b \ne 0$: Xét chuỗi trị tuyệt đối bằng tiêu chuẩn D'Alembert:

  $$D(x) = \lim_{n\to+\infty}\left|\frac{u_{n+1}(x)}{u_n(x)}\right| = \lim_{n\to+\infty}\frac{(n+1)!\,|ax+b|^{n+1}}{(n+1)^{n+1}}\cdot\frac{n^n}{n!\,|ax+b|^n} = |ax+b|\cdot\lim_{n\to+\infty}\frac{1}{\left(1+\frac{1}{n}\right)^n} = \frac{|ax+b|}{e}.$$

  - Chuỗi hội tụ khi $\dfrac{|ax+b|}{e} < 1 \iff |ax+b| < e$.
  - Chuỗi phân kỳ khi $|ax+b| > e$.
- **Xét tại biên $|ax+b| = e$:** Khi đó $|u_n(x)| = \dfrac{n!\,e^n}{n^n}$. Ta kiểm tra tỷ số:

  $$\frac{|u_{n+1}|}{|u_n|} = \frac{e}{\left(1+\frac{1}{n}\right)^n} > 1\quad \left(\text{do } \left(1+\frac{1}{n}\right)^n < e\ \forall n\in\mathbb N^*\right).$$

  Suy ra dãy $\{|u_n(x)|\}$ tăng ngặt và $|u_n(x)| \ge |u_1(x)| = e > 0$, nên $\lim_{n\to+\infty} u_n(x) \ne 0$. Vậy tại $|ax+b| = e$, chuỗi **phân kỳ**.

#### Các bài tập

**A. Bài tập trích từ đề thi kết thúc học phần MAT1091**

1. *(Đề thi MAT1091 – Năm học 2023–2024; [ĐT02](#nguon-dt02))* Tìm miền hội tụ của chuỗi hàm:

   $$\sum_{n=1}^\infty\left[\frac{(n+2)(x^2-1)}{n+1}\right]^n.$$

2. *(Đề thi MAT1091 – Năm học 2024–2025; [ĐT04](#nguon-dt04))* Tìm miền hội tụ của chuỗi hàm:

   $$\sum_{n=1}^\infty\left[\frac{(n+2)(x^2-1)}{n+3}\right]^n.$$

3. *(Đề thi MAT1091 – CLC Hóa 2025–2026; [ĐT05](#nguon-dt05))* Tìm miền hội tụ của chuỗi hàm:

   $$\sum_{n=1}^\infty n!\left(\frac{2x+3}{n}\right)^n.$$

**B. Bài tập tự luyện mở rộng**

4. Tìm miền hội tụ của các chuỗi hàm sau:
   - a. $\displaystyle\sum_{n=1}^\infty\frac{1}{n^x}$ và $\displaystyle\sum_{n=1}^\infty\frac{\cos(nx)}{2^n}$.
   - b. $\displaystyle\sum_{n=1}^\infty\frac{1}{n\cdot 3^n}\left(\frac{x-1}{x+1}\right)^n$.
   - c. $\displaystyle\sum_{n=1}^\infty\frac{n^n}{n!}(3x-1)^n$.


<a id="dang-20"></a>

### Dạng 20: Khai triển hàm số thành chuỗi lũy thừa và chuỗi Fourier

#### Phương pháp chủ yếu

**1. Khai triển hàm số thành chuỗi Taylor – Maclaurin (Chuỗi lũy thừa):**

- Sử dụng các chuỗi Maclaurin chuẩn (như ở Dạng 10) trên miền hội tụ tương ứng của chúng:
  - $\displaystyle e^u = \sum_{n=0}^\infty\frac{u^n}{n!},\quad \forall u\in\mathbb R$.
  - $\displaystyle\sin u = \sum_{n=0}^\infty (-1)^n\frac{u^{2n+1}}{(2n+1)!},\quad \forall u\in\mathbb R;\qquad \cos u = \sum_{n=0}^\infty (-1)^n\frac{u^{2n}}{(2n)!},\quad \forall u\in\mathbb R$.
  - $\displaystyle\frac{1}{1-u} = \sum_{n=0}^\infty u^n,\quad \forall u\in(-1, 1)$.
  - $\displaystyle\ln(1+u) = \sum_{n=1}^\infty (-1)^{n-1}\frac{u^n}{n},\quad \forall u\in(-1, 1]$.
- Có thể kết hợp **đạo hàm từng số hạng** hoặc **tích phân từng số hạng** của chuỗi lũy thừa trong khoảng hội tụ để tìm chuỗi khai triển hoặc tính tổng của chuỗi số.

**2. Chuỗi Fourier của hàm số tuần hoàn chu kỳ $2\pi$ (hoặc trên đoạn $[-\pi, \pi]$):**

- Cho hàm $f(x)$ khả tích trên $[-\pi, \pi]$ và tuần hoàn với chu kỳ $2\pi$. Chuỗi Fourier của $f(x)$ có dạng:

  $$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty \big(a_n\cos(nx) + b_n\sin(nx)\big),$$

  trong đó các hệ số Euler – Fourier được tính bởi:

  $$a_0 = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\,dx,\qquad a_n = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\cos(nx)\,dx,\qquad b_n = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\sin(nx)\,dx\quad (n\ge 1).$$

- **Rút gọn cho hàm chẵn / hàm lẻ trên $[-\pi, \pi]$:**
  - Nếu $f(x)$ là **hàm chẵn** trên $[-\pi, \pi]$: $b_n = 0\ (\forall n\ge 1)$ và $\displaystyle a_n = \frac{2}{\pi}\int_0^\pi f(x)\cos(nx)\,dx\ (\forall n\ge 0)$.
  - Nếu $f(x)$ là **hàm lẻ** trên $[-\pi, \pi]$: $a_0 = 0,\ a_n = 0\ (\forall n\ge 1)$ và $\displaystyle b_n = \frac{2}{\pi}\int_0^\pi f(x)\sin(nx)\,dx\ (\forall n\ge 1)$.
- **Định lý Dirichlet:** Nếu $f(x)$ tuần hoàn chu kỳ $2\pi$ và trơn từng khúc trên $[-\pi, \pi]$ thì chuỗi Fourier của $f(x)$ hội tụ tại mọi điểm $x\in\mathbb R$ tới giá trị trung bình cộng hai giới hạn một phía:

  $$S(x) = \frac{f(x^+) + f(x^-)}{2}$$

  (tại điểm mà $f$ liên tục thì $S(x) = f(x)$).

#### Các bài tập

1. Khai triển các hàm số sau thành chuỗi Maclaurin và chỉ rõ miền hội tụ của chuỗi thu được:
   - a. $f(x) = \dfrac{x+2}{x^2-3x+2}$.
   - b. $f(x) = \ln(x^2+3x+2)$.
   - c. $f(x) = \sin^2 x$ và $f(x) = x\arctan x$.
2. Khai triển các hàm số tuần hoàn chu kỳ $2\pi$ sau thành chuỗi Fourier trên đoạn $[-\pi, \pi]$:
   - a. $f(x) = |x|$ với $x\in[-\pi, \pi]$. Từ đó tính tổng chuỗi $\displaystyle\sum_{k=1}^\infty\frac{1}{(2k-1)^2}$.
   - b. $f(x) = x$ với $x\in(-\pi, \pi)$.
   - c. $f(x) = x^2$ với $x\in[-\pi, \pi]$. Từ đó tính tổng các chuỗi $\displaystyle\sum_{n=1}^\infty\frac{1}{n^2}$ và $\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n-1}}{n^2}$.

[↑ Trở về mục lục](#muc-luc)

