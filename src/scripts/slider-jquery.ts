import Slider from './Slider';
import { IState } from './types';

declare global {
  interface JQuery {
    slider(options: IState): Slider;
  }
}

$.fn.slider = function f(options: IState) {
  return new Slider(this[0], options);
};
