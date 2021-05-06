import SliderModel from '../model/slider-model';
import ConfiguringViewRange from './configuring-view-range';

const model = new SliderModel();
const configuring = new ConfiguringViewRange(model);

test('spyOn change input', () => {
  const somethingSpy = jest.spyOn(configuring, 'bind').mockImplementation();
  configuring.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});