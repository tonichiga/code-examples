import Manager from "./Manager";

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

export const constants = {
  CHANGE: "change",
  CLOSE: "close",
};

class ModalManager extends Manager {
  queue: string[] = [];
  _openModalStateCallback: null | ((state: boolean) => void);

  constructor() {
    super();
    this.create = this.create.bind(this);
    this.call = this.call.bind(this);
    this.close = this.close.bind(this);
    this._openModalStateCallback = null;
  }

  create<T>(name: string, payload: { modalId: number; data?: T }) {
    this.name = name;
    this.data = payload;

    this.emitter.emit(constants.CHANGE, this.name, this.data);
  }

  call<T>(name: string, data?: T) {
    this.create<T>(name, { modalId: uniqueID(), data });
    this.queue.push(name);
    this._openModalStateCallback &&
      this._openModalStateCallback(this.getQueueState());
  }

  close<T>(position?: T) {
    this.emitter.emit(constants.CLOSE, position);
    this.queue.pop();
    this._openModalStateCallback &&
      this._openModalStateCallback(this.getQueueState());
  }

  getQueueState() {
    return this.queue.length > 0;
  }

  onOpenModalState(callback: (state: boolean) => void) {
    this._openModalStateCallback = callback;
  }
}

const modalManager = new ModalManager();
export default modalManager;
