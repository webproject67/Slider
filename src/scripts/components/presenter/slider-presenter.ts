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
  main: HTMLElement;
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

  constructor(
    main: HTMLElement, 
    state: { 
      flag: boolean;
      from: number; 
      fromPercent: number; 
      max: number; 
      min: number; 
      range: string;
      scale: boolean;
      step: number; 
      to: number; 
      toPercent: number; 
      view: string;
    }
  ) {
    this.main = main;
    this.sliderModel = new SliderModel(main, state);
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

  public init(): void {
    this.showSliderView();
    this.showConfiguringView();
    this.showScaleView();
    this.showFlagView();
  }

  private inputChange(evt: any):void {
    const input: HTMLElement = evt.target;

    if (input.dataset.name === 'min') {
      this.setInModelValue('min', +(<HTMLInputElement>input).value);
      this.setInModelValue('from', +(<HTMLInputElement>input).value);
      this.setInModelValue('fromPercent', 0);
    }

    if (input.dataset.name === 'max') {
      this.setInModelValue('max', +(<HTMLInputElement>input).value);
      this.setInModelValue('to', +(<HTMLInputElement>input).value);
      this.setInModelValue('toPercent', 100);
    }

    if (input.dataset.name === 'step') {
      let value: number = +(<HTMLInputElement>input).value;
      if(value === 0) value = 1;
      if(value < 0) value = Math.abs(value);
      this.setInModelValue('step', value);
    }

    if (input.dataset.name === 'view' || input.dataset.name === 'range') {
      this.setInModelValue(input.dataset.name, (<HTMLInputElement>input).value);
      this.main.removeChild(this.main.children[0]);
      this.showSliderView();
    }

    if (input.dataset.name === 'flag' || input.dataset.name === 'scale') {
      this.setInModelValue(input.dataset.name, (<HTMLInputElement>input).checked);
    }

    this.replaceScreenScale();
    this.replaceScreenFlag();
    this.replaceScreenConfiguring();
    this.replaceScreenSlider();
    this.showScaleView();
    this.showFlagView();
    this.showConfiguringView();
  }

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

  private replaceScreenScale(): void {
    this.scaleView.element.replaceWith(this.scaleView.newElement);
    this.scaleViewVertical.element.replaceWith(this.scaleViewVertical.newElement);
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
    this.showScaleView();
    this.showFlagView();
    this.showConfiguringView();
  }

  private setInModelValue(key: string, value: number | string | boolean): void {
    switch (key) {
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

  private showConfiguringView():void {
    if (this.sliderModel.rangeValue === 'one') {
      this.main.querySelector('.slider__wrapper')?.appendChild(this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range') {
      this.main.querySelector('.slider__wrapper')?.appendChild(this.configuringViewRange.element);
    } else {
      throw new Error('incorrect value')
    }
  }

  private showFlagView():void {
    if(this.sliderModel.flagValue) {
      if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
        this.main.querySelector('.slider__inner')?.appendChild(this.flagViewOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
        this.main.querySelector('.slider__inner')?.appendChild(this.flagViewRange.element);
      } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
        this.main.querySelector('.slider__inner')?.appendChild(this.flagViewVerticalOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
        this.main.querySelector('.slider__inner')?.appendChild(this.flagViewVerticalRange.element);
      } else {
        throw new Error('incorrect value')
      }
    }
  }

  private showScaleView(): void {
    if(this.sliderModel.scaleValue) {
      if (this.sliderModel.viewValue === 'horizontal') {
        this.main.querySelector('.slider__inner')?.appendChild(this.scaleView.element);
      } else if (this.sliderModel.viewValue === 'vertical') {
        this.main.querySelector('.slider__inner')?.appendChild(this.scaleViewVertical.element);
      } else {
        throw new Error('incorrect value')
      }
    };
  }

  private showSliderView():void {
    if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
      this.main.appendChild(this.sliderViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
      this.main.appendChild(this.sliderViewRange.element);
    } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
      this.main.appendChild(this.sliderViewVerticalOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
      this.main.appendChild(this.sliderViewVerticalRange.element);
    } else {
      throw new Error('incorrect value')
    }
  } 

  private toggleMouseDown(evt: any):void {
    const toggle: HTMLElement = evt.target;
    this.replaceToggle(evt, toggle);
  }
}