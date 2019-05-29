import Control from "sap/ui/core/Control";
import { get, filter, trimStart, trimEnd } from "lodash";
import ReduxModel, { Reducer, ActionData } from "./redux/ReduxModel";
import { Constants } from "../constants/Constants";
import { InitializeState } from "./State";

function createStore<T>(initializeState: T) {

  const messageMgr = sap.ui.getCore().getMessageManager();

  const store = new ReduxModel(initializeState);

  const bind = (controlCreator: () => Control) => (...params) => {
    const c = controlCreator(...params).setModel(store);
    messageMgr.registerObject(c, true); // setup message manager
    return c;
  };

  const dispatch = async(action: ActionData) => {
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

  // register reducer for redux store
  registerReducer({
    // if set property, update property new data to store
    type: Constants.Store.SetProperty, perform: ({ param: { sPath = "", oValue } }, oState) => {
      sPath = trimStart(trimEnd(sPath, "}"), "{");
      const aParts = filter(sPath.split("/"));
      const sProperty = aParts.pop();
      const oUpdateBase = get(oState, aParts) || {};
      oUpdateBase[sProperty] = oValue;
      return oState;
    }
  });

  return { store, bind, dispatch, registerReducer };

}

const { store, bind, dispatch, registerReducer } = createStore(InitializeState);

export { store as ApplicationStore, bind as bindStore, dispatch, registerReducer };