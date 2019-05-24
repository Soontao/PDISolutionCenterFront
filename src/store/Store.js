import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";

import { createReducers } from "./reducers/AbstractReducer";

const createStore = (initializeState = {}, reducers = {}) => {

  const store = new JSONModel(initializeState);

  const bind = (controlCreator: () => Control) => (...params) => controlCreator(...params).setModel(store);

  const dispatch = async(action) => {
    const r = reducers[action.type];
    if (r) {
      await r.action(action.param);
    } else {
      throw new Error(`Not found reducer for action "${action.type}"`);
    }
  };

  return { store, bind, dispatch };

};


export interface GlobalState {
  HomePage: {
    title: string,
    welcome: string,
    solutions: string,
  },
}

const InitializeState: GlobalState = {

  CurrentUser: {
    username: "",
    email: "",
    federationId: ""
  },
  HomePage: {
    title: "PDI Solution Center",
    welcome: "Welcome to PDI Solution Center "
  }
};

const { reducers, registerReducer } = createReducers();
const { store, bind, dispatch } = createStore(InitializeState, reducers);

export { store as ApplicationStore, bind as bindStore, dispatch, registerReducer };