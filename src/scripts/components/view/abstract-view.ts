import Model from '../model/model';

export default abstract class AbstractView {
  public model: Model;

  private elem: HTMLElement | undefined;

  constructor(model: Model) {
    this.model = model;
  }

  public get element(): HTMLElement {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this.render();
    this.bind();
    return this.elem;
  }

  public get updatedElement(): HTMLElement {
    this.elem = this.render();
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

  private createElement(template: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    newElement.innerHTML = template;
    return newElement;
  }

  private render(): HTMLElement {
    return this.createElement(this.template, this.className);
  }
}
