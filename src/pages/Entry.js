import { values, trimStart } from "lodash";
import { registerReducer, dispatch, ApplicationStore } from "../store/Store";
import { createTenantSetupPage } from "./TenantSetupPage/TenantsSetupPage";
import { createHomePage } from "./HomePage/HomePage";
import { Constants } from "../constants/Constants";
import App from "sap/m/App";
import Control from "sap/ui/core/Control";
import ReduxModel from "../store/redux/ReduxModel";

export const createRouter = (pages: { [string]: Control }, store: ReduxModel) => {

  // router & pages have cycle dependency
  const Router: App = <App pages={values(pages)} autoFocus={false} />;

  // on hash change
  window.onhashchange = (e) => {
    dispatch({ type: "HashChange", param: e });
  };

  registerReducer({
    type: "HashChange", perform: ({ param: { newURL, oldURL } }, oState) => {
      const newURI = new URL(newURL);
      const oldURI = new URL(oldURL);
      const newPage = trimStart(newURI.hash, "#") || Constants.Pages.HomePage;
      const oldPage = trimStart(oldURI.hash, "#");
      const history = oState._Router.History || [];
      const currentPage = oState._Router.CurrentPage || "";
      const historySize = history.length;

      if (currentPage == newPage) {
        // if not change page, but hash change event triggered
        return oState;
      } else if (historySize <= 1) {
        oState._Router.CurrentPage = newPage;
        history.push(newPage);
        Router.to(pages[newPage]);
      } else if (history[historySize - 1] == oldPage && history[historySize - 2] == newPage) {
        history.pop(); // old page
        history.pop(); // new page
        history.push(newPage);
        oState._Router.CurrentPage = newPage;
        Router.back();
      }
      return oState;
    }
  });

  // register reducer, response with router action
  registerReducer({
    type: Constants.Actions.Router.NavTo, perform: ({ param }, oState) => {
      // push state & onpopstate event are pair
      window.history.pushState(param, param, `/`);
      window.location.hash = param;
      // AppRouter.to(Pages[param]);
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

  // get path and go to the specific page

  const initPage = trimStart(window.location.hash, "#");

  if (pages[initPage]) {
    dispatch({ type: Constants.Actions.Router.NavTo, param: initPage });
  } else {
    dispatch({ type: Constants.Actions.Router.NavTo, param: Constants.Pages.HomePage });
  }

  return Router;
};

/**
 * pages reference
 */
const Pages = {
  [Constants.Pages.HomePage]: createHomePage(),
  [Constants.Pages.TenantSetupPage]: createTenantSetupPage()
};

/**
 * router reference
 */
const AppRouter = createRouter(Pages, ApplicationStore);


export { AppRouter, Pages };