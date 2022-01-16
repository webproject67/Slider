import FlagView from './FlagView';

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

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new FlagView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    state.view = true;
    state.from = 1;
    state.fromPercent = 1;
    state.to = 99;
    state.toPercent = 99;
    expect(new FlagView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    state.range = true;
    expect(new FlagView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element4', () => {
    state.view = false;
    expect(new FlagView(state).getElement()).toMatchSnapshot();
  });
});
