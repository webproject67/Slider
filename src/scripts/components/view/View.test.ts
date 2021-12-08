import View from './View';

const stateFirst = {
  min: 0,
  max: 100,
  from: 0,
  fromPercent: 0,
  to: 100,
  toPercent: 100,
  step: 1,
  view: false,
  range: false,
  flag: false,
  progress: false,
  scale: false,
};

const stateLast = {
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

const elementDivFirst = document.createElement('div');
const elementDivLast = document.createElement('div');

const viewFirst = new View(elementDivFirst);
const viewLast = new View(elementDivLast);

describe('snapshot', () => {
  test('renders correctly element1', () => {
    viewFirst.updateView(stateFirst);
    expect(viewFirst.getElement()).toMatchSnapshot();
  });

  test('updated correctly element1', () => {
    viewFirst.updateView(stateFirst);
    expect(viewFirst.getElement()).toMatchSnapshot();
  });

  test('renders correctly element2', () => {
    viewLast.updateView(stateLast);
    expect(viewLast.getElement()).toMatchSnapshot();
  });

  test('updated correctly element2', () => {
    stateLast.view = true;
    viewLast.updateView(stateLast);
    expect(viewLast.getElement()).toMatchSnapshot();
  });
});
