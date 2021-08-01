import ConfiguringView from './configuring-view';
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
const configuringView = new ConfiguringView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new ConfiguringView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['range'], ['range']);
    expect(new ConfiguringView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element3', () => {
    model.setValue(
      ['from', 'to', 'view', 'flag', 'scale', 'progress'],
      [10, 90, 'vertical', false, false, false],
    );
    expect(new ConfiguringView().getElement(model)).toMatchSnapshot();
  });
});

describe('handleInputChange', () => {
  test('spyOn input change', () => {
    const somethingSpy = jest.spyOn(configuringView, 'handleInputChange');
    let evt: any;
    configuringView.handleInputChange(model, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
