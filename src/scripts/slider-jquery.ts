import ConfiguringPanel from './components/configuringPanel/ConfiguringPanel';
import Presenter from './components/presenter/Presenter';
import { stateType } from './types';

export default class Slider {
  main: HTMLElement;

  state!: stateType;

  presenter!: Presenter;

  configuringPanel!: ConfiguringPanel;

  constructor(main: HTMLElement, options: object) {
    this.main = main;
    this.init(options);
  }

  public init(options: object) {
    this.state = $.extend(
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

    this.presenter = new Presenter(this.main, this.state);

    return this.presenter;
  }

  public getState() {
    return this.state;
  }

  public setState(options: stateType) {
    const keys = Object.keys(options);
    const values = Object.values(options);
    keys.forEach((key, i) => {
      switch (key) {
        case 'start':
          this.state.start = Number(values[i]);
          break;
        case 'min':
          this.state.min = Number(values[i]);
          break;
        case 'max':
          this.state.max = Number(values[i]);
          break;
        case 'step':
          this.state.step = Number(values[i]);
          break;
        case 'from':
          this.state.from = Number(values[i]);
          break;
        case 'fromPercent':
          this.state.fromPercent = Number(values[i]);
          break;
        case 'to':
          this.state.to = Number(values[i]);
          break;
        case 'toPercent':
          this.state.toPercent = Number(values[i]);
          break;
        case 'view':
          this.state.view = String(values[i]);
          break;
        case 'range':
          this.state.range = String(values[i]);
          break;
        case 'flag':
          this.state.flag = Boolean(values[i]);
          break;
        case 'progress':
          this.state.progress = Boolean(options[key]);
          break;
        case 'scale':
          this.state.scale = Boolean(options[key]);
          break;
        default:
          break;
      }
    });

    this.configuringPanel.updateElement();
    this.presenter.view.updateView(this.state);
  }

  public showConfiguringPanel(): void {
    this.configuringPanel = new ConfiguringPanel(this.state, this.main);
    this.main
      .querySelector('.slider__wrapper')!
      .appendChild(this.configuringPanel.getElement());

    this.subscribe();
  }

  private subscribe() {
    const cbPanel = (keys: string[], values: (number | string | boolean)[]) =>
      this.presenter.model.setValue(keys, values);
    this.configuringPanel.subscribe(cbPanel);

    const cbModel = () => this.configuringPanel.updateElement();
    this.presenter.model.subscribe(cbModel);
  }
}

$.fn.slider = function f(options: object) {
  return new Slider(this[0], options);
};
