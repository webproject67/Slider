import Presenter from './components/presenter/presenter';

let presenter: Presenter;
$.fn.slider = function f(options: object | string, obj?: object) {
  if (options === 'getState') return presenter.model.getState();
  if (options === 'setState') {
    const keys = Object.keys(obj!);
    const values = Object.values(obj!);
    presenter.model.setValue(keys, values);
    return null;
  }
  if (options === 'getConfiguring') {
    presenter.model.setValue(['configuring'], [1]);
    return null;
  }

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
      configuring: 0,
      scale: true,
      step: 1,
      to: -10000,
      toPercent: 100,
      view: 'horizontal',
    },
    options
  );

  const cb = () => {
    presenter = new Presenter(this[0], state);
  };

  return this.each(cb);
};
