import EventBus from "sap/ui/core/EventBus";

export interface AbstractReducer {
  type: string,
  action: (...any) => Promise<void>
}

export interface Reducers {
  [string]: AbstractReducer
}

export const createReducers = (channel = "application") => {

  // refactor required, to promise action sequence
  // and reducers should return new state

  const bus = new EventBus();

  /**
   * fire action
   * @param {*} action
   * @param {*} param
   */
  const fireAction = (action, param = {}) => bus.publish(channel, action, { param });

  /**
   *  register action reducer
   *
   * @param {AbstractReducer} r reducer
   */
  const registerReducer = (r: AbstractReducer) => {

    if (!r.type) {
      throw new Error("Must define the reducer type");
    }

    if (!r.action) {
      throw new Error(`Must define the reducer action for "${r.type}"`);
    }

    bus.subscribe(channel, r.type, (c, e, { param }) => { r.action(param); });

  };

  return { fireAction, registerReducer };

};

