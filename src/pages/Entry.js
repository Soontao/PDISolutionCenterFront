import { values } from "lodash";
import { registerReducer, ApplicationStore } from "../store/Store";
import { createTenantSetupPage } from "./TenantSetupPage/TenantsSetupPage";
import { createHomePage } from "./HomePage/HomePage";
import { Constants } from "../constants/Constants";
import App from "sap/m/App";
import CustomData from "sap/ui/core/CustomData";

/**
 * pages reference
 */
const Pages = {
  [Constants.Pages.HomePage]: createHomePage(),
  [Constants.Pages.TenantSetupPage]: createTenantSetupPage()
};

// router & pages have cycle dependency
const AppRouter: App = <App pages={values(Pages)} autoFocus={false} />;

// a data binding container
const routerDataRef = <CustomData key="history" value="{/_Router}" />;

routerDataRef.setModel(ApplicationStore);

routerDataRef.getBinding("value").attachEvent("change", (e) => {
  const _RouterDataBefore = e.getSource().getPreState();
  const _RouterData = e.getSource().getState();
  const nextPage = _RouterData.CurrentPage;
  const newHistory = _RouterData.History;
  // if new history length less, means history removed, means go back
  if (_RouterDataBefore.History.length >= newHistory.length) {
    AppRouter.back();
  } else {
    AppRouter.to(Pages[nextPage]);
  }
});

// register reducer, response with router action
registerReducer({
  type: Constants.Actions.Router.NavTo, perform: ({ param }, preState) => {
    preState._Router.CurrentPage = param;
    preState._Router.History.push(param);
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
    return preState;
  }
});



export { AppRouter, Pages };