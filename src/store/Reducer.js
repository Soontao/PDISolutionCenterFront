import { cloneDeep } from "lodash";
import { Constants } from './../constants/Constants';

interface ActionData {
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
    username: "",
    email: "",
    federationId: ""
  },
  HomePage: {
    welcome: "Welcome to PDI Solution Center",
    Charts: {
      Demo: {
        title: {
          text: 'ECharts Sample Demo'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
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

    }
  }
};

const reducers = {};


const GlobalReducer = (oPreState = InitializeState, oActionData) => {

  const reducer: Reducer = reducers[oActionData.type];

  if (reducer) {
    return reducer.perform(oActionData, cloneDeep(oPreState));
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

  if(!reducers[reducer.type] || bForce){
    reducers[reducer.type] = reducer;
  } else {
    throw new Error(`reducer for action ${reducer.type} has been registered`);
  }

};


export { GlobalReducer, registerReducer };