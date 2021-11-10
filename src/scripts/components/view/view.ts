import Observer from '../observer/Observer';
import TrackView from './Track-view';
import ProgressView from './Progress-view';
import ConfiguringView from './Configuring-view';
import ScaleView from './Scale-view';
import FlagView from './Flag-view';
import {
  MIN,
  MAX,
  STEP,
  VIEW,
  RANGE,
  FLAG,
  SCALE,
  PROGRESS,
  TOGGLE_MINIMUM,
  TOGGLE_MAXIMUM,
  TOGGLE_VERTICAL_MINIMUM,
  TOGGLE_VERTICAL_MAXIMUM,
  ITEM,
  ITEM_MINIMUM,
  ITEM_MAXIMUM,
  HORIZONTAL,
} from '../../const';
import StateType from '../../StateType';

export default class Views extends Observer {
  public trackView!: TrackView;

  public progressView!: ProgressView;

  public configuringView!: ConfiguringView;

  public scaleView!: ScaleView;

  public flagView!: FlagView;

  private main: HTMLElement;

  constructor(main: HTMLElement) {
    super();
    this.main = main;
    this.importModules();
    this.importHandlers();
  }

  public updateView(state: StateType, bool: boolean) {
    if (state.start) {
      this.showTrackView(state);
      this.showProgressView(state);
      this.showConfiguringView(state);
      this.showScaleView(state);
      this.showFlagView(state);
      this.broadcast(['start'], [0]);
      return;
    }

    if (bool) {
      this.replaceScreenConfiguring(state);
      this.replaceScreenProgress(state);
      return;
    }

    this.replaceScreenScale(state);
    this.replaceScreenFlag(state);
    this.replaceScreenProgress(state);
    this.replaceScreenConfiguring(state);
    this.replaceScreenTrack(state);
    this.showScaleView(state);
    this.showProgressView(state);
    this.showFlagView(state);
    this.showConfiguringView(state);
  }

  private getPercentScale(state: StateType) {
    const { stepCount, stepPercent } = this.getStepCount(state, 0);
    let scale = 1;
    if (stepCount > 20) scale = Math.ceil(stepCount / 20);
    const percent = stepPercent * scale;
    return {
      percent,
      stepPercent,
      scale,
    };
  }

  private getStepCount(state: StateType, corner: number, str?: string) {
    const { min, max, step, toPercent, fromPercent } = state;
    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number =
      Math.round(corner / stepPercent) * stepPercent;
    if (stepPercentResult < 0) stepPercentResult = 0;
    if (corner > 100 || stepPercentResult > 100) stepPercentResult = 100;
    if (str === 'toPercent') {
      if (stepPercentResult > toPercent) stepPercentResult = toPercent;
    }
    if (str === 'fromPercent') {
      if (fromPercent > stepPercentResult) stepPercentResult = fromPercent;
    }
    return {
      stepCount,
      stepPercent,
      stepPercentResult,
    };
  }

  private getStepValue(state: StateType, val: number) {
    let value = val;
    const { min, max } = state;
    const generalValue = max - min;
    if (value === 0) value = 1;
    if (value < 0) value = Math.abs(value);
    if (value > generalValue) value = generalValue;
    return value;
  }

  private getValue(
    state: StateType,
    percent: number,
    firstValue?: number | null,
    secondValue?: number | null
  ) {
    const { min, max, fromPercent } = state;
    const { stepPercent } = this.getStepCount(state, 0);
    const value =
      Number(((percent / stepPercent) * state.step).toFixed()) + state.min;
    const boolFrom = percent >= fromPercent;
    const boolMinMax = (firstValue || min) >= (secondValue || max);
    return {
      min,
      max,
      value,
      boolFrom,
      boolMinMax,
    };
  }

  private handleFlagMouseDown(state: StateType, evt: Event): void {
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

    this.replaceToggle(state, evt, toggle);
  }

  private handleInputChange(state: StateType, evt: Event): void {
    const input: HTMLElement = <HTMLElement>evt.currentTarget;
    const inputMin = input.dataset.name === MIN;
    const inputMax = input.dataset.name === MAX;
    const inputStep = input.dataset.name === STEP;
    const generalInput = inputMin || inputMax || inputStep;

    if (generalInput) {
      this.updateMinValue(state, input);
      this.updateMaxValue(state, input);
      this.updateStepValue(state, input);
    }

    if (input.dataset.name === VIEW) {
      this.broadcast([input.dataset.name], [(<HTMLInputElement>input).value]);
    }

    if (input.dataset.name === RANGE) {
      const { min } = this.getValue(state, 0);
      this.broadcast(
        [input.dataset.name, 'from', 'fromPercent'],
        [(<HTMLInputElement>input).value, min, 0]
      );
    }

    const inputFlag = input.dataset.name === FLAG;
    const inputScale = input.dataset.name === SCALE;
    const inputProgress = input.dataset.name === PROGRESS;
    const generalInput2 = inputFlag || inputScale || inputProgress;

    if (generalInput2) {
      this.broadcast(
        [input.dataset.name!],
        [(<HTMLInputElement>input).checked]
      );
    }
  }

  private handleItemClick(
    state: StateType,
    evt: Event & { pageX?: number; pageY?: number }
  ): void {
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
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
      corner = ((evt.pageY! - boxTop) / sliderHeight) * 100;
    } else {
      corner = ((evt.pageX! - sliderLeft) / sliderWidth) * 100;
    }

    if (scale.className === ITEM) corner = parseFloat(scale.style.left);

    let { stepPercentResult } = this.getStepCount(state, corner);

    if (scale.children.length) {
      if (scale.children[0].className.split(' ')[1] === ITEM_MINIMUM)
        stepPercentResult = 0;
      if (scale.children[0].className.split(' ')[1] === ITEM_MAXIMUM)
        stepPercentResult = 100;
    }
    const { value, boolFrom } = this.getValue(state, stepPercentResult);

    if (boolFrom) {
      this.broadcast(
        ['toPercent', 'to', 'draft'],
        [stepPercentResult, value, 0]
      );
    } else {
      this.broadcast(
        ['fromPercent', 'from', 'draft'],
        [stepPercentResult, value, 0]
      );
    }
  }

  private handleToggleMouseDown(state: StateType, evt: Event): void {
    const toggle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceToggle(state, evt, toggle);
  }

  private importHandlers(): void {
    this.configuringView.handleInputChange = (state, evt) => {
      this.handleInputChange(state, evt);
    };

    this.flagView.handleFlagMouseDown = (state, evt) => {
      this.handleFlagMouseDown(state, evt);
    };

    this.progressView.handleBarClick = (state, evt) => {
      this.handleItemClick(state, evt);
    };

    this.scaleView.handleItemClick = (state, evt) => {
      this.handleItemClick(state, evt);
    };

    this.trackView.handleToggleMouseDown = (state, evt) => {
      this.handleToggleMouseDown(state, evt);
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
    state: StateType,
    evt: Event & { touches?: TouchList; pageX?: number },
    slider: HTMLElement,
    toggle: HTMLElement
  ) {
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    let value!: number;
    let stepPercentResult!: number;
    let flag!: HTMLElement;
    const getEvent = () =>
      evt.type.search('touch') !== -1 ? evt.touches![0] : evt;
    const event = getEvent();
    const corner: number = ((event.pageX! - sliderLeft) / sliderWidth) * 100;

    if (toggle.className.split(' ')[1] === TOGGLE_MINIMUM) {
      value = this.setFromValue(state, corner).value;
      stepPercentResult = this.setFromValue(state, corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_minimum');
    }

    if (toggle.className.split(' ')[1] === TOGGLE_MAXIMUM) {
      value = this.setToValue(state, corner).value;
      stepPercentResult = this.setToValue(state, corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_maximum');
    }
    if (flag)
      this.setPosition(flag, 'horizontal', stepPercentResult, String(value));
    this.setPosition(toggle, 'horizontal', stepPercentResult);
  }

  private mouseMoveY(
    state: StateType,
    evt: Event & { touches?: TouchList; pageY?: number },
    slider: HTMLElement,
    toggle: HTMLElement
  ) {
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderHeight: number = boxBottom - boxTop;
    let value!: number;
    let stepPercentResult!: number;
    let flag!: HTMLElement;
    const getEvent = () =>
      evt.type.search('touch') !== -1 ? evt.touches![0] : evt;
    const event = getEvent();
    const corner: number = ((event.pageY! - boxTop) / sliderHeight) * 100;

    if (toggle.className.split(' ')[1] === TOGGLE_VERTICAL_MINIMUM) {
      value = this.setFromValue(state, corner).value;
      stepPercentResult = this.setFromValue(state, corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_minimum')
      );
    }

    if (toggle.className.split(' ')[1] === TOGGLE_VERTICAL_MAXIMUM) {
      value = this.setToValue(state, corner).value;
      stepPercentResult = this.setToValue(state, corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_maximum')
      );
    }
    if (flag)
      this.setPosition(flag, 'vertical', stepPercentResult, String(value));
    this.setPosition(toggle, 'vertical', stepPercentResult);
  }

  private replaceScreenConfiguring(state: StateType): void {
    this.configuringView
      .getElement(state)
      .replaceWith(this.configuringView.getUpdatedElement(state));
  }

  private replaceScreenFlag(state: StateType): void {
    this.flagView
      .getElement(state)
      .replaceWith(this.flagView.getUpdatedElement(state));
  }

  private replaceScreenProgress(state: StateType): void {
    this.progressView
      .getElement(state)
      .replaceWith(this.progressView.getUpdatedElement(state));
  }

  private replaceScreenScale(state: StateType): void {
    this.scaleView
      .getElement(state)
      .replaceWith(this.scaleView.getUpdatedElement(state));
  }

  private replaceScreenTrack(state: StateType): void {
    this.trackView
      .getElement(state)
      .replaceWith(this.trackView.getUpdatedElement(state));
  }

  private replaceToggle(
    state: StateType,
    evt: Event,
    toggle: HTMLElement
  ): void {
    evt.preventDefault();
    const slider: HTMLElement = toggle.parentElement!;
    let onMouseMove: { (evt: Event): void };
    const toggleMin = toggle.className.split(' ')[1] === TOGGLE_MINIMUM;
    const toggleMax = toggle.className.split(' ')[1] === TOGGLE_MAXIMUM;
    const toggleBool = toggleMin || toggleMax;

    if (toggleBool) {
      onMouseMove = (evt: Event): void =>
        this.mouseMoveX(state, evt, slider, toggle);
    } else {
      onMouseMove = (evt: Event): void =>
        this.mouseMoveY(state, evt, slider, toggle);
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

  private setFromValue(state: StateType, corner: number) {
    const { stepPercentResult } = this.getStepCount(state, corner, 'toPercent');
    const { value } = this.getValue(state, stepPercentResult);
    this.broadcast(['fromPercent', 'from'], [stepPercentResult, value]);
    return {
      value,
      stepPercentResult,
    };
  }

  private setPosition(
    elem: HTMLElement,
    position: string,
    valuePercent: number,
    value?: string
  ) {
    const element = elem;
    if (position === HORIZONTAL) {
      element.style.left = `${String(valuePercent)}%`;
    } else {
      element.style.top = `${String(valuePercent)}%`;
    }
    if (value) element.textContent = value;
  }

  private setToValue(state: StateType, corner: number) {
    const { stepPercentResult } = this.getStepCount(
      state,
      corner,
      'fromPercent'
    );
    const { value } = this.getValue(state, stepPercentResult);
    this.broadcast(['toPercent', 'to'], [stepPercentResult, value]);
    return {
      value,
      stepPercentResult,
    };
  }

  private showConfiguringView(state: StateType): void {
    if (state.configuring) {
      this.main
        .querySelector('.slider__wrapper')!
        .appendChild(this.configuringView.getElement(state));
    }
  }

  private showFlagView(state: StateType): void {
    if (state.flag) {
      this.main
        .querySelector('.slider__inner')!
        .appendChild(this.flagView.getElement(state));
    }
  }

  private showProgressView(state: StateType): void {
    if (state.progress) {
      this.main
        .querySelector('.slider__scale')!
        .appendChild(this.progressView.getElement(state));
    }
  }

  private showScaleView(state: StateType): void {
    if (state.scale) {
      this.main
        .querySelector('.slider__inner')!
        .appendChild(this.scaleView.getElement(state));
      const items = this.main
        .querySelector('.slider__inner')!
        .querySelectorAll('.slider__item:not(:first-child):not(:last-child)');
      let { percent } = this.getPercentScale(state);
      const { stepPercent, scale } = this.getPercentScale(state);
      items.forEach((it) => {
        const item = it;
        if (percent > 99) {
          (<HTMLElement>item).style.display = 'none';
          return;
        }
        const { value } = this.getValue(state, percent);
        if (scale !== 1) item.children[0].textContent = String(value);
        (<HTMLElement>item).style.left = `${percent}%`;
        percent += stepPercent * scale;
      });
    }
  }

  private showTrackView(state: StateType): void {
    this.main.appendChild(this.trackView.getElement(state));
  }

  private updateMaxValue(state: StateType, input: HTMLElement) {
    const max: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__max')
      )).value
    );
    const { min, boolMinMax } = this.getValue(state, 0, null, max);
    if (boolMinMax) {
      this.broadcast(['max', 'to', 'toPercent'], [min + 1, min + 1, 100]);
    } else {
      this.broadcast(['max', 'to', 'toPercent'], [max, max, 100]);
    }
  }

  private updateMinValue(state: StateType, input: HTMLElement) {
    const min: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__min')
      )).value
    );
    const { max, boolMinMax } = this.getValue(state, 0, min, null);
    if (boolMinMax) {
      this.broadcast(['min', 'from', 'fromPercent'], [max - 1, max - 1, 0]);
    } else {
      this.broadcast(['min', 'from', 'fromPercent'], [min, min, 0]);
    }
  }

  private updateStepValue(state: StateType, input: HTMLElement) {
    const valueStart: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__step')
      )).value
    );
    const value = this.getStepValue(state, valueStart);
    this.broadcast(['step'], [value]);
  }
}
