import fetch from "unfetch";

interface User {
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

interface CurrentUserResponse {
  User: User;
}

/**
 * fetch user information
 */
export const fetchCurrentUserInformation = async(): Promise<CurrentUserResponse> => {
  var res = await fetch("/api/v1/user/");
  var body = await res.json();
  return body;
};