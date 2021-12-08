import Slider from './components/slider/Slider';
import Panel from './components/panel/Panel';

declare global {
  interface JQuery {
    panel(slider: Slider): Panel;
  }
}

$.fn.panel = function f(slider: Slider) {
  return new Panel(this[0], slider);
};
