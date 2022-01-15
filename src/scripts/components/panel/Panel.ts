import Slider from '../slider/Slider';
import ConfiguringPanel from '../configuringPanel/ConfiguringPanel';
import { ModelType, ModelUpdate, PanelHandler, PanelTypes } from '../../types';

export default class Panel {
  private configuringPanel!: ConfiguringPanel;

  private main: HTMLElement;

  private slider: Slider;

  constructor(main: HTMLElement, slider: Slider) {
    this.main = main;
    this.slider = slider;
    this.init();
  }

  public getElement(): HTMLElement {
    return this.configuringPanel.getElement();
  }

  private init(): void {
    this.configuringPanel = new ConfiguringPanel(this.slider.getState());

    const main: HTMLElement | null =
      this.main.querySelector('.slider__wrapper');
    if (main) main.appendChild(this.getElement());

    this.subscribe();
  }

  private subscribe(): void {
    const cbPanel = (data: PanelTypes) => {
      switch (data.type) {
        case PanelHandler.HANDLE_INPUT_MIN_CHANGE:
          this.slider.setState({ min: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_MAX_CHANGE:
          this.slider.setState({ max: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_FROM_CHANGE:
          this.slider.setState({ from: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_TO_CHANGE:
          this.slider.setState({ to: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_STEP_CHANGE:
          this.slider.setState({ step: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_VIEW_CHANGE:
          this.slider.setState({ view: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_RANGE_CHANGE:
          this.slider.setState({ range: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_FLAG_CHANGE:
          this.slider.setState({ flag: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_PROGRESS_CHANGE:
          this.slider.setState({ progress: data.value });
          break;
        case PanelHandler.HANDLE_INPUT_SCALE_CHANGE:
          this.slider.setState({ scale: data.value });
          break;
        default:
          throw new Error('there is no such event');
      }
    };
    this.configuringPanel.subscribe(cbPanel);

    const cbModel = (data: ModelType) => {
      switch (data.type) {
        case ModelUpdate.UPDATE_MODEL_STATE:
          this.configuringPanel.updateElement(data.value);
          break;
        default:
          throw new Error('no state');
      }
    };
    this.slider.subscribe(cbModel);
  }
}
