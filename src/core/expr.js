// Tiệm Cận — bộ phân tích biểu thức toán an toàn (không dùng eval / new Function).
// Cho phép tác giả viết hàm ngay trong thuộc tính HTML/Markdown:
//   <tc-scene kind="limit-sequence" u="1 + (-1)^n / n" L="1">
//
// Hỗ trợ: + - * / ^, nhân ngầm (2x, 3sin(x), (x+1)(x-1)), giai thừa n!,
// hằng số pi, e; hàm sin cos tan cot asin acos atan (arcsin…), sinh cosh tanh,
// exp ln log log10 log2 sqrt cbrt root(x,k) abs sign floor ceil min max fact.

const FUNCS = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: (x) => 1 / Math.tan(x),
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan, arccot: (x) => Math.PI / 2 - Math.atan(x),
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  exp: Math.exp, ln: Math.log, log: Math.log, log10: Math.log10, log2: Math.log2,
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, sign: Math.sign,
  floor: Math.floor, ceil: Math.ceil, round: Math.round,
  min: Math.min, max: Math.max,
  root: (x, k) => (k % 2 === 1 && x < 0 ? -Math.pow(-x, 1 / k) : Math.pow(x, 1 / k)),
  fact: factorial,
};
const CONSTS = { pi: Math.PI, e: Math.E, π: Math.PI };

/** Tên hàm và hằng có sẵn — không thể dùng làm tên biến. */
export const RESERVED = new Set([...Object.keys(FUNCS), ...Object.keys(CONSTS)]);

/** Các tên biến xuất hiện trong một biểu thức (bỏ tên hàm/hằng). */
export const identifiers = (src) => [...new Set((String(src).match(/[A-Za-z_][A-Za-z0-9_]*/g) || []).filter((w) => !RESERVED.has(w)))];

export function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function tokenize(src) {
  const t = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      if (src[j] === 'e' && /[0-9+-]/.test(src[j + 1] || '') && /[0-9]/.test(src[j + 1] === '+' || src[j + 1] === '-' ? src[j + 2] : src[j + 1])) {
        j += 2;
        while (j < src.length && /[0-9]/.test(src[j])) j++;
      }
      t.push({ k: 'num', v: parseFloat(src.slice(i, j)) });
      i = j; continue;
    }
    if (/[A-Za-zα-ωπ_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9α-ωπ_]/.test(src[j])) j++;
      t.push({ k: 'id', v: src.slice(i, j) });
      i = j; continue;
    }
    if ('+-*/^(),!|'.includes(c)) { t.push({ k: 'op', v: c }); i++; continue; }
    if (c === '·' || c === '×') { t.push({ k: 'op', v: '*' }); i++; continue; }
    if (c === '−') { t.push({ k: 'op', v: '-' }); i++; continue; }
    throw new SyntaxError(`Ký tự không hợp lệ "${c}" tại vị trí ${i}`);
  }
  return t;
}

// Pratt parser → cây cú pháp → closure
export function parse(src, vars = ['x']) {
  const tokens = tokenize(String(src));
  let p = 0;
  const peek = () => tokens[p];
  const next = () => tokens[p++];
  const isOp = (v) => peek() && peek().k === 'op' && peek().v === v;
  const expect = (v) => {
    if (!isOp(v)) throw new SyntaxError(`Thiếu "${v}" trong biểu thức: ${src}`);
    p++;
  };
  const startsPrimary = (tk) => tk && (tk.k === 'num' || tk.k === 'id' || (tk.k === 'op' && (tk.v === '(' || tk.v === '|')));

  function expr(minBp) {
    let lhs = prefix();
    for (;;) {
      const tk = peek();
      if (!tk) break;
      let op, bp, rbp, implicit = false;
      if (tk.k === 'op' && (tk.v === '+' || tk.v === '-')) { op = tk.v; bp = 10; rbp = 11; }
      else if (tk.k === 'op' && (tk.v === '*' || tk.v === '/')) { op = tk.v; bp = 20; rbp = 21; }
      else if (tk.k === 'op' && tk.v === '^') { op = '^'; bp = 40; rbp = 39; }   // kết hợp phải
      else if (tk.k === 'op' && tk.v === '!') {
        if (50 < minBp) break;
        p++; const a = lhs; lhs = (s) => factorial(a(s)); continue;
      }
      else if (startsPrimary(tk) && !(tk.k === 'op' && tk.v === '|' && absDepth > 0)) {
        op = '*'; bp = 25; rbp = 26; implicit = true;                                // nhân ngầm: 2x, 3sin(x)
      }
      else break;
      if (bp < minBp) break;
      if (!implicit) p++;
      const a = lhs, b = expr(rbp);
      lhs = op === '+' ? (s) => a(s) + b(s)
        : op === '-' ? (s) => a(s) - b(s)
        : op === '*' ? (s) => a(s) * b(s)
        : op === '/' ? (s) => a(s) / b(s)
        : (s) => Math.pow(a(s), b(s));
    }
    return lhs;
  }

  let absDepth = 0;
  function prefix() {
    const tk = next();
    if (!tk) throw new SyntaxError(`Biểu thức kết thúc đột ngột: ${src}`);
    if (tk.k === 'num') { const v = tk.v; return () => v; }
    if (tk.k === 'op' && tk.v === '-') { const a = expr(30); return (s) => -a(s); }
    if (tk.k === 'op' && tk.v === '+') return expr(30);
    if (tk.k === 'op' && tk.v === '(') { const a = expr(0); expect(')'); return a; }
    if (tk.k === 'op' && tk.v === '|') {
      absDepth++; const a = expr(0); absDepth--; expect('|');
      return (s) => Math.abs(a(s));
    }
    if (tk.k === 'id') {
      const name = tk.v;
      const vi = vars.indexOf(name);
      if (vi >= 0) return (s) => s[vi];
      if (name in FUNCS) {
        const f = FUNCS[name];
        if (isOp('(')) {
          p++;
          const args = [expr(0)];
          while (isOp(',')) { p++; args.push(expr(0)); }
          expect(')');
          if (args.length === 1) { const a = args[0]; return (s) => f(a(s)); }
          return (s) => f(...args.map((g) => g(s)));
        }
        // sin x, ln n — đối số không ngoặc, ràng buộc chặt hơn * /
        const a = expr(30);
        return (s) => f(a(s));
      }
      if (name in CONSTS) { const v = CONSTS[name]; return () => v; }
      throw new SyntaxError(`Không biết "${name}" (biến hợp lệ: ${vars.join(', ')})`);
    }
    throw new SyntaxError(`Không mong đợi "${tk.v}" trong: ${src}`);
  }

  const root = expr(0);
  if (p < tokens.length) throw new SyntaxError(`Thừa "${tokens[p].v}" trong: ${src}`);
  return root;
}

/**
 * Biên dịch chuỗi thành hàm JS.
 *   compile('x^2 + a', ['x','a'])  → (x, a) => …
 * Nếu đối số đã là hàm thì trả lại nguyên vẹn.
 */
export function compile(src, vars = ['x']) {
  if (typeof src === 'function') return src;
  if (typeof src === 'number') return () => src;
  const root = parse(src, vars);
  const fn = (...args) => root(args);
  fn.source = String(src);
  return fn;
}
