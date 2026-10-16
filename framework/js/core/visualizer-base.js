/**
 * Base class for Math Visualizers using JSXGraph.
 * Assumes JSXGraph is loaded globally via CDN.
 */
class MathVisualizer {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      bbox: [-5, 5, 5, -5],
      axis: true,
      showCopyright: false,
      showNavigation: false,
      keepaspectratio: false,
      ...options.boardOpts
    };

    // Ensure container exists
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);

    this.board = JXG.JSXGraph.initBoard(containerId, this.options);
    this.elements = [];
  }

  add(element) {
    this.elements.push(element);
    return element;
  }

  clear() {
    // Simple clear: free and reinit, or remove objects
    JXG.JSXGraph.freeBoard(this.board);
    this.board = JXG.JSXGraph.initBoard(this.containerId, this.options);
    this.elements = [];
  }

  destroy() {
    if (this.board) {
      JXG.JSXGraph.freeBoard(this.board);
    }
  }

  // Helper to create a horizontal limit line
  drawLimitLine(y, color = '#e74c3c', dash = 2) {
    return this.board.create('line', [[0, y], [1, y]], {
      straightFirst: true,
      straightLast: true,
      strokeColor: color,
      strokeWidth: 2,
      dash: dash,
      name: `L = ${y}`,
      withLabel: true,
      label: { position: 'rt', offset: [10, 0] }
    });
  }

  /**
   * Add a function graph from string expression
   */
  addFunctionGraph(expr, color = '#2ecc71', domain = null, attrs = {}) {
    const fn = window.mathEval ? window.mathEval.parse(expr) : (x) => NaN;
    const opts = {
      strokeColor: color,
      strokeWidth: 2,
      name: expr,
      withLabel: false,
      ...attrs
    };
    if (domain) {
      return this.board.create('functiongraph', [fn, domain[0], domain[1]], opts);
    }
    return this.board.create('functiongraph', [fn], opts);
  }

  /**
   * Open circle (for limit point or removable discontinuity)
   */
  addOpenCircle(x, y, color = '#e74c3c', size = 4) {
    return this.board.create('point', [x, y], {
      face: 'o',
      size: size,
      fillColor: 'none',
      strokeColor: color,
      strokeWidth: 2,
      fixed: true,
      name: '',
      withLabel: false
    });
  }

  /**
   * Add Riemann sum using native JSXGraph element
   */
  addRiemannSum(fn, n, type = 'left', a = -2, b = 2, attrs = {}) {
    const f = typeof fn === 'string' ? window.mathEval.parse(fn) : fn;
    return this.board.create('riemannsum', [
      f,
      () => (typeof n === 'function' ? n() : n),
      type,
      a,
      b
    ], {
      fillColor: '#f1c40f',
      fillOpacity: 0.3,
      ...attrs
    });
  }

  /**
   * Highlight an interval (for radius of convergence)
   */
  addIntervalHighlight(center, radius, color = '#3498db', opacity = 0.15) {
    const left = center - radius;
    const right = center + radius;
    return this.board.create('polygon', [
      [left, -10], [right, -10], [right, 10], [left, 10]
    ], {
      fillColor: color,
      fillOpacity: opacity,
      borders: { strokeWidth: 0 },
      fixed: true
    });
  }
}

// Export for modules if needed (or attach to window for simple demos)
window.MathVisualizer = MathVisualizer;
