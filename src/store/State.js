
export interface CurrentUser {
  Username: string;
  Email: string;
  FederationId: string;
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
  Host: string;
  Status: string;
  Version: number;
}

export interface TenantSetupPage {
  Tenants: Tenant[];
  TenantForm: TenantForm;
  TenantFormBusy: boolean;
  TenantFormVisible: boolean;
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
    Username: "Unknown",
    Email: "unknown@host.com",
    FederationId: ""
  },
  HomePage: {
    welcome: "Welcome to PDI Solution Center"
  },
  TenantSetupPage: {
    Tenants: [
      {
        ID: 9006,
        Name: "Mock Host",
        Host: "mock.host.com",
        Status: "In Development",
        Version: 10
      }
    ],
    TenantForm: {
      Hostname: "",
      Password: "",
      Username: ""
    },
    TenantFormBusy: false,
    TenantFormVisible: false
  }
};