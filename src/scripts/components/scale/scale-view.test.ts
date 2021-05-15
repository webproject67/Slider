import SliderModel from '../model/slider-model';
import ScaleView from './scale-view';

const model = new SliderModel();
const scale = new ScaleView(model);

test('spyOn click scale', () => {
  const somethingSpy = jest.spyOn(scale, 'scaleClick');
  let evt: any;
  scale.scaleClick(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(scale.element).toMatchSnapshot()
})