import TrackView from './track-view';
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
const trackView = new TrackView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new TrackView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['range'], ['range']);
    expect(new TrackView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    model.setValue(['view'], ['vertical']);
    expect(new TrackView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly updated element4', () => {
    model.setValue(['view'], ['horizontal']);
    expect(new TrackView().getUpdatedElement(state)).toMatchSnapshot();
  });
});

describe('handleToggleMouseDown', () => {
  test('spyOn toggle mouseDown', () => {
    const somethingSpy = jest.spyOn(trackView, 'handleToggleMouseDown');
    let evt: any;
    trackView.handleToggleMouseDown(state, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
