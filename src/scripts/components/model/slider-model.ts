export default class SliderModel {
  state: { 
    main: string;
    min: number; 
    max: number; 
    from: number; 
    to: number; 
    step: number; 
    view: string;
    range: string;
    flag: boolean;
    scale: boolean;
  };
  
  constructor() {
    this.state = {
      main: '#slider',
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      step: 1,
      view: 'horizontal',
      range: 'one',
      flag: true,
      scale: true
    }
  }

  public get mainValue(): string {
    return this.state.main
  }
  
  public get minValue(): number {
    return this.state.min
  }
  
  public get maxValue(): number {
    return this.state.max
  }
  
  public get fromValue(): number {
    return this.state.from
  }
  
  public get toValue(): number {
    return this.state.to
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
  
  public get flagValue(): boolean {
    return this.state.flag
  }
  
  public get scaleValue(): boolean {
    return this.state.scale
  }

  public set mainValue(value: string) {
    this.state.main = value
  }
  
  public set minValue(value: number) {
    this.state.min = value
  }
  
  public set maxValue(value: number) {
    this.state.max = value
  }
  
  public set fromValue(value: number) {
    this.state.from = value
  }
  
  public set toValue(value: number) {
    this.state.to = value
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
  
  public set flagValue(value: boolean) {
    this.state.flag = value
  }
  
  public set scaleValue(value: boolean) {
    this.state.scale = value
  }
}