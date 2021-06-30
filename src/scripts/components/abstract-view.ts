import SliderModel from './model/slider-model';

export default abstract class AbstractView {
  elem: HTMLElement | undefined;

  sliderModel: SliderModel;

  constructor(sliderModel: SliderModel) {
    this.sliderModel = sliderModel;
  }

  public get element(): HTMLElement {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this._render();
    this.bind();
    return this.elem;
  }

  public get newElement(): HTMLElement {
    this.elem = this._render();
    this.bind();
    return this.elem;
  }

  protected get className(): string {
    return '';
  }

  protected get template(): string {
    return '';
  }

  protected bind(): void {}

  private _createElement(template: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    newElement.innerHTML = template;
    return newElement;
  }

  private _render(): HTMLElement {
    return this._createElement(this.template, this.className);
  }
}
