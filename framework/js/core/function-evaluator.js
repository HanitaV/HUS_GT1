/**
 * FunctionEvaluator - Safe expression evaluation using math.js
 * Requires math.js to be loaded globally via CDN before use.
 */
class FunctionEvaluator {
  constructor() {
    if (typeof math === 'undefined') {
      console.warn('math.js not loaded. Falling back to limited evaluation.');
      this.math = null;
    } else {
      this.math = math;
    }
  }

  /**
   * Parse a string expression into a JS function of x
   * @param {string} expr - e.g. "sin(x)/x", "x^2 * sin(1/x)"
   * @returns {function(number): number}
   */
  parse(expr) {
    if (!expr || typeof expr !== 'string') {
      return (x) => NaN;
    }
    // Handle special cases like sin(x)/x at 0
    const cleaned = expr.trim();

    if (this.math) {
      try {
        const compiled = this.math.compile(cleaned);
        return (x) => {
          try {
            return compiled.evaluate({ x: x });
          } catch (e) {
            return NaN;
          }
        };
      } catch (e) {
        console.error('Parse error:', e);
        return (x) => NaN;
      }
    }

    // Fallback simple evaluator (very limited, for demo only)
    return this._fallbackParse(cleaned);
  }

  _fallbackParse(expr) {
    // Extremely limited fallback - only for trusted expressions in demos
    try {
      // Replace common math functions
      let jsExpr = expr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/ln/g, 'Math.log')
        .replace(/log/g, 'Math.log10')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/exp/g, 'Math.exp')
        .replace(/\^/g, '**');
      const fn = new Function('x', `return ${jsExpr};`);
      return (x) => {
        try { return fn(x); } catch { return NaN; }
      };
    } catch {
      return (x) => NaN;
    }
  }
}

window.FunctionEvaluator = FunctionEvaluator;
window.mathEval = new FunctionEvaluator();
