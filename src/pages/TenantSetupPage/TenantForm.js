import SimpleForm from "sap/ui/layout/form/SimpleForm";
import { Constants } from "../../constants/Constants";
import { dispatch, registerReducer } from "../../store/Store";
import Label from "sap/m/Label";
import Input from "sap/m/Input";


export const createTenantForm = () => {

  const form: SimpleForm = <SimpleForm
    validationError={() => {
      dispatch({ type: Constants.Store.SetProperty, param: { sPath: "/TenantSetupPage/TenantFormValid", oValue: false } });
    }}
  >
    <Label required={true} tooltip="Tenant Hostname" >Tenant Hostname</Label>
    <Input
      valueLiveUpdate={true}
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
    perform: (data, preState) => {
      preState.TenantSetupPage.TenantFormBusy = true;
      // async data transform
      return preState;
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