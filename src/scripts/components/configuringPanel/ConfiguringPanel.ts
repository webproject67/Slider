import Observer from '../observer/Observer';
import { stateType, dataType } from '../../types';
import {
  NULL_VALUE,
  HORIZONTAL,
  VERTICAL,
  ONE,
  RANGE,
  FROM,
  MIN,
  MAX,
  TO,
  STEP,
  FLAG,
  SCALE,
  PROGRESS,
  VIEW,
} from '../../const';

export default class ConfiguringPanel extends Observer {
  private state: stateType;

  private element!: HTMLElement;

  private dataInput: dataType[];

  private dataRadio: dataType[][];

  private dataCheckbox: dataType[];

  constructor(state: stateType, main: HTMLElement) {
    super();
    this.dataInput = [
      {
        label: 'Минимальное значение',
        dataset: MIN,
        type: 'number',
      },
      {
        label: 'Максимальное значение',
        dataset: MAX,
        type: 'number',
      },
      {
        label: 'От',
        dataset: FROM,
        type: 'number',
        readonly: true,
      },
      {
        label: 'До',
        dataset: TO,
        type: 'number',
        readonly: true,
      },
      {
        label: 'Шаг',
        dataset: STEP,
        type: 'number',
      },
    ];

    this.dataRadio = [
      [
        {
          label: 'Горизонтальный',
          dataset: VIEW,
          type: 'radio',
          name: `${VIEW}${main.className}${main.id}`,
          value: HORIZONTAL,
        },
        {
          label: 'Вертикальный',
          dataset: VIEW,
          type: 'radio',
          name: `${VIEW}${main.className}${main.id}`,
          value: VERTICAL,
        },
      ],
      [
        {
          label: 'Одиночное значение',
          dataset: RANGE,
          type: 'radio',
          name: `${RANGE}${main.className}${main.id}`,
          value: ONE,
        },
        {
          label: 'Интервал',
          dataset: RANGE,
          type: 'radio',
          name: `${RANGE}${main.className}${main.id}`,
          value: RANGE,
        },
      ],
    ];

    this.dataCheckbox = [
      {
        label: 'Значение',
        dataset: FLAG,
        type: 'checkbox',
      },
      {
        label: 'Шкала',
        dataset: SCALE,
        type: 'checkbox',
      },
      {
        label: 'Прогресс',
        dataset: PROGRESS,
        type: 'checkbox',
      },
    ];

    this.state = state;
    this.createElements();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(): HTMLElement {
    const { range, from, to, min, max, step } = this.state;

    this.element.childNodes.forEach((element) => {
      const label = <HTMLElement>element;
      const input = <HTMLInputElement>(<HTMLElement>label).children[0];

      if (input.className === 'slider__min') input.value = String(min);
      if (input.className === 'slider__max') input.value = String(max);
      if (input.className === 'slider__step') input.value = String(step);
      if (input.className === 'slider__from') {
        label.style.display = range === RANGE ? '' : 'none';
        input.value = String(from === NULL_VALUE ? min : from);
      }

      if (input.className === 'slider__to') {
        label.textContent = range === RANGE ? 'До' : 'Текущее значение';
        const inputElement = <HTMLInputElement>(
          this.createElementInput(this.dataInput[3])
        );
        inputElement.value = String(to === NULL_VALUE ? max : to);
        label.appendChild(inputElement);
      }
    });

    return this.element;
  }

  private createElements(): void {
    this.element = this.createElement('div', 'slider__labels');

    this.dataInput.forEach((data) => {
      const label = this.createElementLabel(data);
      this.element.appendChild(label);
    });

    this.dataRadio.forEach((radio) => {
      const radioElement = this.createElement('div', 'slider__radio');

      radio.forEach((data) => {
        const label = this.createElementLabel(data);
        radioElement.appendChild(label);
      });

      this.element.appendChild(radioElement);
    });

    this.dataCheckbox.forEach((data) => {
      const label = this.createElementLabel(data);
      this.element.appendChild(label);
    });

    this.updateElement();
    this.bind();
  }

  private createElement(tag: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement(tag);
    newElement.className = className;
    return newElement;
  }

  private createElementLabel(data: dataType): HTMLElement {
    const { range } = this.state;
    const labelElement = this.createElement('label', 'slider__label');
    labelElement.textContent = data.label;

    const inputMin = data.dataset === MIN;
    const inputMax = data.dataset === MAX;
    const inputFrom = data.dataset === FROM;
    const inputTo = data.dataset === TO;
    const inputStep = data.dataset === STEP;
    const inputFromRus = data.label === 'От';
    const rangeBool = range === ONE;
    const generalInput =
      inputMin || inputMax || inputFrom || inputTo || inputStep;

    if (generalInput)
      labelElement.classList.add('slider__label_state_displayed');
    if (inputFromRus && rangeBool) labelElement.style.display = 'none';

    const inputElement = this.createElementInput(data);
    labelElement.appendChild(inputElement);

    return labelElement;
  }

  private createElementInput(data: dataType): HTMLElement {
    const { range, view, flag, scale, progress } = this.state;
    const inputElement = <HTMLInputElement>(
      this.createElement('input', `slider__${data.dataset}`)
    );
    inputElement.dataset.name = data.dataset;
    inputElement.type = data.type;

    if (data.readonly) inputElement.readOnly = data.readonly;
    if (data.dataset === FLAG) inputElement.checked = flag;
    if (data.dataset === SCALE) inputElement.checked = scale;
    if (data.dataset === PROGRESS) inputElement.checked = progress;
    if (data.dataset === VIEW || data.dataset === RANGE) {
      inputElement.value = String(data.value);
      inputElement.name = String(data.name);

      const valueVHorizontal = data.value === HORIZONTAL;
      const valueVVertical = data.value === VERTICAL;
      const valueROne = data.value === ONE;
      const valueRRange = data.value === RANGE;
      const stateVHorizontal = view === HORIZONTAL;
      const stateVVertical = view === VERTICAL;
      const stateROne = range === ONE;
      const stateRRange = range === RANGE;
      const horizontalBool = valueVHorizontal && stateVHorizontal;
      const verticalBool = valueVVertical && stateVVertical;
      const oneBool = valueROne && stateROne;
      const rangeBool = valueRRange && stateRRange;
      const generalInput3 =
        horizontalBool || verticalBool || oneBool || rangeBool;

      if (generalInput3) inputElement.checked = true;
    }

    return inputElement;
  }

  private bind() {
    for (let i = 0; i < this.element.children.length; i += 1) {
      const element = this.element.children[i];
      if (element.className === 'slider__radio') {
        element.childNodes.forEach((elem) =>
          elem.addEventListener('change', this.handleInputChange.bind(this))
        );
        continue;
      }
      element.addEventListener('change', this.handleInputChange.bind(this));
    }
  }

  private handleInputChange(evt: Event) {
    const { min, max } = this.state;
    const label: HTMLElement = <HTMLElement>evt.currentTarget;
    const input: HTMLElement = <HTMLElement>label.children[0];
    let value = Number((<HTMLInputElement>input).value);

    const inputFlag = input.dataset.name === FLAG;
    const inputScale = input.dataset.name === SCALE;
    const inputProgress = input.dataset.name === PROGRESS;
    const generalInput2 = inputFlag || inputScale || inputProgress;
    if (input.dataset.name === MIN) {
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

    if (input.dataset.name === MAX) {
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

    if (input.dataset.name === STEP) {
      const generalValue = max - min;
      if (value === 0) value = 1;
      if (value < 0) value = Math.abs(value);
      if (value > generalValue) value = generalValue;
      this.broadcast(['step'], [value]);
    }

    if (input.dataset.name === VIEW)
      this.broadcast([input.dataset.name], [(<HTMLInputElement>input).value]);

    if (input.dataset.name === RANGE)
      this.broadcast(
        ['from', 'fromPercent', input.dataset.name],
        [this.state.min, 0, (<HTMLInputElement>input).value]
      );

    if (generalInput2)
      this.broadcast(
        [input.dataset.name!],
        [(<HTMLInputElement>input).checked]
      );
  }
}
