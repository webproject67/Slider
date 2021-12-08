import Panel from './Panel';
import Slider from '../slider/Slider';

const state = {
  min: 0,
  max: 100,
  from: 0,
  fromPercent: 0,
  to: 100,
  toPercent: 100,
  step: 1,
  view: false,
  range: false,
  flag: true,
  progress: true,
  scale: true,
};

const main = document.createElement('div');
const slider = new Slider(main, state);
const panel = new Panel(main, slider).getElement();

describe('handleInputChange', () => {
  test('event input min', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputMinChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input max', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputMaxChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input from', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputFromChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input to', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputToChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input step', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputStepChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input view', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputViewChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input range', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputRangeChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input flag', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputFlagChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input progress', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputProgressChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });

  test('event input scale', () => {
    const input: HTMLInputElement | null = panel.querySelector(
      '.slider__handleInputScaleChange'
    );
    const change = new MouseEvent('change');
    if (input) input.dispatchEvent(change);
  });
});
