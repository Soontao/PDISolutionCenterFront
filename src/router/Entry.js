import NavContainer from "sap/m/NavContainer";
import { createHomePage } from "../pages/HomePage";
import { values } from "lodash";
import { createTenantSetupPage } from "../pages/TenantsSetupPage";
import Page from "sap/m/Page";

/**
 * in-direct reference
 */
const Context: { AppRouter: NavContainer, Pages: { [string]: Page } } = {};

/**
 * pages reference
 */
const Pages = {
  HomePage: createHomePage(Context),
  TenantSetupPage: createTenantSetupPage(Context)
};

const AppRouter: NavContainer = <NavContainer height="32em" pages={values(Pages)} />;

Context.AppRouter = AppRouter;
Context.Pages = Pages;

window.onhashchange = () => {
  AppRouter.back();
};

export { AppRouter, Pages };