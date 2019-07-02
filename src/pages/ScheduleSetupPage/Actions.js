import { Constants } from "../../constants/Constants";
import { fetchCurrentUserAllTenants, fetchTenantDetail } from "../../api/Tenant";
import { registerReducer } from "../../store/Store";
import { InitializeStateType } from "../../store/State";

export const updateAvailableSolutions = (tenantId: number) => async(dispatch, getState) => {

  const { Solutions } = await fetchTenantDetail(tenantId);

  dispatch({
    type: Constants.Actions.ScheduleSetupPage.SetFormSelectSolutions,
    param: Solutions
  });

};

export const SourceTenantChanged = async(dispatch, getState) => {

  const currentState: InitializeStateType = getState();

  dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormBusy, param: true });

  const sourceTenant = currentState.ScheduleSetupPage.Form.SourceTenant;

  if (sourceTenant) {

    const selectAbleTargets = currentState.ScheduleSetupPage.TenantsList.filter(({ ID }) => ID != sourceTenant);

    dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormSelectTargetTenants, param: selectAbleTargets });

    dispatch(updateAvailableSolutions(sourceTenant));

  }

  // update solutions

  dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormBusy, param: false });

};

export const OpenScheduleForm = async(dispatch, getState) => {

  dispatch({ type: Constants.Actions.ScheduleSetupPage.OpenForm });

  dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormBusy, param: true });

  try {
    const { Tenants } = await fetchCurrentUserAllTenants();

    // set available source tenants
    dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormSelectTenants, param: Tenants });

    // set available target tenants
    dispatch({
      type: Constants.Actions.ScheduleSetupPage.SetFormSelectTargetTenants,
      param: Tenants.filter((_, idx) => idx != 0)
    });

    if (Tenants) {

      dispatch(updateAvailableSolutions(Tenants[0].ID));



    }

  } catch (error) {

    dispatch({ type: Constants.Actions.Global.Error, param: error });

  }

  dispatch({ type: Constants.Actions.ScheduleSetupPage.SetFormBusy, param: false });

};



registerReducer({
  type: Constants.Actions.ScheduleSetupPage.SetFormSelectSolutions,
  perform: ({ param }, state) => {
    state.ScheduleSetupPage.SolutionsList = param;
    return state;
  }
});

registerReducer({
  type: Constants.Actions.ScheduleSetupPage.SetFormSelectTenants,
  perform: ({ param }, state) => {
    state.ScheduleSetupPage.TenantsList = param;
    return state;
  }
});

registerReducer({
  type: Constants.Actions.ScheduleSetupPage.SetFormSelectTargetTenants,
  perform: ({ param }, state) => {
    state.ScheduleSetupPage.TargetTenantsList = param;
    return state;
  }
});