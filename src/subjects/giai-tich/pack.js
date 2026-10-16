// Gói Giải tích I — đặt cảnh vào không gian tên "giai-tich/…".
import { defineScene as define } from '../../registry.js';

export const PACK = 'giai-tich';
export const defineScene = (name, def) => define(`${PACK}/${name}`, def);
