import ProgressView from './progress-view';
import Model from '../model/model';

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

const model = new Model(state);
const progressView = new ProgressView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new ProgressView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['view'], ['vertical']);
    expect(new ProgressView().getElement(state)).toMatchSnapshot();
  });
});

describe('handleBarClick', () => {
  test('spyOn bar click', () => {
    const somethingSpy = jest.spyOn(progressView, 'handleBarClick');
    let evt: any;
    progressView.handleBarClick(state, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
