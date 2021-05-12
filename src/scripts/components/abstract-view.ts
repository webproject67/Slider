import SliderModel from './model/slider-model';

export default abstract class AbstractView {
  elem: HTMLElement | undefined;
  sliderModel: SliderModel;

  constructor(sliderModel: SliderModel) {
    this.sliderModel = sliderModel
  }

  protected get className(): string {
    return '';
  }

  public get element(): HTMLElement {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this.render();
    this.bind();
    return this.elem;
  }
  
  public get newElement(): HTMLElement {
    this.elem = this.render();
    this.bind();
    return this.elem;
  }

  protected get template(): string {
    return '';
  }

  protected bind(): void {
  
  }

  private createElement(template: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.classList.add(className);
    newElement.textContent = template;
    return newElement;
  };

  private render(): HTMLElement {
    return this.createElement(this.template, this.className);
  }
}