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

export default class SliderPresenter {
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

    this.configuringViewOne.inputChange = (evt) => {
      this.inputChange(evt);
    }
    
    this.configuringViewRange.inputChange = (evt) => {
      this.inputChange(evt);
    }

    this.sliderViewOne.sliderMouseOver = (evt) => {
      this.sliderMouseOver(evt);
    }
    
    this.sliderViewRange.sliderMouseOver = (evt) => {
      this.sliderMouseOver(evt);
    }
    
    this.sliderViewVerticalOne.sliderMouseOver = (evt) => {
      this.sliderMouseOver(evt);
    }
    
    this.sliderViewVerticalRange.sliderMouseOver = (evt) => {
      this.sliderMouseOver(evt);
    }
  }

  private getClassName(main: JQuery<HTMLElement>): string {
    let classNameOrId: string = '';

    if (main.attr('id')) {
      classNameOrId = '#' + <string>main.attr('id');
    } else {
      classNameOrId = '.' + <string>main.attr('class');
    } 

    return classNameOrId;
  }

  public init(obj:any): void {
    for (const key in obj) {
      if(this.sliderModel.state.hasOwnProperty(key)) this.setInModelValue(key, obj[key]);
    }

    this.showSliderView(this.sliderModel.mainValue);
    this.showConfiguringView(this.sliderModel.mainValue);
    this.showScaleView(this.sliderModel.mainValue);
    this.showFlagView(this.sliderModel.mainValue);
  }

  private inputChange(evt: JQuery.ChangeEvent<HTMLElement>):void {
    const input: JQuery<HTMLElement> = $(evt.target);

    if (input.data('name') === 'min' || input.data('name') === 'max') {
      this.setInModelValue(input.data('name'), +input.val()!);

      const main: JQuery<HTMLElement> = input.parents('div:last()');

      $(this.flagViewOne.element).replaceWith(this.flagViewOne.newElement);
      $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
      $(this.flagViewVerticalOne.element).replaceWith(this.flagViewVerticalOne.newElement);
      $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
      $(this.scaleView.element).replaceWith(this.scaleView.newElement);
      $(this.scaleViewVertical.element).replaceWith(this.scaleViewVertical.newElement);
      $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
      $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);

      main.find('.slider__flag--min').css({'left': this.sliderModel.fromPercentValue + '%'});
      main.find('.slider__flag-vertical--min').css({'top': this.sliderModel.fromPercentValue - 5 + '%'});
      main.find('.slider__flag--max').css({'left': this.sliderModel.toPercentValue + '%'});
      main.find('.slider__flag-vertical--max').css({'top': this.sliderModel.toPercentValue - 5 + '%'});
    }

    if (input.data('name') === 'step') {
      let value: number = +input.val()!;

      if(value === 0) value = 1;
      if(value < 0) value = Math.abs(value);

      this.setInModelValue('step', value);

      $(this.scaleView.element).replaceWith(this.scaleView.newElement);
      $(this.scaleViewVertical.element).replaceWith(this.scaleViewVertical.newElement);
    }

    if (input.data('name') === 'view' || input.data('name') === 'range') {
      this.setInModelValue(input.data('name'), <string>input.val());

      const main: JQuery<HTMLElement> = input.parents('div:last()');

      main.find('.slider__inner').remove();

      if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
        main.find('.slider__inputs').before(this.sliderViewOne.newElement.find('.slider__inner'));
        main.find('.slider__inputs').replaceWith(this.configuringViewOne.newElement);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
        main.find('.slider__inputs').before(this.sliderViewRange.newElement.find('.slider__inner'));
        main.find('.slider__inputs').replaceWith(this.configuringViewRange.newElement);
      } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
        main.find('.slider__inputs').before(this.sliderViewVerticalOne.newElement.find('.slider__inner'));
        main.find('.slider__inputs').replaceWith(this.configuringViewOne.newElement);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
        main.find('.slider__inputs').before(this.sliderViewVerticalRange.newElement.find('.slider__inner'));
        main.find('.slider__inputs').replaceWith(this.configuringViewRange.newElement);
      }

      this.showScaleView(this.getClassName(main));
      this.showFlagView(this.getClassName(main));
    }

    if (input.data('name') === 'flag') {
      this.setInModelValue('flag', input.is(':checked'));

      const main: JQuery<HTMLElement> = input.parents('div:last()');

      main.find('.slider__flags').remove();
      
      this.showFlagView(this.getClassName(main));
    }
    
    if (input.data('name') === 'scale') {
      this.setInModelValue('scale', input.is(':checked'));

      const main: JQuery<HTMLElement> = input.parents('div:last()');

      main.find('.slider__list').remove();
      
      this.showScaleView(this.getClassName(main));
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
      $(className).find('.slider__wrapper').append(this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range') {
      $(className).find('.slider__wrapper').append(this.configuringViewRange.element);
    } else {
      throw new Error('incorrect value')
    }
  }

  private showFlagView(className: string):void {
    if(this.sliderModel.flagValue) {
      if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
        $(className).find('.slider__inner').append(this.flagViewOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
        $(className).find('.slider__inner').append(this.flagViewRange.element);
      } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
        $(className).find('.slider__inner').append(this.flagViewVerticalOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
        $(className).find('.slider__inner').append(this.flagViewVerticalRange.element);
      } else {
        throw new Error('incorrect value')
      }
    }
  }

  private showScaleView(className: string): void {
    if(this.sliderModel.scaleValue) {
      if (this.sliderModel.viewValue === 'horizontal') {
        $(className).find('.slider__inner').append(this.scaleView.element);
      } else if (this.sliderModel.viewValue === 'vertical') {
        $(className).find('.slider__inner').append(this.scaleViewVertical.element);
      } else {
        throw new Error('incorrect value')
      }
    };
  }

  private showSliderView(className: string):void {
    if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
      $(className).append(this.sliderViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
      $(className).append(this.sliderViewRange.element);
    } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
      $(className).append(this.sliderViewVerticalOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
      $(className).append(this.sliderViewVerticalRange.element);
    } else {
      throw new Error('incorrect value')
    }
  } 

  private sliderMouseOver(evt: JQuery.MouseOverEvent<HTMLElement>):void {
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

    const sliderCoords: {
      left: number;
      width: number;
      top: number;
      height: number;
    } = getCoords(slider);

    const toggleCoords: {
      top: number;
      height: number;
      left: number;
      width: number;
    } = getCoords(toggle);

    if (toggle.hasClass('slider__toggle')) {
      this.toggleMouseDown(toggle, slider, min, max, step, toggleCoords, sliderCoords);      
    }
    
    if (toggle.hasClass('slider__item')) {
      this.scaleClick(toggle, slider, min, max, step, toggleCoords, sliderCoords);  
    }
  }

  private scaleClick(
    toggle: JQuery<HTMLElement>, 
    slider: JQuery<HTMLElement>, 
    min: number, 
    max: number, 
    step: number, 
    toggleCoords: {top: number; height: number; left: number; width: number;}, 
    sliderCoords: {top: number; height: number; left: number; width: number;}
  ): void {
    toggle.on('click', (evt: JQuery.ClickEvent<HTMLElement>): void => {
      if (slider.hasClass('slider__inner--height')) {
        const shift: number = evt.pageY - toggleCoords.top;

        let top: number = ((evt.pageY - shift - sliderCoords.top) / sliderCoords.height) * 100;
        if (top < 0) top = 0;
        if (top > 100) top = 100;

        const stepCount: number = (max - min) / step;
        const stepPercent: number = 100 / stepCount;
        let stepTop: number = Math.round(top / stepPercent) * stepPercent;
        if (stepTop < 0) stepTop = 0;
        if (stepTop > 100) stepTop = 100;

        const result: string = (((stepTop / stepPercent) * step).toFixed());
        const value: number = <number><unknown>+result + min;

        if (this.sliderModel.rangeValue === 'one') {
          this.setInModelValue('to', value);
          $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
          $(this.flagViewVerticalOne.element).replaceWith(this.flagViewVerticalOne.newElement);
          this.setInModelValue('toPercent', stepTop);
          slider.find('.slider__flag-vertical--max').css({'top': stepTop - 5 + '%'});
          slider.find('.slider__toggle--vertical-max').css({'top': stepTop + '%'});
          slider.find('.slider__bar').css({'height': stepTop + '%'});
        }

        if (this.sliderModel.rangeValue === 'range') {
          if(this.sliderModel.fromPercentValue > stepTop) {
            this.setInModelValue('from', value);
            $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
            $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
            this.setInModelValue('fromPercent', stepTop);
            slider.find('.slider__flag-vertical--min').css({'top': stepTop - 5 + '%'});
            slider.find('.slider__flag-vertical--max').css({'top': this.sliderModel.toPercentValue - 5 + '%'});
            slider.find('.slider__toggle--vertical-min').css({'top': stepTop + '%'});
            slider.find('.slider__bar').css({
              'top': stepTop + '%',
              'height': this.sliderModel.toPercentValue - stepTop + '%'
            });
          } else {
            this.setInModelValue('to', value);
            $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
            $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
            this.setInModelValue('toPercent', stepTop);
            slider.find('.slider__bar').css({'height': stepTop - this.sliderModel.fromPercentValue + '%'});
            slider.find('.slider__toggle--vertical-max').css({'top': stepTop + '%'});
            slider.find('.slider__flag-vertical--min').css({'top': this.sliderModel.fromPercentValue - 5 + '%'});
            slider.find('.slider__flag-vertical--max').css({'top': stepTop - 5 + '%'});
          } 
        }
      } else {
        const shift: number = evt.pageX - toggleCoords.left;

        let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;

        const stepCount: number = (max - min) / step;
        const stepPercent: number = 100 / stepCount;
        let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
        if (stepLeft < 0) stepLeft = 0;
        if (stepLeft > 100) stepLeft = 100;
    
        const result: string = (((stepLeft / stepPercent) * step).toFixed());
        const value: number = <number><unknown>+result + min;

        if (this.sliderModel.rangeValue === 'one') {
          this.setInModelValue('to', value);
          $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
          $(this.flagViewOne.element).replaceWith(this.flagViewOne.newElement);
          this.setInModelValue('toPercent', stepLeft);
          slider.find('.slider__flag--max').css({'left': stepLeft + '%'});
          slider.find('.slider__toggle--max').css({'left': stepLeft + '%'});
          slider.find('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});
        }

        if (this.sliderModel.rangeValue === 'range') {
          if(this.sliderModel.fromPercentValue > stepLeft) {
            this.setInModelValue('from', value);
            $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
            $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
            this.setInModelValue('fromPercent', stepLeft);
            slider.find('.slider__flag--min').css({'left': stepLeft + '%'});
            slider.find('.slider__flag--max').css({'left': this.sliderModel.toPercentValue + '%'});
            slider.find('.slider__toggle--min').css({'left': stepLeft + '%'});
            slider.find('.slider__bar').css({'marginLeft': stepLeft + '%'});
          } else {
            this.setInModelValue('to', value);
            $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
            $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
            this.setInModelValue('toPercent', stepLeft);
            slider.find('.slider__flag--min').css({'left': this.sliderModel.fromPercentValue + '%'});
            slider.find('.slider__flag--max').css({'left': stepLeft + '%'});
            slider.find('.slider__bar').css({'marginLeft': this.sliderModel.fromPercentValue + '%'});
            slider.find('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});
            slider.find('.slider__toggle--max').css({'left': stepLeft + '%'});
          } 
        }
      }
    })
  }

  private toggleMouseDown(
    toggle: JQuery<HTMLElement>, 
    slider: JQuery<HTMLElement>, 
    min: number, 
    max: number, 
    step: number, 
    toggleCoords: {top: number; height: number; left: number; width: number;}, 
    sliderCoords: {top: number; height: number; left: number; width: number;}
  ): void {
    toggle.on('mousedown', (evt: JQuery.MouseDownEvent<HTMLElement>): void => {
      if (slider.hasClass('slider__inner--height')) {
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
            this.setInModelValue('toPercent', stepTop);
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
            this.setInModelValue('toPercent', stepLeft);
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