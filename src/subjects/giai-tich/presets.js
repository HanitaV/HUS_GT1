// Tiệm Cận — các hình minh họa dựng sẵn, bám theo "Hướng dẫn ôn tập Giải tích I (MAT1091)".
// Mỗi preset ghi rõ dạng bài và nguồn đề (ĐT01–ĐT06) giống tài liệu gốc.
// Dùng: <tc-scene preset="dang02-kep"></tc-scene>
// Mọi tham số của preset có thể ghi đè bằng thuộc tính HTML cùng tên.

const sumTo = (n, term) => { let s = 0; for (let k = 1; k <= n; k++) s += term(k); return s; };

export const PRESETS = {
  // ── Chương I ──
  'dang02-dinh-nghia': {
    kind: 'limit-sequence', number: '1.1',
    title: 'Định nghĩa giới hạn dãy số: $\\lim u_n = L$',
    u: '1 + (-1)^n / n', L: 1, nMax: 40, eps: 0.2,
    predict: 'Bấm Chạy: $\\varepsilon$ sẽ bị thu nhỏ dần. Khi đó $n_0$ sẽ…',
    predictOptions: 'Lớn lên|Nhỏ đi|Không đổi', predictAnswer: 1,
    predictExplain: 'Dải hẹp hơn thì phải đi xa hơn mới chắc chắn mọi số hạng nằm trong dải: $n_0$ phụ thuộc $\\varepsilon$ và tăng khi $\\varepsilon \\to 0$.',
    caption: 'Với mọi $\\varepsilon > 0$ tồn tại $n_0$ sao cho $|u_n - L| < \\varepsilon$ với mọi $n > n_0$. Dãy $u_n = 1 + \\frac{(-1)^n}{n}$ dao động quanh $L = 1$, mỗi lúc một gần hơn, nhưng không số hạng nào bằng 1. Thu nhỏ $\\varepsilon$ thì $n_0$ phải lớn lên.',
  },
  'dang02-kep': {
    kind: 'squeeze', number: '1.2', mode: 'sequence',
    title: 'Nguyên lý kẹp — bài tập 1c, Dạng 2',
    a: 'n / sqrt(n^2 + n)',
    u: (n) => sumTo(Math.round(n), (k) => 1 / Math.sqrt(n * n + k)),
    b: 'n / sqrt(n^2 + 1)',
    L: 1, nMax: 30,
    aTex: 'a_n', uTex: 'u_n', bTex: 'b_n',
    caption: 'Tổng $u_n = \\sum_{k=1}^{n} \\frac{1}{\\sqrt{n^2+k}}$ có $n$ số hạng, số hạng nhỏ nhất là $\\frac{1}{\\sqrt{n^2+n}}$ và lớn nhất là $\\frac{1}{\\sqrt{n^2+1}}$. Vì vậy $\\frac{n}{\\sqrt{n^2+n}} \\le u_n \\le \\frac{n}{\\sqrt{n^2+1}}$, và cả hai cận đều tiến về 1.',
  },
  'dang02-truy-hoi': {
    kind: 'cobweb', number: '1.3',
    title: 'Dãy truy hồi $u_{n+1} = \\sqrt{2 + u_n}$ — bài tập 2a, Dạng 2',
    g: 'sqrt(2 + x)', u1: 'sqrt(2)', L: 2, steps: 6, x: '1.3, 2.12', y: '1.3, 2.12', gTex: '\\sqrt{2+x}',
    caption: 'Bước dọc tới đồ thị $y = g(x)$ cho giá trị kế tiếp, bước ngang tới đường $y = x$ đưa giá trị đó về trục hoành. Dãy tăng, bị chặn trên bởi 2, nên hội tụ (định lý Weierstrass); giới hạn là nghiệm dương của $L = \\sqrt{2+L}$.',
  },
  'dang02-newton': {
    kind: 'cobweb', number: '1.4',
    title: 'Dãy $u_{n+1} = \\frac12\\left(u_n + \\frac{a}{u_n}\\right)$ với $a = 2$ — bài tập 2c, Dạng 2',
    g: '(x + 2/x) / 2', u1: 3, L: 'sqrt(2)', steps: 5, x: '0, 3.4', y: '0, 3.4', gTex: '\\tfrac12(x + \\tfrac{2}{x})',
    caption: 'Từ $n = 2$ trở đi dãy giảm và bị chặn dưới bởi $\\sqrt{a}$ (bất đẳng thức Cauchy), nên hội tụ về $\\sqrt{a}$. Sai số gần như bình phương sau mỗi bước.',
  },

  // ── Chương II ──
  'dang03-gioi-han': {
    kind: 'function-limit', number: '2.1',
    title: 'Giới hạn dạng $\\frac{0}{0}$ — ĐT03, HK Hè 2023–2024',
    f: '(sqrt(1 + 2x) - cbrt(1 - 3x)) / x', x0: 0, L: 2, x: '-0.45, 0.28', h: 0.25,
    ftex: 'f(x)',
    caption: '$f(x) = \\frac{\\sqrt{1+2x} - \\sqrt[3]{1-3x}}{x}$ không xác định tại $x = 0$. Dùng $\\sqrt[k]{1+u} - 1 \\sim \\frac{u}{k}$: tử số $\\sim x - (-x) = 2x$, nên $L = 2$. Hình cho thấy giới hạn tồn tại dù $f(0)$ không tồn tại.',
  },
  'dang03-vcb': {
    kind: 'vcb', number: '2.1b', mode: 'ratio',
    title: 'Vô cùng bé tương đương: $\\sqrt{1+2x} - 1 \\sim x$',
    f: 'sqrt(1 + 2x) - 1', g: 'x', ftex: '\\sqrt{1+2x}-1', gtex: 'x', delta: 0.45,
    caption: 'Đây là bước then chốt của bài ĐT03: tách tử số thành $(\\sqrt{1+2x}-1) - (\\sqrt[3]{1-3x}-1)$ rồi thay từng phần bằng VCB tương đương. Phóng to để thấy vì sao phép thay hợp lệ: tỉ số tiến về 1.',
  },
  'dang10-bay-tong': {
    kind: 'vcb', number: '3.4', mode: 'difference',
    title: 'Vì sao không thay VCB trong hiệu: $\\tan x - x$',
    f1: 'tan(x)', f2: 'x', g: 'x', f1tex: '\\tan x', f2tex: 'x', p: 3, c: '1/3', ctex: '\\tfrac13', delta: 1,
    predict: 'Biết $\\tan x \\sim x$. Khi $x \\to 0$, hiệu $\\tan x - x$…',
    predictOptions: 'Bằng 0, vì thay $\\tan x$ bởi $x$|Cùng bậc với $x$|Cùng bậc với $x^3$', predictAnswer: 3,
    predictExplain: 'Khai triển $\\tan x = x + \\frac{x^3}{3} + o(x^3)$ nên $\\tan x - x \\sim \\frac{x^3}{3}$. Phép thay "tan x thành x" xóa mất đúng phần quyết định đáp số.',
    caption: 'Bài 2b Dạng 10: $\\lim_{x\\to0}\\frac{x^2\\sin x}{\\tan x - x}$. Nếu thay $\\tan x \\sim x$ ở mẫu sẽ ra $\\frac{x^3}{0}$ — vô nghĩa. Đúng: mẫu $\\sim \\frac{x^3}{3}$, tử $\\sim x^3$, giới hạn bằng 3.',
  },
  'dang04-kep-ham': {
    kind: 'squeeze', number: '2.2', mode: 'function',
    title: '$f(x) = x\\sin\\frac{1}{x}$ bị kẹp giữa $-|x|$ và $|x|$ — bài tập 1b, Dạng 4',
    lower: '-abs(x)', f: 'x sin(1/x)', upper: 'abs(x)', x0: 0, L: 0, delta: 0.6,
    aTex: '-|x|', bTex: '|x|',
    caption: 'Vì $|\\sin\\frac1x| \\le 1$ nên $-|x| \\le x\\sin\\frac1x \\le |x|$. Đồ thị dao động vô hạn lần quanh $0$ nhưng biên độ bị hai đường thẳng ép về 0. Phóng to bao nhiêu lần, bức tranh vẫn giữ nguyên dạng.',
  },
  'dang05-tham-so': {
    kind: 'continuity', number: '2.3',
    title: 'Tìm $a$ để hàm liên tục tại $x = 1$ — ĐT01, HK Hè 2022–2023',
    left: 'a x - 2', right: '2x^2', x0: 1, a: 1, aRange: '-2, 8', aStep: 0.1, answer: 4, x: '-1.2, 2.4', y: '-4, 9',
    caption: '$f(x) = 2x^2$ khi $x \\ge 1$ và $f(x) = ax - 2$ khi $x < 1$. Ta có $L^+ = f(1) = 2$, $L^- = a - 2$. Liên tục khi và chỉ khi $a - 2 = 2$, tức $a = 4$. Kéo thanh trượt để thấy bước nhảy co lại.',
  },
  'dang05-gia-tri-m': {
    kind: 'continuity', number: '2.4',
    title: 'Tìm $m$ để hàm liên tục trên $\\mathbb R$ — ĐT03, HK Hè 2023–2024',
    left: '(exp(-3x) - 1) / sin(x)', right: '(exp(-3x) - 1) / sin(x)', at: 'a',
    x0: 0, a: 0, aRange: '-6, 2', aStep: 0.1, aTex: 'm', answer: -3, x: '-1.4, 1.4', y: '-9, 1.5',
    caption: 'Khi $x \\to 0$: $e^{-3x} - 1 \\sim -3x$ và $\\sin x \\sim x$, nên $\\lim f(x) = -3$. Hàm sơ cấp liên tục trên từng khoảng, nên chỉ cần $m = f(0) = -3$.',
  },

  // ── Chương III ──
  'dang06-dinh-nghia': {
    kind: 'derivative', number: '3.1',
    title: "Tính $f'(0)$ bằng định nghĩa — ĐT02, năm học 2023–2024",
    f: '(exp(2x) - 1) / x', x0: 0, f0: 2, slope: 2, h: 0.9, x: '-1.3, 1.3', y: '0, 5.2',
    caption: "$f(x) = \\frac{e^{2x}-1}{x}$ khi $x \\ne 0$, $f(0) = 2$. Không được đạo hàm công thức nhánh rồi thay $x = 0$; phải xét $\\lim_{h\\to0}\\frac{f(h)-f(0)}{h} = \\lim_{h\\to 0}\\frac{e^{2h}-1-2h}{h^2} = 2$.",
  },
  'dang06-tri-tuyet-doi': {
    kind: 'derivative', number: '3.2',
    title: '$f(x) = (x+1)|x-1|$ tại $x = 1$ — ĐT03, HK Hè 2023–2024',
    f: '(x + 1) abs(x - 1)', x0: 1, h: 0.8, x: '-1.2, 2.6', y: '-1.5, 3.5',
    caption: "Phá trị tuyệt đối: với $x > 1$, $f'(x) = 2x$; với $x < 1$, $f'(x) = -2x$. Tại $x = 1$ đạo hàm phải bằng 2, đạo hàm trái bằng $-2$, nên $f$ không có đạo hàm tại 1 — cát tuyến từ hai phía quay về hai đường khác nhau.",
  },
  'dang10-taylor': {
    kind: 'taylor', number: '3.3', fn: 'sin', n: 1, nMax: 15,
    title: 'Khai triển Maclaurin của các hàm cơ bản',
    caption: 'Phần tô đỏ nhạt là sai số $f(x) - P_n(x)$. Với $e^x, \\sin x, \\cos x$ vùng ôm sát mở rộng mãi; với $\\ln(1+x)$, $\\frac{1}{1-x}$, $\\arctan x$ đa thức chỉ bám $f$ trong khoảng hội tụ $(-1; 1)$ (dải màu vàng).',
  },

  // ── Chương IV ──
  'dang13-riemann': {
    kind: 'riemann', number: '4.1',
    title: 'Tổng Riemann của $\\int_0^1 x\\ln(x+1)\\,dx$ — ĐT04, năm học 2024–2025',
    f: 'x ln(x + 1)', a: 0, b: 1, n: 4, nMax: 128, rule: 'right', exact: 0.25, exactTex: 'I = \\tfrac14',
    predict: 'Với $f(x) = x\\ln(x+1)$ đồng biến trên $[0;1]$, tổng Riemann lấy điểm mút phải sẽ…',
    predictOptions: 'Lớn hơn tích phân|Nhỏ hơn tích phân|Bằng tích phân', predictAnswer: 1,
    predictExplain: 'Hàm đồng biến nên mỗi hình chữ nhật lấy chiều cao ở mút phải đều cao hơn đồ thị: $S_n > I$ với mọi $n$, và $S_n - I \\to 0$.',
    caption: 'Tích phân là giới hạn của tổng diện tích các hình chữ nhật khi phân hoạch mịn dần: $\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^{n} f\\!\\left(\\frac kn\\right) = \\int_0^1 f(x)\\,dx$. Giá trị đúng $\\frac14$ có được nhờ từng phần với $v = \\frac{x^2-1}{2}$.',
  },
  'dang15-suy-rong': {
    kind: 'improper', number: '4.2',
    title: 'Tích phân suy rộng $\\int_1^{+\\infty} x e^{-2x}\\,dx$ — ĐT03, HK Hè 2023–2024',
    f: 'x exp(-2x)', a: 1, Amax: 6, exact: '3 / (4 e^2)', exactTex: '\\tfrac{3}{4e^2}', ftex: 'x e^{-2x}',
    caption: 'Định nghĩa: $\\int_1^{+\\infty} f = \\lim_{A\\to+\\infty}\\int_1^A f$. Từng phần cho $\\int_1^A x e^{-2x}dx = \\frac{3}{4e^2} - \\left(\\frac A2 + \\frac14\\right)e^{-2A}$, và $A e^{-2A} \\to 0$.',
  },
  'dang15-phan-ky': {
    kind: 'improper', number: '4.3',
    title: 'Đối chứng: $\\int_1^{+\\infty} \\frac{dx}{x}$ phân kỳ',
    f: '1/x', a: 1, Amax: 60, ftex: '\\tfrac{1}{x}', y: '0, 1.1',
    caption: 'Với $\\alpha = 1$, $\\int_1^A \\frac{dx}{x} = \\ln A$ tăng không giới hạn dù đồ thị vẫn tiến về 0. Đồ thị dưới không có tiệm cận ngang.',
  },

  // ── Chương V ──
  'dang16-cauchy': {
    kind: 'series', number: '5.1',
    title: 'Chuỗi $\\sum \\left(\\frac{3n+1}{4n+2}\\right)^n$ — ĐT02, năm học 2023–2024',
    u: '((3n + 1) / (4n + 2))^n', nMax: 24,
    S: sumTo(400, (n) => ((3 * n + 1) / (4 * n + 2)) ** n), STex: 'S \\approx ' + sumTo(400, (n) => ((3 * n + 1) / (4 * n + 2)) ** n).toFixed(4).replace('.', '{,}'),
    caption: 'Tiêu chuẩn Cauchy: $\\sqrt[n]{u_n} = \\frac{3n+1}{4n+2} \\to \\frac34 < 1$, nên chuỗi hội tụ. Các số hạng giảm nhanh như cấp số nhân công bội $\\frac34$, tổng riêng chững lại rất sớm.',
  },
  'dang16-riemann-2': {
    kind: 'series', number: '5.2',
    title: 'Chuỗi $\\sum \\frac{1}{n^2}$ hội tụ về $\\frac{\\pi^2}{6}$',
    u: '1 / n^2', nMax: 30, S: 'pi^2 / 6', STex: '\\tfrac{\\pi^2}{6}',
    caption: 'Chuỗi Riemann với $\\alpha = 2 > 1$ hội tụ. Giá trị $\\frac{\\pi^2}{6}$ có được từ chuỗi Fourier của $x^2$ (bài tập 2c, Dạng 20).',
  },
  'dang17-dan-dau': {
    kind: 'series', number: '5.3',
    title: 'Chuỗi đan dấu $\\sum \\frac{(-1)^{n-1}}{n}$ — bán hội tụ',
    u: '(-1)^(n - 1) / n', nMax: 30, S: 'ln(2)', STex: '\\ln 2',
    caption: 'Tiêu chuẩn Leibniz: $\\frac1n$ giảm và tiến về 0, nên chuỗi hội tụ — tổng riêng nhảy qua lại quanh $\\ln 2$ với biên độ thu hẹp. Chuỗi trị tuyệt đối $\\sum\\frac1n$ phân kỳ, nên đây là hội tụ có điều kiện.',
  },
  'dang20-fourier-abs': {
    kind: 'fourier', number: '5.4',
    title: 'Chuỗi Fourier của $f(x) = |x|$ trên $[-\\pi; \\pi]$ — bài tập 2a, Dạng 20',
    f: 'abs(x)', N: 1, nMax: 30, ftex: '|x|', y: '-0.6, 4',
    caption: '$f$ chẵn nên $b_n = 0$, $a_n = \\frac{2}{\\pi}\\int_0^\\pi x\\cos nx\\,dx$. Thác triển tuần hoàn liên tục nên tổng riêng bám rất nhanh. Thay $x = 0$ suy ra $\\sum_{k\\ge1}\\frac{1}{(2k-1)^2} = \\frac{\\pi^2}{8}$.',
  },
  'dang20-fourier-x': {
    kind: 'fourier', number: '5.5',
    title: 'Chuỗi Fourier của $f(x) = x$ trên $(-\\pi; \\pi)$ — bài tập 2b, Dạng 20',
    f: 'x', N: 1, nMax: 40, ftex: 'x', y: '-4.4, 4.4',
    caption: '$f$ lẻ nên $a_n = 0$, $b_n = \\frac{2(-1)^{n+1}}{n}$. Thác triển có bước nhảy tại $\\pm\\pi$; tổng riêng vọt lố gần chỗ nhảy (hiện tượng Gibbs) nhưng tại chính điểm nhảy luôn bằng $0 = \\frac{f(\\pi^-) + f(-\\pi^+)}{2}$.',
  },
};
