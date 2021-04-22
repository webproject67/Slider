import SliderModel from './model/slider-model';

export default abstract class AbstractView {
  sliderModel: SliderModel;
  elem: JQuery<HTMLElement> | undefined;

  constructor(sliderModel: SliderModel) {
    this.sliderModel = sliderModel
  }

  public get element(): JQuery<HTMLElement> {
    if (this.elem) {
      return this.elem;
    }
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

  protected render(): JQuery<HTMLElement> {
    return this.createElement(this.template, this.className);
  }

  protected bind(): void {
  
  }

  private createElement(template: string, className: string): JQuery<HTMLElement> {
    const newElement: JQuery<HTMLElement> = $('<div></div>');
    newElement.addClass(className)
    newElement.html(template);
    return newElement;
  };
}