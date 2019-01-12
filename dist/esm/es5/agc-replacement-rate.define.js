
// AgcReplacementRate: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-replacement-rate.core.js';
import {
  AgcReplacementRate,
  AgcReplacementRateInputs,
  AgcReplacementRateProgress,
  AgcReplacementRateResults,
  AgcReplacementRateResultsPlaceholder
} from './agc-replacement-rate.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcReplacementRate,
    AgcReplacementRateInputs,
    AgcReplacementRateProgress,
    AgcReplacementRateResults,
    AgcReplacementRateResultsPlaceholder
  ], opts);
}
