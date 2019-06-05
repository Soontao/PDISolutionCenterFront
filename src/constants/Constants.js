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
      },
      SetCurrentUser: "GlobalSetCurrentUser",
      Error: "GlobalError"
    },
    Router: {
      NavTo: "ActionsRouterNavTo",
      Back: "ActionsRouterBack"
    },
    TenantSetupPage: {
      CreateNewTenant: "TenantSetupPageCreateNewTenant",
      ConnectToTenantSuccess: "TenantSetupPageConnectToTenantSuccess",
      ConnectToTenantFailed: "TenantSetupPageConnectToTenantFailed",
      CleanTenantForm: "TenantSetupPageCleanTenantForm",
      OpenForm: "TenantSetupPageOpenForm",
      CloseForm: "TenantSetupPageCloseForm",
      RefreshTenantsList: "TenantSetupPageRefreshTenantsList",
      SetTenantsListData: "TenantSetupPageSetTenantsListData"
    },
    TenantDetailPage: {
      OnRefresh: "TenantDetailPageOnRefresh",
      RefreshFinished: "TenantDetailPageRefreshFinished",
      SetTenantPageInfo: "TenantDetailPageSetTenantPageInfo"
    }
  },


  Pages: {
    HomePage: "HomePage",
    TenantSetupPage: "TenantSetupPage",
    TenantDetailPage: "TenantDetailPage"
  }


};