

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