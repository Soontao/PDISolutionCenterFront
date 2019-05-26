import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";

import { createReducers } from "./Reducer";

const createStore = (initializeState = {}, fireAction) => {

  const store = new JSONModel(initializeState);

  const bind = (controlCreator: () => Control) => (...params) => controlCreator(...params).setModel(store);

  const dispatch = async(action) => {
    fireAction(action.type, action.param);
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

const { fireAction, registerReducer } = createReducers();
const { store, bind, dispatch } = createStore(InitializeState, fireAction);

export { store as ApplicationStore, bind as bindStore, dispatch, registerReducer };