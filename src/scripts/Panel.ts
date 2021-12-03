import Slider from './Slider';
import ConfiguringPanel from './components/configuringPanel/ConfiguringPanel';
import { ModelType, ModelUpdate, PanelHandler, PanelTypes } from './types';

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

    const main: HTMLElement | null =
      this.main.querySelector('.slider__wrapper');
    if (main !== null) main.appendChild(this.configuringPanel.getElement());

    this.subscribe();
  }

  private subscribe(): void {
    const cbPanel = (data: PanelTypes) => {
      switch (data.type) {
        case PanelHandler.MIN:
          this.slider.updateState(data);
          break;
        case PanelHandler.MAX:
          this.slider.updateState(data);
          break;
        case PanelHandler.STEP:
          this.slider.updateState(data);
          break;
        case PanelHandler.VIEW:
          this.slider.updateState(data);
          break;
        case PanelHandler.RANGE:
          this.slider.updateState(data);
          break;
        case PanelHandler.FLAG:
          this.slider.updateState(data);
          break;
        case PanelHandler.PROGRESS:
          this.slider.updateState(data);
          break;
        case PanelHandler.SCALE:
          this.slider.updateState(data);
          break;
        default:
          throw new Error('there is no such event');
      }
    };
    this.configuringPanel.subscribe(cbPanel);

    const cbModel = (data: ModelType) => {
      switch (data.type) {
        case ModelUpdate.UPDATE:
          this.configuringPanel.updateElement(data.value);
          break;
        default:
          throw new Error('no state');
      }
    };
    this.slider.subscribe(cbModel);
  }
}
