import FlagView from './Flag-view';
import Model from '../model/Model';

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
const flagView = new FlagView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new FlagView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['range'], ['range']);
    expect(new FlagView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    model.setValue(['from'], [10]);
    expect(new FlagView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element4', () => {
    model.setValue(['from', 'view'], [-10000, 'vertical']);
    expect(new FlagView().getElement(state)).toMatchSnapshot();
  });

  test('renders correctly element5', () => {
    model.setValue(['from', 'to'], [10, 90]);
    expect(new FlagView().getElement(state)).toMatchSnapshot();
  });
});

describe('handleFlagMouseDown', () => {
  test('spyOn flag mouseDown', () => {
    const somethingSpy = jest.spyOn(flagView, 'handleFlagMouseDown');
    let evt: any;
    flagView.handleFlagMouseDown(state, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
