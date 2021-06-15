import AbstractView from '../abstract-view';
import { NULL_VALUE, View, Range } from '../../const';

export default class ConfiguringViewOne extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    return `
      <div data-testid="configuring-one" class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <input data-name="min" class="slider__min slider__number" type="number" value=${
          this.sliderModel.minValue
        } id="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <input data-name="max" class="slider__max slider__number" type="number" value=${
          this.sliderModel.maxValue
        } id="max">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="to">Текущее значение</label>
        <input data-name="to" class="slider__to slider__number" type="number" value=${
          this.sliderModel.toValue === NULL_VALUE
            ? this.sliderModel.maxValue
            : this.sliderModel.toValue
        } id="to" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
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
      .forEach((elem) =>
        elem.addEventListener('change', this.handleInputChange)
      );
  }

  public handleInputChange(evt: Event): void {}
}
