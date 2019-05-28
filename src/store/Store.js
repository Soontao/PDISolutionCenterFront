import Control from "sap/ui/core/Control";
import { GlobalReducer, registerReducer, ActionData } from "./Reducer";
import { get, filter, trimStart, trimEnd } from "lodash";
import ReduxModel from "./redux/ReduxModel";
import { Constants } from "../constants/Constants";

const createStore = (reducer) => {

  const messageMgr = sap.ui.getCore().getMessageManager();

  const store = new ReduxModel(reducer);

  const bind = (controlCreator: () => Control) => (...params) => {
    const c = controlCreator(...params).setModel(store);
    messageMgr.registerObject(c, true); // setup message manager
    return c;
  };

  const dispatch = async(action: ActionData) => {
    store.dispatch(action);
  };

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

  return { store, bind, dispatch };

};

const { store, bind, dispatch } = createStore(GlobalReducer);

export { store as ApplicationStore, bind as bindStore, dispatch, registerReducer };