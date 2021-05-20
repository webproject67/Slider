import {getByTestId} from '@testing-library/dom';
import '@testing-library/jest-dom';
import SliderPresenter from './slider-presenter';

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

describe('slider #1', () => {
  const main: HTMLElement = container.querySelector('#slider')!;
  const state = {
    flag: true,
    from: -10000,
    fromPercent: 0,
    max: 100,
    min: 0,
    range: 'one',
    scale: true,
    step: 1,
    to: -10000,
    toPercent: 100,
    view: 'horizontal'
  };
  const slider = new SliderPresenter(main, state);
  slider.init();

  it('show slider horizontal one', () => {
    expect(getByTestId(main, 'sliderOne')).toHaveClass('slider__inner');
  })
  
  it('show configuring one', () => {
    expect(getByTestId(main, 'configuringOne')).toHaveClass('slider__input');
  })
  
  it('show scale horizontal', () => {
    expect(getByTestId(main, 'scaleHorizontal')).toHaveClass('slider__item');
  })
  
  it('show flag horizontal one', () => {
    expect(getByTestId(main, 'flagHorizontal')).toHaveClass('slider__flag');
  })
});

describe('slider #2', () => {
  const main: HTMLElement = container.querySelector('#slider11')!;
  const state = {
    flag: true,
    from: -10000,
    fromPercent: 0,
    max: 148,
    min: 28,
    range: 'range',
    scale: true,
    step: 10,
    to: -10000,
    toPercent: 100,
    view: 'horizontal'
  };
  const slider = new SliderPresenter(main, state);
  slider.init();
  
  it('show slider horizontal range', () => {
    expect(getByTestId(main, 'sliderRange')).toHaveClass('slider__inner');
  })

  it('show configuring range', () => {
    expect(getByTestId(main, 'configuringRange')).toHaveClass('slider__input');
  })

  it('show scale horizontal', () => {
    expect(getByTestId(main, 'scaleHorizontal')).toHaveClass('slider__item');
  })

  it('show flag horizontal range', () => {
    expect(getByTestId(main, 'flagHorizontalRange')).toHaveClass('slider__flag');
  })
});

describe('slider #3', () => {
  const main: HTMLElement = container.querySelector('.sim')!;
  const state = {
    flag: true,
    from: -10000,
    fromPercent: 0,
    max: 100,
    min: 0,
    range: 'one',
    scale: true,
    step: 1,
    to: -10000,
    toPercent: 100,
    view: 'vertical'
  };
  const slider = new SliderPresenter(main, state);
  slider.init();
  
  it('show slider vertical one', () => {
    expect(getByTestId(main, 'sliderVerticalOne')).toHaveClass('slider__inner');
  })

  it('show configuring one', () => {
    expect(getByTestId(main, 'configuringOne')).toHaveClass('slider__input');
  })

  it('show scale vertical', () => {
    expect(getByTestId(main, 'scaleVertical')).toHaveClass('slider__item');
  })

  it('show flag vertical one', () => {
    expect(getByTestId(main, 'flagVertical')).toHaveClass('slider__flag-vertical');
  })
});

describe('slider #4', () => {
  const main: HTMLElement = container.querySelector('.milk')!;
  const state = {
    flag: false,
    from: -10000,
    fromPercent: 0,
    max: 100,
    min: 0,
    range: 'range',
    scale: false,
    step: 1,
    to: -10000,
    toPercent: 100,
    view: 'vertical'
  };
  const slider = new SliderPresenter(main, state);
  slider.init();

  it('show slider vertical range', () => {
    expect(getByTestId(main, 'sliderVerticalRange')).toHaveClass('slider__inner');
  })

  it('show configuring range', () => {
    expect(getByTestId(main, 'configuringRange')).toHaveClass('slider__input');
  })
});

it('jest snapshots', () => {
  expect(container).toMatchSnapshot()
})