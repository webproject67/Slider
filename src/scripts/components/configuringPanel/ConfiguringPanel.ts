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
        dataset: PanelHandler.HANDLEINPUTMINCHANGE,
        type: 'number',
      },
      {
        label: 'Максимальное значение',
        dataset: PanelHandler.HANDLEINPUTMAXCHANGE,
        type: 'number',
      },
      {
        label: 'От',
        dataset: PanelHandler.HANDLEINPUTFROMCHANGE,
        type: 'number',
      },
      {
        label: 'До',
        dataset: PanelHandler.HANDLEINPUTTOCHANGE,
        type: 'number',
      },
      {
        label: 'Шаг',
        dataset: PanelHandler.HANDLEINPUTSTEPCHANGE,
        type: 'number',
      },
      {
        label: 'Вертикальный',
        dataset: PanelHandler.HANDLEINPUTVIEWCHANGE,
        type: 'checkbox',
      },
      {
        label: 'Интервал',
        dataset: PanelHandler.HANDLEINPUTRANGECHANGE,
        type: 'checkbox',
      },
      {
        label: 'Значение',
        dataset: PanelHandler.HANDLEINPUTFLAGCHANGE,
        type: 'checkbox',
      },
      {
        label: 'Шкала',
        dataset: PanelHandler.HANDLEINPUTSCALECHANGE,
        type: 'checkbox',
      },
      {
        label: 'Прогресс',
        dataset: PanelHandler.HANDLEINPUTPROGRESSCHANGE,
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
      if (this.input[i].dataset.name === PanelHandler.HANDLEINPUTMINCHANGE)
        this.input[i].value = String(min);
      if (this.input[i].dataset.name === PanelHandler.HANDLEINPUTMAXCHANGE)
        this.input[i].value = String(max);
      if (this.input[i].dataset.name === PanelHandler.HANDLEINPUTSTEPCHANGE)
        this.input[i].value = String(step);
      if (this.input[i].dataset.name === PanelHandler.HANDLEINPUTFROMCHANGE) {
        this.label[i].style.display = range ? '' : 'none';
        this.input[i].value = String(from);
      }

      if (this.input[i].dataset.name === PanelHandler.HANDLEINPUTTOCHANGE) {
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

    const inputMin = data.dataset === PanelHandler.HANDLEINPUTMINCHANGE;
    const inputMax = data.dataset === PanelHandler.HANDLEINPUTMAXCHANGE;
    const inputFrom = data.dataset === PanelHandler.HANDLEINPUTFROMCHANGE;
    const inputTo = data.dataset === PanelHandler.HANDLEINPUTTOCHANGE;
    const inputStep = data.dataset === PanelHandler.HANDLEINPUTSTEPCHANGE;
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

    if (data.dataset === PanelHandler.HANDLEINPUTVIEWCHANGE)
      inputElement.checked = view;
    if (data.dataset === PanelHandler.HANDLEINPUTRANGECHANGE)
      inputElement.checked = range;
    if (data.dataset === PanelHandler.HANDLEINPUTFLAGCHANGE)
      inputElement.checked = flag;
    if (data.dataset === PanelHandler.HANDLEINPUTSCALECHANGE)
      inputElement.checked = scale;
    if (data.dataset === PanelHandler.HANDLEINPUTPROGRESSCHANGE)
      inputElement.checked = progress;

    return inputElement;
  }

  private handleInputChange(evt: Event): void {
    const input = <HTMLInputElement>evt.currentTarget;

    switch (input.dataset.name) {
      case PanelHandler.HANDLEINPUTMINCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTMINCHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLEINPUTMAXCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTMAXCHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLEINPUTFROMCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTFROMCHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLEINPUTTOCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTTOCHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLEINPUTSTEPCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTSTEPCHANGE,
          value: Number(input.value),
        });
        break;
      case PanelHandler.HANDLEINPUTVIEWCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTVIEWCHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLEINPUTRANGECHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTRANGECHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLEINPUTFLAGCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTFLAGCHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLEINPUTPROGRESSCHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTPROGRESSCHANGE,
          value: input.checked,
        });
        break;
      case PanelHandler.HANDLEINPUTSCALECHANGE:
        this.broadcast({
          type: PanelHandler.HANDLEINPUTSCALECHANGE,
          value: input.checked,
        });
        break;
      default:
        throw new Error('invalid type');
    }
  }
}
