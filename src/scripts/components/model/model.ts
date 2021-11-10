import Observer from '../observer/Observer';
import StateType from '../../StateType';

export default class Model extends Observer {
  public state: StateType;

  constructor(state: StateType) {
    super();
    this.state = state;
  }

  public getState(): StateType {
    return this.state;
  }

  public setValue(keys: string[], values: (number | string | boolean)[]) {
    keys.forEach((key, i) => {
      switch (key) {
        case 'min':
          this.state.min = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'max':
          this.state.max = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'step':
          this.state.step = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'to':
          this.state.to = Number(values[i]);
          this.broadcast(this.state, true);
          break;
        case 'toPercent':
          this.state.toPercent = Number(values[i]);
          this.broadcast(this.state, true);
          break;
        case 'draft':
          this.state.draft = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'start':
          this.state.start = Number(values[i]);
          break;
        case 'configuring':
          this.state.configuring = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'from':
          this.state.from = Number(values[i]);
          this.broadcast(this.state, true);
          break;
        case 'fromPercent':
          this.state.fromPercent = Number(values[i]);
          this.broadcast(this.state, true);
          break;
        case 'view':
          this.state.view = String(values[i]);
          this.broadcast(this.state);
          break;
        case 'range':
          this.state.range = String(values[i]);
          this.broadcast(this.state);
          break;
        case 'flag':
          this.state.flag = Boolean(values[i]);
          this.broadcast(this.state);
          break;
        case 'progress':
          this.state.progress = Boolean(values[i]);
          this.broadcast(this.state);
          break;
        case 'scale':
          this.state.scale = Boolean(values[i]);
          this.broadcast(this.state);
          break;
        default:
          break;
      }
    });
  }
}
