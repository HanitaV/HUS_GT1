/**
 * Derivative by Definition Visualizer (Dạng 6)
 * Secant lines approaching the tangent as h → 0
 */
function createDerivativeDefinition(containerId, config = {}) {
  const {
    formula = 'sin(x)',
    point = 0,
    title = 'Đạo hàm bằng định nghĩa'
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [-4, 4, 4, -2],
      axis: true,
      showCopyright: false,
      showNavigation: true
    }
  });

  // Parse function using JessieCode if available
  let fn;
  try {
    fn = viz.board.jc.snippet(formula, true, 'x');
  } catch (e) {
    fn = window.mathEval ? window.mathEval.parse(formula) : (x) => Math.sin(x);
  }

  // Main function graph
  const graph = viz.board.create('functiongraph', [fn], {
    strokeColor: '#2ecc71',
    strokeWidth: 2.5,
    name: formula
  });

  // Fixed point at x0
  const p0 = viz.board.create('point', [point, () => fn(point)], {
    name: 'A (x₀)',
    size: 4,
    fillColor: '#e74c3c',
    fixed: true
  });

  // Slider for h
  const hSlider = viz.board.create('slider', [[1, -1.5], [3.5, -1.5], [0.01, 0.5, 2]], {
    name: 'h',
    snapWidth: 0.01
  });

  // Moving point at x0 + h
  const p1 = viz.board.create('point', [
    () => point + hSlider.Value(),
    () => fn(point + hSlider.Value())
  ], {
    name: 'B (x₀+h)',
    size: 3,
    fillColor: '#3498db',
    fixed: true
  });

  // Secant line
  const secant = viz.board.create('line', [p0, p1], {
    strokeColor: '#e67e22',
    strokeWidth: 2,
    dash: 2,
    name: 'secant'
  });

  // Tangent (limit as h→0)
  const tangent = viz.board.create('tangent', [p0], {
    strokeColor: '#c0392b',
    strokeWidth: 2,
    name: 'tangent'
  });

  // Label showing slopes
  viz.board.create('text', [-3.5, 3.2], () => {
    const h = hSlider.Value();
    const slopeSec = (fn(point + h) - fn(point)) / h;
    return `h = ${h.toFixed(2)} | secant slope ≈ ${slopeSec.toFixed(3)}`;
  }, { fontSize: 12 });

  return viz;
}

window.createDerivativeDefinition = createDerivativeDefinition;
