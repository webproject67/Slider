import SliderModel from './model/slider-model';

export default abstract class AbstractView {
  elem: JQuery<HTMLElement> | undefined;
  sliderModel: SliderModel;

  constructor(sliderModel: SliderModel) {
    this.sliderModel = sliderModel
  }

  protected get className(): string {
    return '';
  }

  public get element(): JQuery<HTMLElement> {
    if (this.elem) {
      return this.elem;
    }
    this.elem = this.render();
    this.bind();
    return this.elem;
  }
  
  public get newElement(): JQuery<HTMLElement> {
    this.elem = this.render();
    this.bind();
    return this.elem;
  }

  protected get template(): string {
    return '';
  }

  protected bind(): void {
  
  }

  private createElement(template: string, className: string): JQuery<HTMLElement> {
    const newElement: JQuery<HTMLElement> = $('<div></div>');
    newElement.addClass(className)
    newElement.html(template);
    return newElement;
  };

  private render(): JQuery<HTMLElement> {
    return this.createElement(this.template, this.className);
  }
}