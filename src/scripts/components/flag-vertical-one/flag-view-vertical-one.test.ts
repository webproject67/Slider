import SliderModel from '../model/slider-model';
import FlagViewVerticalOne from './flag-view-vertical-one';

const model = new SliderModel();
const flag = new FlagViewVerticalOne(model);

test('spyOn mouseDown flag vertical one', () => {
  const somethingSpy = jest.spyOn(flag, 'bind').mockImplementation();
  flag.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});