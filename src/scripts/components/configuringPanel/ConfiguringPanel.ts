import Observer from '../observer/Observer';
import { IState, IData, PanelHandler, PanelTypes } from '../../types';

export default class ConfiguringPanel extends Observer<PanelTypes> {
  private state: IState;

  private data: IData[];

  private element!: HTMLElement;

  private label: HTMLElement[];

  private input: HTMLInputElement[];

  constructor(state: IState) {
    super();
    this.state = state;
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
    this.createElements();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(state: IState): HTMLElement {
    this.state = state;
    const { range, from, to, min, max, step } = this.state;

    this.data.forEach((elem, i) => {
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
        this.input[i] = this.createElementInput(this.data[3]);
        this.input[i].value = String(to);
        this.label[i].appendChild(this.input[i]);
      }
    });

    return this.element;
  }

  private createElements(): void {
    this.element = this.createElement('div', 'slider__labels');

    this.data.forEach((data, i) => {
      this.label[i] = this.createElementLabel(data, i);
      this.element.appendChild(this.label[i]);
    });

    this.updateElement(this.state);
  }

  private createElement(tag: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement(tag);
    newElement.className = className;
    return newElement;
  }

  private createElementLabel(data: IData, index: number): HTMLElement {
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

    this.input[index] = this.createElementInput(data);
    this.input[index].addEventListener(
      'change',
      this.handleInputChange.bind(this)
    );
    labelElement.appendChild(this.input[index]);

    return labelElement;
  }

  private createElementInput(data: IData): HTMLInputElement {
    const { range, view, flag, scale, progress } = this.state;
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

  private handleInputChange(evt: Event): void {
    const input = <HTMLInputElement>evt.currentTarget;

    switch (input.dataset.name) {
      case PanelHandler.MIN:
        this.broadcast({ type: PanelHandler.MIN, value: Number(input.value) });
        break;
      case PanelHandler.MAX:
        this.broadcast({ type: PanelHandler.MAX, value: Number(input.value) });
        break;
      case PanelHandler.STEP:
        this.broadcast({ type: PanelHandler.STEP, value: Number(input.value) });
        break;
      case PanelHandler.VIEW:
        this.broadcast({ type: PanelHandler.VIEW, value: input.checked });
        break;
      case PanelHandler.RANGE:
        this.broadcast({ type: PanelHandler.RANGE, value: input.checked });
        break;
      case PanelHandler.FLAG:
        this.broadcast({ type: PanelHandler.FLAG, value: input.checked });
        break;
      case PanelHandler.PROGRESS:
        this.broadcast({ type: PanelHandler.PROGRESS, value: input.checked });
        break;
      case PanelHandler.SCALE:
        this.broadcast({ type: PanelHandler.SCALE, value: input.checked });
        break;
      default:
        throw new Error('invalid type');
    }
  }
}
