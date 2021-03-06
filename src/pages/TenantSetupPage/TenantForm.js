import SimpleForm from "sap/ui/layout/form/SimpleForm";
import { Constants } from "../../constants/Constants";
import { registerReducer } from "../../store/Store";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";

export const createTenantForm = () => {

  const form: SimpleForm = <SimpleForm>
    <Label required={true} tooltip="Name" >Name</Label>
    <Input
      valueLiveUpdate={true}
      name="Name"
      value={{
        path: "/TenantSetupPage/TenantForm/Name",
        type: "sap.ui.model.type.String",
        constraints: {
          minLength: 1
        }
      }}
    />
    <Label required={true} tooltip="Description" >Description</Label>
    <Input
      valueLiveUpdate={true}
      name="Description"
      value={{
        path: "/TenantSetupPage/TenantForm/Description",
        type: "sap.ui.model.type.String",
        constraints: {
          minLength: 1
        }
      }}
    />
    <Label required={true} tooltip="Tenant Hostname" >Tenant Hostname</Label>
    <Input
      valueLiveUpdate={true}
      name="Tenant Hostname"
      value={{
        path: "/TenantSetupPage/TenantForm/Hostname",
        type: "sap.ui.model.type.String",
        constraints: {
          // must a valid hostname string
          search: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g,
          minLength: 1
        }
      }}
      type="Url"
    />
    <Label required={true}>Tenant Username</Label>
    <Input
      name="Tenant User"
      valueLiveUpdate={true}
      value={{
        path: "/TenantSetupPage/TenantForm/Username",
        type: "sap.ui.model.type.String",
        constraints: {
          minLength: 1
        }
      }}
      type="Text"
    />
    <Label required={true}>Tenant User Password</Label>
    <Input
      name="Tenant User Password"
      value={{
        path: "/TenantSetupPage/TenantForm/Password",
        type: "sap.ui.model.type.String",
        constraints: {
          minLength: 1
        }
      }}
      type="Password"
    />
  </SimpleForm>;

  registerReducer({
    type: Constants.Actions.TenantSetupPage.CreateNewTenant,
    perform: (data, oState) => {
      oState.TenantSetupPage.TenantFormBusy = true;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantSetupPage.ConnectToTenantSuccess,
    perform: (data, oState) => {
      oState.TenantSetupPage.TenantFormBusy = false;
      oState.TenantSetupPage.TenantFormVisible = false;
      oState.TenantSetupPage.TenantForm = {};
      MessageToast.show("Connected");
      // refresh here
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantSetupPage.ConnectToTenantFailed,
    perform: (_, oState) => {
      oState.TenantSetupPage.TenantFormBusy = false;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantSetupPage.CleanTenantForm,
    perform: (data, preState) => {
      preState.TenantSetupPage.TenantForm = {};
      preState.TenantSetupPage.TenantFormValid = false;
      return preState;
    }
  });

  return form;
};