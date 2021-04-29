import AbstractView from '../abstract-view';

export default class ConfiguringViewOne extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    return `
      <div class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <input class="slider__min slider__number" type="number" value=${this.sliderModel.minValue} id="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <input class="slider__max slider__number" type="number" value=${this.sliderModel.maxValue} id="max">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="to">Текущее значение</label>
        <input class="slider__to slider__number" type="number" value=${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue} min=${this.sliderModel.minValue} max=${this.sliderModel.maxValue} id="to">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
        <input class="slider__step slider__number" type="number" value=${this.sliderModel.stepValue} min="1" max=${this.sliderModel.maxValue} id="step">
      </div>
      <div class="slider__input">
        <input class="slider__view" type="radio" name="view" value="horizontal" id="horizontal" ${this.sliderModel.viewValue === 'horizontal' ? 'checked' : ''}>
        <label for="horizontal">Горизонтальный</label>
        <input class="slider__view" type="radio" name="view" value="vertical" id="vertical" ${this.sliderModel.viewValue === 'vertical' ? 'checked' : ''}>
        <label for="vertical">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input class="slider__range" type="radio" name="range" value="one" id="one" ${this.sliderModel.rangeValue === 'one' ? 'checked' : ''}>
        <label for="one">Одиночное значение</label>
        <input class="slider__range" type="radio" name="range" value="range" id="range" ${this.sliderModel.rangeValue === 'range' ? 'checked' : ''}>
        <label for="range">Интервал</label>
      </div>
      <div class="slider__input">
        <input class="slider__flag-checkbox" type="checkbox" id="flag" ${this.sliderModel.flagValue ? 'checked' : ''}>
        <label for="flag">Значение</label>
      </div>
      <div class="slider__input">
        <input class="slider__scale-checkbox" type="checkbox" id="scale" ${this.sliderModel.scaleValue ? 'checked' : ''}>
        <label for="scale">Шкала</label>
      </div>
    `
  }
}