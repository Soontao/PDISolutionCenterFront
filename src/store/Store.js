import Control from "sap/ui/core/Control";
import ReduxModel, { Reducer, ActionData, ThunkAction } from "./redux/ReduxModel";
import { InitializeState } from "./State";

function createStore<T>(initializeState: T) {

  const messageMgr = sap.ui.getCore().getMessageManager();

  const store = new ReduxModel(initializeState);

  const bind = (controlCreator: () => Control) => (...params) => {
    const c = controlCreator(...params).setModel(store);
    messageMgr.registerObject(c, true); // setup message manager
    return c;
  };

  const dispatch = (action: ActionData | ThunkAction<T>) => {
    store.dispatch(action);
  };

  /**
   * Register new reducer to global store
   *
   * with function instead of transitional way just for single way dependency
   *
   * and more dynamic provided
   */
  const registerReducer = (oReducer: Reducer<T>, bForce = false) => { store.registerReducer(oReducer, bForce); };

  return { store, bind, dispatch, registerReducer };

}

const { store, bind, dispatch, registerReducer } = createStore(InitializeState);

export { store as ApplicationStore, bind as bindStore, dispatch, registerReducer };