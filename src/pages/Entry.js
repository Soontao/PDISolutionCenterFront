import { values } from "lodash";
import { registerReducer, dispatch } from "../store/Store";
import { Constants } from "../constants/Constants";
import App from "sap/m/App";
import Control from "sap/ui/core/Control";
import ReduxModel from "../store/redux/ReduxModel";
import { Path } from "./Path";
import { fetchCurrentUserInformation } from "../api/User";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";

export const createRouter = (pages: { [string]: Control }, store: ReduxModel, homePage: string = "HomePage") => {

  // router & pages have cycle dependency
  const app: App = <App pages={values(pages)} autoFocus={false} defaultTransitionName="show" />;

  Path.map(`#/${Constants.Pages.TenantSetupPage}`).to(() => {
    app.to(pages[Constants.Pages.TenantSetupPage]);
  });

  Path.map(`#/${Constants.Pages.HomePage}`).to(() => {
    app.to(pages[Constants.Pages.HomePage]);
  });

  Path.map(`#/${Constants.Pages.TenantDetailPage}/:id`).to(({ id }) => {
    app.to(pages[Constants.Pages.TenantDetailPage], "show", { id });
  });


  Path.root(`#/${homePage}`);

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
      oState.TenantSetupPage.TenantFormBusy = false;
      MessageBox.error(param.message);
      return oState;
    }
  });

  app.addEventDelegate({

    onAfterRendering: async() => {

      const { User } = await fetchCurrentUserInformation();

      MessageToast.show(`Welcome u, ${User.Name}`);

      dispatch({
        type: Constants.Actions.Global.SetCurrentUser,
        param: User
      });

    }

  });

  return (domRef) => {
    app.placeAt(domRef);
    Path.listen();
  };

};
