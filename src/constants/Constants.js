import Device from "sap/ui/Device";

export const Constants = {

  SizeStyle: Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact",

  Actions: {
    Router: {
      NavTo: "NavTo",
      Back: "Back"
    }
  },
  Pages: {
    HomePage: "HomePage",
    TenantSetupPage: "TenantSetupPage"
  }


};