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
import { Range, View } from '../../const';
import { StateType } from '../../types';

export default class SliderPresenter {
  sliderModel!: SliderModel;

  sliderViewOne!: SliderViewOne;

  sliderViewRange!: SliderViewRange;

  sliderViewVerticalOne!: SliderViewVerticalOne;

  sliderViewVerticalRange!: SliderViewVerticalRange;

  configuringViewOne!: ConfiguringViewOne;

  configuringViewRange!: ConfiguringViewRange;

  scaleView!: ScaleView;

  scaleViewVertical!: ScaleViewVertical;

  flagViewOne!: FlagViewOne;

  flagViewRange!: FlagViewRange;

  flagViewVerticalOne!: FlagViewVerticalOne;

  flagViewVerticalRange!: FlagViewVerticalRange;

  constructor(main: HTMLElement, state: StateType) {
    this.importModules(main, state);
  }

  public init(): void {
    this.showSliderView();
    this.showConfiguringView();
    this.showScaleView();
    this.showFlagView();

    this.sliderModel.subscribe(
      (keys: string[], values: (number | string | boolean)[]) => {
        this.sliderModel.setValueState(keys, values);
        this.sliderModel.main.removeChild(this.sliderModel.main.children[0]);
        this.replaceScreenSlider();
        this.replaceScreenConfiguring();
        this.replaceScreenFlag();
        this.replaceScreenScale();
        this.showSliderView();
        this.showConfiguringView();
        this.showFlagView();
        this.showScaleView();
      },
    );
  }

  private importModules(main: HTMLElement, state: StateType): void {
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
  }

  private replaceScreenConfiguring(): void {
    this.configuringViewOne.element.replaceWith(
      this.configuringViewOne.newElement,
    );
    this.configuringViewRange.element.replaceWith(
      this.configuringViewRange.newElement,
    );
  }

  private replaceScreenFlag(): void {
    this.flagViewOne.element.replaceWith(this.flagViewOne.newElement);
    this.flagViewRange.element.replaceWith(this.flagViewRange.newElement);
    this.flagViewVerticalOne.element.replaceWith(
      this.flagViewVerticalOne.newElement,
    );
    this.flagViewVerticalRange.element.replaceWith(
      this.flagViewVerticalRange.newElement,
    );
  }

  private replaceScreenScale(): void {
    this.scaleView.element.replaceWith(this.scaleView.newElement);
    this.scaleViewVertical.element.replaceWith(
      this.scaleViewVertical.newElement,
    );
  }

  private replaceScreenSlider(): void {
    this.sliderViewOne.element.replaceWith(this.sliderViewOne.newElement);
    this.sliderViewRange.element.replaceWith(this.sliderViewRange.newElement);
    this.sliderViewVerticalOne.element.replaceWith(
      this.sliderViewVerticalOne.newElement,
    );
    this.sliderViewVerticalRange.element.replaceWith(
      this.sliderViewVerticalRange.newElement,
    );
  }

  private showConfiguringView(): void {
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

  private showFlagView(): void {
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

  private showScaleView(): void {
    if (this.sliderModel.scaleValue) {
      const setStyle = (main: HTMLElement) => {
        const items = main
          .querySelector('.slider__inner')!
          .querySelectorAll('.slider__item:not(:first-child):not(:last-child)');
        const stepCount: number = (this.sliderModel.maxValue - this.sliderModel.minValue)
          / this.sliderModel.stepValue;
        const stepPercent: number = 100 / stepCount;
        let scale = 1;
        if (stepCount > 20) scale = Math.ceil(stepCount / 20);
        let percent = stepPercent * scale;
        items.forEach((item) => {
          if (percent > 99) {
            (<HTMLElement>item).style.display = 'none';
            return;
          }
          (<HTMLElement>item).style.left = `${percent}%`;
          percent += stepPercent * scale;
        });
      };

      if (this.sliderModel.viewValue === View.HORIZONTAL) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.scaleView.element);
        setStyle(this.sliderModel.main);
      } else if (this.sliderModel.viewValue === View.VERTICAL) {
        this.sliderModel.main
          .querySelector('.slider__inner')!
          .appendChild(this.scaleViewVertical.element);
        setStyle(this.sliderModel.main);
      } else {
        throw new Error('incorrect value');
      }
    }
  }

  private showSliderView(): void {
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
