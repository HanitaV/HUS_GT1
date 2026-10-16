/**
 * Power Series Radius of Convergence Visualizer (Dạng 18-19)
 * Shows partial sums and highlights the interval of convergence
 */
function createPowerSeriesRadius(containerId, config = {}) {
  const {
    title = 'Miền hội tụ chuỗi lũy thừa',
    center = 0,
    radius = 2
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [center - radius - 2, 3, center + radius + 2, -1],
      axis: true,
      showCopyright: false,
      showNavigation: true
    }
  });

  // Highlight the interval of convergence
  viz.addIntervalHighlight(center, radius, '#3498db', 0.12);

  // Center point
  viz.board.create('point', [center, 0], {
    name: 'x₀',
    size: 4,
    fillColor: '#e74c3c',
    fixed: true
  });

  // Endpoints
  viz.board.create('point', [center - radius, 0], {
    name: 'x₀-R',
    face: '[]',
    size: 3,
    fillColor: '#f39c12',
    fixed: true
  });
  viz.board.create('point', [center + radius, 0], {
    name: 'x₀+R',
    face: '[]',
    size: 3,
    fillColor: '#f39c12',
    fixed: true
  });

  // Example partial sum of geometric-like series (1/(1-x) near 0)
  const partial = viz.board.create('functiongraph', [
    (x) => {
      let s = 0, term = 1;
      for (let k = 0; k < 8; k++) {
        s += term;
        term *= (x - center);
      }
      return s;
    }
  ], {
    strokeColor: '#2ecc71',
    strokeWidth: 2,
    name: 'partial sum'
  });

  viz.board.create('text', [center - radius - 1, 2.2], `R = ${radius}`, { fontSize: 14 });

  return viz;
}

window.createPowerSeriesRadius = createPowerSeriesRadius;
