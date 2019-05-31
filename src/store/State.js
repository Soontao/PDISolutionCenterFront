
export interface CurrentUser {
  ID: string;
  Name: string;
  Description: string;
  FederationLoginID: string;
  Email: string;
}

export interface HomePage {
  welcome: string;
}

export interface TenantForm {
  Hostname: string;
  Username: string;
  Password: string;
}

export interface Tenant {
  ID: number;
  Name: string;
  TenantHost: string;
  TenantUser: string;
  Status: string;
  Version: number;
}

export interface TenantSetupPage {
  Tenants: Tenant[];
  TenantForm: TenantForm;
  TenantFormBusy: boolean;
  TenantFormVisible: boolean;
  RefreshNow: boolean;
}


export interface Router {
  History: any[];
  CurrentPage: string;
}

export interface InitializeStateType {
  _Router: Router;
  AppName: string;
  CurrentUser: CurrentUser;
  HomePage: HomePage;
  TenantSetupPage: TenantSetupPage;
}

export const InitializeState: InitializeStateType = {
  _Router: {
    History: [],
    CurrentPage: ""
  },
  AppName: "PDI Solution Center",
  CurrentUser: {
    ID: 0,
    Name: "Unknown",
    Email: "unknown@host.com",
    FederationLoginID: ""
  },
  HomePage: {
    welcome: "Welcome to PDI Solution Center"
  },
  TenantSetupPage: {
    Tenants: [],
    TenantForm: {
      Hostname: "",
      Password: "",
      Username: ""
    },
    TenantFormBusy: false,
    TenantFormVisible: false,
    RefreshNow: false
  }
};