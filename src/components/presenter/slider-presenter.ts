import SliderView from '../slider/slider-view';
import ScaleView from '../scale/scale-view';
import ConfiguringView from '../configuring/configuring-view';

const main: HTMLElement = <HTMLElement>document.querySelector('.slider');
export const showView = (element: HTMLElement): HTMLElement => main.appendChild(element);

class SliderPresenter {
  sliderView: SliderView;
  scaleView: ScaleView;
  configuringView: ConfiguringView;

  constructor() {
    this.sliderView = new SliderView();
    this.scaleView = new ScaleView();
    this.configuringView = new ConfiguringView();
  }

  showAll() {
    showView(this.sliderView.element) 
    showView(this.scaleView.element) 
    showView(this.configuringView.element) 
  }
}

export default new SliderPresenter();