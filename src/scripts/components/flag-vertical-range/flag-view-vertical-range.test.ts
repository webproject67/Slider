import SliderModel from '../model/slider-model';
import FlagViewVerticalRange from './flag-view-vertical-range';

const model = new SliderModel();
const flag = new FlagViewVerticalRange(model);

test('spyOn mouseDown flag vertical range', () => {
  const somethingSpy = jest.spyOn(flag, 'flagMouseDown');
  let evt: any;
  flag.flagMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});