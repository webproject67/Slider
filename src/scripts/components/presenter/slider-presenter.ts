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

    this.sliderViewOne.toggleMouseOver = (evt) => {
      this.toggleMouseOver(evt);
    }
    
    this.sliderViewRange.toggleMouseOver = (evt) => {
      this.toggleMouseOver(evt);
    }
    
    this.sliderViewVerticalOne.toggleMouseOver = (evt) => {
      this.toggleMouseOver(evt);
    }
    
    this.sliderViewVerticalRange.toggleMouseOver = (evt) => {
      this.toggleMouseOver(evt);
    }
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
      case 'fromPercent':
        this.sliderModel.fromPercentValue = <number>value;
      break;
      case 'to':
        this.sliderModel.toValue = <number>value;
      break;
      case 'toPercent':
        this.sliderModel.toPercentValue = <number>value;
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
    }
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

  private toggleMouseOver(evt: JQuery.MouseOverEvent<HTMLElement>):void {
    const toggle: JQuery<HTMLElement> = $(evt.target);
    const slider: JQuery<HTMLElement> = $(evt.currentTarget);
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;

    const getCoords = (elem: JQuery<HTMLElement>): {
      left: number;
      width: number;
      top: number;
      height: number;
    } => {
      const boxLeft: number = elem.offset()!.left;
      const boxRight: number = boxLeft + elem.outerWidth()!;
      const boxTop: number = elem.offset()!.top;
      const boxBottom: number = boxTop + elem.outerHeight()!;
    
      return {
        left: boxLeft + pageXOffset,
        width: boxRight - boxLeft,
        top: boxTop + pageYOffset,
        height: boxBottom - boxTop
      };
    }

    if (toggle.hasClass('slider__toggle')) {
      toggle.on('mousedown', (evt: JQuery.MouseDownEvent<HTMLElement>): void => {
        if (slider.hasClass('slider__inner--height')) {
          const sliderCoords: {
            top: number;
            height: number;
          } = getCoords(slider);
  
          const toggleCoords: {
            top: number;
            height: number;
          } = getCoords(toggle);
  
          const shift: number = evt.pageY - toggleCoords.top - 10;
  
          $(document).on('mousemove', (evt: JQuery.MouseMoveEvent<Document>): void => {
            let top: number = ((evt.pageY - shift - sliderCoords.top) / sliderCoords.height) * 100;
            if (top < 0) top = 0;
            if (top > 100) top = 100;

            if (toggle.hasClass('slider__toggle--vertical-min')) {
              const maxPercent: number = this.sliderModel.toPercentValue;
              if (top > maxPercent) top = maxPercent;
            }
            
            if (toggle.hasClass('slider__toggle--vertical-max')) {
              const minPercent: number = this.sliderModel.fromPercentValue;
              if (minPercent > top) top = minPercent;
            }
        
            const stepCount: number = (max - min) / step;
            const stepPercent: number = 100 / stepCount;
            let stepTop: number = Math.round(top / stepPercent) * stepPercent;
            if (stepTop < 0) stepTop = 0;
            if (stepTop > 100) stepTop = 100;

            toggle.css({'top': stepTop + '%'});

            if (toggle.hasClass('slider__toggle--vertical-min')) {
              const maxPercent: number = this.sliderModel.toPercentValue;
              slider.find('.slider__bar').css({
                'top': stepTop + '%',
                'height': maxPercent - stepTop + '%'
              });
            }

            if (toggle.hasClass('slider__toggle--vertical-max')) {
              const minPercent: number = this.sliderModel.fromPercentValue;
              slider.find('.slider__bar').css({'height': stepTop - minPercent + '%'});
            }
        
            const result: string = (((stepTop / stepPercent) * step).toFixed());
            const value: number = <number><unknown>+result + min;

            if (this.sliderModel.rangeValue === 'one') {
              this.setInModelValue('to', value);
              $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
              $(this.flagViewVerticalOne.element).replaceWith(this.flagViewVerticalOne.newElement);
              slider.find('.slider__flag-vertical').css({'top': stepTop - 5 + '%'});
            }
            
            if (this.sliderModel.rangeValue === 'range') {
              if (toggle.hasClass('slider__toggle--vertical-min')) {
                this.setInModelValue('from', value);
                $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
                $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
                this.setInModelValue('fromPercent', stepTop);
                slider.find('.slider__flag-vertical--min').css({'top': stepTop - 5 + '%'});
                slider.find('.slider__flag-vertical--max').css({'top': this.sliderModel.toPercentValue - 5 + '%'});
              }
              
              if (toggle.hasClass('slider__toggle--vertical-max')) {
                this.setInModelValue('to', value);
                $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
                $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
                this.setInModelValue('toPercent', stepTop);
                slider.find('.slider__flag-vertical--min').css({'top': this.sliderModel.fromPercentValue - 5 + '%'});
                slider.find('.slider__flag-vertical--max').css({'top': stepTop - 5 + '%'});
              } 
            }
          })
        } else {
          const sliderCoords: {
            left: number;
            width: number;
          } = getCoords(slider);
  
          const toggleCoords: {
            left: number;
            width: number;
          } = getCoords(toggle);
  
          const shift: number = evt.pageX - toggleCoords.left - 10;
  
          $(document).on('mousemove', (evt: JQuery.MouseMoveEvent<Document>): void => {
            let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
            if (left < 0) left = 0;
            if (left > 100) left = 100;

            if (toggle.hasClass('slider__toggle--min')) {
              const maxPercent: number = this.sliderModel.toPercentValue;
              if (left > maxPercent) left = maxPercent;
            }
            
            if (toggle.hasClass('slider__toggle--max')) {
              const minPercent: number = this.sliderModel.fromPercentValue;
              if (minPercent > left) left = minPercent;
            }
        
            const stepCount: number = (max - min) / step;
            const stepPercent: number = 100 / stepCount;
            let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
            if (stepLeft < 0) stepLeft = 0;
            if (stepLeft > 100) stepLeft = 100;

            toggle.css({'left': stepLeft + '%'});

            if (toggle.hasClass('slider__toggle--min')) {
              slider.find('.slider__bar').css({'marginLeft': stepLeft + '%'});
            }

            if (toggle.hasClass('slider__toggle--max')) {
              slider.find('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});
            } 
        
            const result: string = (((stepLeft / stepPercent) * step).toFixed());
            const value: number = <number><unknown>+result + min;

            if (this.sliderModel.rangeValue === 'one') {
              this.setInModelValue('to', value);
              $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
              $(this.flagViewOne.element).replaceWith(this.flagViewOne.newElement);
              slider.find('.slider__flag').css({'left': stepLeft + '%'});
            }
            
            if (this.sliderModel.rangeValue === 'range') {
              if (toggle.hasClass('slider__toggle--min')) {
                this.setInModelValue('from', value);
                $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
                $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
                this.setInModelValue('fromPercent', stepLeft);
                slider.find('.slider__flag--min').css({'left': stepLeft + '%'});
                slider.find('.slider__flag--max').css({'left': this.sliderModel.toPercentValue + '%'});
              }
  
              if (toggle.hasClass('slider__toggle--max')) {
                this.setInModelValue('to', value);
                $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
                $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
                this.setInModelValue('toPercent', stepLeft);
                slider.find('.slider__flag--min').css({'left': this.sliderModel.fromPercentValue + '%'});
                slider.find('.slider__flag--max').css({'left': stepLeft + '%'});
              } 
            }
          })
        }
      
        $(document).on('mouseup', (): void => {
          $(document).off('mousemove');
          $(document).off('mouseup');
        })
      })
    }
  }
}

export default new SliderPresenter();