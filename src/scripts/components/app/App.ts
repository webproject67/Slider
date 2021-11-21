import { stateType } from '../../types';
import Presenter from '../presenter/Presenter';
import ConfiguringPanel from '../configuringPanel/ConfiguringPanel';

export default class App {
  main: HTMLElement;
  state: stateType;
  presenter!: Presenter;
  configuring!: ConfiguringPanel;

  constructor(main: HTMLElement, state: stateType) {
    this.main = main;
    this.state = state;
  }
  
  public render() {
    this.presenter = new Presenter(this.main, this.state);
  }
  
  public renderConfiguringPanel() {
    this.configuring = new ConfiguringPanel(this.state, this.main)
    this.presenter.view.getElement().children[0].appendChild(this.configuring.getElement());

    this.subscribe();
  }
  
  private subscribe() {
    const cbPanel = (keys: string[], values: (number | string | boolean)[]) =>
      this.presenter.model.setValue(keys, values);
    this.configuring.subscribe(cbPanel);

    const cbModel = () => this.configuring.updateElement();
    this.presenter.model.subscribe(cbModel);
  }
}
