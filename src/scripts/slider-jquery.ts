import Slider from './Slider';
import { stateType } from './types';

$.fn.slider = function f(options: stateType) {
  return new Slider(this[0], options);
};
