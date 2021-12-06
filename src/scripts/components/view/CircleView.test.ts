import CircleView from './CircleView';

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
    expect(new CircleView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    state.view = true;
    expect(new CircleView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    state.to = 90;
    state.range = true;
    expect(new CircleView(state).getElement()).toMatchSnapshot();
  });

  test('renders correctly element4', () => {
    state.view = false;
    expect(new CircleView(state).getElement()).toMatchSnapshot();
  });
});
