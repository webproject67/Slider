import ScaleView from './ScaleView';

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
    expect(new ScaleView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    state.view = true;
    expect(new ScaleView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    state.min = 10;
    state.max = 20;
    expect(new ScaleView(state).getElement()).toMatchSnapshot();
  });
});
