import Observer from '../observer/Observer';
import { stateType, dataType } from '../../types';

export default class ConfiguringPanel extends Observer {
  private data: dataType[];

  private element!: HTMLElement;

  private label: HTMLElement[];

  private input: HTMLInputElement[];

  constructor(state: stateType) {
    super();
    this.data = [
      {
        label: 'Минимальное значение',
        dataset: 'min',
        type: 'number',
      },
      {
        label: 'Максимальное значение',
        dataset: 'max',
        type: 'number',
      },
      {
        label: 'От',
        dataset: 'from',
        type: 'number',
        readonly: true,
      },
      {
        label: 'До',
        dataset: 'to',
        type: 'number',
        readonly: true,
      },
      {
        label: 'Шаг',
        dataset: 'step',
        type: 'number',
      },
      {
        label: 'Вертикальный',
        dataset: 'view',
        type: 'checkbox',
      },
      {
        label: 'Интервал',
        dataset: 'range',
        type: 'checkbox',
      },
      {
        label: 'Значение',
        dataset: 'flag',
        type: 'checkbox',
      },
      {
        label: 'Шкала',
        dataset: 'scale',
        type: 'checkbox',
      },
      {
        label: 'Прогресс',
        dataset: 'progress',
        type: 'checkbox',
      },
    ];

    this.label = [];
    this.input = [];
    this.createElements(state);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(state: stateType): HTMLElement {
    const { range, from, to, min, max, step } = state;

    this.data.forEach((element, i) => {
      if (this.input[i].dataset.name === 'min')
        this.input[i].value = String(min);
      if (this.input[i].dataset.name === 'max')
        this.input[i].value = String(max);
      if (this.input[i].dataset.name === 'step')
        this.input[i].value = String(step);
      if (this.input[i].dataset.name === 'from') {
        this.label[i].style.display = range ? '' : 'none';
        this.input[i].value = String(from);
      }

      if (this.input[i].dataset.name === 'to') {
        this.label[i].textContent = range ? 'До' : 'Текущее значение';
        this.input[i] = this.createElementInput(this.data[3], state);
        this.input[i].value = String(to);
        this.label[i].appendChild(this.input[i]);
      }
    });

    return this.element;
  }

  private createElements(state: stateType): void {
    this.element = this.createElement('div', 'slider__labels');

    this.data.forEach((data, i) => {
      this.label[i] = this.createElementLabel(data, i, state);
      this.label[i].addEventListener(
        'change',
        this.handleLabelChange.bind(this, state)
      );
      this.element.appendChild(this.label[i]);
    });

    this.updateElement(state);
  }

  private createElement(tag: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement(tag);
    newElement.className = className;
    return newElement;
  }

  private createElementLabel(
    data: dataType,
    index: number,
    state: stateType
  ): HTMLElement {
    const labelElement = this.createElement('label', 'slider__label');
    labelElement.textContent = data.label;

    const inputMin = data.dataset === 'min';
    const inputMax = data.dataset === 'max';
    const inputFrom = data.dataset === 'from';
    const inputTo = data.dataset === 'to';
    const inputStep = data.dataset === 'step';
    const generalInput =
      inputMin || inputMax || inputFrom || inputTo || inputStep;

    if (generalInput)
      labelElement.classList.add('slider__label_state_displayed');

    this.input[index] = this.createElementInput(data, state);
    labelElement.appendChild(this.input[index]);

    return labelElement;
  }

  private createElementInput(
    data: dataType,
    state: stateType
  ): HTMLInputElement {
    const { range, view, flag, scale, progress } = state;
    const inputElement = <HTMLInputElement>(
      this.createElement('input', `slider__${data.dataset}`)
    );
    inputElement.dataset.name = data.dataset;
    inputElement.type = data.type;

    if (data.readonly) inputElement.readOnly = data.readonly;
    if (data.dataset === 'view') inputElement.checked = view;
    if (data.dataset === 'range') inputElement.checked = range;
    if (data.dataset === 'flag') inputElement.checked = flag;
    if (data.dataset === 'scale') inputElement.checked = scale;
    if (data.dataset === 'progress') inputElement.checked = progress;

    return inputElement;
  }

  private handleLabelChange(state: stateType, evt: Event): void {
    const { min, max } = state;
    const label: HTMLElement = <HTMLElement>evt.currentTarget;
    const input = <HTMLInputElement>label.querySelector('input');
    const inputMin = input.dataset.name === 'min';
    const inputMax = input.dataset.name === 'max';
    const inputStep = input.dataset.name === 'step';
    const inputView = input.dataset.name === 'view';
    const inputRange = input.dataset.name === 'range';
    const inputFlag = input.dataset.name === 'flag';
    const inputScale = input.dataset.name === 'scale';
    const inputProgress = input.dataset.name === 'progress';
    const generalInput = inputView || inputFlag || inputScale || inputProgress;
    let value = Number(input.value);

    if (inputMin) {
      if (value >= max) {
        this.broadcast(
          ['min', 'from', 'fromPercent', 'to', 'toPercent', 'step'],
          [max - 1, max - 1, 0, max, 100, 1]
        );
      } else {
        this.broadcast(
          ['min', 'from', 'fromPercent', 'to', 'toPercent'],
          [value, value, 0, max, 100]
        );
      }
    }

    if (inputMax) {
      if (min >= value) {
        this.broadcast(
          ['max', 'to', 'toPercent', 'from', 'fromPercent', 'step'],
          [min + 1, min + 1, 100, min, 0, 1]
        );
      } else {
        this.broadcast(
          ['max', 'to', 'toPercent', 'from', 'fromPercent'],
          [value, value, 100, min, 0]
        );
      }
    }

    if (inputStep) {
      const generalValue = max - min;
      if (value === 0) value = 1;
      if (value < 0) value = Math.abs(value);
      if (value > generalValue) value = generalValue;
      this.broadcast(['step'], [value]);
    }

    if (inputRange)
      this.broadcast(
        ['from', 'fromPercent', input.dataset.name!],
        [min, 0, input.checked]
      );

    if (generalInput) this.broadcast([input.dataset.name!], [input.checked]);
  }
}
