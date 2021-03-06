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
const fetchCurrentUserInformation = async(): Promise<CurrentUserResponse> => {

  var res = await fetch("/api/v1/user/");

  if (res.status == 404){
    throw new Error("not found current user, do you have logged?");
  }

  var body = await res.json();
  return body;

};


export { fetchCurrentUserInformation };