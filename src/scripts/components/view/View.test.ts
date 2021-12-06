import View from './View';

const stateFirst = {
  min: 0,
  max: 100,
  from: 0,
  fromPercent: 0,
  to: 100,
  toPercent: 100,
  step: 1,
  view: false,
  range: false,
  flag: false,
  progress: false,
  scale: false,
};

const stateLast = {
  min: 0,
  max: 100,
  from: 0,
  fromPercent: 0,
  to: 100,
  toPercent: 100,
  step: 1,
  view: false,
  range: false,
  flag: true,
  progress: true,
  scale: true,
};

const elementDivFirst = document.createElement('div');
const elementDivLast = document.createElement('div');

const viewFirst = new View(elementDivFirst);
const viewLast = new View(elementDivLast);
const mainFirst = viewFirst.getElement();
const mainLast = viewLast.getElement();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    viewFirst.updateView(stateFirst);
    expect(mainFirst).toMatchSnapshot();
  });

  test('updated correctly element1', () => {
    viewFirst.updateView(stateFirst);
    expect(mainFirst).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    viewLast.updateView(stateLast);
    expect(mainLast).toMatchSnapshot();
  });

  test('updated correctly element2', () => {
    stateLast.view = true;
    viewLast.updateView(stateLast);
    expect(mainLast).toMatchSnapshot();
  });
});

describe('handleTrackClick', () => {
  test('event track vertical', () => {
    const track: HTMLInputElement | null = mainLast.querySelector(
      '.slider__track_size_height'
    );
    const click = new MouseEvent('click');
    if (track !== null) track.dispatchEvent(click);
  });

  test('event track horizontal', () => {
    stateLast.view = false;
    viewLast.updateView(stateLast);
    const track: HTMLInputElement | null =
      mainLast.querySelector('.slider__track');
    const click = new MouseEvent('click');
    if (track !== null) track.dispatchEvent(click);
  });
});

describe('handleScaleClick', () => {
  test('event scale', () => {
    const scale: HTMLInputElement | null =
      mainLast.querySelector('.slider__item');
    const click = new MouseEvent('click');
    if (scale !== null) scale.dispatchEvent(click);
  });
});

describe('handlePinMouseDown', () => {
  test('event pin max horizontal', () => {
    const pin: HTMLInputElement | null = mainLast.querySelector(
      '.slider__pin_position_maximum'
    );
    const mousedown = new MouseEvent('mousedown');
    if (pin !== null) pin.dispatchEvent(mousedown);
  });

  test('event pin max vertical', () => {
    stateLast.view = true;
    viewLast.updateView(stateLast);
    const pin: HTMLInputElement | null = mainLast.querySelector(
      '.slider__pin-vertical_position_maximum'
    );
    const mousedown = new MouseEvent('mousedown');
    if (pin !== null) pin.dispatchEvent(mousedown);
  });

  test('event pin min vertical', () => {
    stateLast.range = true;
    viewLast.updateView(stateLast);
    const pin: HTMLInputElement | null = mainLast.querySelector(
      '.slider__pin-vertical_position_minimum'
    );
    const mousedown = new MouseEvent('mousedown');
    if (pin !== null) pin.dispatchEvent(mousedown);
  });

  test('event pin min horizontal', () => {
    stateLast.view = false;
    viewLast.updateView(stateLast);
    const pin: HTMLInputElement | null = mainLast.querySelector(
      '.slider__pin_position_minimum'
    );
    const mousedown = new MouseEvent('mousedown');
    if (pin !== null) pin.dispatchEvent(mousedown);
  });
});

describe('handleCircleMouseDown', () => {
  const triggerMouseEvent = (element: Element, eventType: string): void => {
    const clickEvent = new MouseEvent(eventType);
    element.dispatchEvent(clickEvent);
    document.dispatchEvent(clickEvent);
  };

  const events = (element: HTMLElement): void => {
    triggerMouseEvent(element, 'mouseover');
    triggerMouseEvent(element, 'mousedown');
    triggerMouseEvent(element, 'mousemove');
    triggerMouseEvent(element, 'mouseup');
  };

  test('event circle max horizontal', () => {
    const circle: HTMLElement | null = mainLast.querySelector(
      '.slider__circle_position_maximum'
    );
    if (circle !== null) events(circle);
  });

  test('event circle max vertical', () => {
    stateLast.view = true;
    viewLast.updateView(stateLast);
    const circle: HTMLElement | null = mainLast.querySelector(
      '.slider__circle_position_vertical-maximum'
    );
    if (circle !== null) events(circle);
  });
});
