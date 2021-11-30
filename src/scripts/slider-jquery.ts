import Slider from './Slider';

$.fn.slider = function f(options?: object) {
  return new Slider(this[0], options);
};
