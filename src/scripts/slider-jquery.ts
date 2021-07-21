import Presenter from './components/presenter/presenter';

(function ($) {
  $.fn.slider = function (options) {
    const state = $.extend(
      {
        flag: true,
        from: -10000,
        fromPercent: 0,
        max: 100,
        min: 0,
        progress: true,
        range: 'one',
        draft: 0,
        start: 1,
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
      new Presenter(main, state).init();
    });
  };
}(jQuery));
