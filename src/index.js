import { createRouter } from "./pages/Entry";
import { createHomePage } from "./pages/HomePage/HomePage";
import { createTenantSetupPage } from "./pages/TenantSetupPage/TenantsSetupPage";
import { Constants } from "./constants/Constants";
import { ApplicationStore } from "./store/Store";
import Core from "sap/ui/core/Core";

Core.attachInit(() => {

  // init finished

  const Pages = {
    [Constants.Pages.HomePage]: createHomePage(),
    [Constants.Pages.TenantSetupPage]: createTenantSetupPage()
  };

  const start = createRouter(Pages, ApplicationStore, Constants.Pages.HomePage);

  start("content");

});


