import {getByTestId} from '@testing-library/dom';
import '@testing-library/jest-dom';
import SliderModel from '../model/slider-model';
import SliderViewOne from '../slider-one/slider-view-one';
import SliderViewRange from '../slider-range/slider-view-range';
import SliderViewVerticalOne from '../slider-vertical-one/slider-view-vertical-one';
import SliderViewVerticalRange from '../slider-vertical-range/slider-view-vertical-range';
import ConfiguringViewOne from '../configuring-one/configuring-view-one';
import ConfiguringViewRange from '../configuring-range/configuring-view-range';
import ScaleView from '../scale/scale-view';
import ScaleViewVertical from '../scale-vertical/scale-view-vertical';
import FlagViewOne from '../flag-one/flag-view-one';
import FlagViewRange from '../flag-range/flag-view-range';
import FlagViewVerticalOne from '../flag-vertical-one/flag-view-vertical-one';
import FlagViewVerticalRange from '../flag-vertical-range/flag-view-vertical-range';

function getExampleDOM() {
  const div = document.createElement('div');
  div.innerHTML = `
    <html>
      <body>
        <div id="slider"></div>
        <div id="slider11"></div>
        <div class="sim"></div>
        <div class="milk"></div>
      </body>
    </html>
  `;
  return div;
};
const container = getExampleDOM();

class SliderPresenter {
  sliderModel: SliderModel;
  sliderViewOne: SliderViewOne;
  sliderViewRange: SliderViewRange;
  sliderViewVerticalOne: SliderViewVerticalOne;
  sliderViewVerticalRange: SliderViewVerticalRange;
  configuringViewOne: ConfiguringViewOne;
  configuringViewRange: ConfiguringViewRange;
  scaleView: ScaleView;
  scaleViewVertical: ScaleViewVertical;
  flagViewOne: FlagViewOne;
  flagViewRange: FlagViewRange;
  flagViewVerticalOne: FlagViewVerticalOne;
  flagViewVerticalRange: FlagViewVerticalRange;

  constructor() {
    this.sliderModel = new SliderModel();
    this.sliderViewOne = new SliderViewOne(this.sliderModel);
    this.sliderViewRange = new SliderViewRange(this.sliderModel);
    this.sliderViewVerticalOne = new SliderViewVerticalOne(this.sliderModel);
    this.sliderViewVerticalRange = new SliderViewVerticalRange(this.sliderModel);
    this.configuringViewOne = new ConfiguringViewOne(this.sliderModel);
    this.configuringViewRange = new ConfiguringViewRange(this.sliderModel);
    this.scaleView = new ScaleView(this.sliderModel);
    this.scaleViewVertical = new ScaleViewVertical(this.sliderModel);
    this.flagViewOne = new FlagViewOne(this.sliderModel);
    this.flagViewRange = new FlagViewRange(this.sliderModel);
    this.flagViewVerticalOne = new FlagViewVerticalOne(this.sliderModel);
    this.flagViewVerticalRange = new FlagViewVerticalRange(this.sliderModel);
  }

  public init(obj:any): void {
    for (const key in obj) {
      if(this.sliderModel.state.hasOwnProperty(key)) this.setInModelValue(key, obj[key]);
    }

    this.showSliderView(this.sliderModel.mainValue);
    this.showConfiguringView(this.sliderModel.mainValue);
    this.showScaleView(this.sliderModel.mainValue);
    this.showFlagView(this.sliderModel.mainValue);
  }

  private setInModelValue(key: string, value: number | string | boolean): void {
    switch (key) {
      case 'main':
        this.sliderModel.mainValue = <string>value;
      break;
      case 'min':
        this.sliderModel.minValue = <number>value;
      break;
      case 'max':
        this.sliderModel.maxValue = <number>value;
      break;
      case 'from':
        this.sliderModel.fromValue = <number>value;
      break;
      case 'fromPercent':
        this.sliderModel.fromPercentValue = <number>value;
      break;
      case 'to':
        this.sliderModel.toValue = <number>value;
      break;
      case 'toPercent':
        this.sliderModel.toPercentValue = <number>value;
      break;
      case 'step':
        this.sliderModel.stepValue = <number>value;
      break;
      case 'view':
        this.sliderModel.viewValue = <string>value;
      break;
      case 'range':
        this.sliderModel.rangeValue = <string>value;
      break;
      case 'flag':
        this.sliderModel.flagValue = <boolean>value;
      break;
      case 'scale':
        this.sliderModel.scaleValue = <boolean>value;
      break;
    }
  }
  private showConfiguringView(className: string):void {
    if (this.sliderModel.rangeValue === 'one') {
      container.querySelector(className)!.querySelector('.slider__wrapper')?.appendChild(this.configuringViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range') {
      container.querySelector(className)!.querySelector('.slider__wrapper')?.appendChild(this.configuringViewRange.element);
    } else {
      throw new Error('incorrect value')
    }
  }

  private showFlagView(className: string):void {
    if(this.sliderModel.flagValue) {
      if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
        container.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
        container.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewRange.element);
      } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
        container.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewVerticalOne.element);
      } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
        container.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.flagViewVerticalRange.element);
      } else {
        throw new Error('incorrect value')
      }
    }
  }

  private showScaleView(className: string): void {
    if(this.sliderModel.scaleValue) {
      if (this.sliderModel.viewValue === 'horizontal') {
        container.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.scaleView.element);
      } else if (this.sliderModel.viewValue === 'vertical') {
        container.querySelector(className)!.querySelector('.slider__inner')?.appendChild(this.scaleViewVertical.element);
      } else {
        throw new Error('incorrect value')
      }
    };
  }

  private showSliderView(className: string):void {
    if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'horizontal') {
      container.querySelector(className)?.appendChild(this.sliderViewOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'horizontal') {
      container.querySelector(className)?.appendChild(this.sliderViewRange.element);
    } else if (this.sliderModel.rangeValue === 'one' && this.sliderModel.viewValue === 'vertical') {
      container.querySelector(className)?.appendChild(this.sliderViewVerticalOne.element);
    } else if (this.sliderModel.rangeValue === 'range' && this.sliderModel.viewValue === 'vertical') {
      container.querySelector(className)?.appendChild(this.sliderViewVerticalRange.element);
    } else {
      throw new Error('incorrect value')
    }
  } 
}

describe('slider #1', () => {
  const slider = new SliderPresenter();

  it('set null object, return standart state', () => {
    slider.init({});
    expect(slider.sliderModel.state).toMatchObject(slider.sliderModel.state);
  });

  it('show slider horizontal one', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'sliderOne')).toHaveClass('slider__inner');
  })
  
  it('show configuring one', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'configuringOne')).toHaveClass('slider__input');
  })
  
  it('show scale horizontal', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'scaleHorizontal')).toHaveClass('slider__item');
  })
  
  it('show flag horizontal one', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'flagHorizontal')).toHaveClass('slider__flag');
  })
});

describe('slider #2', () => {
  const slider = new SliderPresenter();
  
  it('set new object, return new state', () => {
    slider.init({
      main: '#slider11',
      range: 'range',
      min: 28,
      max: 148,
      step: 10
    });

    const newState = {
      flag: true,
      from: -10000,
      fromPercent: 0,
      main: '#slider11',
      max: 148,
      min: 28,
      range: 'range',
      scale: true,
      step: 10,
      to: -10000,
      toPercent: 100,
      view: 'horizontal'
    };

    expect(slider.sliderModel.state).toMatchObject(newState);
  });

  it('show slider vertical range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'sliderRange')).toHaveClass('slider__inner');
  })

  it('show configuring range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'configuringRange')).toHaveClass('slider__input');
  })

  it('show scale vertical', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'scaleHorizontal')).toHaveClass('slider__item');
  })

  it('show flag vertical range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'flagHorizontalRange')).toHaveClass('slider__flag');
  })
});

describe('slider #3', () => {
  const slider = new SliderPresenter();
  
  it('set new object, return new state', () => {
    slider.init({
      main: '.sim',
      view: 'vertical',
    });

    const newState = {
      flag: true,
      from: -10000,
      fromPercent: 0,
      main: '.sim',
      max: 100,
      min: 0,
      range: 'one',
      scale: true,
      step: 1,
      to: -10000,
      toPercent: 100,
      view: 'vertical'
    };

    expect(slider.sliderModel.state).toMatchObject(newState);
  });

  it('show slider vertical range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'sliderVerticalOne')).toHaveClass('slider__inner');
  })

  it('show configuring range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'configuringOne')).toHaveClass('slider__input');
  })

  it('show scale vertical', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'scaleVertical')).toHaveClass('slider__item');
  })

  it('show flag vertical range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'flagVertical')).toHaveClass('slider__flag-vertical');
  })
});

describe('slider #4', () => {
  const slider = new SliderPresenter();
  
  it('set new object, return new state', () => {
    slider.init({
      main: '.milk',
      view: 'vertical',
      range: 'range',
      scale: false,
      flag: false
    });

    const newState = {
      flag: false,
      from: -10000,
      fromPercent: 0,
      main: '.milk',
      max: 100,
      min: 0,
      range: 'range',
      scale: false,
      step: 1,
      to: -10000,
      toPercent: 100,
      view: 'vertical'
    };

    expect(slider.sliderModel.state).toMatchObject(newState);
  });

  it('show slider vertical range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'sliderVerticalRange')).toHaveClass('slider__inner');
  })

  it('show configuring range', () => {
    expect(getByTestId(container.querySelector(slider.sliderModel.mainValue)!, 'configuringRange')).toHaveClass('slider__input');
  })
});