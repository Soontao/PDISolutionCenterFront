

interface Tenant {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  Name: string;
  Description: string;
  CreatedBy: null;
  UpdatedBy: null;
  TenantHost: string;
  TenantUser: string;
  TenantUserPassword: string;
  Admins: null;
  Solutions: null;
}

interface CurrentUserTenants {
  Tenants: Tenant[];
}


export interface Admin {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  Name: string;
  Description: string;
  CreatedBy: null;
  UpdatedBy: null;
  FederationLoginID: string;
  Email: string;
  Tenants: null;
}

export interface Solution {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  Name: string;
  Description: string;
  CreatedBy: null;
  UpdatedBy: null;
  CurrentVersion: number;
  CurrentStatus: string;
  RecentCheckMessage: string;
  Contact: string;
  ContactEmail: string;
  Tenant: null;
}


export interface TenantDetailResponse {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: null;
  Name: string;
  Description: string;
  CreatedBy: null;
  UpdatedBy: null;
  TenantHost: string;
  TenantUser: string;
  Admins: Admin[];
  Solutions: Solution[];
}


export const fetchCurrentUserAllTenants = async(): Promise<CurrentUserTenants> => {
  const response = await fetch("/api/v1/tenant/");
  const body = await response.json();

  if (!body.Tenants) {
    body.Tenants = [];
  }

  return body;
};

export const connectToNewTenant = async(tenantData) => {

  const response = await fetch("/api/v1/tenant/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tenantData)
  });

  if (response.status != 201) {
    const { error } = await response.json();
    throw new Error(error);
  }

};

export const fetchTenantDetail = async(tenantId: number): Promise<TenantDetailResponse> => {

  const response = await fetch(`/api/v1/tenant/${tenantId}`);

  if (response.status != 200) {
    const { error } = await response.json();
    throw new Error(error);
  } else {
    return await response.json();
  }

};