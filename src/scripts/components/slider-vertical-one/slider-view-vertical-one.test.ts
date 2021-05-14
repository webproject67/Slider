import SliderModel from '../model/slider-model';
import SliderViewVerticalOne from './slider-view-vertical-one';

const model = new SliderModel();
const slider = new SliderViewVerticalOne(model);

test('spyOn mouseDown toggle vertical one', () => {
  const somethingSpy = jest.spyOn(slider, 'toggleMouseDown');
  let evt: any;
  slider.toggleMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(slider.element).toMatchSnapshot()
})