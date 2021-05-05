import SliderModel from './slider-model';

const model = new SliderModel();

test('get value flag true', () => expect(model.flagValue).toBe(true));
test('get value from -10000', () => expect(model.fromValue).toBe(-10000));
test('get value fromPercent 0', () => expect(model.fromPercentValue).toBe(0));
test('get value main #slider', () => expect(model.mainValue).toBe('#slider'));
test('get value max 100', () => expect(model.maxValue).toBe(100));
test('get value min 0', () => expect(model.minValue).toBe(0));
test('get value range one', () => expect(model.rangeValue).toBe('one'));
test('get value scale true', () => expect(model.scaleValue).toBe(true));
test('get value step 1', () => expect(model.stepValue).toBe(1));
test('get value to -10000', () => expect(model.toValue).toBe(-10000));
test('get value toPercent 100', () => expect(model.toPercentValue).toBe(100));
test('get value view horizontal', () => expect(model.viewValue).toBe('horizontal'));

test('set value flag on false', () => {
  model.flagValue = false;
  expect(model.flagValue).toBe(false);
});
test('set value from on 10', () => {
  model.fromValue = 10;
  expect(model.fromValue).toBe(10);
});
test('set value fromPercent on 5', () => {
  model.fromPercentValue = 5;
  expect(model.fromPercentValue).toBe(5);
});
test('set value main on .slider', () => {
  model.mainValue = '.slider';
  expect(model.mainValue).toBe('.slider');
});
test('set value max on 85', () => {
  model.maxValue = 85;
  expect(model.maxValue).toBe(85);
});
test('set value min on 11', () => {
  model.minValue = 11;
  expect(model.minValue).toBe(11);
});
test('set value range on range', () => {
  model.rangeValue = 'range';
  expect(model.rangeValue).toBe('range');
});
test('set value scale on false', () => {
  model.scaleValue = false;
  expect(model.scaleValue).toBe(false);
});
test('set value step on 8', () => {
  model.stepValue = 8;
  expect(model.stepValue).toBe(8);
});
test('set value to on 42', () => {
  model.toValue = 42;
  expect(model.toValue).toBe(42);
});
test('set value toPercent on 18', () => {
  model.toPercentValue = 18;
  expect(model.toPercentValue).toBe(18);
});
test('set value view on vertical', () => {
  model.viewValue = 'vertical';
  expect(model.viewValue).toBe('vertical');
});