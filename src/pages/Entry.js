import { registerReducer, dispatch } from "../store/Store";
import { Constants } from "../constants/Constants";
import ReduxModel from "../store/redux/ReduxModel";
import { fetchCurrentUserInformation } from "../api/User";
import { RouterConfig, createRouter } from "../router/Router";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import { createHomePage } from "./HomePage/HomePage";
import { createTenantSetupPage } from "./TenantSetupPage/TenantsSetupPage";
import { createTenantDetailPage } from "./TenantDetailPage/TenantDetailPage";
import { createScheduleSetupPage } from "./ScheduleSetupPage/ScheduleSetupPage";

export const createApp = (store: ReduxModel) => {

  const routerConfig: RouterConfig = {
    defaultRouteValue: "#/HomePage",
    routes: {
      [Constants.Pages.HomePage]: {
        content: createHomePage()
      },
      [Constants.Pages.TenantSetupPage]: {
        content: createTenantSetupPage()
      },
      [Constants.Pages.TenantDetailPage]: {
        pattern: `#/${Constants.Pages.TenantDetailPage}/:id`,
        content: createTenantDetailPage()
      },
      [Constants.Pages.ScheduleSetupPage]: {
        content: createScheduleSetupPage()
      }
    }
  };

  const { app, start } = createRouter(routerConfig, store);

  registerReducer({
    type: Constants.Actions.Global.SetCurrentUser,
    perform: ({ param }, oState) => {
      oState.CurrentUser = param;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.Global.Error,
    perform: ({ param }, oState) => {
      MessageBox.error(param.message);
      return oState;
    }
  });

  // show welcome message on app init
  (async() => {

    try {
      const { User } = await fetchCurrentUserInformation();
      MessageToast.show(`Welcome u, ${User.Name}`);
      dispatch({
        type: Constants.Actions.Global.SetCurrentUser,
        param: User
      });
    } catch (error) {
      dispatch({
        type: Constants.Actions.Global.Error,
        param: error
      });
    }

  })();

  return start;

};
