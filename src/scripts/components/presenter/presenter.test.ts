import Presenter from './presenter';

const main = document.createElement('div');
main.id = 'banana';

const state = {
  flag: true,
  from: -10000,
  fromPercent: 0,
  max: 100,
  min: 0,
  progress: true,
  range: 'one',
  draft: 0,
  start: 1,
  configuring: 0,
  scale: true,
  step: 1,
  to: -10000,
  toPercent: 100,
  view: 'horizontal',
};

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new Presenter(main, state).model).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    state.start = 0;
    state.min = 10;
    state.max = 50;
    state.step = 10;
    state.flag = false;
    state.progress = false;
    expect(new Presenter(main, state).model).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    state.configuring = 1;
    state.scale = false;
    expect(new Presenter(main, state).model).toMatchSnapshot();
  });
});
