/**
 * LimitApproacher: Visualizes a sequence approaching a limit L without touching it.
 * Config: { L: number, maxN: number, formula?: string, animate?: boolean }
 * Example: a_n = L + 1/n
 */
function createLimitApproacher(containerId, config = {}) {
  const {
    L = 0,
    maxN = 25,
    title = 'Dãy số tiến tới giới hạn'
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [-1, L + 1.5, maxN + 2, L - 0.5],
      axis: true,
      showCopyright: false,
      showNavigation: true
    }
  });

  // Limit line (dashed red) - never touched
  viz.drawLimitLine(L, '#e74c3c', 2);

  // Points container
  const points = [];

  function updatePoints(nMax) {
    // Clear previous points
    points.forEach(p => viz.board.removeObject(p));
    points.length = 0;

    for (let n = 1; n <= nMax; n++) {
      const an = L + 1 / n;  // classic approaching
      const p = viz.board.create('point', [n, an], {
        name: n <= 5 ? `a_${n}` : '',
        size: 3,
        fillColor: '#3498db',
        strokeColor: '#2980b9',
        fixed: true,
        withLabel: n <= 5
      });
      points.push(p);
    }
    viz.board.update();
  }

  // Initial
  updatePoints(5);

  // Optional ε-neighborhood band (horizontal strip around L)
  let epsilonBand = null;
  viz.setEpsilon = (eps) => {
    if (epsilonBand) {
      viz.board.removeObject(epsilonBand);
      epsilonBand = null;
    }
    if (eps > 0) {
      epsilonBand = viz.board.create('polygon', [
        [-1, L - eps], [maxN + 2, L - eps], [maxN + 2, L + eps], [-1, L + eps]
      ], {
        fillColor: '#f1c40f',
        fillOpacity: 0.15,
        borders: { strokeColor: '#f39c12', strokeWidth: 1, dash: 1 }
      });
    }
    viz.board.update();
  };

  // Attach controls if container has them, or return methods
  viz.updateToN = (n) => updatePoints(Math.min(Math.max(1, Math.floor(n)), maxN));

  // Optional auto-animate
  let animId = null;
  viz.play = (speed = 400) => {
    let n = 1;
    const step = () => {
      viz.updateToN(n);
      n++;
      if (n <= maxN) {
        animId = setTimeout(step, speed);
      }
    };
    step();
  };

  viz.stop = () => {
    if (animId) clearTimeout(animId);
  };

  return viz;
}

window.createLimitApproacher = createLimitApproacher;
