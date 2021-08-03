import { StateType, ModelType } from '../../types';

export default abstract class AbstractView {
  private elem: HTMLElement | undefined;

  public getElement(model: ModelType): HTMLElement {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this.render(model.state);
    this.bind(model);
    return this.elem;
  }

  public getUpdatedElement(model: ModelType): HTMLElement {
    this.elem = this.render(model.state);
    this.bind(model);
    return this.elem;
  }

  protected getClassName(state: StateType): string {
    return '';
  }

  protected getTemplate(state: StateType): string {
    return '';
  }

  protected bind(model: ModelType): void {}

  private createElement(template: string, className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    newElement.innerHTML = template;
    return newElement;
  }

  private render(state: StateType): HTMLElement {
    return this.createElement(
      this.getTemplate(state),
      this.getClassName(state)
    );
  }
}
