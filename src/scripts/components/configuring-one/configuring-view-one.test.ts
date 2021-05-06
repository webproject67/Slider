import SliderModel from '../model/slider-model';
import ConfiguringViewOne from './configuring-view-one';

const model = new SliderModel();
const configuring = new ConfiguringViewOne(model);

test('spyOn change input', () => {
  const somethingSpy = jest.spyOn(configuring, 'bind').mockImplementation();
  configuring.bind();
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});