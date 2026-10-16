// Hiển thị công thức bằng KaTeX nếu trang đã nạp KaTeX; nếu không, hiển thị văn bản thô
// đã được làm gọn (bỏ dấu \ và {}), để framework vẫn dùng được khi chưa có KaTeX.

const looksTex = (s) => /[\\_^{}]/.test(s);

export function renderTex(node, src, { display = false } = {}) {
  const s = String(src ?? '');
  if (node.__tex === s) return;
  node.__tex = s;
  const katex = globalThis.katex;
  // nhãn tiếng Việt thuần (không có ký hiệu TeX) hiển thị như văn bản thường
  if (katex && !(!looksTex(s) && /[^\x00-\x7F]/.test(s))) {
    try {
      // dấu phẩy thập phân kiểu Việt Nam: 2,5 → 2{,}5 để KaTeX không chèn khoảng trắng
      katex.render(s.replace(/(\d),(\d)/g, '$1{,}$2'), node, { throwOnError: false, displayMode: display, output: 'html', strict: 'ignore' });
      return;
    } catch { /* rơi xuống chế độ văn bản */ }
  }
  node.textContent = looksTex(s)
    ? s.replace(/\\(left|right|displaystyle|,|;|!|quad)/g, ' ').replace(/\\([a-zA-Z]+)/g, '$1').replace(/[{}]/g, '')
    : s;
}

/**
 * Hiển thị đoạn văn có công thức nội dòng dạng $...$.
 * Chỉ dựng lại những đoạn đã đổi: câu kết luận cập nhật liên tục khi hình chạy thường chỉ
 * đổi vài con số, còn công thức KaTeX (tốn kém nhất) được giữ nguyên.
 */
export function renderRich(node, src) {
  const s = String(src ?? '');
  if (node.__rich === s) return;
  node.__rich = s;
  const parts = s.split(/(\$[^$]+\$)/g).filter(Boolean);
  const old = node.__parts || [];
  const kids = node.__kids || [];
  // có ai đó đã sửa nội dung nút từ bên ngoài, hoặc số đoạn thay đổi → dựng lại từ đầu
  if (old.length !== parts.length || node.childNodes.length !== kids.length || kids.some((k) => k.parentNode !== node)) {
    node.textContent = ''; kids.length = 0;
  }
  const next = [];
  parts.forEach((part, i) => {
    const isMath = part.startsWith('$') && part.endsWith('$') && part.length > 2;
    let k = kids[i];
    if (k && old[i] === part) { next.push(k); return; }
    const fresh = isMath ? document.createElement('span') : document.createTextNode(part);
    if (isMath) { fresh.className = 'tc-math'; renderTex(fresh, part.slice(1, -1)); }
    if (k && k.parentNode === node) node.replaceChild(fresh, k); else node.appendChild(fresh);
    next.push(fresh);
  });
  node.__parts = parts;
  node.__kids = next;
}

/**
 * Hiển thị mọi công thức $...$ trong các nút văn bản của một phần tử (giữ nguyên thẻ HTML).
 * Dùng cho nội dung do người viết bài đặt trong <tc-check>, <tc-steps>…, để framework
 * không phụ thuộc vào việc trang có chạy KaTeX auto-render hay không.
 */
export function renderMathIn(root) {
  if (!globalThis.katex) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.nodeValue.includes('$') && !n.parentElement.closest('.katex, code, pre, script, style')
      ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    const span = document.createElement('span');
    renderRich(span, n.nodeValue);
    n.replaceWith(...span.childNodes);
  }
}
