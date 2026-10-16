// Tiệm Cận — API lõi, dùng chung cho mọi môn học. Không nạp gói nào.
// Gói môn học import từ đây:  import { figure, signal, runner } from '../../api.js';

export { signal, computed, effect, val, untrack, isSignal } from './core/signal.js';
export { compile, factorial, identifiers } from './core/expr.js';
export { tween, runner, frames, wait, ease, reducedMotion, CANCEL } from './core/anim.js';
export { stepper } from './core/stepper.js';
export { rk4Step, solveODE } from './core/sim.js';
export { pageVar, link, pageVars } from './core/vars.js';
export * as math from './core/math.js';
export { fmt, clamp, lerp, isNum, extent, sampleExtent, integrate, derivative } from './core/math.js';
export { Board, color } from './render/board.js';
export { Stage, svg } from './render/stage.js';
export { renderTex, renderRich, renderMathIn } from './render/tex.js';
export { figure, slider, segmented, button, playButton } from './ui/controls.js';
export {
  defineScene, definePack, scope, registerPack, listPacks, mount, mountAsync,
  sceneNames, getScene, getPreset, qualify, DEFAULT_PACK, COMMON_PARAMS,
} from './registry.js';
