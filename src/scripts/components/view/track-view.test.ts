import TrackView from './track-view';
import Model from '../model/model';

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

const model = new Model(main, state);
const trackView = new TrackView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new TrackView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['range'], ['range']);
    expect(new TrackView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    model.setValue(['view'], ['vertical']);
    expect(new TrackView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly updated element4', () => {
    model.setValue(['view'], ['horizontal']);
    expect(new TrackView().getUpdatedElement(model)).toMatchSnapshot();
  });
});

describe('handleToggleMouseDown', () => {
  test('spyOn toggle mouseDown', () => {
    const somethingSpy = jest.spyOn(trackView, 'handleToggleMouseDown');
    let evt: any;
    trackView.handleToggleMouseDown(model, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
