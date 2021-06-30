import Slider from './components/presenter/slider-presenter';

(function ($) {
  $.fn.slider = function (options) {
    const state = $.extend(
      {
        flag: true,
        from: -10000,
        fromPercent: 0,
        max: 100,
        min: 0,
        range: 'one',
        scale: true,
        step: 1,
        to: -10000,
        toPercent: 100,
        view: 'horizontal',
      },
      options,
    );

    const main = this[0];

    return this.each(() => {
      new Slider(main, state).init();
    });
  };
}(jQuery));
