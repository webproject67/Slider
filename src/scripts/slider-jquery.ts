import Slider from './Slider';
import { IState } from './types';

$.fn.slider = function f(options: IState) {
  return new Slider(this[0], options);
};
