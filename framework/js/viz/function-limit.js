/**
 * Function Limit Visualizer (Dạng 3)
 * Samples approaching from left and right, open circle at the limit point
 */
function createFunctionLimit(containerId, config = {}) {
  const {
    formula = 'sin(x)/x',
    a = 0,
    L = 1,
    title = 'Giới hạn hàm số'
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [a - 4, L + 1.5, a + 4, L - 1.5],
      axis: true,
      showCopyright: false,
      showNavigation: true
    }
  });

  let fn;
  try {
    fn = viz.board.jc.snippet(formula, true, 'x');
  } catch (e) {
    fn = (x) => (x === 0 ? L : Math.sin(x) / x);
  }

  // Graph (may have hole at a)
  viz.board.create('functiongraph', [fn], {
    strokeColor: '#2ecc71',
    strokeWidth: 2
  });

  // Open circle at the limit point
  viz.addOpenCircle(a, L, '#e74c3c', 5);

  // Limit line
  viz.drawLimitLine(L, '#e74c3c', 2);

  // Sample points from left and right
  const samples = [];
  function addSamples(delta) {
    samples.forEach(s => viz.board.removeObject(s));
    samples.length = 0;
    const offsets = [0.5, 0.2, 0.1, 0.05, 0.02];
    offsets.forEach(d => {
      if (d < delta) return;
      // Left
      const xl = a - d;
      samples.push(viz.board.create('point', [xl, fn(xl)], {
        size: 2, fillColor: '#3498db', name: '', fixed: true
      }));
      // Right
      const xr = a + d;
      samples.push(viz.board.create('point', [xr, fn(xr)], {
        size: 2, fillColor: '#3498db', name: '', fixed: true
      }));
    });
    viz.board.update();
  }

  addSamples(1);

  viz.setDelta = (delta) => addSamples(delta);

  return viz;
}

window.createFunctionLimit = createFunctionLimit;
