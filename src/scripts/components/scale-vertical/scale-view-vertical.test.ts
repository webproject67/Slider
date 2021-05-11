import SliderModel from '../model/slider-model';
import ScaleViewVertical from './scale-view-vertical';

const model = new SliderModel();
const scale = new ScaleViewVertical(model);

test('spyOn click scale vertical', () => {
  const somethingSpy = jest.spyOn(scale, 'scaleClick');
  let evt: any;
  scale.scaleClick(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});