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

    // this.configuringViewOne.inputChange = (evt) => {
      // this.inputChange(evt);
    // }
    
    // this.configuringViewRange.inputChange = (evt) => {
      // this.inputChange(evt);
    // }

    this.flagViewOne.flagMouseDown = (evt) => {
      this.flagMouseDown(evt);
    }
    
    this.flagViewRange.flagMouseDown = (evt) => {
      this.flagMouseDown(evt);
    }
    
    this.flagViewVerticalOne.flagMouseDown = (evt) => {
      this.flagMouseDown(evt);
    }
    
    this.flagViewVerticalRange.flagMouseDown = (evt) => {
      this.flagMouseDown(evt);
    }

    this.scaleView.scaleClick = (evt) => {
      this.scaleClick(evt);
    }
    
    this.scaleViewVertical.scaleClick = (evt) => {
      this.scaleClick(evt);
    }

    this.sliderViewOne.toggleMouseDown = (evt) => {
      this.toggleMouseDown(evt);
    }
    
    this.sliderViewRange.toggleMouseDown = (evt) => {
      this.toggleMouseDown(evt);
    }
    
    this.sliderViewVerticalOne.toggleMouseDown = (evt) => {
      this.toggleMouseDown(evt);
    }
    
    this.sliderViewVerticalRange.toggleMouseDown = (evt) => {
      this.toggleMouseDown(evt);
    }
  }

  private flagMouseDown(evt: any):void  {
    const flag: HTMLElement = evt.target;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    let toggle: HTMLElement;

    switch (flag.className.split(' ')[1]) {
      case 'slider__flag--min':
        toggle = slider.querySelector('.slider__toggle--min')!;
      break;
      case 'slider__flag--max':
        toggle = slider.querySelector('.slider__toggle--max')!;
      break;
      case 'slider__flag-vertical--min':
        toggle = slider.querySelector('.slider__toggle-vertical--v-min')!;
      break;
      case 'slider__flag-vertical--max':
        toggle = slider.querySelector('.slider__toggle-vertical--v-max')!;
      break;
    }

    this.replaceToggle(evt, toggle!);
  }

  // private getClassName(main: JQuery<HTMLElement>): string {
  //   let classNameOrId: string = '';

  //   if (main.attr('id')) {
  //     classNameOrId = '#' + <string>main.attr('id');
  //   } else {
  //     classNameOrId = '.' + <string>main.attr('class');
  //   } 

  //   return classNameOrId;
  // }

  public init(obj:any): void {
    for (const key in obj) {
      if(this.sliderModel.state.hasOwnProperty(key)) this.setInModelValue(key, obj[key]);
    }

    this.showSliderView(this.sliderModel.mainValue);
    this.showConfiguringView(this.sliderModel.mainValue);
    this.showScaleView(this.sliderModel.mainValue);
    this.showFlagView(this.sliderModel.mainValue);
  }

  // private inputChange(evt: JQuery.ChangeEvent<HTMLElement>):void {
  //   const input: JQuery<HTMLElement> = $(evt.target);

  //   if (input.data('name') === 'min' || input.data('name') === 'max') {
  //     this.setInModelValue(input.data('name'), +input.val()!);

  //     const main: JQuery<HTMLElement> = input.parents('div:last()');

  //     $(this.flagViewOne.element).replaceWith(this.flagViewOne.newElement);
  //     $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
  //     $(this.flagViewVerticalOne.element).replaceWith(this.flagViewVerticalOne.newElement);
  //     $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
  //     $(this.scaleView.element).replaceWith(this.scaleView.newElement);
  //     $(this.scaleViewVertical.element).replaceWith(this.scaleViewVertical.newElement);
  //     $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
  //     $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);

  //     main.find('.slider__flag--min').css({'left': this.sliderModel.fromPercentValue + '%'});
  //     main.find('.slider__flag-vertical--min').css({'top': this.sliderModel.fromPercentValue - 5 + '%'});
  //     main.find('.slider__flag--max').css({'left': this.sliderModel.toPercentValue + '%'});
  //     main.find('.slider__flag-vertical--max').css({'top': this.sliderModel.toPercentValue - 5 + '%'});
  //   }

  //   if (input.data('name') === 'step') {
  //     let value: number = +input.val()!;

  //     if(value === 0) value = 1;
  //     if(value < 0) value = Math.abs(value);

  //     this.setInModelValue('step', value);

  //     $(this.scaleView.element).replaceWith(this.scaleView.newElement);
  //     $(this.scaleViewVertical.element).replaceWith(this.scaleViewVertical.newElement);
  //   }

  //   if (input.data('name') === 'view' || input.data('name') === 'range') {
  //     this.setInModelValue(input.data('name'), <string>input.val());

  //     const main: JQuery<HTMLElement> = input.parents('div:last()');

  //     main.find('.slider__inner').remove();

  //     if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
  //       main.find('.slider__inputs').before(this.sliderViewOne.newElement.find('.slider__inner'));
  //       main.find('.slider__inputs').replaceWith(this.configuringViewOne.newElement);
  //     } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
  //       main.find('.slider__inputs').before(this.sliderViewRange.newElement.find('.slider__inner'));
  //       main.find('.slider__inputs').replaceWith(this.configuringViewRange.newElement);
  //     } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
  //       main.find('.slider__inputs').before(this.sliderViewVerticalOne.newElement.find('.slider__inner'));
  //       main.find('.slider__inputs').replaceWith(this.configuringViewOne.newElement);
  //     } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
  //       main.find('.slider__inputs').before(this.sliderViewVerticalRange.newElement.find('.slider__inner'));
  //       main.find('.slider__inputs').replaceWith(this.configuringViewRange.newElement);
  //     }

  //     this.showScaleView(this.getClassName(main));
  //     this.showFlagView(this.getClassName(main));
  //   }

  //   if (input.data('name') === 'flag') {
  //     this.setInModelValue('flag', input.is(':checked'));

  //     const main: JQuery<HTMLElement> = input.parents('div:last()');

  //     main.find('.slider__flags').remove();
      
  //     this.showFlagView(this.getClassName(main));
  //   }
    
  //   if (input.data('name') === 'scale') {
  //     this.setInModelValue('scale', input.is(':checked'));

  //     const main: JQuery<HTMLElement> = input.parents('div:last()');

  //     main.find('.slider__list').remove();
      
  //     this.showScaleView(this.getClassName(main));
  //   }
  // }

  private replaceScreenConfiguring(): void {
    this.configuringViewOne.element.replaceWith(this.configuringViewOne.newElement);
    this.configuringViewRange.element.replaceWith(this.configuringViewRange.newElement);
  }

  private replaceScreenFlag(): void {
    this.flagViewOne.element.replaceWith(this.flagViewOne.newElement);
    this.flagViewRange.element.replaceWith(this.flagViewRange.newElement);
    this.flagViewVerticalOne.element.replaceWith(this.flagViewVerticalOne.newElement);
    this.flagViewVerticalRange.element.replaceWith(this.flagViewVerticalRange.newElement);
  }
 
  private replaceScreenSlider(): void {
    this.sliderViewOne.element.replaceWith(this.sliderViewOne.newElement);
    this.sliderViewRange.element.replaceWith(this.sliderViewRange.newElement);
    this.sliderViewVerticalOne.element.replaceWith(this.sliderViewVerticalOne.newElement);
    this.sliderViewVerticalRange.element.replaceWith(this.sliderViewVerticalRange.newElement);
  }
  
  private replaceToggle(evt: any, toggle: HTMLElement): void {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const slider: HTMLElement = toggle.parentElement!;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderLeft: number = boxLeft + pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const sliderTop: number = boxTop + pageYOffset;
    const sliderHeight: number = boxBottom - boxTop;

    let onMouseMove: {(evt: MouseEvent): void};

    if (toggle.className.split(' ')[0] === 'slider__toggle') {
      const shift: number = evt.pageX - toggle.getBoundingClientRect().left - 10;

      onMouseMove = (evt: MouseEvent): void => {
        const left: number = ((evt.pageX - shift - sliderLeft) / sliderWidth) * 100;
        const stepCount: number = (max - min) / step;
        const stepPercent: number = 100 / stepCount;
        let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
        if (stepLeft < 0) stepLeft = 0;
        if (stepLeft > 100) stepLeft = 100;
        
        if (toggle.className.split(' ')[1] === 'slider__toggle--min') {
          const toPercentValue: number = this.sliderModel.toPercentValue;
          if (stepLeft > toPercentValue) stepLeft = toPercentValue;
          this.sliderModel.fromPercentValue = <number>stepLeft;
          const value: number = <number>+(stepLeft / stepPercent * step).toFixed() + min;
          this.sliderModel.fromValue = <number>value;
          (<HTMLElement>slider.querySelector('.slider__bar')!).style.marginLeft = stepLeft + '%';
        }
        
        if (toggle.className.split(' ')[1] === 'slider__toggle--max') {
          const fromPercentValue: number = this.sliderModel.fromPercentValue;
          if (fromPercentValue > stepLeft) stepLeft = fromPercentValue;
          this.sliderModel.toPercentValue = <number>stepLeft;
          const value: number = <number>+(stepLeft / stepPercent * step).toFixed() + min;
          this.sliderModel.toValue = <number>value;
          (<HTMLElement>slider.querySelector('.slider__bar')!).style.marginRight = 100 - stepLeft + '%';
        }
  
        toggle.style.left = <string><unknown>stepLeft + '%';
        this.replaceScreenFlag();
        this.replaceScreenConfiguring();
      }
    } else {
      const shift: number = evt.pageY - (toggle.getBoundingClientRect().top + (window.pageYOffset * 2)) - 10;
      
      onMouseMove = (evt: MouseEvent): void => {
        const top: number = ((evt.pageY - shift - sliderTop) / sliderHeight) * 100;
        const stepCount: number = (max - min) / step;
        const stepPercent: number = 100 / stepCount;
        let stepTop: number = Math.round(top / stepPercent) * stepPercent;
        if (stepTop < 0) stepTop = 0;
        if (stepTop > 100) stepTop = 100;
        
        if (toggle.className.split(' ')[1] === 'slider__toggle-vertical--v-min') {
          const toPercentValue: number = this.sliderModel.toPercentValue;
          if (stepTop > toPercentValue) stepTop = toPercentValue;
          this.sliderModel.fromPercentValue = <number>stepTop;
          const value: number = <number>+(stepTop / stepPercent * step).toFixed() + min;
          this.sliderModel.fromValue = <number>value;
          (<HTMLElement>slider.querySelector('.slider__bar')!).style.top = stepTop + '%';
          (<HTMLElement>slider.querySelector('.slider__bar')!).style.height = this.sliderModel.toPercentValue - stepTop + '%';
        }
        
        if (toggle.className.split(' ')[1] === 'slider__toggle-vertical--v-max') {
          const fromPercentValue: number = this.sliderModel.fromPercentValue;
          if (fromPercentValue > stepTop) stepTop = fromPercentValue;
          this.sliderModel.toPercentValue = <number>stepTop;
          const value: number = <number>+(stepTop / stepPercent * step).toFixed() + min;
          this.sliderModel.toValue = <number>value;
          (<HTMLElement>slider.querySelector('.slider__bar')!).style.height = stepTop - this.sliderModel.fromPercentValue + '%';
        }
  
        toggle.style.top = <string><unknown>stepTop + '%';
        this.replaceScreenFlag();
        this.replaceScreenConfiguring();
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  private scaleClick(evt: any):void  {
    const scale: HTMLElement = evt.target;
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const stepList: HTMLElement = scale.parentElement!;
    const slider: HTMLElement = stepList.parentElement!;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderLeft: number = boxLeft + pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const sliderTop: number = boxTop + pageYOffset;
    const sliderHeight: number = boxBottom - boxTop;
    let corner: number;

    if (!stepList.className.split(' ')[1]) {
      const shift: number = evt.pageX - scale.getBoundingClientRect().left;
      corner = ((evt.pageX - shift - sliderLeft) / sliderWidth) * 100;
    } else {
      const shift: number = evt.pageY - (scale.getBoundingClientRect().top + (window.pageYOffset * 2));
      corner = ((evt.pageY - shift - sliderTop) / sliderHeight) * 100;
    }

    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number = Math.round(corner / stepPercent) * stepPercent;
    if (stepPercentResult < 0) stepPercentResult = 0;
    if (stepPercentResult > 100) stepPercentResult = 100;

    if (stepPercentResult >= this.sliderModel.fromPercentValue) {
      this.sliderModel.toPercentValue = <number>stepPercentResult;
      const value: number = <number>+(stepPercentResult / stepPercent * step).toFixed() + min;
      this.sliderModel.toValue = <number>value;
    } else {
      this.sliderModel.fromPercentValue = <number>stepPercentResult;
      const value: number = <number>+(stepPercentResult / stepPercent * step).toFixed() + min;
      this.sliderModel.fromValue = <number>value;
    }

    this.replaceScreenFlag();
    this.replaceScreenConfiguring();
    this.replaceScreenSlider();
    this.showScaleView(this.sliderModel.mainValue);
    this.showFlagView(this.sliderModel.mainValue);
    this.showConfiguringView(this.sliderModel.mainValue);
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
      document.querySelector(className)!.querySelector('.slider__wrapper')?.appendChild(this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range') {
      document.querySelector(className)!.querySelector('.slider__wrapper')?.appendChild(this.configuringViewRange.element);
    } else {
      throw new Error('incorrect value')
    }
  }

  private showFlagView(className: string):void {
    if(this.sliderModel.flagValue) {
      if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
        document.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
        document.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewRange.element);
      } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
        document.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewVerticalOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
        document.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewVerticalRange.element);
      } else {
        throw new Error('incorrect value')
      }
    }
  }

  private showScaleView(className: string): void {
    if(this.sliderModel.scaleValue) {
      if (this.sliderModel.viewValue === 'horizontal') {
        document.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.scaleView.element);
      } else if (this.sliderModel.viewValue === 'vertical') {
        document.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.scaleViewVertical.element);
      } else {
        throw new Error('incorrect value')
      }
    };
  }

  private showSliderView(className: string):void {
    if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
      document.querySelector(className)?.appendChild(this.sliderViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
      document.querySelector(className)?.appendChild(this.sliderViewRange.element);
    } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
      document.querySelector(className)?.appendChild(this.sliderViewVerticalOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
      document.querySelector(className)?.appendChild(this.sliderViewVerticalRange.element);
    } else {
      throw new Error('incorrect value')
    }
  } 

  private toggleMouseDown(evt: any):void {
    const toggle: HTMLElement = evt.target;
    this.replaceToggle(evt, toggle);
  }
  
  // if (toggle.hasClass('slider__item')) {
  //   this.scaleClick(toggle, slider, min, max, step, toggleCoords, sliderCoords);  
  // }
  // private scaleClick(
  //   toggle: JQuery<HTMLElement>, 
  //   slider: JQuery<HTMLElement>, 
  //   min: number, 
  //   max: number, 
  //   step: number, 
  //   toggleCoords: {top: number; height: number; left: number; width: number;}, 
  //   sliderCoords: {top: number; height: number; left: number; width: number;}
  // ): void {
  //   toggle.on('click', (evt: JQuery.ClickEvent<HTMLElement>): void => {
  //     if (slider.hasClass('slider__inner--height')) {
  //       const shift: number = evt.pageY - toggleCoords.top;

  //       let top: number = ((evt.pageY - shift - sliderCoords.top) / sliderCoords.height) * 100;
  //       if (top < 0) top = 0;
  //       if (top > 100) top = 100;

  //       const stepCount: number = (max - min) / step;
  //       const stepPercent: number = 100 / stepCount;
  //       let stepTop: number = Math.round(top / stepPercent) * stepPercent;
  //       if (stepTop < 0) stepTop = 0;
  //       if (stepTop > 100) stepTop = 100;

  //       const result: string = (((stepTop / stepPercent) * step).toFixed());
  //       const value: number = <number><unknown>+result + min;

  //       if (this.sliderModel.rangeValue === 'one') {
  //         this.setInModelValue('to', value);
  //         $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
  //         $(this.flagViewVerticalOne.element).replaceWith(this.flagViewVerticalOne.newElement);
  //         this.setInModelValue('toPercent', stepTop);
  //         slider.find('.slider__flag-vertical--max').css({'top': stepTop - 5 + '%'});
  //         slider.find('.slider__toggle--vertical-max').css({'top': stepTop + '%'});
  //         slider.find('.slider__bar').css({'height': stepTop + '%'});
  //       }

  //       if (this.sliderModel.rangeValue === 'range') {
  //         if(this.sliderModel.fromPercentValue > stepTop) {
  //           this.setInModelValue('from', value);
  //           $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //           $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
  //           this.setInModelValue('fromPercent', stepTop);
  //           slider.find('.slider__flag-vertical--min').css({'top': stepTop - 5 + '%'});
  //           slider.find('.slider__flag-vertical--max').css({'top': this.sliderModel.toPercentValue - 5 + '%'});
  //           slider.find('.slider__toggle--vertical-min').css({'top': stepTop + '%'});
  //           slider.find('.slider__bar').css({
  //             'top': stepTop + '%',
  //             'height': this.sliderModel.toPercentValue - stepTop + '%'
  //           });
  //         } else {
  //           this.setInModelValue('to', value);
  //           $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //           $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
  //           this.setInModelValue('toPercent', stepTop);
  //           slider.find('.slider__bar').css({'height': stepTop - this.sliderModel.fromPercentValue + '%'});
  //           slider.find('.slider__toggle--vertical-max').css({'top': stepTop + '%'});
  //           slider.find('.slider__flag-vertical--min').css({'top': this.sliderModel.fromPercentValue - 5 + '%'});
  //           slider.find('.slider__flag-vertical--max').css({'top': stepTop - 5 + '%'});
  //         } 
  //       }
  //     } else {
  //       const shift: number = evt.pageX - toggleCoords.left;

  //       let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
  //       if (left < 0) left = 0;
  //       if (left > 100) left = 100;

  //       const stepCount: number = (max - min) / step;
  //       const stepPercent: number = 100 / stepCount;
  //       let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
  //       if (stepLeft < 0) stepLeft = 0;
  //       if (stepLeft > 100) stepLeft = 100;
    
  //       const result: string = (((stepLeft / stepPercent) * step).toFixed());
  //       const value: number = <number><unknown>+result + min;

  //       if (this.sliderModel.rangeValue === 'one') {
  //         this.setInModelValue('to', value);
  //         $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
  //         $(this.flagViewOne.element).replaceWith(this.flagViewOne.newElement);
  //         this.setInModelValue('toPercent', stepLeft);
  //         slider.find('.slider__flag--max').css({'left': stepLeft + '%'});
  //         slider.find('.slider__toggle--max').css({'left': stepLeft + '%'});
  //         slider.find('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});
  //       }

  //       if (this.sliderModel.rangeValue === 'range') {
  //         if(this.sliderModel.fromPercentValue > stepLeft) {
  //           this.setInModelValue('from', value);
  //           $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //           $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
  //           this.setInModelValue('fromPercent', stepLeft);
  //           slider.find('.slider__flag--min').css({'left': stepLeft + '%'});
  //           slider.find('.slider__flag--max').css({'left': this.sliderModel.toPercentValue + '%'});
  //           slider.find('.slider__toggle--min').css({'left': stepLeft + '%'});
  //           slider.find('.slider__bar').css({'marginLeft': stepLeft + '%'});
  //         } else {
  //           this.setInModelValue('to', value);
  //           $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //           $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
  //           this.setInModelValue('toPercent', stepLeft);
  //           slider.find('.slider__flag--min').css({'left': this.sliderModel.fromPercentValue + '%'});
  //           slider.find('.slider__flag--max').css({'left': stepLeft + '%'});
  //           slider.find('.slider__bar').css({'marginLeft': this.sliderModel.fromPercentValue + '%'});
  //           slider.find('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});
  //           slider.find('.slider__toggle--max').css({'left': stepLeft + '%'});
  //         } 
  //       }
  //     }
  //   })
  // }

  // private toggleMouseDown(
  //   toggle: JQuery<HTMLElement>, 
  //   slider: JQuery<HTMLElement>, 
  //   min: number, 
  //   max: number, 
  //   step: number, 
  //   toggleCoords: {top: number; height: number; left: number; width: number;}, 
  //   sliderCoords: {top: number; height: number; left: number; width: number;}
  // ): void {
  //   toggle.on('mousedown', (evt: JQuery.MouseDownEvent<HTMLElement>): void => {
  //     if (slider.hasClass('slider__inner--height')) {
  //       const shift: number = evt.pageY - toggleCoords.top - 10;

  //       $(document).on('mousemove', (evt: JQuery.MouseMoveEvent<Document>): void => {
  //         let top: number = ((evt.pageY - shift - sliderCoords.top) / sliderCoords.height) * 100;
  //         if (top < 0) top = 0;
  //         if (top > 100) top = 100;

  //         if (toggle.hasClass('slider__toggle--vertical-min')) {
  //           const maxPercent: number = this.sliderModel.toPercentValue;
  //           if (top > maxPercent) top = maxPercent;
  //         }
          
  //         if (toggle.hasClass('slider__toggle--vertical-max')) {
  //           const minPercent: number = this.sliderModel.fromPercentValue;
  //           if (minPercent > top) top = minPercent;
  //         }
      
  //         const stepCount: number = (max - min) / step;
  //         const stepPercent: number = 100 / stepCount;
  //         let stepTop: number = Math.round(top / stepPercent) * stepPercent;
  //         if (stepTop < 0) stepTop = 0;
  //         if (stepTop > 100) stepTop = 100;

  //         toggle.css({'top': stepTop + '%'});

  //         if (toggle.hasClass('slider__toggle--vertical-min')) {
  //           const maxPercent: number = this.sliderModel.toPercentValue;
  //           slider.find('.slider__bar').css({
  //             'top': stepTop + '%',
  //             'height': maxPercent - stepTop + '%'
  //           });
  //         }

  //         if (toggle.hasClass('slider__toggle--vertical-max')) {
  //           const minPercent: number = this.sliderModel.fromPercentValue;
  //           slider.find('.slider__bar').css({'height': stepTop - minPercent + '%'});
  //         }
      
  //         const result: string = (((stepTop / stepPercent) * step).toFixed());
  //         const value: number = <number><unknown>+result + min;

  //         if (this.sliderModel.rangeValue === 'one') {
  //           this.setInModelValue('to', value);
  //           $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
  //           $(this.flagViewVerticalOne.element).replaceWith(this.flagViewVerticalOne.newElement);
  //           this.setInModelValue('toPercent', stepTop);
  //           slider.find('.slider__flag-vertical').css({'top': stepTop - 5 + '%'});
  //         }
          
  //         if (this.sliderModel.rangeValue === 'range') {
  //           if (toggle.hasClass('slider__toggle--vertical-min')) {
  //             this.setInModelValue('from', value);
  //             $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //             $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
  //             this.setInModelValue('fromPercent', stepTop);
  //             slider.find('.slider__flag-vertical--min').css({'top': stepTop - 5 + '%'});
  //             slider.find('.slider__flag-vertical--max').css({'top': this.sliderModel.toPercentValue - 5 + '%'});
  //           }
            
  //           if (toggle.hasClass('slider__toggle--vertical-max')) {
  //             this.setInModelValue('to', value);
  //             $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //             $(this.flagViewVerticalRange.element).replaceWith(this.flagViewVerticalRange.newElement);
  //             this.setInModelValue('toPercent', stepTop);
  //             slider.find('.slider__flag-vertical--min').css({'top': this.sliderModel.fromPercentValue - 5 + '%'});
  //             slider.find('.slider__flag-vertical--max').css({'top': stepTop - 5 + '%'});
  //           } 
  //         }
  //       })
  //     } else {
  //       const shift: number = evt.pageX - toggleCoords.left - 10;

  //       $(document).on('mousemove', (evt: JQuery.MouseMoveEvent<Document>): void => {
  //         let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
  //         if (left < 0) left = 0;
  //         if (left > 100) left = 100;

  //         if (toggle.hasClass('slider__toggle--min')) {
  //           const maxPercent: number = this.sliderModel.toPercentValue;
  //           if (left > maxPercent) left = maxPercent;
  //         }
          
  //         if (toggle.hasClass('slider__toggle--max')) {
  //           const minPercent: number = this.sliderModel.fromPercentValue;
  //           if (minPercent > left) left = minPercent;
  //         }
      
  //         const stepCount: number = (max - min) / step;
  //         const stepPercent: number = 100 / stepCount;
  //         let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
  //         if (stepLeft < 0) stepLeft = 0;
  //         if (stepLeft > 100) stepLeft = 100;

  //         toggle.css({'left': stepLeft + '%'});

  //         if (toggle.hasClass('slider__toggle--min')) {
  //           slider.find('.slider__bar').css({'marginLeft': stepLeft + '%'});
  //         }

  //         if (toggle.hasClass('slider__toggle--max')) {
  //           slider.find('.slider__bar').css({'marginRight': 100 - stepLeft + '%'});
  //         } 
      
  //         const result: string = (((stepLeft / stepPercent) * step).toFixed());
  //         const value: number = <number><unknown>+result + min;

  //         if (this.sliderModel.rangeValue === 'one') {
  //           this.setInModelValue('to', value);
  //           $(this.configuringViewOne.element).replaceWith(this.configuringViewOne.newElement);
  //           $(this.flagViewOne.element).replaceWith(this.flagViewOne.newElement);
  //           this.setInModelValue('toPercent', stepLeft);
  //           slider.find('.slider__flag').css({'left': stepLeft + '%'});
  //         }
          
  //         if (this.sliderModel.rangeValue === 'range') {
  //           if (toggle.hasClass('slider__toggle--min')) {
  //             this.setInModelValue('from', value);
  //             $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //             $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
  //             this.setInModelValue('fromPercent', stepLeft);
  //             slider.find('.slider__flag--min').css({'left': stepLeft + '%'});
  //             slider.find('.slider__flag--max').css({'left': this.sliderModel.toPercentValue + '%'});
  //           }

  //           if (toggle.hasClass('slider__toggle--max')) {
  //             this.setInModelValue('to', value);
  //             $(this.configuringViewRange.element).replaceWith(this.configuringViewRange.newElement);
  //             $(this.flagViewRange.element).replaceWith(this.flagViewRange.newElement);
  //             this.setInModelValue('toPercent', stepLeft);
  //             slider.find('.slider__flag--min').css({'left': this.sliderModel.fromPercentValue + '%'});
  //             slider.find('.slider__flag--max').css({'left': stepLeft + '%'});
  //           } 
  //         }
  //       })
  //     }
    
  //     $(document).on('mouseup', (): void => {
  //       $(document).off('mousemove');
  //       $(document).off('mouseup');
  //     })
  //   })
  // }
}