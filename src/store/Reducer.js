import { cloneDeep } from "lodash";

const InitializeState = {
  _Router: {
    History: [],
    CurrentPage: ""
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

  const reducer = reducers[oActionData.type];

  if (reducer) {
    return reducer.action(oActionData, cloneDeep(oPreState));
  } else {
    return oPreState;
  }

};

const registerReducer = (action, bForce = false) => {

  reducers[action.type] = action;

};


export { GlobalReducer, registerReducer };