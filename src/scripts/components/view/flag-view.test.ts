import FlagView from './flag-view';
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
const flagView = new FlagView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new FlagView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['range'], ['range']);
    expect(new FlagView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    model.setValue(['from'], [10]);
    expect(new FlagView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element4', () => {
    model.setValue(['from', 'view'], [-10000, 'vertical']);
    expect(new FlagView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element5', () => {
    model.setValue(['from', 'to'], [10, 90]);
    expect(new FlagView().getElement(model)).toMatchSnapshot();
  });
});

describe('handleFlagMouseDown', () => {
  test('spyOn flag mouseDown', () => {
    const somethingSpy = jest.spyOn(flagView, 'handleFlagMouseDown');
    let evt: any;
    flagView.handleFlagMouseDown(model, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
