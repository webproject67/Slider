import Observer from '../observer';
import TrackView from './track-view';
import ProgressView from './progress-view';
import ConfiguringView from './configuring-view';
import ScaleView from './scale-view';
import FlagView from './flag-view';
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
  ITEM_MINIMUM,
  ITEM_MAXIMUM,
  HORIZONTAL,
} from '../../const';
import { ModelType } from '../../types';

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

  public updateView(model: ModelType, bool: boolean) {
    if (model.state.start) {
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

  private handleFlagMouseDown(model: ModelType, evt: Event): void {
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

  private handleInputChange(model: ModelType, evt: Event): void {
    const input: HTMLElement = <HTMLElement>evt.currentTarget;
    const inputMin = input.dataset.name === MIN;
    const inputMax = input.dataset.name === MAX;
    const inputStep = input.dataset.name === STEP;
    const generalInput = inputMin || inputMax || inputStep;

    if (generalInput) {
      this.updateMinValue(model, input);
      this.updateMaxValue(model, input);
      this.updateStepValue(model, input);
    }

    if (input.dataset.name === VIEW) {
      this.broadcast([input.dataset.name], [(<HTMLInputElement>input).value]);
    }

    if (input.dataset.name === RANGE) {
      const { min } = model.getValue(0);
      this.broadcast(
        [input.dataset.name, 'from', 'fromPercent'],
        [(<HTMLInputElement>input).value, min, 0],
      );
    }

    const inputFlag = input.dataset.name === FLAG;
    const inputScale = input.dataset.name === SCALE;
    const inputProgress = input.dataset.name === PROGRESS;
    const generalInput2 = inputFlag || inputScale || inputProgress;

    if (generalInput2) {
      this.broadcast(
        [input.dataset.name!],
        [(<HTMLInputElement>input).checked],
      );
    }
  }

  private handleItemClick(
    model: ModelType,
    evt: Event & { pageX?: number; pageY?: number },
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

    if (scale.style.left) corner = parseFloat(scale.style.left);

    let { stepPercentResult } = model.getStepCount(corner);

    if (scale.children.length) {
      if (scale.children[0].className.split(' ')[1] === ITEM_MINIMUM) stepPercentResult = 0;
      if (scale.children[0].className.split(' ')[1] === ITEM_MAXIMUM) stepPercentResult = 100;
    }
    const { value, boolFrom } = model.getValue(stepPercentResult);

    if (boolFrom) {
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

  private handleToggleMouseDown(model: ModelType, evt: Event): void {
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
    model: ModelType,
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

    if (toggle.className.split(' ')[1] === TOGGLE_MINIMUM) {
      value = this.setFromValue(model, corner).value;
      stepPercentResult = this.setFromValue(model, corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_minimum');
    }

    if (toggle.className.split(' ')[1] === TOGGLE_MAXIMUM) {
      value = this.setToValue(model, corner).value;
      stepPercentResult = this.setToValue(model, corner).stepPercentResult;
      flag = <HTMLElement>slider.querySelector('.slider__flag_maximum');
    }
    if (flag) this.setPosition(flag, 'horizontal', stepPercentResult, String(value));
    this.setPosition(toggle, 'horizontal', stepPercentResult);
  }

  private mouseMoveY(
    model: ModelType,
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

    if (toggle.className.split(' ')[1] === TOGGLE_VERTICAL_MINIMUM) {
      value = this.setFromValue(model, corner).value;
      stepPercentResult = this.setFromValue(model, corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_minimum')
      );
    }

    if (toggle.className.split(' ')[1] === TOGGLE_VERTICAL_MAXIMUM) {
      value = this.setToValue(model, corner).value;
      stepPercentResult = this.setToValue(model, corner).stepPercentResult;
      flag = <HTMLElement>(
        slider.querySelector('.slider__flag-vertical_maximum')
      );
    }
    if (flag) this.setPosition(flag, 'vertical', stepPercentResult, String(value));
    this.setPosition(toggle, 'vertical', stepPercentResult);
  }

  private replaceScreenConfiguring(model: ModelType): void {
    this.configuringView
      .getElement(model)
      .replaceWith(this.configuringView.getUpdatedElement(model));
  }

  private replaceScreenFlag(model: ModelType): void {
    this.flagView
      .getElement(model)
      .replaceWith(this.flagView.getUpdatedElement(model));
  }

  private replaceScreenProgress(model: ModelType): void {
    this.progressView
      .getElement(model)
      .replaceWith(this.progressView.getUpdatedElement(model));
  }

  private replaceScreenScale(model: ModelType): void {
    this.scaleView
      .getElement(model)
      .replaceWith(this.scaleView.getUpdatedElement(model));
  }

  private replaceScreenTrack(model: ModelType): void {
    this.trackView
      .getElement(model)
      .replaceWith(this.trackView.getUpdatedElement(model));
  }

  private replaceToggle(
    model: ModelType,
    evt: Event,
    toggle: HTMLElement,
  ): void {
    evt.preventDefault();
    const slider: HTMLElement = toggle.parentElement!;
    let onMouseMove: { (evt: Event): void };

    if (
      toggle.className.split(' ')[1] === TOGGLE_MINIMUM
      || toggle.className.split(' ')[1] === TOGGLE_MAXIMUM
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

  private setFromValue(model: ModelType, corner: number) {
    const { stepPercentResult } = model.getStepCount(corner, 'toPercent');
    const { value } = model.getValue(stepPercentResult);
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
    if (position === HORIZONTAL) {
      element.style.left = `${String(valuePercent)}%`;
    } else {
      element.style.top = `${String(valuePercent)}%`;
    }
    if (value) element.textContent = value;
  }

  private setToValue(model: ModelType, corner: number) {
    const { stepPercentResult } = model.getStepCount(corner, 'fromPercent');
    const { value } = model.getValue(stepPercentResult);
    this.broadcast(['toPercent', 'to'], [stepPercentResult, value]);
    return {
      value,
      stepPercentResult,
    };
  }

  private showConfiguringView(model: ModelType): void {
    if (model.state.configuring) {
      model.state
        .main!.querySelector('.slider__wrapper')!
        .appendChild(this.configuringView.getElement(model));
    }
  }

  private showFlagView(model: ModelType): void {
    if (model.state.flag) {
      model.state
        .main!.querySelector('.slider__inner')!
        .appendChild(this.flagView.getElement(model));
    }
  }

  private showProgressView(model: ModelType): void {
    if (model.state.progress) {
      model.state
        .main!.querySelector('.slider__scale')!
        .appendChild(this.progressView.getElement(model));
    }
  }

  private showScaleView(model: ModelType): void {
    if (model.state.scale) {
      model.state
        .main!.querySelector('.slider__inner')!
        .appendChild(this.scaleView.getElement(model));
      const items = model.state
        .main!.querySelector('.slider__inner')!
        .querySelectorAll('.slider__item:not(:first-child):not(:last-child)');
      let { percent } = model.getPercentScale();
      const { stepPercent, scale } = model.getPercentScale();
      items.forEach((item) => {
        if (percent > 99) {
          (<HTMLElement>item).style.display = 'none';
          return;
        }
        const { value } = model.getValue(percent);
        if (scale !== 1) item.children[0].textContent = String(value);
        (<HTMLElement>item).style.left = `${percent}%`;
        percent += stepPercent * scale;
      });
    }
  }

  private showTrackView(model: ModelType): void {
    model.state.main!.appendChild(this.trackView.getElement(model));
  }

  private updateMaxValue(model: ModelType, input: HTMLElement) {
    const max: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__max')
      )).value,
    );
    const { min, boolMinMax } = model.getValue(0, null, max);
    if (boolMinMax) {
      this.broadcast(['max', 'to', 'toPercent'], [min + 1, min + 1, 100]);
    } else {
      this.broadcast(['max', 'to', 'toPercent'], [max, max, 100]);
    }
  }

  private updateMinValue(model: ModelType, input: HTMLElement) {
    const min: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__min')
      )).value,
    );
    const { max, boolMinMax } = model.getValue(0, min, null);
    if (boolMinMax) {
      this.broadcast(['min', 'from', 'fromPercent'], [max - 1, max - 1, 0]);
    } else {
      this.broadcast(['min', 'from', 'fromPercent'], [min, min, 0]);
    }
  }

  private updateStepValue(model: ModelType, input: HTMLElement) {
    const valueStart: number = Number(
      (<HTMLInputElement>(
        input.parentElement!.parentElement!.querySelector('.slider__step')
      )).value,
    );
    const value = model.getStepValue(valueStart);
    this.broadcast(['step'], [value]);
  }
}
