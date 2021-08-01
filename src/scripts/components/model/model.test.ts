import Model from './model';

const firstMain = document.createElement('div');
firstMain.id = 'banana';

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

const firstModel = new Model(firstMain, firstState);

describe('getPercentScale', () => {
  test('passed unknown, returned scale 5', () => {
    const { scale } = firstModel.getPercentScale();
    expect(scale).toBe(5);
  });
});

describe('getState', () => {
  test('passed unknown, returned state', () => {
    const state = firstModel.getState();
    expect(state).toBe(firstState);
  });
});

describe('getStepCount', () => {
  test('passed 50, returned stepCount 100', () => {
    const { stepCount } = firstModel.getStepCount(50);
    expect(stepCount).toBe(100);
  });
  test('passed 50, returned stepPercent 1', () => {
    const { stepPercent } = firstModel.getStepCount(50);
    expect(stepPercent).toBe(1);
  });
  test('passed 50, returned stepPercentResult 50', () => {
    const { stepPercentResult } = firstModel.getStepCount(50);
    expect(stepPercentResult).toBe(50);
  });
  test('passed -20, returned stepPercentResult 0', () => {
    const { stepPercentResult } = firstModel.getStepCount(-20);
    expect(stepPercentResult).toBe(0);
  });
  test('passed 120, returned stepPercentResult 100', () => {
    const { stepPercentResult } = firstModel.getStepCount(120);
    expect(stepPercentResult).toBe(100);
  });
  test('passed (50, `toPercent`), returned stepPercentResult 50', () => {
    const { stepPercentResult } = firstModel.getStepCount(50, 'toPercent');
    expect(stepPercentResult).toBe(50);
  });
  test('passed (90, `toPercent`), returned stepPercentResult 88', () => {
    const { stepPercentResult } = firstModel.getStepCount(90, 'toPercent');
    expect(stepPercentResult).toBe(88);
  });
  test('passed (50, `fromPercent`), returned stepPercentResult 50', () => {
    const { stepPercentResult } = firstModel.getStepCount(50, 'fromPercent');
    expect(stepPercentResult).toBe(50);
  });
  test('passed (3, `fromPercent`), returned stepPercentResult 12', () => {
    const { stepPercentResult } = firstModel.getStepCount(3, 'fromPercent');
    expect(stepPercentResult).toBe(12);
  });
});

describe('getStepValue', () => {
  test('passed 0, returned 1', () => {
    const step1 = firstModel.getStepValue(0);
    expect(step1).toBe(1);
  });
  test('passed -5, returned 5', () => {
    const step2 = firstModel.getStepValue(-5);
    expect(step2).toBe(5);
  });
  test('passed 500, returned 100', () => {
    const step3 = firstModel.getStepValue(500);
    expect(step3).toBe(100);
  });
});

describe('getValue', () => {
  test('passed 70, returned 70', () => {
    const { value } = firstModel.getValue(70);
    expect(value).toBe(70);
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

const secondMain = document.createElement('div');
secondMain.className = 'cat';

const secondState = {
  flag: true,
  from: -10000,
  fromPercent: 0,
  max: 50,
  min: 10,
  progress: true,
  range: 'one',
  draft: 0,
  start: 1,
  configuring: 0,
  scale: true,
  step: 10,
  to: -10000,
  toPercent: 100,
  view: 'horizontal',
};

const secondModel = new Model(secondMain, secondState);

describe('getPercentScale', () => {
  test('passed unknown, returned scale 1', () => {
    const { scale } = secondModel.getPercentScale();
    expect(scale).toBe(1);
  });
});
