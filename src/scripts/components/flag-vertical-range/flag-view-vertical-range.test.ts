import SliderModel from '../model/slider-model';
import FlagViewVerticalRange from './flag-view-vertical-range';

const model = new SliderModel();
const flag = new FlagViewVerticalRange(model);

test('spyOn mouseDown flag vertical range', () => {
  const somethingSpy = jest.spyOn(flag, 'bind').mockImplementation();
  flag.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});