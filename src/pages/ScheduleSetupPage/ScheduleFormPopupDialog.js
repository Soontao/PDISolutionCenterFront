import Dialog from "sap/m/Dialog";
import { dispatch, registerReducer } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import Button from "sap/m/Button";
import Input from "sap/m/Input";
import MessageBox from "sap/m/MessageBox";
import { createScheduleForm } from "./ScheduleForm";

export const createScheduleFormPopupDialog = () => {

  const form = createScheduleForm();

  const dialog: Dialog = <Dialog
    title="Connect to New Schedule Plan"
    // reuse existed property
    visible="{/ScheduleSetupPage/FormVisible}"
    busy="{/ScheduleSetupPage/FormBusy}"
    beforeClose={() => {
      // when keyboard input the 'esc', also will trigger close
      // so that sync close state to store here
      dispatch({ type: Constants.Actions.ScheduleSetupPage.CloseForm });
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


            });

          } catch (error) {

            MessageBox.error(error.message);

          }


        }}
        text="Submit"
      />,
      <Button press={() => { dispatch({ type: Constants.Actions.ScheduleSetupPage.CloseForm }); }} >Close</Button>
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
    type: Constants.Actions.ScheduleSetupPage.OpenForm, perform: ({ param }, oState) => {
      oState.ScheduleSetupPage.FormVisible = true;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.ScheduleSetupPage.CloseForm, perform: (_, oState) => {
      oState.ScheduleSetupPage.FormVisible = false;
      return oState;
    }
  });

  return dialog;

};