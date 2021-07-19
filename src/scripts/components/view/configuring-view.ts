import AbstractView from './abstract-view';
import { NULL_VALUE, View, Range } from '../../const';

export default class ConfiguringView extends AbstractView {
  get className() {
    return 'slider__inputs';
  }

  get template() {
    const {
      range, from, min, max, to, step, view, flag, scale, progress,
    } = this.model.state;
    let fromTemplate = '';
    let toTemplate = 'Текущее значение';

    if (range === Range.RANGE) {
      fromTemplate = `
        <div class="slider__input">
          <label class="slider__label" for="from">От</label>
          <br>
          <input data-name="from" class="slider__from slider__number" type="number" value=${
  from === NULL_VALUE ? min : from
} id="from" readonly>
        </div>
      `;
      toTemplate = 'До';
    }

    return `
      <div class="slider__input">
        <label class="slider__label" for="min">Минимальное значение</label>
        <br>
        <input data-name="min" class="slider__min slider__number" type="number" value=${min} id="min">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max">Максимальное значение</label>
        <br>
        <input data-name="max" class="slider__max slider__number" type="number" value=${max} id="max">
      </div>
      ${fromTemplate}
      <div class="slider__input">
        <label class="slider__label" for="to">${toTemplate}</label>
        <br>
        <input data-name="to" class="slider__to slider__number" type="number" value=${
  to === NULL_VALUE ? max : to
} id="to" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step">Шаг</label>
        <br>
        <input data-name="step" class="slider__step slider__number" type="number" value=${step} id="step">
      </div>
      <div class="slider__input">
        <input data-name="view" class="slider__view" type="radio" name="view${this.model.getMainName()}" value="horizontal" id="horizontal${this.model.getMainName()}" ${
  view === View.HORIZONTAL ? 'checked' : ''
}>
        <label for="horizontal${this.model.getMainName()}">Горизонтальный</label>
        <input data-name="view" class="slider__view" type="radio" name="view${this.model.getMainName()}" value="vertical" id="vertical${this.model.getMainName()}" ${
  view === View.VERTICAL ? 'checked' : ''
}>
        <label for="vertical${this.model.getMainName()}">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input data-name="range" class="slider__range" type="radio" name="range${this.model.getMainName()}" value="one" id="one${this.model.getMainName()}" ${
  range === Range.ONE ? 'checked' : ''
}>
        <label for="one${this.model.getMainName()}">Одиночное значение</label>
        <input data-name="range" class="slider__range" type="radio" name="range${this.model.getMainName()}" value="range" id="range${this.model.getMainName()}" ${
  range === Range.RANGE ? 'checked' : ''
}>
        <label for="range${this.model.getMainName()}">Интервал</label>
      </div>
      <div class="slider__input">
        <input data-name="flag" class="slider__flag-checkbox" type="checkbox" id="flag${this.model.getMainName()}" ${
  flag ? 'checked' : ''
}>
        <label for="flag${this.model.getMainName()}">Значение</label>
      </div>
      <div class="slider__input">
        <input data-name="scale" class="slider__scale-checkbox" type="checkbox" id="scale${this.model.getMainName()}" ${
  scale ? 'checked' : ''
}>
        <label for="scale${this.model.getMainName()}">Шкала</label>
      </div>
      <div class="slider__input">
        <input data-name="progress" class="slider__progress-checkbox" type="checkbox" id="progress${this.model.getMainName()}" ${
  progress ? 'checked' : ''
}>
        <label for="progress${this.model.getMainName()}">Прогресс</label>
      </div>
    `;
  }

  bind() {
    this.element
      .querySelectorAll('input')
      .forEach((elem) => elem.addEventListener('change', this.handleInputChange));
  }

  public handleInputChange(evt: Event): void {}
}
