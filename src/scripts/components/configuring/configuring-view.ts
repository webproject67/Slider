import AbstractView from '../abstract-view';

export default class ConfiguringView extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    return `
      <div class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <input class="slider__min" type="number" value=${this.sliderModel.minValue} id="min" data-name="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <input class="slider__max" type="number" value=${this.sliderModel.maxValue} id="max" data-name="max">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="current">Текущее значение</label>
        <input class="slider__current" type="number" value=${this.sliderModel.currentValue} id="current" data-name="current">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
        <input class="slider__step" type="number" value=${this.sliderModel.stepValue} id="step" data-name="step" min="1">
      </div>
      <div class="slider__input">
        <input class="slider__view" type="radio" name="view" value="horizontal" id="horizontal" data-name="view" ${this.sliderModel.viewValue === 'horizontal' ? 'checked' : ''}>
        <label for="horizontal">Горизонтальный</label>
        <input class="slider__view" type="radio" name="view" value="vertical" id="vertical" data-name="view" ${this.sliderModel.viewValue === 'vertical' ? 'checked' : ''}>
        <label for="vertical">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input class="slider__range" type="radio" name="range" value="one" id="one" data-name="range" ${this.sliderModel.rangeValue === 'one' ? 'checked' : ''}>
        <label for="one">Одиночное значение</label>
        <input class="slider__range" type="radio" name="range" value="two" id="two" data-name="range" ${this.sliderModel.rangeValue === 'two' ? 'checked' : ''}>
        <label for="two">Интервал</label>
      </div>
      <div class="slider__input">
        <input class="slider__value-checkbox" type="checkbox" id="value" data-name="value" ${this.sliderModel.valueValue ? 'checked' : ''}>
        <label for="value">Значение</label>
      </div>
      <div class="slider__input">
        <input class="slider__scale-checkbox" type="checkbox" id="scale" data-name="scale" ${this.sliderModel.scaleValue ? 'checked' : ''}>
        <label for="scale">Шкала</label>
      </div>
    `
  }

  bind() {
    $(this.element).on('change', (evt) => this.onInputChange(evt.target))
  }

  public onInputChange(element: HTMLElement): void {

  }
}