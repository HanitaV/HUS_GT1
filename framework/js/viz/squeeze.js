/**
 * SqueezeTheoremViz: Visualizes two bounding functions sandwiching a middle one.
 * Classic: -|x| ≤ x*sin(1/x) ≤ |x| → 0 as x→0
 */
function createSqueezeTheorem(containerId, config = {}) {
  const {
    title = 'Nguyên lý kẹp (Squeeze Theorem)'
  } = config;

  const viz = new MathVisualizer(containerId, {
    boardOpts: {
      boundingbox: [-1.5, 1.2, 1.5, -1.2],
      axis: true,
      showCopyright: false,
      showNavigation: true,
      keepaspectratio: false
    }
  });

  // Lower bound: -|x|
  const lower = viz.board.create('functiongraph', [
    (x) => -Math.abs(x)
  ], {
    strokeColor: '#3498db',
    strokeWidth: 2,
    name: 'g(x) = -|x|',
    withLabel: true
  });

  // Upper bound: |x|
  const upper = viz.board.create('functiongraph', [
    (x) => Math.abs(x)
  ], {
    strokeColor: '#e74c3c',
    strokeWidth: 2,
    name: 'h(x) = |x|',
    withLabel: true
  });

  // Middle: x * sin(1/x) for x ≠ 0, 0 at 0
  const middle = viz.board.create('functiongraph', [
    (x) => (x === 0 ? 0 : x * Math.sin(1 / x))
  ], {
    strokeColor: '#2ecc71',
    strokeWidth: 1.5,
    name: 'f(x) = x sin(1/x)',
    withLabel: true
  });

  // Highlight the region near 0 with a slider-controlled zoom or annotation
  viz.board.create('text', [0.2, 0.9], 'f bị kẹp giữa g và h', {
    fontSize: 12,
    color: '#2ecc71'
  });

  viz.board.create('text', [-1.2, 0.7], 'Khi g và h → 0 thì f → 0', {
    fontSize: 11
  });

  return viz;
}

window.createSqueezeTheorem = createSqueezeTheorem;
