import SliderModel from '../model/slider-model';
import SliderView from '../slider/slider-view';
import ValueView from '../value/value-view';
import ScaleView from '../scale/scale-view';
import ConfiguringView from '../configuring/configuring-view';

class SliderPresenter {
  sliderModel: SliderModel;
  sliderView: SliderView;
  valueView: ValueView;
  scaleView: ScaleView;
  configuringView: ConfiguringView;

  constructor() {
    this.sliderModel = new SliderModel();
    this.sliderView = new SliderView(this.sliderModel);
    this.valueView = new ValueView(this.sliderModel);
    this.scaleView = new ScaleView(this.sliderModel);
    this.configuringView = new ConfiguringView(this.sliderModel);

    this.configuringView.onInputChange = (element) => {
      this.setNewValueInModel(element);
    }
  }

  public init(): void {
    this.showView(this.sliderView.element) 
    this.toggleView(this.sliderModel.valueValue, this.valueView.element, 'slider__block-value')
    this.toggleView(this.sliderModel.scaleValue, this.scaleView.element, 'slider__list')
    this.showView(this.configuringView.element) 
  }

  private showView(element: JQuery<HTMLElement>):void {
    $('.slider').append(element);
  } 

  private showViewBeforeSlider(element: JQuery<HTMLElement>):void {
    $('.slider__toggle').after(element);
  }

  private setNewValueInModel(element: HTMLElement): number | string | boolean {
    switch (element.dataset.name) {
      case 'min':
        return this.sliderModel.minValue = +(<HTMLInputElement>element).value;
      case 'max':
        return this.sliderModel.maxValue = +(<HTMLInputElement>element).value;
      case 'current':
        return this.sliderModel.currentValue = +(<HTMLInputElement>element).value;
      case 'step':
        return this.sliderModel.stepValue = +(<HTMLInputElement>element).value;
      case 'view':
        return this.sliderModel.viewValue = (<HTMLInputElement>element).value;
      case 'range':
        return this.sliderModel.rangeValue = (<HTMLInputElement>element).value;
      case 'value':
        this.sliderModel.valueValue = (<HTMLInputElement>element).checked;
        this.toggleView(this.sliderModel.valueValue, this.valueView.element, 'slider__block-value')
        return this.sliderModel.valueValue;
      case 'scale':
        this.sliderModel.scaleValue = (<HTMLInputElement>element).checked;
        this.toggleView(this.sliderModel.scaleValue, this.scaleView.element, 'slider__list')
        return this.sliderModel.scaleValue;
      default:
        throw new Error('no this values')
    }
  }

  private toggleView(model: boolean, element: JQuery<HTMLElement>, className: string): void {
    model ? this.showViewBeforeSlider(element) : $(`.${className}`).remove();
  }
}

export default new SliderPresenter();