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
import {
  State, Const, Range, View,
} from '../../const';

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
    },
  ) {
    this.sliderModel = new SliderModel(main, state);
    this.sliderViewOne = new SliderViewOne(this.sliderModel);
    this.sliderViewRange = new SliderViewRange(this.sliderModel);
    this.sliderViewVerticalOne = new SliderViewVerticalOne(this.sliderModel);
    this.sliderViewVerticalRange = new SliderViewVerticalRange(
      this.sliderModel,
    );
    this.configuringViewOne = new ConfiguringViewOne(this.sliderModel);
    this.configuringViewRange = new ConfiguringViewRange(this.sliderModel);
    this.scaleView = new ScaleView(this.sliderModel);
    this.scaleViewVertical = new ScaleViewVertical(this.sliderModel);
    this.flagViewOne = new FlagViewOne(this.sliderModel);
    this.flagViewRange = new FlagViewRange(this.sliderModel);
    this.flagViewVerticalOne = new FlagViewVerticalOne(this.sliderModel);
    this.flagViewVerticalRange = new FlagViewVerticalRange(this.sliderModel);

    this.configuringViewOne.handleInputChange = (evt) => {
      this._handleInputChange(evt);
    };

    this.configuringViewRange.handleInputChange = (evt) => {
      this._handleInputChange(evt);
    };

    this.flagViewOne.handleFlagMouseDown = (evt) => {
      this._handleFlagMouseDown(evt);
    };

    this.flagViewRange.handleFlagMouseDown = (evt) => {
      this._handleFlagMouseDown(evt);
    };

    this.flagViewVerticalOne.handleFlagMouseDown = (evt) => {
      this._handleFlagMouseDown(evt);
    };

    this.flagViewVerticalRange.handleFlagMouseDown = (evt) => {
      this._handleFlagMouseDown(evt);
    };

    this.scaleView.handleItemClick = (evt) => {
      this._handleItemClick(evt);
    };

    this.scaleViewVertical.handleItemClick = (evt) => {
      this._handleItemClick(evt);
    };

    this.sliderViewOne.handleToggleMouseDown = (evt) => {
      this._handleToggleMouseDown(evt);
    };

    this.sliderViewRange.handleToggleMouseDown = (evt) => {
      this._handleToggleMouseDown(evt);
    };

    this.sliderViewVerticalOne.handleToggleMouseDown = (evt) => {
      this._handleToggleMouseDown(evt);
    };

    this.sliderViewVerticalRange.handleToggleMouseDown = (evt) => {
      this._handleToggleMouseDown(evt);
    };
  }

  public init(): void {
    this._showSliderView();
    this._showConfiguringView();
    this._showScaleView();
    this._showFlagView();
  }

  private _handleFlagMouseDown(evt: any): void {
    const flag: HTMLElement = evt.currentTarget;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    let toggle: HTMLElement;

    switch (flag.className.split(' ')[1]) {
      case 'slider__flag_minimum':
        toggle = slider.querySelector('.slider__toggle_minimum')!;
        break;
      case 'slider__flag_maximum':
        toggle = slider.querySelector('.slider__toggle_maximum')!;
        break;
      case 'slider__flag-vertical_minimum':
        toggle = slider.querySelector('.slider__toggle_vertical-minimum')!;
        break;
      case 'slider__flag-vertical_maximum':
        toggle = slider.querySelector('.slider__toggle_vertical-maximum')!;
        break;
      default:
        break;
    }

    this._replaceToggle(evt, toggle!);
  }

  private _handleInputChange(evt: any): void {
    const input: HTMLElement = evt.currentTarget;

    if (input.dataset.name === State.MIN) {
      this._setInModelValue('min', +(<HTMLInputElement>input).value);
      this._setInModelValue('from', +(<HTMLInputElement>input).value);
      this._setInModelValue('fromPercent', 0);
    }

    if (input.dataset.name === State.MAX) {
      this._setInModelValue('max', +(<HTMLInputElement>input).value);
      this._setInModelValue('to', +(<HTMLInputElement>input).value);
      this._setInModelValue('toPercent', 100);
    }

    if (input.dataset.name === State.STEP) {
      let value: number = +(<HTMLInputElement>input).value;
      if (value === 0) value = 1;
      if (value < 0) value = Math.abs(value);
      this._setInModelValue('step', value);
    }

    if (
      input.dataset.name === State.VIEW
      || input.dataset.name === State.RANGE
    ) {
      this._setInModelValue(
        input.dataset.name,
        (<HTMLInputElement>input).value,
      );
      this.sliderModel.main.removeChild(this.sliderModel.main.children[0]);
      this._showSliderView();
    }

    if (
      input.dataset.name === State.FLAG
      || input.dataset.name === State.SCALE
    ) {
      this._setInModelValue(
        input.dataset.name,
        (<HTMLInputElement>input).checked,
      );
    }

    this._replaceScreenScale();
    this._replaceScreenFlag();
    this._replaceScreenConfiguring();
    this._replaceScreenSlider();
    this._showScaleView();
    this._showFlagView();
    this._showConfiguringView();
  }

  private _handleItemClick(evt: any): void {
    const scale: HTMLElement = evt.currentTarget;
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const stepList: HTMLElement = scale.parentElement!;
    const slider: HTMLElement = stepList.parentElement!;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const sliderHeight: number = boxBottom - boxTop;
    let corner: number;

    if (!stepList.className.split(' ')[1]) {
      corner = ((evt.pageX - sliderLeft) / sliderWidth) * 100;
    } else {
      corner = ((evt.pageY - boxTop) / sliderHeight) * 100;
    }

    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number = Math.round(corner / stepPercent) * stepPercent;
    if (
      stepPercentResult < 0
      || scale.className.split(' ')[1] === Const.SLIDER_ITEM_MINIMUM
    ) stepPercentResult = 0;
    if (
      stepPercentResult > 100
      || scale.className.split(' ')[1] === Const.SLIDER_ITEM_MAXIMUM
    ) stepPercentResult = 100;

    if (stepPercentResult >= this.sliderModel.fromPercentValue) {
      this.sliderModel.toPercentValue = Number(stepPercentResult);
      const value: number = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
      this.sliderModel.toValue = Number(value);
    } else {
      this.sliderModel.fromPercentValue = Number(stepPercentResult);
      const value: number = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
      this.sliderModel.fromValue = Number(value);
    }

    this._replaceScreenFlag();
    this._replaceScreenConfiguring();
    this._replaceScreenSlider();
    this._showScaleView();
    this._showFlagView();
    this._showConfiguringView();
  }

  private _handleToggleMouseDown(evt: any): void {
    const toggle: HTMLElement = evt.currentTarget;
    this._replaceToggle(evt, toggle);
  }

  private _replaceScreenConfiguring(): void {
    this.configuringViewOne.element.replaceWith(
      this.configuringViewOne.newElement,
    );
    this.configuringViewRange.element.replaceWith(
      this.configuringViewRange.newElement,
    );
  }

  private _replaceScreenFlag(): void {
    this.flagViewOne.element.replaceWith(this.flagViewOne.newElement);
    this.flagViewRange.element.replaceWith(this.flagViewRange.newElement);
    this.flagViewVerticalOne.element.replaceWith(
      this.flagViewVerticalOne.newElement,
    );
    this.flagViewVerticalRange.element.replaceWith(
      this.flagViewVerticalRange.newElement,
    );
  }

  private _replaceScreenScale(): void {
    this.scaleView.element.replaceWith(this.scaleView.newElement);
    this.scaleViewVertical.element.replaceWith(
      this.scaleViewVertical.newElement,
    );
  }

  private _replaceScreenSlider(): void {
    this.sliderViewOne.element.replaceWith(this.sliderViewOne.newElement);
    this.sliderViewRange.element.replaceWith(this.sliderViewRange.newElement);
    this.sliderViewVerticalOne.element.replaceWith(
      this.sliderViewVerticalOne.newElement,
    );
    this.sliderViewVerticalRange.element.replaceWith(
      this.sliderViewVerticalRange.newElement,
    );
  }

  private _replaceToggle(evt: any, toggle: HTMLElement): void {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const slider: HTMLElement = toggle.parentElement!;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const sliderHeight: number = boxBottom - boxTop;

    let onMouseMove: { (evt: any): void };
    evt.preventDefault();

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MINIMUM
      || toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MAXIMUM
    ) {
      onMouseMove = (evt: any): void => {
        const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches[0] : evt);
        const event = getEvent();
        const left: number = ((event.pageX - sliderLeft) / sliderWidth) * 100;
        const stepCount: number = (max - min) / step;
        const stepPercent: number = 100 / stepCount;
        let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
        if (stepLeft < 0) stepLeft = 0;
        if (stepLeft > 100) stepLeft = 100;

        if (toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MINIMUM) {
          const { toPercentValue } = this.sliderModel;
          if (stepLeft > toPercentValue) stepLeft = toPercentValue;
          this.sliderModel.fromPercentValue = Number(stepLeft);
          const value: number = Number(((stepLeft / stepPercent) * step).toFixed()) + min;
          this.sliderModel.fromValue = Number(value);
          (<HTMLElement>(
            slider.querySelector('.slider__bar')!
          )).style.marginLeft = `${stepLeft}%`;
          const flag: HTMLElement = <HTMLElement>(
            slider.querySelector('.slider__flag_minimum')
          );
          if (flag) {
            flag.style.left = `${stepLeft}%`;
            flag.textContent = String(value);
          }
        }

        if (toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MAXIMUM) {
          const { fromPercentValue } = this.sliderModel;
          if (fromPercentValue > stepLeft) stepLeft = fromPercentValue;
          this.sliderModel.toPercentValue = Number(stepLeft);
          const value: number = Number(((stepLeft / stepPercent) * step).toFixed()) + min;
          this.sliderModel.toValue = Number(value);
          (<HTMLElement>(
            slider.querySelector('.slider__bar')!
          )).style.marginRight = `${100 - stepLeft}%`;
          const flag: HTMLElement = <HTMLElement>(
            slider.querySelector('.slider__flag_maximum')
          );
          if (flag) {
            flag.style.left = `${stepLeft}%`;
            flag.textContent = String(value);
          }
        }

        toggle.style.left = `${String(stepLeft)}%`;
        this._replaceScreenConfiguring();
      };
    } else {
      onMouseMove = (evt: any): void => {
        const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches[0] : evt);
        const event = getEvent();
        const top: number = ((event.pageY - boxTop) / sliderHeight) * 100;
        const stepCount: number = (max - min) / step;
        const stepPercent: number = 100 / stepCount;
        let stepTop: number = Math.round(top / stepPercent) * stepPercent;
        if (stepTop < 0) stepTop = 0;
        if (stepTop > 100) stepTop = 100;

        if (
          toggle.className.split(' ')[1]
          === Const.SLIDER_TOGGLE_VERTICAL_MINIMUM
        ) {
          const { toPercentValue } = this.sliderModel;
          if (stepTop > toPercentValue) stepTop = toPercentValue;
          this.sliderModel.fromPercentValue = Number(stepTop);
          const value: number = Number(((stepTop / stepPercent) * step).toFixed()) + min;
          this.sliderModel.fromValue = Number(value);
          (<HTMLElement>(
            slider.querySelector('.slider__bar')!
          )).style.top = `${stepTop}%`;
          (<HTMLElement>(
            slider.querySelector('.slider__bar')!
          )).style.height = `${toPercentValue - stepTop}%`;
          const flag: HTMLElement = <HTMLElement>(
            slider.querySelector('.slider__flag-vertical_minimum')
          );
          if (flag) {
            flag.style.top = `${stepTop}%`;
            flag.textContent = String(value);
          }
        }

        if (
          toggle.className.split(' ')[1]
          === Const.SLIDER_TOGGLE_VERTICAL_MAXIMUM
        ) {
          const { fromPercentValue } = this.sliderModel;
          if (fromPercentValue > stepTop) stepTop = fromPercentValue;
          this.sliderModel.toPercentValue = Number(stepTop);
          const value: number = Number(((stepTop / stepPercent) * step).toFixed()) + min;
          this.sliderModel.toValue = Number(value);
          let fromPercent: number;
          if (
            toggle.previousElementSibling?.className.split(' ')[0]
            === 'slider__toggle'
          ) {
            fromPercent = fromPercentValue;
          } else {
            fromPercent = 0;
          }
          (<HTMLElement>(
            slider.querySelector('.slider__bar')!
          )).style.height = `${stepTop - fromPercent}%`;
          const flag: HTMLElement = <HTMLElement>(
            slider.querySelector('.slider__flag-vertical_maximum')
          );
          if (flag) {
            flag.style.top = `${stepTop}%`;
            flag.textContent = String(value);
          }
        }

        toggle.style.top = `${String(stepTop)}%`;
        this._replaceScreenConfiguring();
      };
    }

    const onMouseUp = () => {
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('mouseup', onMouseUp);
  }

  private _setInModelValue(
    key: string,
    value: number | string | boolean,
  ): void {
    switch (key) {
      case 'min':
        this.sliderModel.minValue = Number(value);
        break;
      case 'max':
        this.sliderModel.maxValue = Number(value);
        break;
      case 'from':
        this.sliderModel.fromValue = Number(value);
        break;
      case 'fromPercent':
        this.sliderModel.fromPercentValue = Number(value);
        break;
      case 'to':
        this.sliderModel.toValue = Number(value);
        break;
      case 'toPercent':
        this.sliderModel.toPercentValue = Number(value);
        break;
      case 'step':
        this.sliderModel.stepValue = Number(value);
        break;
      case 'view':
        this.sliderModel.viewValue = String(value);
        break;
      case 'range':
        this.sliderModel.rangeValue = String(value);
        break;
      case 'flag':
        this.sliderModel.flagValue = <boolean>value;
        break;
      case 'scale':
        this.sliderModel.scaleValue = <boolean>value;
        break;
      default:
        break;
    }
  }

  private _showConfiguringView(): void {
    if (this.sliderModel.rangeValue === Range.ONE) {
      this.sliderModel.main
        .querySelector('.slider__wrapper')!
        .appendChild(this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === Range.RANGE) {
      this.sliderModel.main
        .querySelector('.slider__wrapper')!
        .appendChild(this.configuringViewRange.element);
    } else {
      throw new Error('incorrect value');
    }
  }

  private _showFlagView(): void {
    if (this.sliderModel.flagValue) {
      if (
        this.sliderModel.rangeValue === Range.ONE
        && this.sliderModel.viewValue === View.HORIZONTAL
      ) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.flagViewOne.element);
      } else if (
        this.sliderModel.rangeValue === Range.RANGE
        && this.sliderModel.viewValue === View.HORIZONTAL
      ) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.flagViewRange.element);
      } else if (
        this.sliderModel.rangeValue === Range.ONE
        && this.sliderModel.viewValue === View.VERTICAL
      ) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.flagViewVerticalOne.element);
      } else if (
        this.sliderModel.rangeValue === Range.RANGE
        && this.sliderModel.viewValue === View.VERTICAL
      ) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.flagViewVerticalRange.element);
      } else {
        throw new Error('incorrect value');
      }
    }
  }

  private _showScaleView(): void {
    if (this.sliderModel.scaleValue) {
      if (this.sliderModel.viewValue === View.HORIZONTAL) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.scaleView.element);
      } else if (this.sliderModel.viewValue === View.VERTICAL) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.scaleViewVertical.element);
      } else {
        throw new Error('incorrect value');
      }
    }
  }

  private _showSliderView(): void {
    if (
      this.sliderModel.rangeValue === Range.ONE
      && this.sliderModel.viewValue === View.HORIZONTAL
    ) {
      this.sliderModel.main.appendChild(this.sliderViewOne.element);
    } else if (
      this.sliderModel.rangeValue === Range.RANGE
      && this.sliderModel.viewValue === View.HORIZONTAL
    ) {
      this.sliderModel.main.appendChild(this.sliderViewRange.element);
    } else if (
      this.sliderModel.rangeValue === Range.ONE
      && this.sliderModel.viewValue === View.VERTICAL
    ) {
      this.sliderModel.main.appendChild(this.sliderViewVerticalOne.element);
    } else if (
      this.sliderModel.rangeValue === Range.RANGE
      && this.sliderModel.viewValue === View.VERTICAL
    ) {
      this.sliderModel.main.appendChild(this.sliderViewVerticalRange.element);
    } else {
      throw new Error('incorrect value');
    }
  }
}
