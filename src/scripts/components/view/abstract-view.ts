import { StateType } from '../../types';

export default abstract class AbstractView {
  private elem: HTMLElement | undefined;

  public getElement(model: StateType): HTMLElement {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this.render(model);
    this.bind(model);
    return this.elem;
  }

  public getUpdatedElement(model: StateType): HTMLElement {
    this.elem = this.render(model);
    this.bind(model);
    return this.elem;
  }

  protected getClassName(model: StateType): string {
    return '';
  }

  protected getTemplate(model: StateType): string {
    return '';
  }

  protected bind(model: StateType): void {}

  private createElement(template: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    newElement.innerHTML = template;
    return newElement;
  }

  private render(model: StateType): HTMLElement {
    return this.createElement(
      this.getTemplate(model),
      this.getClassName(model),
    );
  }
}
