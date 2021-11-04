import Model from './model';

const firstState = {
  flag: true,
  from: -10000,
  fromPercent: 12,
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
  toPercent: 88,
  view: 'horizontal',
};

const firstModel = new Model(firstState);

describe('getState', () => {
  test('passed unknown, returned state', () => {
    const state = firstModel.getState();
    expect(state).toBe(firstState);
  });
});

describe('setValueState', () => {
  test('set value flag on false', () => {
    firstModel.setValue(['flag'], [false]);
    expect(firstModel.state.flag).toBe(false);
  });
  test('set value from on 10', () => {
    firstModel.setValue(['from'], [10]);
    expect(firstModel.state.from).toBe(10);
  });
  test('set value fromPercent on 5', () => {
    firstModel.setValue(['fromPercent'], [5]);
    expect(firstModel.state.fromPercent).toBe(5);
  });
  test('set value max on 50', () => {
    firstModel.setValue(['max'], [50]);
    expect(firstModel.state.max).toBe(50);
  });
  test('set value min on 10', () => {
    firstModel.setValue(['min'], [10]);
    expect(firstModel.state.min).toBe(10);
  });
  test('set value range on range', () => {
    firstModel.setValue(['range'], ['range']);
    expect(firstModel.state.range).toBe('range');
  });
  test('set value scale on false', () => {
    firstModel.setValue(['scale'], [false]);
    expect(firstModel.state.scale).toBe(false);
  });
  test('set value step on 10', () => {
    firstModel.setValue(['step'], [10]);
    expect(firstModel.state.step).toBe(10);
  });
  test('set value to on 42', () => {
    firstModel.setValue(['to'], [42]);
    expect(firstModel.state.to).toBe(42);
  });
  test('set value toPercent on 18', () => {
    firstModel.setValue(['toPercent'], [18]);
    expect(firstModel.state.toPercent).toBe(18);
  });
  test('set value view on vertical', () => {
    firstModel.setValue(['view'], ['vertical']);
    expect(firstModel.state.view).toBe('vertical');
  });
  test('set value draft on 1', () => {
    firstModel.setValue(['draft'], [1]);
    expect(firstModel.state.draft).toBe(1);
  });
  test('set value start on 2', () => {
    firstModel.setValue(['start'], [2]);
    expect(firstModel.state.start).toBe(2);
  });
  test('set value configuring on 3', () => {
    firstModel.setValue(['configuring'], [3]);
    expect(firstModel.state.configuring).toBe(3);
  });
  test('set value progress on false', () => {
    firstModel.setValue(['progress'], [false]);
    expect(firstModel.state.progress).toBe(false);
  });
  test('set value unknownValue on unknown', () => {
    firstModel.setValue(['unknownValue'], ['unknown']);
  });
});
