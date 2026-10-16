// Gói Giải tích I (MAT1091): giới hạn, liên tục, vi phân, tích phân, chuỗi.
import { definePack } from '../../registry.js';
import { PACK } from './pack.js';
import { PRESETS } from './presets.js';
import './scenes/sequence.js';
import './scenes/squeeze.js';
import './scenes/function-limit.js';
import './scenes/continuity.js';
import './scenes/derivative.js';
import './scenes/taylor.js';
import './scenes/integral.js';
import './scenes/series.js';
import './scenes/vcb.js';

definePack(PACK, {
  name: 'Giải tích I',
  description: 'Giới hạn, liên tục, đạo hàm, tích phân, chuỗi — theo đề cương MAT1091.',
  presets: PRESETS,
});
