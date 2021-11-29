import Slider from './Slider';

$.fn.slider = function f(options: object | undefined) {
  return new Slider(this[0], options);
};
