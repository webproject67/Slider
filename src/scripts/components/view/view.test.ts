import View from './view';
import StateType from '../../types';

const main = document.createElement('div');
main.id = 'banana';

const firstState = {
  flag: true,
  from: -10000,
  fromPercent: 0,
  max: 100,
  min: 0,
  progress: true,
  range: 'one',
  draft: 0,
  start: 0,
  configuring: 1,
  scale: true,
  step: 1,
  to: -10000,
  toPercent: 100,
  view: 'horizontal',
};

const view = new View(main);

const createElementSlider = (state: StateType) => {
  const slider = document.createElement('div');
  slider.appendChild(view.trackView.getUpdatedElement(state));
  if (state.progress) {
    slider
      .querySelector('.slider__scale')!
      .appendChild(view.progressView.getUpdatedElement(state));
  }
  if (state.flag) {
    slider
      .querySelector('.slider__inner')!
      .appendChild(view.flagView.getUpdatedElement(state));
  }
  if (state.scale) {
    slider
      .querySelector('.slider__inner')!
      .appendChild(view.scaleView.getUpdatedElement(state));
  }
  if (state.configuring) {
    slider
      .querySelector('.slider__wrapper')!
      .appendChild(view.configuringView.getUpdatedElement(state));
  }
  return slider;
};

const getEvt = (element: Element | null) => ({
  currentTarget: element,
  bubbles: false,
  cancelBubble: false,
  cancelable: false,
  composed: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  returnValue: false,
  srcElement: null,
  target: null,
  timeStamp: 0,
  type: '',
  composedPath: () => [],
  initEvent: () => {},
  preventDefault: () => {},
  stopImmediatePropagation: () => {},
  stopPropagation: () => {},
  AT_TARGET: 0,
  BUBBLING_PHASE: 0,
  CAPTURING_PHASE: 0,
  NONE: 0,
});

describe('updateView', () => {
  test('passed true, returned void', () => {
    expect(view.updateView(firstState, true)).toBeUndefined();
  });
});

describe('handleToggleMouseDown', () => {
  const triggerMouseEvent = (node: Element, eventType: string) => {
    const clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
    document.dispatchEvent(clickEvent);
  };

  const events = (targetNode: Element) => {
    triggerMouseEvent(targetNode, 'mouseover');
    triggerMouseEvent(targetNode, 'mousedown');
    triggerMouseEvent(targetNode, 'mousemove');
    triggerMouseEvent(targetNode, 'mouseup');
  };
  test('mouse horizontal toggle max', () => {
    const targetNode =
      createElementSlider(firstState).querySelector('.slider__toggle');
    events(targetNode!);
  });

  test('mouse horizontal toggle min', () => {
    firstState.range = 'range';
    firstState.flag = false;
    const targetNode =
      createElementSlider(firstState).querySelector('.slider__toggle');
    events(targetNode!);
  });

  test('mouse vertical toggle max', () => {
    firstState.view = 'vertical';
    firstState.range = 'one';
    const targetNode =
      createElementSlider(firstState).querySelector('.slider__toggle');
    events(targetNode!);
  });

  test('mouse vertical toggle min', () => {
    firstState.range = 'range';
    firstState.flag = true;
    const targetNode =
      createElementSlider(firstState).querySelector('.slider__toggle');
    events(targetNode!);
  });
});

describe('handleBarClick', () => {
  const somethingSpy = jest.spyOn(view.progressView, 'handleBarClick');
  test('spyOn bar click', () => {
    const element = createElementSlider(firstState).querySelector('.slider__bar');
    view.progressView.handleBarClick(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });
});

describe('handleFlagMouseDown', () => {
  const somethingSpy = jest.spyOn(view.flagView, 'handleFlagMouseDown');
  test('spyOn flag horizontal max mouseDown', () => {
    firstState.view = 'horizontal';
    const element = createElementSlider(firstState).querySelector(
      '.slider__flag_maximum'
    );
    view.flagView.handleFlagMouseDown(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });

  test('spyOn flag horizontal min mouseDown', () => {
    firstState.range = 'range';
    const element = createElementSlider(firstState).querySelector(
      '.slider__flag_minimum'
    );
    view.flagView.handleFlagMouseDown(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(2);
  });

  test('spyOn flag vertical max mouseDown', () => {
    firstState.view = 'vertical';
    const element = createElementSlider(firstState).querySelector(
      '.slider__flag-vertical_maximum'
    );
    view.flagView.handleFlagMouseDown(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(3);
  });

  test('spyOn flag vertical min mouseDown', () => {
    const element = createElementSlider(firstState).querySelector(
      '.slider__flag-vertical_minimum'
    );
    view.flagView.handleFlagMouseDown(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(4);
  });
});

describe('handleItemClick', () => {
  const somethingSpy = jest.spyOn(view.scaleView, 'handleItemClick');
  test('spyOn first item click', () => {
    firstState.view = 'horizontal';
    const element = createElementSlider(firstState).querySelector(
      '.slider__item:first-child'
    );
    view.scaleView.handleItemClick(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });

  test('spyOn last item click', () => {
    firstState.view = 'vertical';
    const element = createElementSlider(firstState).querySelector(
      '.slider__item:last-child'
    );
    view.scaleView.handleItemClick(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(2);
  });

  test('spyOn second item click', () => {
    const element = createElementSlider(firstState).querySelector(
      '.slider__item:nth-child(2)'
    );
    view.scaleView.handleItemClick(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(3);
  });
});

describe('handleInputChange', () => {
  const somethingSpy = jest.spyOn(view.configuringView, 'handleInputChange');
  test('spyOn input min change', () => {
    const element = createElementSlider(firstState).querySelector('.slider__min');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(1);
  });

  test('spyOn input min more max change', () => {
    firstState.min = 110;
    const element = createElementSlider(firstState).querySelector('.slider__min');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(2);
  });

  test('spyOn input max change', () => {
    const element = createElementSlider(firstState).querySelector('.slider__max');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(3);
  });

  test('spyOn input max less min change', () => {
    firstState.max = -10;
    const element = createElementSlider(firstState).querySelector('.slider__max');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(4);
  });

  test('spyOn input step change', () => {
    const element = createElementSlider(firstState).querySelector('.slider__step');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(5);
  });

  test('spyOn input view change', () => {
    const element = createElementSlider(firstState).querySelector('.slider__view');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(6);
  });

  test('spyOn input range change', () => {
    const element = createElementSlider(firstState).querySelector('.slider__range');
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(7);
  });

  test('spyOn input flag change', () => {
    const element = createElementSlider(firstState).querySelector(
      '.slider__flag-checkbox'
    );
    view.configuringView.handleInputChange(firstState, getEvt(element));
    expect(somethingSpy).toHaveBeenCalledTimes(8);
  });
});
