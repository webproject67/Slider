import Observer from '../observer';
import Model from '../model/model';
import TrackView from './track-view';
import ProgressView from './progress-view';
import ConfiguringView from './configuring-view';
import ScaleView from './scale-view';
import FlagView from './flag-view';
import { State, Const, View } from '../../const';
import { StateType } from '../../types';

export default class Views extends Observer {
  private model!: Model;

  private trackView!: TrackView;

  private progressView!: ProgressView;

  private configuringView!: ConfiguringView;

  private scaleView!: ScaleView;

  private flagView!: FlagView;

  constructor(main: HTMLElement, state: StateType) {
    super();
    this.importModules(main, state);
    this.importHandlers();
    this.init();
  }

  public init(): void {
    this.showTrackView();
    this.showProgressView();
    this.showConfiguringView();
    this.showScaleView();
    this.showFlagView();
  }

  public updateView(bool: boolean) {
    if (bool) {
      this.replaceScreenConfiguring();
      this.replaceScreenProgress();
      return;
    }
    this.replaceScreenScale();
    this.replaceScreenFlag();
    this.replaceScreenProgress();
    this.replaceScreenConfiguring();
    this.replaceScreenTrack();
    this.showScaleView();
    this.showProgressView();
    this.showFlagView();
    this.showConfiguringView();
  }

  private handleFlagMouseDown(evt: Event): void {
    const flag: HTMLElement = <HTMLElement>evt.currentTarget;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    const flagClassNames = flag.className.split(' ');
    const flagClassNamesLength = flagClassNames.length;
    let toggle: HTMLElement;

    switch (flagClassNames[flagClassNamesLength - 1]) {
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

    this.replaceToggle(evt, toggle!);
  }

  private handleInputChange(evt: Event): void {
    const input: HTMLElement = <HTMLElement>evt.currentTarget;
    const inputMin = input.dataset.name === State.MIN;
    const inputMax = input.dataset.name === State.MAX;
    const inputStep = input.dataset.name === State.STEP;
    const generalInput = inputMin || inputMax || inputStep;

    if (generalInput) {
      this.updateMinValue(input);
      this.updateMaxValue(input);
      this.updateStepValue(input);
    }

    if (input.dataset.name === State.VIEW) {
      this.broadcast([input.dataset.name], [(<HTMLInputElement>input).value]);
    }

    if (input.dataset.name === State.RANGE) {
      const { min } = this.model.state;
      this.broadcast(
        [input.dataset.name, 'from', 'fromPercent'],
        [(<HTMLInputElement>input).value, min, 0],
      );
    }

    const inputFlag = input.dataset.name === State.FLAG;
    const inputScale = input.dataset.name === State.SCALE;
    const inputProgress = input.dataset.name === State.PROGRESS;
    const generalInput2 = inputFlag || inputScale || inputProgress;

    if (generalInput2) {
      this.broadcast(
        [input.dataset.name!],
        [(<HTMLInputElement>input).checked],
      );
    }
  }

  private handleItemClick(
    evt: Event & { pageX?: number; pageY?: number },
  ): void {
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
    const { min, step, fromPercent } = this.model.state;
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
      corner = ((evt.pageX! - sliderLeft) / sliderWidth) * 100;
    } else {
      corner = ((evt.pageY! - boxTop) / sliderHeight) * 100;
    }

    const { stepPercent } = this.model.getStepCount(corner);
    let { stepPercentResult } = this.model.getStepCount(corner);

    if (scale.children.length) {
      if (
        scale.children[0].className.split(' ')[1] === Const.SLIDER_ITEM_MINIMUM
      ) stepPercentResult = 0;
      if (
        scale.children[0].className.split(' ')[1] === Const.SLIDER_ITEM_MAXIMUM
      ) stepPercentResult = 100;
    }
    const value: number = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;

    if (stepPercentResult >= fromPercent) {
      this.broadcast(
        ['toPercent', 'to', 'draft'],
        [stepPercentResult, value, 0],
      );
    } else {
      this.broadcast(
        ['fromPercent', 'from', 'draft'],
        [stepPercentResult, value, 0],
      );
    }
  }

  private handleToggleMouseDown(evt: Event): void {
    const toggle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceToggle(evt, toggle);
  }

  private importHandlers(): void {
    this.configuringView.handleInputChange = (evt) => {
      this.handleInputChange(evt);
    };

    this.flagView.handleFlagMouseDown = (evt) => {
      this.handleFlagMouseDown(evt);
    };

    this.progressView.handleBarClick = (evt) => {
      this.handleItemClick(evt);
    };

    this.scaleView.handleItemClick = (evt) => {
      this.handleItemClick(evt);
    };

    this.trackView.handleToggleMouseDown = (evt) => {
      this.handleToggleMouseDown(evt);
    };
  }

  private importModules(main: HTMLElement, state: StateType): void {
    this.model = new Model(main, state);
    this.trackView = new TrackView(this.model);
    this.progressView = new ProgressView(this.model);
    this.configuringView = new ConfiguringView(this.model);
    this.scaleView = new ScaleView(this.model);
    this.flagView = new FlagView(this.model);
  }

  private mouseMoveX(
    evt: Event & { touches?: TouchList; pageX?: number },
    slider: HTMLElement,
    toggle: HTMLElement,
  ) {
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    let value: number;
    let stepPercentResult: number;
    let flag: HTMLElement;
    const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches![0] : evt);
    const event = getEvent();
    const corner: number = ((event.pageX! - sliderLeft) / sliderWidth) * 100;

    if (toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MINIMUM) {
      value = this.setFromValue(corner).value;
      stepPercentResult = this.setFromValue(corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_minimum');
    }

    if (toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MAXIMUM) {
      value = this.setToValue(corner).value;
      stepPercentResult = this.setToValue(corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_maximum');
    }
    if (flag!) this.setPosition(flag, 'horizontal', stepPercentResult!, String(value!));
    this.setPosition(toggle, 'horizontal', stepPercentResult!);
  }

  private mouseMoveY(
    evt: Event & { touches?: TouchList; pageY?: number },
    slider: HTMLElement,
    toggle: HTMLElement,
  ) {
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderHeight: number = boxBottom - boxTop;
    let value: number;
    let stepPercentResult: number;
    let flag: HTMLElement;
    const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches![0] : evt);
    const event = getEvent();
    const corner: number = ((event.pageY! - boxTop) / sliderHeight) * 100;

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_VERTICAL_MINIMUM
    ) {
      value = this.setFromValue(corner).value;
      stepPercentResult = this.setFromValue(corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_minimum')
      );
    }

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_VERTICAL_MAXIMUM
    ) {
      value = this.setToValue(corner).value;
      stepPercentResult = this.setToValue(corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_maximum')
      );
    }
    if (flag!) this.setPosition(flag, 'vertical', stepPercentResult!, String(value!));
    this.setPosition(toggle, 'vertical', stepPercentResult!);
  }

  private replaceScreenConfiguring(): void {
    this.configuringView.element.replaceWith(
      this.configuringView.updatedElement,
    );
  }

  private replaceScreenFlag(): void {
    this.flagView.element.replaceWith(this.flagView.updatedElement);
  }

  private replaceScreenProgress(): void {
    this.progressView.element.replaceWith(this.progressView.updatedElement);
  }

  private replaceScreenScale(): void {
    this.scaleView.element.replaceWith(this.scaleView.updatedElement);
  }

  private replaceScreenTrack(): void {
    this.trackView.element.replaceWith(this.trackView.updatedElement);
  }

  private replaceToggle(evt: Event, toggle: HTMLElement): void {
    evt.preventDefault();
    const slider: HTMLElement = toggle.parentElement!;
    let onMouseMove: { (evt: Event): void };

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MINIMUM
      || toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MAXIMUM
    ) {
      onMouseMove = (evt: Event): void => this.mouseMoveX(evt, slider, toggle);
    } else {
      onMouseMove = (evt: Event): void => this.mouseMoveY(evt, slider, toggle);
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

  private setFromValue(corner: number) {
    const { min, step, toPercent } = this.model.state;
    const { stepPercent } = this.model.getStepCount(corner);
    let { stepPercentResult } = this.model.getStepCount(corner);
    if (stepPercentResult > toPercent) stepPercentResult = toPercent;
    const value = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
    this.broadcast(['fromPercent', 'from'], [stepPercentResult, value]);
    return {
      value,
      stepPercentResult,
    };
  }

  private setPosition(
    element: HTMLElement,
    position: string,
    valuePercent: number,
    value?: string,
  ) {
    if (position === View.HORIZONTAL) {
      element.style.left = `${String(valuePercent)}%`;
    } else {
      element.style.top = `${String(valuePercent)}%`;
    }
    if (value) element.textContent = value;
  }

  private setToValue(corner: number) {
    const { min, step, fromPercent } = this.model.state;
    const { stepPercent } = this.model.getStepCount(corner);
    let { stepPercentResult } = this.model.getStepCount(corner);
    if (fromPercent > stepPercentResult) stepPercentResult = fromPercent;
    const value = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
    this.broadcast(['toPercent', 'to'], [stepPercentResult, value]);
    return {
      value,
      stepPercentResult,
    };
  }

  private showConfiguringView(): void {
    this.model.main
      .querySelector('.slider__wrapper')!
      .appendChild(this.configuringView.element);
  }

  private showFlagView(): void {
    if (this.model.state.flag) {
      this.model.main
        .querySelector('.slider__inner')!
        .appendChild(this.flagView.element);
    }
  }

  private showProgressView(): void {
    if (this.model.state.progress) {
      this.model.main
        .querySelector('.slider__scale')!
        .appendChild(this.progressView.element);
    }
  }

  private showScaleView(): void {
    if (this.model.state.scale) {
      this.model.main
        .querySelector('.slider__inner')!
        .appendChild(this.scaleView.element);
      const items = this.model.main
        .querySelector('.slider__inner')!
        .querySelectorAll('.slider__item:not(:first-child):not(:last-child)');
      let { percent } = this.model.getPercentScale(this.model.main);
      const { stepPercent, scale } = this.model.getPercentScale(
        this.model.main,
      );
      items.forEach((item) => {
        if (percent > 99) {
          (<HTMLElement>item).style.display = 'none';
          return;
        }
        const value = Number(((percent / stepPercent) * this.model.state.step).toFixed())
          + this.model.state.min;
        if (scale !== 1) item.children[0].textContent = String(value);
        (<HTMLElement>item).style.left = `${percent}%`;
        percent += stepPercent * scale;
      });
    }
  }

  private showTrackView(): void {
    this.model.main.appendChild(this.trackView.element);
  }

  private updateMaxValue(input: HTMLElement) {
    const { min } = this.model.state;
    const max: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__max')
      )).value,
    );
    if (min >= max) {
      this.broadcast(['max', 'to', 'toPercent'], [min + 1, min + 1, 100]);
    } else {
      this.broadcast(['max', 'to', 'toPercent'], [max, max, 100]);
    }
  }

  private updateMinValue(input: HTMLElement) {
    const min: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__min')
      )).value,
    );
    const { max } = this.model.state;
    if (min >= max) {
      this.broadcast(['min', 'from', 'fromPercent'], [max - 1, max - 1, 0]);
    } else {
      this.broadcast(['min', 'from', 'fromPercent'], [min, min, 0]);
    }
  }

  private updateStepValue(input: HTMLElement) {
    const valueStart: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__step')
      )).value,
    );
    const value = this.model.getStepValue(valueStart);
    this.broadcast(['step'], [value]);
  }
}
