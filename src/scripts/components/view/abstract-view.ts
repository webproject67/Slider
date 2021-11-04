import StateType from '../../types';

export default abstract class AbstractView {
  private elem: HTMLElement | undefined;

  public getElement(state: StateType): HTMLElement {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this.render(state);
    this.bind(state);
    return this.elem;
  }

  public getUpdatedElement(state: StateType): HTMLElement {
    this.elem = this.render(state);
    this.bind(state);
    return this.elem;
  }

  protected getClassName(state: StateType): string {
    return '';
  }

  protected getRandomNumber(): number {
    const min = 0;
    const max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected getTemplate(state: StateType): string {
    return '';
  }

  protected bind(state: StateType): void {}

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
