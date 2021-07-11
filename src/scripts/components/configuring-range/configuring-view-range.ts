import AbstractView from '../abstract-view';
import {
  NULL_VALUE, View, Range, State,
} from '../../const';

export default class ConfiguringViewRange extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    return `
      <div data-testid="configuring-range" class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <br>
        <input data-name="min" class="slider__min slider__number" type="number" value=${
  this.sliderModel.minValue
} id="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <br>
        <input data-name="max" class="slider__max slider__number" type="number" value=${
  this.sliderModel.maxValue
} id="max">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="from">От</label>
        <br>
        <input data-name="from" class="slider__from slider__number" type="number" value=${
  this.sliderModel.fromValue === NULL_VALUE
    ? this.sliderModel.minValue
    : this.sliderModel.fromValue
} id="from" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="to">До</label>
        <br>
        <input data-name="to" class="slider__to slider__number" type="number" value=${
  this.sliderModel.toValue === NULL_VALUE
    ? this.sliderModel.maxValue
    : this.sliderModel.toValue
} id="to" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
        <br>
        <input data-name="step" class="slider__step slider__number" type="number" value=${
  this.sliderModel.stepValue
} id="step">
      </div>
      <div class="slider__input">
        <input data-name="view" class="slider__view" type="radio" name="view${
  this.sliderModel.mainName
}" value="horizontal" id="horizontal${this.sliderModel.mainName}" ${
  this.sliderModel.viewValue === View.HORIZONTAL ? 'checked' : ''
}>
        <label for="horizontal${
  this.sliderModel.mainName
}">Горизонтальный</label>
        <input data-name="view" class="slider__view" type="radio" name="view${
  this.sliderModel.mainName
}" value="vertical" id="vertical${this.sliderModel.mainName}" ${
  this.sliderModel.viewValue === View.VERTICAL ? 'checked' : ''
}>
        <label for="vertical${this.sliderModel.mainName}">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input data-name="range" class="slider__range" type="radio" name="range${
  this.sliderModel.mainName
}" value="one" id="one${this.sliderModel.mainName}" ${
  this.sliderModel.rangeValue === Range.ONE ? 'checked' : ''
}>
        <label for="one${this.sliderModel.mainName}">Одиночное значение</label>
        <input data-name="range" class="slider__range" type="radio" name="range${
  this.sliderModel.mainName
}" value="range" id="range${this.sliderModel.mainName}" ${
  this.sliderModel.rangeValue === Range.RANGE ? 'checked' : ''
}>
        <label for="range${this.sliderModel.mainName}">Интервал</label>
      </div>
      <div class="slider__input">
        <input data-name="flag" class="slider__flag-checkbox" type="checkbox" id="flag${
  this.sliderModel.mainName
}" ${this.sliderModel.flagValue ? 'checked' : ''}>
        <label for="flag${this.sliderModel.mainName}">Значение</label>
      </div>
      <div class="slider__input">
        <input data-name="scale" class="slider__scale-checkbox" type="checkbox" id="scale${
  this.sliderModel.mainName
}" ${this.sliderModel.scaleValue ? 'checked' : ''}>
        <label for="scale${this.sliderModel.mainName}">Шкала</label>
      </div>
    `;
  }

  bind() {
    this.element
      .querySelectorAll('input')
      .forEach((elem) => elem.addEventListener('change', this.handleInputChange.bind(this)));
  }

  public handleInputChange(evt: Event): void {
    const input: HTMLElement = <HTMLElement>evt.currentTarget;
    const updateStepValue = () => {
      const min: number = this.sliderModel.minValue;
      const max: number = this.sliderModel.maxValue;
      const generalValue = max - min;
      let value: number = Number(
        (<HTMLInputElement>(
          input.parentElement!.parentElement!.querySelector('.slider__step')
        )).value,
      );
      if (value === 0) value = 1;
      if (value < 0) value = Math.abs(value);
      if (value > generalValue) value = generalValue;
      this.sliderModel.broadcast(['stepValue'], [value]);
    };
    const updateMinValue = () => {
      const min: number = Number(
        (<HTMLInputElement>(
          input.parentElement!.parentElement!.querySelector('.slider__min')
        )).value,
      );
      const max: number = this.sliderModel.maxValue;
      if (min >= max) {
        this.sliderModel.broadcast(
          ['minValue', 'fromValue', 'fromPercentValue'],
          [max - 1, max - 1, 0],
        );
      } else {
        this.sliderModel.broadcast(
          ['minValue', 'fromValue', 'fromPercentValue'],
          [min, min, 0],
        );
      }
    };
    const updateMaxValue = () => {
      const min: number = this.sliderModel.minValue;
      const max: number = Number(
        (<HTMLInputElement>(
          input.parentElement!.parentElement!.querySelector('.slider__max')
        )).value,
      );
      if (min >= max) {
        this.sliderModel.broadcast(
          ['maxValue', 'toValue', 'toPercentValue'],
          [min + 1, min + 1, 100],
        );
      } else {
        this.sliderModel.broadcast(
          ['maxValue', 'toValue', 'toPercentValue'],
          [max, max, 100],
        );
      }
    };
    const inputMin = input.dataset.name === State.MIN;
    const inputMax = input.dataset.name === State.MAX;
    const inputStep = input.dataset.name === State.STEP;
    const generalInput = inputMin || inputMax || inputStep;

    if (generalInput) {
      updateMinValue();
      updateMaxValue();
      updateStepValue();
    }

    if (
      input.dataset.name === State.VIEW
      || input.dataset.name === State.RANGE
    ) {
      this.sliderModel.broadcast(
        [input.dataset.name],
        [(<HTMLInputElement>input).value],
      );
    }

    if (
      input.dataset.name === State.FLAG
      || input.dataset.name === State.SCALE
    ) {
      this.sliderModel.broadcast(
        [input.dataset.name],
        [(<HTMLInputElement>input).checked],
      );
    }
  }
}
