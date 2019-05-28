import { createTenantForm } from "./TenantForm";
import Dialog from "sap/m/Dialog";
import { dispatch, registerReducer } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import Button from "sap/m/Button";

export const createTenantFormPopupDialog = () => {


  const form = createTenantForm();

  const dialog: Dialog = <Dialog
    title="Connect to New Tenant"
    // reuse existed property
    visible="{/TenantSetupPage/TenantFormVisible}"
    busy="{/TenantSetupPage/TenantFormBusy}"
    busyIndicatorDelay={0}
    buttons={[
      <Button
        enabled="{/TenantSetupPage/TenantFormValid}"
        press={() => {
          dispatch({ type: Constants.Actions.TenantSetupPage.CreateNewTenant });
        }}
        text="Submit"
      />,
      <Button press={() => { dispatch({ type: Constants.Actions.TenantSetupPage.CloseForm }); }} >Close</Button>
    ]}
  >
    {form}
  </Dialog>;

  // delay binding after model bind on page
  dialog.attachModelContextChange(() => {
    dialog.getBinding("visible").attachChange((e) => {
      const visible = e.getSource().getValue();
      if (visible) {
        dialog.open();
      } else {
        dialog.close();
      }
    });
  });

  registerReducer({
    type: Constants.Actions.TenantSetupPage.OpenForm, perform: ({ param }, oState) => {
      oState.TenantSetupPage.TenantFormVisible = true;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantSetupPage.CloseForm, perform: (_, oState) => {
      oState.TenantSetupPage.TenantFormBusy = false;
      oState.TenantSetupPage.TenantFormValid = false;
      oState.TenantSetupPage.TenantFormVisible = false;
      oState.TenantSetupPage.TenantForm = {};
      return oState;
    }
  });

  return dialog;

};