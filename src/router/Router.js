import Control from "sap/ui/core/Control";
import ReduxModel from "../store/redux/ReduxModel";
import App from "sap/m/App";
import { values, forEach } from "lodash";
import { Path } from "./Path";
import { registerReducer } from "../store/Store";
import { Constants } from "../constants/Constants";


export interface RouterConfig {
  defaultRouteValue?: string;
  routes: {
    [routeName: string]: {
      pattern: string;
      content: Control;
    }
  }
}

export const createRouter = (config: RouterConfig, store: ReduxModel) => {

  const homePage = config.defaultRouteValue || "/";

  const app: App = <App
    pages={values(config.routes).map(r => r.content.setModel(store))}
    autoFocus={false}
    defaultTransitionName="show"
  />;

  forEach(config.routes, (route, name) => {

    const pattern = route.pattern || `#/${name}`;

    Path.map(pattern).to(param => {

      app.to(route.content, "show", param);

    });

  });

  Path.root(homePage);

  // register reducer, response with router action
  registerReducer({
    type: Constants.Actions.Router.NavTo, perform: ({ param }, oState) => {
      window.location.hash = `/${param}`;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.Router.Back, perform: ({ param }, oState) => {
      const history = oState._Router.History || [];
      const historySize = history.length;
      if (historySize > 0) {
        const backPage = history[historySize - 2];
        window.location.hash = backPage;
      } else {
        // pop current page
        window.history.back();
      }
      return oState;
    }
  });

  return {
    app: app,
    start: (domRef) => {
      app.placeAt(domRef);
      Path.listen();
    }
  };

};