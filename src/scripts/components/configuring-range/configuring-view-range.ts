import AbstractView from '../abstract-view';

export default class ConfiguringViewRange extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    return `
      <div data-testid="configuringRange" class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <input class="slider__min slider__number" type="number" value=${this.sliderModel.minValue} id="min" data-name="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <input class="slider__max slider__number" type="number" value=${this.sliderModel.maxValue} id="max" data-name="max">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="from">От</label>
        <input class="slider__from slider__number" type="number" value=${this.sliderModel.fromValue === -10000 ? this.sliderModel.minValue : this.sliderModel.fromValue} id="from" data-name="from" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="to">До</label>
        <input class="slider__to slider__number" type="number" value=${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue} id="to" data-name="to" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
        <input class="slider__step slider__number" type="number" value=${this.sliderModel.stepValue} id="step" data-name="step">
      </div>
      <div class="slider__input">
        <input class="slider__view" type="radio" name="view${this.sliderModel.main}" value="horizontal" id="horizontal${this.sliderModel.main}" ${this.sliderModel.viewValue === 'horizontal' ? 'checked' : ''} data-name="view">
        <label for="horizontal${this.sliderModel.main}">Горизонтальный</label>
        <input class="slider__view" type="radio" name="view${this.sliderModel.main}" value="vertical" id="vertical${this.sliderModel.main}" ${this.sliderModel.viewValue === 'vertical' ? 'checked' : ''} data-name="view">
        <label for="vertical${this.sliderModel.main}">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input class="slider__range" type="radio" name="range${this.sliderModel.main}" value="one" id="one${this.sliderModel.main}" ${this.sliderModel.rangeValue === 'one' ? 'checked' : ''} data-name="range">
        <label for="one${this.sliderModel.main}">Одиночное значение</label>
        <input class="slider__range" type="radio" name="range${this.sliderModel.main}" value="range" id="range${this.sliderModel.main}" ${this.sliderModel.rangeValue === 'range' ? 'checked' : ''} data-name="range">
        <label for="range${this.sliderModel.main}">Интервал</label>
      </div>
      <div class="slider__input">
        <input class="slider__flag-checkbox" type="checkbox" id="flag${this.sliderModel.main}" ${this.sliderModel.flagValue ? 'checked' : ''} data-name="flag">
        <label for="flag${this.sliderModel.main}">Значение</label>
      </div>
      <div class="slider__input">
        <input class="slider__scale-checkbox" type="checkbox" id="scale${this.sliderModel.main}" ${this.sliderModel.scaleValue ? 'checked' : ''} data-name="scale">
        <label for="scale${this.sliderModel.main}">Шкала</label>
      </div>
    `
  }
  
  bind() {
    this.element.addEventListener('change', (evt: Event):void => this.inputChange(evt))
  }

  public inputChange(evt: Event):void {
    
  }
}