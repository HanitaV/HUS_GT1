// Tiệm Cận — biến dùng chung toàn trang (văn bản phản ứng).
// Một con số trong đoạn văn, một hình, một câu kết luận có thể cùng đọc/ghi một biến:
// kéo số trong câu chữ → hình vẽ lại; kéo thanh trượt trong hình → câu chữ đổi theo.
// Ý tưởng "reactive document" của Bret Victor; cú pháp gần với [var] của Idyll.

import { signal, effect } from './signal.js';

const store = new Map();

/** Lấy (hoặc tạo) biến trang theo tên. */
export function pageVar(name, initial) {
  if (!store.has(name)) store.set(name, signal(initial));
  const s = store.get(name);
  if (initial !== undefined && !Number.isFinite(s.peek())) s.set(initial);
  return s;
}
export const hasPageVar = (name) => store.has(name);
export const pageVars = () => Object.fromEntries([...store].map(([k, s]) => [k, s.peek()]));

/**
 * Nối hai chiều một signal của cảnh với một biến trang.
 * Nếu biến trang đã có giá trị (một <tc-var> khai báo trước), cảnh nhận giá trị đó;
 * ngược lại biến trang nhận giá trị hiện tại của cảnh.
 */
export function link(sceneSig, name) {
  const v = pageVar(name);
  if (Number.isFinite(v.peek())) sceneSig.set(v.peek()); else v.set(sceneSig.peek());
  const a = effect(() => { const x = sceneSig.get(); if (!Object.is(x, v.peek())) v.set(x); });
  const b = effect(() => { const x = v.get(); if (!Object.is(x, sceneSig.peek())) sceneSig.set(x); });
  return () => { a(); b(); };
}
