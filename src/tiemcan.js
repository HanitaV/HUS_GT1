// Tiệm Cận — điểm vào.
//
//   <link rel="stylesheet" href="tiemcan/tiemcan.css">
//   <script type="module" src="tiemcan/src/tiemcan.js"></script>
//   <tc-scene preset="giai-tich/dang02-kep"></tc-scene>
//
// Nạp: lõi + các phần tử <tc-scene>, <tc-steps>, <tc-check>.
// Gói môn học chỉ được tải khi trang thực sự dùng tới (dynamic import).

import { registerPack } from './registry.js';
import './learn/steps.js';
import './learn/check.js';
import './learn/vars.js';
import './learn/term.js';

export * from './api.js';

registerPack('giai-tich', {
  name: 'Giải tích I',
  description: 'Giới hạn, liên tục, đạo hàm, tích phân, chuỗi.',
  load: () => import('./subjects/giai-tich/index.js'),
});
registerPack('dai-so', {
  name: 'Đại số tuyến tính',
  description: 'Vectơ, ánh xạ tuyến tính, định thức, giá trị riêng.',
  load: () => import('./subjects/dai-so/index.js'),
});
registerPack('vat-ly', {
  name: 'Vật lý đại cương',
  description: 'Dao động, chuyển động, mô phỏng theo thời gian.',
  load: () => import('./subjects/vat-ly/index.js'),
});
registerPack('hoa', {
  name: 'Hóa đại cương',
  description: 'Động học phản ứng, bậc phản ứng, chu kỳ bán hủy.',
  load: () => import('./subjects/hoa/index.js'),
});
registerPack('thuat-toan', {
  name: 'Cấu trúc dữ liệu và giải thuật',
  description: 'Thuật toán chạy từng bước, có mã giả đồng bộ.',
  load: () => import('./subjects/thuat-toan/index.js'),
});

export const version = '0.3.1';
