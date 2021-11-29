import Slider from './Slider';
import ConfiguringPanel from './components/configuringPanel/ConfiguringPanel';

export default class Panel {
  private configuringPanel!: ConfiguringPanel;

  private main: HTMLElement;

  private slider: Slider;

  constructor(main: HTMLElement, slider: Slider) {
    this.main = main;
    this.slider = slider;
    this.init();
  }

  private init(): void {
    this.configuringPanel = new ConfiguringPanel(this.slider.getState());
    this.main
      .querySelector('.slider__wrapper')!
      .appendChild(this.configuringPanel.getElement());

    this.subscribe();
  }

  private subscribe(): void {
    const cbPanel = (keys: string[], values: (number | boolean)[]) =>
      this.slider.presenter.model.setValue(keys, values);
    this.configuringPanel.subscribe(cbPanel);

    const cbModel = () => this.configuringPanel.updateElement();
    this.slider.presenter.model.subscribe(cbModel);
  }
}
