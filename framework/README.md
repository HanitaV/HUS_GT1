# MathViz Framework Foundation

Foundation framework for a static GitHub Pages website to visually represent mathematical concepts from the MAT1091 Calculus I study guide (Giải tích I).

## Goals

- Interactive visual demos for concepts like:
  - Limits: points/sequences approaching α but never touching.
  - Squeeze (Nguyên lý kẹp): two bounding functions sandwiching a third to show the limit.
  - Sequences, continuity, derivatives, integrals, series, etc.
- Pure static (HTML/CSS/JS) – deployable directly to GitHub Pages.
- Data-driven and modular for easy extension to all 20 "dạng" bài.

## Tech Stack

- **JSXGraph** (CDN) – interactive function plots, points, sequences, animations.
- **KaTeX** (CDN) – fast math rendering.
- Vanilla JS modules / scripts, custom CSS (light/dark mode).

## Directory Structure

```
framework/
├── css/
│   └── main.css
├── js/
│   ├── core/
│   │   └── visualizer-base.js
│   └── viz/
│       ├── limit-approacher.js
│       └── squeeze.js
├── examples/
│   ├── limit-demo.html
│   └── squeeze-demo.html
├── index.html
└── README.md
```

## Quick Start

1. Serve the folder locally (e.g., `python -m http.server` or any static server).
2. Open `examples/limit-demo.html` or `examples/squeeze-demo.html`.
3. Extend by creating new viz modules following the base pattern and configs.

## Sample Config for a Dạng

```js
// Example for mapping a section from the study guide
const configDang02 = {
  type: 'limit-approacher',
  L: 1,
  maxN: 30,
  title: 'Dãy số tiến tới L = 1'
};

const configSqueeze = {
  type: 'squeeze',
  lowerFn: 'x => -Math.abs(x)',
  middleFn: 'x => x === 0 ? 0 : x * Math.sin(1 / x)',
  upperFn: 'x => Math.abs(x)'
};
```

## How to Add a New Visualization

1. Create `js/viz/your-concept.js` exporting a create function that takes containerId + config.
2. Use `MathVisualizer` base for board setup.
3. Add demo HTML in `examples/`.
4. Map configs to sections from the study guide MD.

## Extended Foundation (đã triển khai đầy đủ)

Các module viz mới hỗ trợ các khái niệm tương lai từ Markdown MAT1091:

- `js/viz/derivative-definition.js` – Secant → Tangent (Dạng 6 trọng tâm)
- `js/viz/riemann-sum.js` – Tổng Riemann native JSXGraph (Dạng 13)
- `js/viz/series-partial-sums.js` – Tổng riêng chuỗi số (Dạng 16, Taylor)
- `js/viz/function-limit.js` – Giới hạn hàm số + open circle (Dạng 3)
- `js/viz/power-series-radius.js` – Miền hội tụ chuỗi lũy thừa (Dạng 18-19)
- `js/core/function-evaluator.js` – Parse công thức an toàn (JessieCode / fallback)

### Unified Config Schema

```js
{
  type: "derivative-def" | "riemann" | "series-partial" | "function-limit" | "power-series",
  formula: "sin(x)",
  point: 1,
  parameters: { h: { min: 0.01, max: 2, default: 0.5, label: "h" } },
  labels: { vi: "Đạo hàm bằng định nghĩa", en: "Derivative by definition" }
}
```

## Next Steps (sau nền tảng)

- Tích hợp nội dung đầy đủ từ Markdown (mục lục tương tác, từng dạng, bài tập đề thi).
- Thêm continuity-point, taylor-approximation, improper integral viz.
- Interactive TOC với search và dark mode hoàn chỉnh.
- Deployment lên GitHub Pages.

## Pedagogical Notes

- Always emphasize "approaching but not reaching" for limits.
- For squeeze, clearly show the middle function trapped between bounds that share the same limit.
