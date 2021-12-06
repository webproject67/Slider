import Model from './Model';

const state = {
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

const model = new Model(state);

describe('getState', () => {
  test('passed unknown, returned type object state', () => {
    expect(model.getState()).toEqual({
      type: 'updateModelState',
      value: state,
    });
  });
});

describe('setStateFrom', () => {
  test('passed from 105 more to, returned void', () => {
    expect(model.setStateFrom(105)).toBeUndefined();
  });

  test('passed unknown, returned state from 100', () => {
    expect(model.getState().value.from).toBe(100);
  });

  test('passed from 5 less to, returned void', () => {
    expect(model.setStateFrom(5)).toBeUndefined();
  });

  test('passed unknown, returned state from 5', () => {
    expect(model.getState().value.from).toBe(5);
  });
});

describe('setStateTo', () => {
  test('passed to 0 less from, returned void', () => {
    expect(model.setStateTo(0)).toBeUndefined();
  });

  test('passed unknown, returned state to 5', () => {
    expect(model.getState().value.to).toBe(5);
  });

  test('passed to 95 more from, returned void', () => {
    expect(model.setStateTo(95)).toBeUndefined();
  });

  test('passed unknown, returned state to 95', () => {
    expect(model.getState().value.to).toBe(95);
  });
});

describe('setStateFromOrTo', () => {
  test('passed 50 more from, returned void', () => {
    expect(model.setStateFromOrTo(50)).toBeUndefined();
  });

  test('passed unknown, returned state to 50', () => {
    expect(model.getState().value.to).toBe(50);
  });

  test('passed 0 less from, returned void', () => {
    expect(model.setStateFromOrTo(0)).toBeUndefined();
  });

  test('passed unknown, returned state from 0', () => {
    expect(model.getState().value.from).toBe(0);
  });
});

describe('setState', () => {
  test('passed min 150 more max, returned void', () => {
    expect(model.setState({ min: 150 })).toBeUndefined();
  });

  test('passed unknown, returned state min 99', () => {
    expect(model.getState().value.min).toBe(99);
  });

  test('passed step 0, returned void', () => {
    expect(model.setState({ step: 0 })).toBeUndefined();
  });

  test('passed unknown, returned state step 1', () => {
    expect(model.getState().value.step).toBe(1);
  });

  test('passed step -5, returned void', () => {
    expect(model.setState({ step: -5 })).toBeUndefined();
  });

  test('passed unknown, returned state step 1', () => {
    expect(model.getState().value.step).toBe(1);
  });
});
