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

    this.sliderView.onToggleMouseDown = (evt) => {
      this.moveToggle(evt)
    }

    this.configuringView.onInputChange = (element) => {
      this.setNewValueInModel(element);
    }
  }

  private getCoords(elem: JQuery<HTMLElement>): {
    left: number;
    width: number;
  } {
    const boxLeft: number = elem.offset()!.left;
    const boxRight: number = boxLeft + elem.outerWidth()!;

    return {
      left: boxLeft + pageXOffset,
      width: boxRight - boxLeft,
    };
  }

  public init(): void {
    this.showView(this.sliderView.element) 
    this.toggleView(this.sliderModel.valueValue, this.valueView.element, 'slider__block-value')
    this.toggleView(this.sliderModel.scaleValue, this.scaleView.element, 'slider__list')
    this.showView(this.configuringView.element) 
  }

  private moveToggle(evt: JQuery.MouseDownEvent<HTMLElement>) {
    const sliderViewElement: JQuery<HTMLElement> = $(this.sliderView.element);
    const sliderToggleViewElement: JQuery<HTMLElement> = $(this.sliderView.element).children('.slider__toggle');
    const maxValue: number = this.sliderModel.maxValue;
    const minValue: number = this.sliderModel.minValue;
    const stepValue: number = this.sliderModel.stepValue;

    const sliderCoords: {
      left: number;
      width: number;
    } = this.getCoords(sliderViewElement);

    const sliderToggleCoords: {
      left: number;
      width: number;
    } = this.getCoords(sliderToggleViewElement);

    const shift: number = evt.pageX - sliderToggleCoords.left;

    $(document).on('mousemove', function (evt) {
      let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
      if (left < 0) left = 0;
      if (left > 100) left = 100;

      const stepCount: number = (maxValue - minValue) / stepValue;
      const stepPercent: number = 100 / stepCount;
      let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
      if (stepLeft < 0) stepLeft = 0;
      if (stepLeft > 100) stepLeft = 100;
      sliderToggleViewElement.css({'left': stepLeft + '%'});
      $('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});

      $(document).on('mouseup', function () {
        $(document).off('mousemove')
      })
    })
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
        this.sliderModel.minValue = +(<HTMLInputElement>element).value;
        this.scaleView.newScaleView();
        return this.sliderModel.minValue;
      case 'max':
        this.sliderModel.maxValue = +(<HTMLInputElement>element).value;
        this.scaleView.newScaleView();
        return this.sliderModel.maxValue;
      case 'current':
        return this.sliderModel.currentValue = +(<HTMLInputElement>element).value;
      case 'step':
        this.sliderModel.stepValue = +(<HTMLInputElement>element).value;
        this.scaleView.newScaleView();
        return this.sliderModel.stepValue;
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