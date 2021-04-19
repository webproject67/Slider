const createElement = (template: string): HTMLElement => {
  const newElement: HTMLElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement;
};

export default abstract class AbstractView {
  public get element(): HTMLElement {
    return createElement(this.template)
  }

  protected get template(): string {
    return ``;
  }
}