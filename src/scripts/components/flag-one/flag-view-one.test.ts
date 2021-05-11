import SliderModel from '../model/slider-model';
import FlagViewOne from './flag-view-one';

const model = new SliderModel();
const flag = new FlagViewOne(model);

test('spyOn mouseDown flag one', () => {
  const somethingSpy = jest.spyOn(flag, 'flagMouseDown');
  let evt: any;
  flag.flagMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});