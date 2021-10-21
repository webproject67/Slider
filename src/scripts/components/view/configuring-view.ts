import AbstractView from './abstract-view';
import { NULL_VALUE, HORIZONTAL, VERTICAL, ONE, RANGE } from '../../const';
import { ModelType, StateType } from '../../types';

export default class ConfiguringView extends AbstractView {
  getClassName() {
    return 'slider__inputs';
  }

  getTemplate(state: StateType) {
    const {
      range,
      from,
      min,
      max,
      to,
      step,
      view,
      flag,
      scale,
      progress,
      mainName,
    } = state;
    let fromTemplate = '';
    let toTemplate = 'Текущее значение';

    if (range === RANGE) {
      fromTemplate = `
        <div class="slider__input">
          <label class="slider__label" for="from${mainName}">От</label>
          <br>
          <input data-name="from" class="slider__from slider__number" type="number" value=${
            from === NULL_VALUE ? min : from
          } id="from${mainName}" readonly>
        </div>
      `;
      toTemplate = 'До';
    }

    return `
      <div class="slider__input">
        <label class="slider__label" for="min${mainName}">Минимальное значение</label>
        <br>
        <input data-name="min" class="slider__min slider__number" type="number" value=${min} id="min${mainName}">
      </div>
      <div class="slider__input">
        <label class="slider__label" for="max${mainName}">Максимальное значение</label>
        <br>
        <input data-name="max" class="slider__max slider__number" type="number" value=${max} id="max${mainName}">
      </div>
      ${fromTemplate}
      <div class="slider__input">
        <label class="slider__label" for="to${mainName}">${toTemplate}</label>
        <br>
        <input data-name="to" class="slider__to slider__number" type="number" value=${
          to === NULL_VALUE ? max : to
        } id="to${mainName}" readonly>
      </div>
      <div class="slider__input">
        <label class="slider__label" for="step${mainName}">Шаг</label>
        <br>
        <input data-name="step" class="slider__step slider__number" type="number" value=${step} id="step${mainName}">
      </div>
      <div class="slider__input">
        <input data-name="view" class="slider__view" type="radio" name="view${mainName}" value="horizontal" id="horizontal${mainName}" ${
      view === HORIZONTAL ? 'checked' : ''
    }>
        <label class="slider__label" for="horizontal${mainName}">Горизонтальный</label>
        <input data-name="view" class="slider__view" type="radio" name="view${mainName}" value="vertical" id="vertical${mainName}" ${
      view === VERTICAL ? 'checked' : ''
    }>
        <label class="slider__label" for="vertical${mainName}">Вертикальный</label>
      </div>
      <div class="slider__input">
        <input data-name="range" class="slider__range" type="radio" name="range${mainName}" value="one" id="one${mainName}" ${
      range === ONE ? 'checked' : ''
    }>
        <label class="slider__label" for="one${mainName}">Одиночное значение</label>
        <input data-name="range" class="slider__range" type="radio" name="range${mainName}" value="range" id="range${mainName}" ${
      range === RANGE ? 'checked' : ''
    }>
        <label class="slider__label" for="range${mainName}">Интервал</label>
      </div>
      <div class="slider__input">
        <input data-name="flag" class="slider__flag-checkbox" type="checkbox" id="flag${mainName}" ${
      flag ? 'checked' : ''
    }>
        <label class="slider__label" for="flag${mainName}">Значение</label>
      </div>
      <div class="slider__input">
        <input data-name="scale" class="slider__scale-checkbox" type="checkbox" id="scale${mainName}" ${
      scale ? 'checked' : ''
    }>
        <label class="slider__label" for="scale${mainName}">Шкала</label>
      </div>
      <div class="slider__input">
        <input data-name="progress" class="slider__progress-checkbox" type="checkbox" id="progress${mainName}" ${
      progress ? 'checked' : ''
    }>
        <label class="slider__label" for="progress${mainName}">Прогресс</label>
      </div>
    `;
  }

  bind(model: ModelType) {
    this.getElement(model)
      .querySelectorAll('input')
      .forEach((elem) =>
        elem.addEventListener(
          'change',
          this.handleInputChange.bind(null, model)
        )
      );
  }

  public handleInputChange(model: ModelType, evt: Event): void {}
}
