import SliderModel from '../model/slider-model';
import FlagViewRange from './flag-view-range';

const model = new SliderModel();
const flag = new FlagViewRange(model);

test('spyOn mouseDown flag range', () => {
  const somethingSpy = jest.spyOn(flag, 'flagMouseDown');
  let evt: any;
  flag.flagMouseDown(evt);
  expect(somethingSpy).toHaveBeenCalledTimes(1)
});

it('jest snapshots', () => {
  expect(flag.element).toMatchSnapshot()
})