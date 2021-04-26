import SliderModel from '../model/slider-model';
import SliderViewOne from '../slider-one/slider-view-one';
import SliderViewRange from '../slider-range/slider-view-range';
import SliderViewVerticalOne from '../slider-vertical-one/slider-view-vertical-one';
import SliderViewVerticalRange from '../slider-vertical-range/slider-view-vertical-range';
import ConfiguringViewOne from '../configuring-one/configuring-view-one';
import ConfiguringViewRange from '../configuring-range/configuring-view-range';
// import ValueView from '../value/value-view';
// import ScaleView from '../scale/scale-view';
// import ConfiguringView from '../configuring/configuring-view';

class SliderPresenter {
  sliderModel: SliderModel;
  sliderViewOne: SliderViewOne;
  sliderViewRange: SliderViewRange;
  sliderViewVerticalOne: SliderViewVerticalOne;
  sliderViewVerticalRange: SliderViewVerticalRange;
  configuringViewOne: ConfiguringViewOne;
  configuringViewRange: ConfiguringViewRange;
//   valueView: ValueView;
//   scaleView: ScaleView;
//   configuringView: ConfiguringView;

  constructor() {
    this.sliderModel = new SliderModel();
    this.sliderViewOne = new SliderViewOne(this.sliderModel);
    this.sliderViewRange = new SliderViewRange(this.sliderModel);
    this.sliderViewVerticalOne = new SliderViewVerticalOne(this.sliderModel);
    this.sliderViewVerticalRange = new SliderViewVerticalRange(this.sliderModel);
    this.configuringViewOne = new ConfiguringViewOne(this.sliderModel);
    this.configuringViewRange = new ConfiguringViewRange(this.sliderModel);
//     this.valueView = new ValueView(this.sliderModel);
//     this.scaleView = new ScaleView(this.sliderModel);
//     this.configuringView = new ConfiguringView(this.sliderModel);

//     this.sliderView.onToggleMouseDown = (evt) => {
//       this.moveToggle(evt)
//     }

//     this.configuringView.onInputChange = (element) => {
//       this.setNewValueInModel(element);
//     }
  }

//   private getCoords(elem: JQuery<HTMLElement>): {
//     left: number;
//     width: number;
//   } {
//     const boxLeft: number = elem.offset()!.left;
//     const boxRight: number = boxLeft + elem.outerWidth()!;

//     return {
//       left: boxLeft + pageXOffset,
//       width: boxRight - boxLeft,
//     };
//   }

  private showConfiguringView(className: string) {
    if (this.sliderModel.rangeValue === 'one') {
      this.showView(className, this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range') {
      this.showView(className, this.configuringViewRange.element);
    } else {
      throw new Error('no value range')
    }
  }

  public init(obj:any): void {
    for (const key in obj) {
      if(this.sliderModel.state.hasOwnProperty(key)) this.setInModelValue(key, obj[key]);
    }

    this.showSliderView(this.sliderModel.mainValue);
    this.showConfiguringView('.slider__wrapper');
    
//     this.toggleView(this.sliderModel.valueValue, this.valueView.element, 'slider__block-value')
//     this.toggleView(this.sliderModel.scaleValue, this.scaleView.element, 'slider__list')
//     this.showView(this.configuringView.element) 
  }

  private setInModelValue(key: string, value: number | string | boolean): void {
    switch (key) {
      case 'main':
        this.sliderModel.mainValue = <string>value;
      break;
      case 'min':
        this.sliderModel.minValue = <number>value;
      break;
      case 'max':
        this.sliderModel.maxValue = <number>value;
      break;
      case 'from':
        this.sliderModel.fromValue = <number>value;
      break;
      case 'to':
        this.sliderModel.toValue = <number>value;
      break;
      case 'step':
        this.sliderModel.stepValue = <number>value;
      break;
      case 'view':
        this.sliderModel.viewValue = <string>value;
      break;
      case 'range':
        this.sliderModel.rangeValue = <string>value;
      break;
      case 'flag':
        this.sliderModel.flagValue = <boolean>value;
      break;
      case 'scale':
        this.sliderModel.scaleValue = <boolean>value;
      break;
      default:
        throw new Error('there is no such value')
    }
  }

  private showSliderView(className: string):void {
    if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
      this.showView(className, this.sliderViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
      this.showView(className, this.sliderViewRange.element);
    } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
      this.showView(className, this.sliderViewVerticalOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
      this.showView(className, this.sliderViewVerticalRange.element);
    } else {
      throw new Error('no value range or view')
    }
  } 

  private showView(className: string, element: JQuery<HTMLElement>):void {
    $(className).append(element);
  } 

//   private moveToggle(evt: JQuery.MouseDownEvent<HTMLElement>) {
//     const sliderViewElement: JQuery<HTMLElement> = $(this.sliderView.element);
//     const sliderToggleViewElement: JQuery<HTMLElement> = $(this.sliderView.element).children('.slider__toggle');
//     const sliderValueViewElement: JQuery<HTMLElement> = $(this.sliderView.element).find('.slider__value');
//     const maxValue: number = this.sliderModel.maxValue;
//     const minValue: number = this.sliderModel.minValue;
//     const stepValue: number = this.sliderModel.stepValue;
//     let current: number;

//     const sliderCoords: {
//       left: number;
//       width: number;
//     } = this.getCoords(sliderViewElement);

//     const sliderToggleCoords: {
//       left: number;
//       width: number;
//     } = this.getCoords(sliderToggleViewElement);

//     const shift: number = evt.pageX - sliderToggleCoords.left;

//     $(document).on('mousemove', function (evt) {
//       let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
//       if (left < 0) left = 0;
//       if (left > 100) left = 100;

//       const stepCount: number = (maxValue - minValue) / stepValue;
//       const stepPercent: number = 100 / stepCount;
//       let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
//       if (stepLeft < 0) stepLeft = 0;
//       if (stepLeft > 100) stepLeft = 100;
//       sliderToggleViewElement.css({'left': stepLeft + '%'});
//       sliderValueViewElement.css({'left': stepLeft + '%'});
//       $('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});

//       let newLeft = evt.pageX - shift - sliderCoords.left;
//       if (newLeft < 0) newLeft = 0;
//       let rightEdge = sliderViewElement.width()! - sliderToggleViewElement.width()!;
//       if (newLeft > rightEdge) newLeft = rightEdge;
//       var stepSize = rightEdge / stepCount;
//       var leftt = Math.round(newLeft / stepSize) * stepSize;
//       current = (leftt / stepSize) * stepValue;

//       $(document).on('mouseup', function () {
//         $(document).off('mousemove')
//       })
//     })
//   }

  

//   private showViewBeforeSlider(element: JQuery<HTMLElement>):void {
//     $('.slider__toggle').after(element);
//   }

//   private setNewValueInModel(element: HTMLElement): number | string | boolean {
//     switch (element.dataset.name) {
//       case 'min':
//         this.sliderModel.minValue = +(<HTMLInputElement>element).value;
//         this.scaleView.replaceView('slider__list');
//         return this.sliderModel.minValue;
//       case 'max':
//         this.sliderModel.maxValue = +(<HTMLInputElement>element).value;
//         this.scaleView.replaceView('slider__list');
//         return this.sliderModel.maxValue;
//       case 'current':
//         this.sliderModel.currentValue = +(<HTMLInputElement>element).value;
//         this.valueView.replaceView('slider__block-value');
//         return this.sliderModel.currentValue;
//       case 'step':
//         this.sliderModel.stepValue = +(<HTMLInputElement>element).value;
//         this.scaleView.replaceView('slider__list');
//         return this.sliderModel.stepValue;
//       case 'view':
//         return this.sliderModel.viewValue = (<HTMLInputElement>element).value;
//       case 'range':
//         return this.sliderModel.rangeValue = (<HTMLInputElement>element).value;
//       case 'value':
//         this.sliderModel.valueValue = (<HTMLInputElement>element).checked;
//         this.toggleView(this.sliderModel.valueValue, this.valueView.element, 'slider__block-value')
//         return this.sliderModel.valueValue;
//       case 'scale':
//         this.sliderModel.scaleValue = (<HTMLInputElement>element).checked;
//         this.toggleView(this.sliderModel.scaleValue, this.scaleView.element, 'slider__list')
//         return this.sliderModel.scaleValue;
//       default:
//         throw new Error('no this values')
//     }
//   }

//   private toggleView(model: boolean, element: JQuery<HTMLElement>, className: string): void {
//     model ? this.showViewBeforeSlider(element) : $(`.${className}`).remove();
//   }
}

export default new SliderPresenter();