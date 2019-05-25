import { values } from "lodash";
import { registerReducer } from "../store/Store";
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

registerReducer({ type: Constants.Actions.Router.NavTo, action: pageName => AppRouter.to(Pages[pageName]) });

registerReducer({ type: Constants.Actions.Router.Back, action: () => AppRouter.back() });

export { AppRouter, Pages };