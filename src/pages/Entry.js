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

const AppRouter: App = <App
  pages={values(Pages)}
  autoFocus={false}
/>;


const routerDataRef = <CustomData key="history" value="{/_Router}" />;

routerDataRef.setModel(ApplicationStore);

routerDataRef.getBinding("value").attachEvent("change", (e)=>{
  const _RouterData = e.getSource().getValue();
  const nextPage = _RouterData.CurrentPage;
  const newHistory = _RouterData.History;
  if(newHistory[newHistory - 1] != nextPage){
    AppRouter.back();
  } else {
    AppRouter.to(Pages[nextPage]);
  }
});

registerReducer({
  type: Constants.Actions.Router.NavTo, action: ({ type, param }, preState) => {
    preState._Router.CurrentPage = param;
    preState._Router.History = preState._Router.History.concat(param);
    return preState;
  }
});

registerReducer({
  type: Constants.Actions.Router.Back, action: ({ type, param }, preState) => {
    preState._Router.CurrentPage = preState._Router.History.pop();
    return preState;
  }
});

export { AppRouter, Pages };