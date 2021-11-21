import App from './components/app/App';
import Presenter from './components/presenter/Presenter';

let app: App;
let presenter: Presenter;

$.fn.slider = function f(options: object | string, obj?: object) {
  const state = $.extend(
    {
      flag: true,
      from: -10000,
      fromPercent: 0,
      max: 100,
      min: 0,
      progress: true,
      range: 'one',
      start: 1,
      scale: true,
      step: 1,
      to: -10000,
      toPercent: 100,
      view: 'horizontal',
    },
    options
  );

  if (options === 'getState') return presenter.model.getState();

  if (options === 'setState') {
    const keys = Object.keys(obj!);
    const values = Object.values(obj!);
    presenter.model.setValue(keys, values);
    return null;
  }

  if (options === 'getConfiguring') {
    app.renderConfiguringPanel();
    return null;
  }

  const cb = () => {
    app = new App(this[0], state);
    app.render();
  };

  return this.each(cb);
};
