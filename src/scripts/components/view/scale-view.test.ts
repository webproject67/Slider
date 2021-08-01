import ScaleView from './scale-view';
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
const scaleView = new ScaleView();

describe('snapshot', () => {
  test('renders correctly element1', () => {
    expect(new ScaleView().getElement(model)).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    model.setValue(['view', 'max', 'step'], ['vertical', 99, 2]);
    expect(new ScaleView().getElement(model)).toMatchSnapshot();
  });
});

describe('handleItemClick', () => {
  test('spyOn item click', () => {
    const somethingSpy = jest.spyOn(scaleView, 'handleItemClick');
    let evt: any;
    scaleView.handleItemClick(model, evt);
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});
