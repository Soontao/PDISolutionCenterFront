import { createTenantForm } from "./TenantForm";
import Dialog from "sap/m/Dialog";
import { dispatch, registerReducer } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import Button from "sap/m/Button";
import Input from "sap/m/Input";
import MessageBox from "sap/m/MessageBox";
import { connectToNewTenant } from "../../api/Tenant";

export const createTenantFormPopupDialog = () => {

  const form = createTenantForm();

  const dialog: Dialog = <Dialog
    title="Connect to New Tenant"
    // reuse existed property
    visible="{/TenantSetupPage/TenantFormVisible}"
    busy="{/TenantSetupPage/TenantFormBusy}"
    beforeClose={() => {
      // when keyboard input the 'esc', also will trigger close
      // so that sync close state to store here
      dispatch({ type: Constants.Actions.TenantSetupPage.CloseForm });
    }}
    busyIndicatorDelay={0}
    buttons={[
      <Button
        press={() => {
          try {

            form.getContent().filter(f => f instanceof Input).forEach(f => {
              try {
                // if validate failed, will throw error
                f.getBinding("value").getType().validateValue(f.getProperty("value"));
              } catch (error) {
                throw new Error(`${f.getName()}: ${error.message}`);
              }
            });

            // yes, redux thunk
            dispatch(async(dispatch, getState) => {

              const oState = getState();
              const formData = oState.TenantSetupPage.TenantForm;

              try {
                // set busy now
                dispatch({ type: Constants.Actions.TenantSetupPage.CreateNewTenant });
                await connectToNewTenant(formData);
                // success
                dispatch({ type: Constants.Actions.TenantSetupPage.ConnectToTenantSuccess });
                // refresh list
                dispatch({ type: Constants.Actions.TenantSetupPage.RefreshTenantsList });

              } catch (error) {

                // hide busy
                dispatch({ type: Constants.Actions.TenantSetupPage.ConnectToTenantFailed });
                // show error message
                dispatch({ type: Constants.Actions.Global.Error, param: error });
              }

            });

          } catch (error) {

            MessageBox.error(error.message);

          }


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
      oState.TenantSetupPage.TenantForm = { Username: "", Password: "", Hostname: "" };
      return oState;
    }
  });

  return dialog;

};