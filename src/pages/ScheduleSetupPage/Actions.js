import { Constants } from "../../constants/Constants";
import { fetchCurrentUserAllTenants } from "../../api/Tenant";
import { registerReducer } from "../../store/Store";


export const OpenScheduleForm = async(dispatch, getState) => {

  dispatch({ type: Constants.Actions.ScheduleSetupPage.OpenForm });

  dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormBusy, param: true });

  try {
    const { Tenants } = await fetchCurrentUserAllTenants();

    dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormSelectTenants, param: Tenants });
  } catch (error) {

    dispatch({ type: Constants.Actions.Global.Error, param: error });

  }

  dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormBusy, param: false });

};

registerReducer({
  type: Constants.Actions.ScheduleSetupPage.SetFormSelectTenants,
  perform: ({ param }, state) => {
    state.ScheduleSetupPage.TenantsList = param;
    return state;
  }
});