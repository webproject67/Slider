import Slider from './Slider';

const state = {
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

const main = document.createElement('div');

const slider = new Slider(main, state);

describe('setState', () => {
  test('passed min 20 less max, returned void', () => {
    expect(slider.setState({ min: 20 })).toBeUndefined();
  });

  test('passed unknown, returned state min 20', () => {
    expect(slider.getState().min).toBe(20);
  });
});

describe('subscribe', () => {
  test('passed function, returned void', () => {
    expect(slider.subscribe(() => {})).toBeUndefined();
  });
});

describe('handleTrackClick', () => {
  test('event track horizontal', () => {
    const track: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__track');
    const click = new MouseEvent('click');
    if (track) track.dispatchEvent(click);
  });

  test('event track vertical', () => {
    state.view = true;
    const track: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__track_size_height');
    const click = new MouseEvent('click');
    if (track) track.dispatchEvent(click);
  });
});

describe('handleScaleClick', () => {
  test('event scale', () => {
    const scale: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__item');
    const click = new MouseEvent('click');
    if (scale) scale.dispatchEvent(click);
  });
});

describe('handlePinMouseDown', () => {
  test('event pin max vertical', () => {
    const pin: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__pin-vertical_position_maximum');
    const mousedown = new MouseEvent('mousedown');
    if (pin) pin.dispatchEvent(mousedown);
  });

  test('event pin max horizontal', () => {
    state.view = false;
    const pin: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__pin_position_maximum');
    const mousedown = new MouseEvent('mousedown');
    if (pin) pin.dispatchEvent(mousedown);
  });

  test('event pin min horizontal', () => {
    state.range = true;
    const pin: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__pin_position_minimum');
    const mousedown = new MouseEvent('mousedown');
    if (pin) pin.dispatchEvent(mousedown);
  });

  test('event pin min vertical', () => {
    state.view = true;
    const pin: HTMLInputElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__pin-vertical_position_minimum');
    const mousedown = new MouseEvent('mousedown');
    if (pin) pin.dispatchEvent(mousedown);
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

  test('event circle max vertical', () => {
    const circle: HTMLElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__circle_position_vertical-maximum');
    if (circle) events(circle);
  });

  test('event circle max horizontal', () => {
    state.view = false;
    const circle: HTMLElement | null = new Slider(main, state)
      .getElement()
      .querySelector('.slider__circle_position_maximum');
    if (circle) events(circle);
  });
});
