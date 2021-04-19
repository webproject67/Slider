import {createElement} from '../../scripts/utils';

export default class ConfiguringView {
  get element(): HTMLElement {
    return createElement(this.template)
  }

  get template(): string {
    return `
      <form class="slider__form">
        <div class="slider__input">
          <label class="slider__label" for="min">Минимальное значение </label>
          <input class="slider__min" type="number" value="0" id="min">
        </div>
        <div class="slider__input">
          <label class="slider__label" for="max">Максимальное значение </label>
          <input class="slider__max" type="number" value="100" id="max">
        </div>
        <div class="slider__input">
          <label class="slider__label" for="current">Текущее значение </label>
          <input class="slider__current" type="number" value="0" id="current">
        </div>
        <div class="slider__input">
          <label class="slider__label" for="step">Шаг</label>
          <input class="slider__step" type="number" value="1" id="step">
        </div>
        <div class="slider__input">
          <input type="radio" name="view" id="horizontal" checked>
          <label for="horizontal"> Горизонтальный</label>
          <input type="radio" name="view" id="vertical">
          <label for="vertical"> Вертикальный</label>
        </div>
        <div class="slider__input">
          <input type="radio" name="range" id="one" checked>
          <label for="one"> Одиночное значение</label>
          <input type="radio" name="range" id="two">
          <label for="two"> Интервал</label>
        </div>
        <div class="slider__input">
          <input type="checkbox" id="value" checked>
          <label for="value"> Значение</label>
        </div>
        <div class="slider__input">
          <input type="checkbox" id="scale" checked>
          <label for="scale"> Шкала</label>
        </div>
      </form>
    `
  }
}