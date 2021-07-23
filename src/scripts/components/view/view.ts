import Observer from '../observer';
import TrackView from './track-view';
import ProgressView from './progress-view';
import ConfiguringView from './configuring-view';
import ScaleView from './scale-view';
import FlagView from './flag-view';
import { State, Const, View } from '../../const';
import { StateType } from '../../types';

export default class Views extends Observer {
  private trackView!: TrackView;

  private progressView!: ProgressView;

  private configuringView!: ConfiguringView;

  private scaleView!: ScaleView;

  private flagView!: FlagView;

  constructor() {
    super();
    this.importModules();
    this.importHandlers();
  }

  public updateView(model: StateType, bool: boolean) {
    if (model.start) {
      this.showTrackView(model);
      this.showProgressView(model);
      this.showConfiguringView(model);
      this.showScaleView(model);
      this.showFlagView(model);
      this.broadcast(['start'], [0]);
      return;
    }

    if (bool) {
      this.replaceScreenConfiguring(model);
      this.replaceScreenProgress(model);
      return;
    }

    this.replaceScreenScale(model);
    this.replaceScreenFlag(model);
    this.replaceScreenProgress(model);
    this.replaceScreenConfiguring(model);
    this.replaceScreenTrack(model);
    this.showScaleView(model);
    this.showProgressView(model);
    this.showFlagView(model);
    this.showConfiguringView(model);
  }

  private getPercentScale(model: StateType) {
    const { stepCount, stepPercent } = this.getStepCount(model, 0);
    let scale = 1;
    if (stepCount > 20) scale = Math.ceil(stepCount / 20);
    const percent = stepPercent * scale;
    return {
      percent,
      stepPercent,
      scale,
    };
  }

  private getStepCount(model: StateType, corner: number) {
    const { min, max, step } = model;
    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number = Math.round(corner / stepPercent) * stepPercent;
    if (stepPercentResult < 0) stepPercentResult = 0;
    if (corner > 100) stepPercentResult = 100;
    return {
      stepCount,
      stepPercent,
      stepPercentResult,
    };
  }

  private getStepValue(model: StateType, value: number) {
    const { min, max } = model;
    const generalValue = max - min;
    if (value === 0) value = 1;
    if (value < 0) value = Math.abs(value);
    if (value > generalValue) value = generalValue;
    return value;
  }

  private handleFlagMouseDown(model: StateType, evt: Event): void {
    const flag: HTMLElement = <HTMLElement>evt.currentTarget;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    const flagClassNames = flag.className.split(' ');
    const flagClassNamesLength = flagClassNames.length;
    let toggle!: HTMLElement;

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

    this.replaceToggle(model, evt, toggle);
  }

  private handleInputChange(model: StateType, evt: Event): void {
    const input: HTMLElement = <HTMLElement>evt.currentTarget;
    const inputMin = input.dataset.name === State.MIN;
    const inputMax = input.dataset.name === State.MAX;
    const inputStep = input.dataset.name === State.STEP;
    const generalInput = inputMin || inputMax || inputStep;

    if (generalInput) {
      this.updateMinValue(model, input);
      this.updateMaxValue(model, input);
      this.updateStepValue(model, input);
    }

    if (input.dataset.name === State.VIEW) {
      this.broadcast([input.dataset.name], [(<HTMLInputElement>input).value]);
    }

    if (input.dataset.name === State.RANGE) {
      const { min } = model;
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
    model: StateType,
    evt: Event & { pageX?: number; pageY?: number },
  ): void {
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
    const { min, step, fromPercent } = model;
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

    if (stepList.className.split(' ')[1]) {
      corner = ((evt.pageX! - sliderLeft) / sliderWidth) * 100;
    } else {
      corner = ((evt.pageY! - boxTop) / sliderHeight) * 100;
    }

    const { stepPercent } = this.getStepCount(model, corner);
    let { stepPercentResult } = this.getStepCount(model, corner);

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

  private handleToggleMouseDown(model: StateType, evt: Event): void {
    const toggle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceToggle(model, evt, toggle);
  }

  private importHandlers(): void {
    this.configuringView.handleInputChange = (model, evt) => {
      this.handleInputChange(model, evt);
    };

    this.flagView.handleFlagMouseDown = (model, evt) => {
      this.handleFlagMouseDown(model, evt);
    };

    this.progressView.handleBarClick = (model, evt) => {
      this.handleItemClick(model, evt);
    };

    this.scaleView.handleItemClick = (model, evt) => {
      this.handleItemClick(model, evt);
    };

    this.trackView.handleToggleMouseDown = (model, evt) => {
      this.handleToggleMouseDown(model, evt);
    };
  }

  private importModules(): void {
    this.trackView = new TrackView();
    this.progressView = new ProgressView();
    this.configuringView = new ConfiguringView();
    this.scaleView = new ScaleView();
    this.flagView = new FlagView();
  }

  private mouseMoveX(
    model: StateType,
    evt: Event & { touches?: TouchList; pageX?: number },
    slider: HTMLElement,
    toggle: HTMLElement,
  ) {
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    let value!: number;
    let stepPercentResult!: number;
    let flag!: HTMLElement;
    const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches![0] : evt);
    const event = getEvent();
    const corner: number = ((event.pageX! - sliderLeft) / sliderWidth) * 100;

    if (toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MINIMUM) {
      value = this.setFromValue(model, corner).value;
      stepPercentResult = this.setFromValue(model, corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_minimum');
    }

    if (toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MAXIMUM) {
      value = this.setToValue(model, corner).value;
      stepPercentResult = this.setToValue(model, corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_maximum');
    }
    if (flag) this.setPosition(flag, 'horizontal', stepPercentResult, String(value));
    this.setPosition(toggle, 'horizontal', stepPercentResult);
  }

  private mouseMoveY(
    model: StateType,
    evt: Event & { touches?: TouchList; pageY?: number },
    slider: HTMLElement,
    toggle: HTMLElement,
  ) {
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderHeight: number = boxBottom - boxTop;
    let value!: number;
    let stepPercentResult!: number;
    let flag!: HTMLElement;
    const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches![0] : evt);
    const event = getEvent();
    const corner: number = ((event.pageY! - boxTop) / sliderHeight) * 100;

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_VERTICAL_MINIMUM
    ) {
      value = this.setFromValue(model, corner).value;
      stepPercentResult = this.setFromValue(model, corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_minimum')
      );
    }

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_VERTICAL_MAXIMUM
    ) {
      value = this.setToValue(model, corner).value;
      stepPercentResult = this.setToValue(model, corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_maximum')
      );
    }
    if (flag) this.setPosition(flag, 'vertical', stepPercentResult, String(value));
    this.setPosition(toggle, 'vertical', stepPercentResult);
  }

  private replaceScreenConfiguring(model: StateType): void {
    this.configuringView
      .getElement(model)
      .replaceWith(this.configuringView.getUpdatedElement(model));
  }

  private replaceScreenFlag(model: StateType): void {
    this.flagView
      .getElement(model)
      .replaceWith(this.flagView.getUpdatedElement(model));
  }

  private replaceScreenProgress(model: StateType): void {
    this.progressView
      .getElement(model)
      .replaceWith(this.progressView.getUpdatedElement(model));
  }

  private replaceScreenScale(model: StateType): void {
    this.scaleView
      .getElement(model)
      .replaceWith(this.scaleView.getUpdatedElement(model));
  }

  private replaceScreenTrack(model: StateType): void {
    this.trackView
      .getElement(model)
      .replaceWith(this.trackView.getUpdatedElement(model));
  }

  private replaceToggle(
    model: StateType,
    evt: Event,
    toggle: HTMLElement,
  ): void {
    evt.preventDefault();
    const slider: HTMLElement = toggle.parentElement!;
    let onMouseMove: { (evt: Event): void };

    if (
      toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MINIMUM
      || toggle.className.split(' ')[1] === Const.SLIDER_TOGGLE_MAXIMUM
    ) {
      onMouseMove = (evt: Event): void => this.mouseMoveX(model, evt, slider, toggle);
    } else {
      onMouseMove = (evt: Event): void => this.mouseMoveY(model, evt, slider, toggle);
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

  private setFromValue(model: StateType, corner: number) {
    const { min, step, toPercent } = model;
    const { stepPercent } = this.getStepCount(model, corner);
    let { stepPercentResult } = this.getStepCount(model, corner);
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

  private setToValue(model: StateType, corner: number) {
    const { min, step, fromPercent } = model;
    const { stepPercent } = this.getStepCount(model, corner);
    let { stepPercentResult } = this.getStepCount(model, corner);
    if (fromPercent > stepPercentResult) stepPercentResult = fromPercent;
    const value = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
    this.broadcast(['toPercent', 'to'], [stepPercentResult, value]);
    return {
      value,
      stepPercentResult,
    };
  }

  private showConfiguringView(model: StateType): void {
    model
      .main!.querySelector('.slider__wrapper')!
      .appendChild(this.configuringView.getElement(model));
  }

  private showFlagView(model: StateType): void {
    if (model.flag) {
      model
        .main!.querySelector('.slider__inner')!
        .appendChild(this.flagView.getElement(model));
    }
  }

  private showProgressView(model: StateType): void {
    if (model.progress) {
      model
        .main!.querySelector('.slider__scale')!
        .appendChild(this.progressView.getElement(model));
    }
  }

  private showScaleView(model: StateType): void {
    if (model.scale) {
      model
        .main!.querySelector('.slider__inner')!
        .appendChild(this.scaleView.getElement(model));
      const items = model
        .main!.querySelector('.slider__inner')!
        .querySelectorAll('.slider__item:not(:first-child):not(:last-child)');
      let { percent } = this.getPercentScale(model);
      const { stepPercent, scale } = this.getPercentScale(model);
      items.forEach((item) => {
        if (percent > 99) {
          (<HTMLElement>item).style.display = 'none';
          return;
        }
        const value = Number(((percent / stepPercent) * model.step).toFixed()) + model.min;
        if (scale !== 1) item.children[0].textContent = String(value);
        (<HTMLElement>item).style.left = `${percent}%`;
        percent += stepPercent * scale;
      });
    }
  }

  private showTrackView(model: StateType): void {
    model.main!.appendChild(this.trackView.getElement(model));
  }

  private updateMaxValue(model: StateType, input: HTMLElement) {
    const { min } = model;
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

  private updateMinValue(model: StateType, input: HTMLElement) {
    const min: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__min')
      )).value,
    );
    const { max } = model;
    if (min >= max) {
      this.broadcast(['min', 'from', 'fromPercent'], [max - 1, max - 1, 0]);
    } else {
      this.broadcast(['min', 'from', 'fromPercent'], [min, min, 0]);
    }
  }

  private updateStepValue(model: StateType, input: HTMLElement) {
    const valueStart: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__step')
      )).value,
    );
    const value = this.getStepValue(model, valueStart);
    this.broadcast(['step'], [value]);
  }
}
