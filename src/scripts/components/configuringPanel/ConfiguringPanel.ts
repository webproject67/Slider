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
        dataset: PanelHandler.HANDLE_INPUT_MIN_CHANGE,
        type: 'number',
      },
      {
        label: 'Максимальное значение',
        dataset: PanelHandler.HANDLE_INPUT_MAX_CHANGE,
        type: 'number',
      },
      {
        label: 'От',
        dataset: PanelHandler.HANDLE_INPUT_FROM_CHANGE,
        type: 'number',
      },
      {
        label: 'До',
        dataset: PanelHandler.HANDLE_INPUT_TO_CHANGE,
        type: 'number',
      },
      {
        label: 'Шаг',
        dataset: PanelHandler.HANDLE_INPUT_STEP_CHANGE,
        type: 'number',
      },
      {
        label: 'Вертикальный',
        dataset: PanelHandler.HANDLE_INPUT_VIEW_CHANGE,
        type: 'checkbox',
      },
      {
        label: 'Интервал',
        dataset: PanelHandler.HANDLE_INPUT_RANGE_CHANGE,
        type: 'checkbox',
      },
      {
        label: 'Значение',
        dataset: PanelHandler.HANDLE_INPUT_FLAG_CHANGE,
        type: 'checkbox',
      },
      {
        label: 'Шкала',
        dataset: PanelHandler.HANDLE_INPUT_SCALE_CHANGE,
        type: 'checkbox',
      },
      {
        label: 'Прогресс',
        dataset: PanelHandler.HANDLE_INPUT_PROGRESS_CHANGE,
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
      if (this.input[i].dataset.name === PanelHandler.HANDLE_INPUT_MIN_CHANGE)
        this.input[i].value = String(min);
      if (this.input[i].dataset.name === PanelHandler.HANDLE_INPUT_MAX_CHANGE)
        this.input[i].value = String(max);
      if (this.input[i].dataset.name === PanelHandler.HANDLE_INPUT_STEP_CHANGE)
        this.input[i].value = String(step);
      if (
        this.input[i].dataset.name === PanelHandler.HANDLE_INPUT_FROM_CHANGE
      ) {
        this.label[i].style.display = range ? '' : 'none';
        this.input[i].value = String(from);
      }

      if (this.input[i].dataset.name === PanelHandler.HANDLE_INPUT_TO_CHANGE) {
        this.label[i].textContent = range ? 'До' : 'Текущее значение';
        this.input[i] = this.createElementInput(this.data[3]);
        this.input[i].value = String(to);
        this.input[i].addEventListener(
          'change',
          this.handleInputChange.bind(this)
        );
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

    const inputMin = data.dataset === PanelHandler.HANDLE_INPUT_MIN_CHANGE;
    const inputMax = data.dataset === PanelHandler.HANDLE_INPUT_MAX_CHANGE;
    const inputFrom = data.dataset === PanelHandler.HANDLE_INPUT_FROM_CHANGE;
    const inputTo = data.dataset === PanelHandler.HANDLE_INPUT_TO_CHANGE;
    const inputStep = data.dataset === PanelHandler.HANDLE_INPUT_STEP_CHANGE;
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

    if (data.dataset === PanelHandler.HANDLE_INPUT_VIEW_CHANGE)
      inputElement.checked = view;
    if (data.dataset === PanelHandler.HANDLE_INPUT_RANGE_CHANGE)
      inputElement.checked = range;
    if (data.dataset === PanelHandler.HANDLE_INPUT_FLAG_CHANGE)
      inputElement.checked = flag;
    if (data.dataset === PanelHandler.HANDLE_INPUT_SCALE_CHANGE)
      inputElement.checked = scale;
    if (data.dataset === PanelHandler.HANDLE_INPUT_PROGRESS_CHANGE)
      inputElement.checked = progress;

    return inputElement;
  }

  private handleInputChange(evt: Event): void {
    const input = <HTMLInputElement>evt.currentTarget;

    switch (input.dataset.name) {
      case PanelHandler.HANDLE_INPUT_MIN_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_MIN_CHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLE_INPUT_MAX_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_MAX_CHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLE_INPUT_FROM_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_FROM_CHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLE_INPUT_TO_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_TO_CHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLE_INPUT_STEP_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_STEP_CHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLE_INPUT_VIEW_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_VIEW_CHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLE_INPUT_RANGE_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_RANGE_CHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLE_INPUT_FLAG_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_FLAG_CHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLE_INPUT_PROGRESS_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_PROGRESS_CHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLE_INPUT_SCALE_CHANGE:
        this.broadcast({
          type: PanelHandler.HANDLE_INPUT_SCALE_CHANGE,
          value: input.checked,
        });
        break;
      default:
        throw new Error('invalid type');
    }
  }
}
