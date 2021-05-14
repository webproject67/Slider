import SliderModel from '../model/slider-model';
import SliderViewOne from './slider-view-one';

const model = new SliderModel();
const slider = new SliderViewOne(model);

test('spyOn mouseDown toggle one', () => {
  const somethingSpy = jest.spyOn(slider, 'toggleMouseDown');
  let evt: any;
  slider.toggleMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(slider.element).toMatchSnapshot()
})