import Device from "sap/ui/Device";

export const Constants = {

  SizeStyle: Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact",

  Store: {
    ReplaceWholeState: "StoreReplaceWholeState",
    SetProperty: "StoreSetProperty"
  },



  Actions: {
    Global: {
      BusyIndicator: {
        Show: "GlobalBusyIndicatorShow",
        Hide: "GlobalBusyIndicatorHide"
      }
    },
    Router: {
      NavTo: "ActionsRouterNavTo",
      Back: "ActionsRouterBack"
    },
    TenantSetupPage: {
      CreateNewTenant: "TenantSetupPageCreateNewTenant",
      CleanTenantForm: "TenantSetupPageCleanTenantForm",
      OpenForm: "TenantSetupPageOpenForm",
      CloseForm: "TenantSetupPageCloseForm"
    }
  },
  Pages: {
    HomePage: "HomePage",
    TenantSetupPage: "TenantSetupPage"
  }


};