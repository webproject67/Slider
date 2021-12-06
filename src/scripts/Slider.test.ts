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
