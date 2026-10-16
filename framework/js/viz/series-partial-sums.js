/**
 * Series Partial Sums Visualizer (Dạng 16, 10, 20)
 * Animates or shows partial sums S_N of a series
 */
function createSeriesPartialSums(containerId, config = {}) {
  const {
    termFormula = '1/n^2',   // a_n
    maxN = 30,
    title = 'Tổng riêng của chuỗi'
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [-1, 2, maxN + 2, -0.5],
      axis: true,
      showCopyright: false,
      showNavigation: true
    }
  });

  let termFn;
  try {
    termFn = viz.board.jc.snippet(termFormula, true, 'n');
  } catch (e) {
    termFn = (n) => 1 / (n * n);
  }

  const points = [];
  let partialSums = [];

  function computeUpTo(N) {
    points.forEach(p => viz.board.removeObject(p));
    points.length = 0;
    partialSums = [0];

    let sum = 0;
    for (let n = 1; n <= N; n++) {
      sum += termFn(n);
      partialSums.push(sum);
      const p = viz.board.create('point', [n, sum], {
        size: 3,
        fillColor: '#9b59b6',
        name: n <= 5 ? `S_${n}` : '',
        fixed: true
      });
      points.push(p);
    }
    viz.board.update();
  }

  // Initial
  computeUpTo(5);

  viz.updateToN = (n) => computeUpTo(Math.min(Math.max(1, Math.floor(n)), maxN));

  // Simple animation
  let animId = null;
  viz.play = (speed = 200) => {
    let n = 1;
    const step = () => {
      viz.updateToN(n);
      n++;
      if (n <= maxN) animId = setTimeout(step, speed);
    };
    step();
  };
  viz.stop = () => { if (animId) clearTimeout(animId); };

  // Reference line for known sum (e.g. π²/6 for 1/n²)
  if (termFormula.includes('1/n^2') || termFormula.includes('1/n**2')) {
    viz.board.create('line', [[0, Math.PI * Math.PI / 6], [1, Math.PI * Math.PI / 6]], {
      strokeColor: '#e74c3c',
      dash: 2,
      name: 'π²/6'
    });
  }

  return viz;
}

window.createSeriesPartialSums = createSeriesPartialSums;
