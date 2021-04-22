export default class SliderModel {
  state: { 
    min: number; 
    max: number; 
    current: number; 
    step: number; 
    view: string;
    range: string;
    value: boolean;
    scale: boolean;
  };
  
  constructor() {
    this.state = {
      min: 0,
      max: 100,
      current: 75,
      step: 1,
      view: 'horizontal',
      range: 'one',
      value: true,
      scale: true
    }
  }

  public get minValue(): number {
    return this.state.min
  }
  
  public get maxValue(): number {
    return this.state.max
  }
  
  public get currentValue(): number {
    return this.state.current
  }
  
  public get stepValue(): number {
    return this.state.step
  }
  public get viewValue(): string {
    return this.state.view
  }
  
  public get rangeValue(): string {
    return this.state.range
  }
  
  public get valueValue(): boolean {
    return this.state.value
  }
  
  public get scaleValue(): boolean {
    return this.state.scale
  }

  public set minValue(value: number) {
    this.state.min = value
  }
  
  public set maxValue(value: number) {
    this.state.max = value
  }
  
  public set currentValue(value: number) {
    this.state.current = value
  }
  
  public set stepValue(value: number) {
    this.state.step = value
  }
  
  public set viewValue(value: string) {
    this.state.view = value
  }
  
  public set rangeValue(value: string) {
    this.state.range = value
  }
  
  public set valueValue(value: boolean) {
    this.state.value = value
  }
  
  public set scaleValue(value: boolean) {
    this.state.scale = value
  }
}