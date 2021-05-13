import AbstractView from '../abstract-view';

export default class ConfiguringViewOne extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    return `
      <div data-testid="configuringOne" class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <input class="slider__min slider__number" type="number" value=${this.sliderModel.minValue} id="min" data-name="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <input class="slider__max slider__number" type="number" value=${this.sliderModel.maxValue} id="max" data-name="max">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="to">Текущее значение</label>
        <input class="slider__to slider__number" type="number" value=${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue} id="to" data-name="to" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
        <input class="slider__step slider__number" type="number" value=${this.sliderModel.stepValue} id="step" data-name="step">
      </div>
      <div class="slider__input">
        <input class="slider__view" type="radio" name="view${this.sliderModel.mainValue}" value="horizontal" id="horizontal${this.sliderModel.mainValue}" ${this.sliderModel.viewValue === 'horizontal' ? 'checked' : ''} data-name="view">
        <label for="horizontal${this.sliderModel.mainValue}">Горизонтальный</label>
        <input class="slider__view" type="radio" name="view${this.sliderModel.mainValue}" value="vertical" id="vertical${this.sliderModel.mainValue}" ${this.sliderModel.viewValue === 'vertical' ? 'checked' : ''} data-name="view">
        <label for="vertical${this.sliderModel.mainValue}">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input class="slider__range" type="radio" name="range${this.sliderModel.mainValue}" value="one" id="one${this.sliderModel.mainValue}" ${this.sliderModel.rangeValue === 'one' ? 'checked' : ''} data-name="range">
        <label for="one${this.sliderModel.mainValue}">Одиночное значение</label>
        <input class="slider__range" type="radio" name="range${this.sliderModel.mainValue}" value="range" id="range${this.sliderModel.mainValue}" ${this.sliderModel.rangeValue === 'range' ? 'checked' : ''} data-name="range">
        <label for="range${this.sliderModel.mainValue}">Интервал</label>
      </div>
      <div class="slider__input">
        <input class="slider__flag-checkbox" type="checkbox" id="flag${this.sliderModel.mainValue}" ${this.sliderModel.flagValue ? 'checked' : ''} data-name="flag">
        <label for="flag${this.sliderModel.mainValue}">Значение</label>
      </div>
      <div class="slider__input">
        <input class="slider__scale-checkbox" type="checkbox" id="scale${this.sliderModel.mainValue}" ${this.sliderModel.scaleValue ? 'checked' : ''} data-name="scale">
        <label for="scale${this.sliderModel.mainValue}">Шкала</label>
      </div>
    `
  }

  bind() {
    this.element.addEventListener('change', (evt: Event):void => this.inputChange(evt))
  }

  public inputChange(evt: Event):void {
    
  }
}