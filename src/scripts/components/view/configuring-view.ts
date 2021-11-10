import AbstractView from './Abstract-view';
import { NULL_VALUE, HORIZONTAL, VERTICAL, ONE, RANGE } from '../../const';
import StateType from '../../StateType';

export default class ConfiguringView extends AbstractView {
  viewID: number;

  rangeID: number;

  constructor() {
    super();
    this.viewID = this.getRandomNumber();
    this.rangeID = this.getRandomNumber();
  }

  getClassName() {
    return 'slider__labels';
  }

  getTemplate(state: StateType) {
    const { range, from, min, max, to, step, view, flag, scale, progress } =
      state;
    let fromTemplate = '';
    let toTemplate = 'Текущее значение';

    if (range === RANGE) {
      fromTemplate = `
        <label class="slider__label slider__label_state_displayed">От
          <input data-name="from" class="slider__from" type="number" value=${
            from === NULL_VALUE ? min : from
          } readonly>
        </label>
      `;
      toTemplate = 'До';
    }

    return `
      <label class="slider__label slider__label_state_displayed">Минимальное значение
        <input data-name="min" class="slider__min" type="number" value=${min}>
      </label>
      <label class="slider__label slider__label_state_displayed">Максимальное значение
        <input data-name="max" class="slider__max" type="number" value=${max}>
      </label>
      ${fromTemplate}
      <label class="slider__label slider__label_state_displayed">${toTemplate}
        <input data-name="to" class="slider__to" type="number" value=${
          to === NULL_VALUE ? max : to
        } readonly>
      </label>
      <label class="slider__label slider__label_state_displayed">Шаг
        <input data-name="step" class="slider__step" type="number" value=${step}>
      </label>
      <div class="slider__radio">
        <label class="slider__label">Горизонтальный
          <input data-name="view" class="slider__view" type="radio" name="view${
            this.viewID
          }" value="horizontal" ${view === HORIZONTAL ? 'checked' : ''}>
        </label>
        <label class="slider__label">Вертикальный
          <input data-name="view" class="slider__view" type="radio" name="view${
            this.viewID
          }" value="vertical" ${view === VERTICAL ? 'checked' : ''}>
        </label>
      </div>
      <div class="slider__radio">
        <label class="slider__label">Одиночное значение
          <input data-name="range" class="slider__range" type="radio" name="range${
            this.rangeID
          }" value="one" ${range === ONE ? 'checked' : ''}>
        </label>
        <label class="slider__label">Интервал
          <input data-name="range" class="slider__range" type="radio" name="range${
            this.rangeID
          }" value="range" ${range === RANGE ? 'checked' : ''}>
        </label>
      </div>
      <label class="slider__label">Значение
        <input data-name="flag" class="slider__flag-checkbox" type="checkbox" ${
          flag ? 'checked' : ''
        }>
      </label>
      <label class="slider__label">Шкала
        <input data-name="scale" class="slider__scale-checkbox" type="checkbox" ${
          scale ? 'checked' : ''
        }>
      </label>
      <label class="slider__label">Прогресс
        <input data-name="progress" class="slider__progress" type="checkbox" ${
          progress ? 'checked' : ''
        }>
      </label>
    `;
  }

  bind(state: StateType) {
    this.getElement(state)
      .querySelectorAll('input')
      .forEach((elem) =>
        elem.addEventListener(
          'change',
          this.handleInputChange.bind(null, state)
        )
      );
  }

  public handleInputChange(state: StateType, evt: Event): void {}
}
