import SliderModel from '../model/slider-model';
import SliderViewOne from '../slider-one/slider-view-one';
import SliderViewRange from '../slider-range/slider-view-range';
import SliderViewVerticalOne from '../slider-vertical-one/slider-view-vertical-one';
import SliderViewVerticalRange from '../slider-vertical-range/slider-view-vertical-range';
import ConfiguringViewOne from '../configuring-one/configuring-view-one';
import ConfiguringViewRange from '../configuring-range/configuring-view-range';
import ScaleView from '../scale/scale-view';
import ScaleViewVertical from '../scale-vertical/scale-view-vertical';
import FlagViewOne from '../flag-one/flag-view-one';
import FlagViewRange from '../flag-range/flag-view-range';
import FlagViewVerticalOne from '../flag-vertical-one/flag-view-vertical-one';
import FlagViewVerticalRange from '../flag-vertical-range/flag-view-vertical-range';

class SliderPresenter {
  sliderModel: SliderModel;
  sliderViewOne: SliderViewOne;
  sliderViewRange: SliderViewRange;
  sliderViewVerticalOne: SliderViewVerticalOne;
  sliderViewVerticalRange: SliderViewVerticalRange;
  configuringViewOne: ConfiguringViewOne;
  configuringViewRange: ConfiguringViewRange;
  scaleView: ScaleView;
  scaleViewVertical: ScaleViewVertical;
  flagViewOne: FlagViewOne;
  flagViewRange: FlagViewRange;
  flagViewVerticalOne: FlagViewVerticalOne;
  flagViewVerticalRange: FlagViewVerticalRange;

  constructor() {
    this.sliderModel = new SliderModel();
    this.sliderViewOne = new SliderViewOne(this.sliderModel);
    this.sliderViewRange = new SliderViewRange(this.sliderModel);
    this.sliderViewVerticalOne = new SliderViewVerticalOne(this.sliderModel);
    this.sliderViewVerticalRange = new SliderViewVerticalRange(this.sliderModel);
    this.configuringViewOne = new ConfiguringViewOne(this.sliderModel);
    this.configuringViewRange = new ConfiguringViewRange(this.sliderModel);
    this.scaleView = new ScaleView(this.sliderModel);
    this.scaleViewVertical = new ScaleViewVertical(this.sliderModel);
    this.flagViewOne = new FlagViewOne(this.sliderModel);
    this.flagViewRange = new FlagViewRange(this.sliderModel);
    this.flagViewVerticalOne = new FlagViewVerticalOne(this.sliderModel);
    this.flagViewVerticalRange = new FlagViewVerticalRange(this.sliderModel);
  }

  public init(obj:any): void {
    for (const key in obj) {
      if(this.sliderModel.state.hasOwnProperty(key)) this.setInModelValue(key, obj[key]);
    }

    this.showSliderView(this.sliderModel.mainValue);
    this.showConfiguringView('.slider__wrapper');
    this.showScaleView('.slider__inner');
    this.showFlagView('.slider__inner');
  }

  private showConfiguringView(className: string):void {
    if (this.sliderModel.rangeValue === 'one') {
      this.showView(className, this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range') {
      this.showView(className, this.configuringViewRange.element);
    } else {
      throw new Error('incorrect value')
    }
  }

  private showFlagView(className: string):void {
    if(this.sliderModel.flagValue) {
      if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
        this.showView(className, this.flagViewOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
        this.showView(className, this.flagViewRange.element);
      } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
        this.showView(className, this.flagViewVerticalOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
        this.showView(className, this.flagViewVerticalRange.element);
      } else {
        throw new Error('incorrect value')
      }
    }
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
        throw new Error('incorrect key')
    }
  }

  private showScaleView(className: string): void {
    if(this.sliderModel.scaleValue) {
      if (this.sliderModel.viewValue === 'horizontal') {
        this.showView(className, this.scaleView.element)
      } else if (this.sliderModel.viewValue === 'vertical') {
        this.showView(className, this.scaleViewVertical.element)
      } else {
        throw new Error('incorrect value')
      }
    };
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
      throw new Error('incorrect value')
    }
  } 

  private showView(className: string, element: JQuery<HTMLElement>):void {
    $(className).append(element);
  } 
}

export default new SliderPresenter();