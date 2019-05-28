import { cloneDeep } from "lodash";
import { Constants } from './../constants/Constants';

export interface ActionData {
  /**
   * action type
   */
  type: string,
  /**
   * action param
   */
  param: any,
}

interface Reducer {
  /**
   * action type
   */
  type: string,
  /**
   * consume action data and return new state
   */
  perform: (actionData: ActionData, state: any) => void
}

const InitializeState = {
  _Router: {
    History: [Constants.Pages.HomePage],
    CurrentPage: Constants.Pages.HomePage
  },
  AppName: "PDI Solution Center",
  CurrentUser: {
    Username: "Unknown",
    Email: "unknown@host.com",
    FederationId: ""
  },
  HomePage: {
    welcome: "Welcome to PDI Solution Center"
  },
  TenantSetupPage: {
    Tenants: [
      {
        ID: 9006,
        Name: "Mock Host",
        Host: "mock.host.com",
        Status: "In Development",
        Version: 10
      }
    ],
    TenantForm: {

    },
    TenantFormBusy: false,
    TenantFormValid: false,
    TenantFormVisible: false
  }
};

const reducers: { [string]: Reducer } = {};

const GlobalReducer = (oPreState = InitializeState, oActionData) => {

  const reducer: Reducer = reducers[oActionData.type];

  if (reducer) {
    return reducer.perform(oActionData, cloneDeep(oPreState)) || oPreState;
  } else {
    return oPreState;
  }

};

/**
 * Register new reducer to global store
 *
 * with function instead of transitional way just for single way dependency
 *
 * and more dynamic provided
 *
 * @param {Reducer} reducer
 * @param {boolean} bForce
 */
const registerReducer = (reducer: Reducer, bForce = false) => {

  if (!reducers[reducer.type] || bForce) {
    reducers[reducer.type] = reducer;
  } else {
    throw new Error(`reducer for action ${reducer.type} has been registered`);
  }

};


export { GlobalReducer, registerReducer };