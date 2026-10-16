/**
 * Riemann Sum Visualizer (Dạng 13)
 * Uses native JSXGraph riemannsum element
 */
function createRiemannSum(containerId, config = {}) {
  const {
    formula = 'sin(x)',
    a = 0,
    b = Math.PI,
    title = 'Tổng Riemann'
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [-1, 2, Math.PI + 1, -1],
      axis: true,
      showCopyright: false,
      showNavigation: true
    }
  });

  let fn;
  try {
    fn = viz.board.jc.snippet(formula, true, 'x');
  } catch (e) {
    fn = (x) => Math.sin(x);
  }

  // Function graph
  viz.board.create('functiongraph', [fn, a, b], {
    strokeColor: '#2ecc71',
    strokeWidth: 2.5
  });

  // Slider for number of rectangles
  const nSlider = viz.board.create('slider', [[0.5, 1.6], [3, 1.6], [1, 10, 40]], {
    name: 'n',
    snapWidth: 1
  });

  // Riemann sum (middle type by default)
  const riemann = viz.board.create('riemannsum', [
    fn,
    () => nSlider.Value(),
    'middle',
    a,
    b
  ], {
    fillColor: '#3498db',
    fillOpacity: 0.35
  });

  // Display sum value
  viz.board.create('text', [0.5, -0.6], () => {
    const sum = riemann.Value();
    return `Σ ≈ ${sum.toFixed(4)} (n=${Math.round(nSlider.Value())})`;
  }, { fontSize: 12 });

  return viz;
}

window.createRiemannSum = createRiemannSum;
