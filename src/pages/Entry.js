import { values, trimStart } from "lodash";
import { registerReducer, dispatch } from "../store/Store";
import { createTenantSetupPage } from "./TenantSetupPage/TenantsSetupPage";
import { createHomePage } from "./HomePage/HomePage";
import { Constants } from "../constants/Constants";
import App from "sap/m/App";

/**
 * pages reference
 */
const Pages = {
  [Constants.Pages.HomePage]: createHomePage(),
  [Constants.Pages.TenantSetupPage]: createTenantSetupPage()
};

// router & pages have cycle dependency
const AppRouter: App = <App pages={values(Pages)} autoFocus={false} />;

// on back button click
window.onpopstate = () => {
  dispatch({ type: Constants.Actions.Router.Back });
};

// register reducer, response with router action
registerReducer({
  type: Constants.Actions.Router.NavTo, perform: ({ param }, preState) => {
    preState._Router.CurrentPage = param;
    preState._Router.History.push(param);
    // push state & onpopstate event are pair
    window.history.pushState(param, param, `#${param}`);
    AppRouter.to(Pages[param]);
    return preState;
  }
});

registerReducer({
  type: Constants.Actions.Router.Back, perform: ({ param }, preState) => {
    // pop current page
    preState._Router.History.pop();
    const backPage = preState._Router.History.pop();
    preState._Router.History.push(backPage);
    preState._Router.CurrentPage = backPage;
    AppRouter.back();
    return preState;
  }
});

// get path and go to the specific page

const initPage = trimStart(window.location.hash, "#");

if (Pages[initPage]) {
  dispatch({ type: Constants.Actions.Router.NavTo, param: initPage });
} else {
  dispatch({ type: Constants.Actions.Router.NavTo, param: Constants.Pages.HomePage });
}

export { AppRouter, Pages };