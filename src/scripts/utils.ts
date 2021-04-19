export const createElement = (template: string): HTMLElement => {
  const newElement: HTMLElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement;
};

const main: HTMLElement = <HTMLElement>document.querySelector('.slider');

export const showView = (element: HTMLElement): HTMLElement => main.appendChild(element);