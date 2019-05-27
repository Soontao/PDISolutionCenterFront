import Control from "sap/ui/core/Control";
import { GlobalReducer, registerReducer } from "./Reducer";
import ReduxModel from "./redux/ReduxModel";

const createStore = (reducer) => {

  const store = new ReduxModel(reducer);

  const bind = (controlCreator: () => Control) => (...params) => controlCreator(...params).setModel(store);

  const dispatch = async(action) => {
    store.dispatch(action);
  };

  return { store, bind, dispatch };

};


const { store, bind, dispatch } = createStore(GlobalReducer);

export { store as ApplicationStore, bind as bindStore, dispatch, registerReducer };