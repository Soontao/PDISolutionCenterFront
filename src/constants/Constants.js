import Device from "sap/ui/Device";

export const Constants = {

  SizeStyle: Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact",

  Actions: {
    Router: {
      NavTo: "ActionsRouterNavTo",
      Back: "ActionsRouterBack"
    }
  },
  Pages: {
    HomePage: "HomePage",
    TenantSetupPage: "TenantSetupPage"
  }


};