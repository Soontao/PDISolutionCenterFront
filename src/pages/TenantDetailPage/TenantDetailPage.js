import { bindStore, dispatch, registerReducer } from "../../store/Store";
import ToolPage from "sap/tnt/ToolPage";
import { Constants } from "../../constants/Constants";
import { fetchTenantDetail } from "../../api/Tenant";
import { createHeader } from "../Shared/Header";
import { createTenantDetailPageLayout } from "./TenantDetailLayout";


export const creator = () => {

  const page: ToolPage = <ToolPage

    busyIndicatorDelay={0}
    busy="{/TenantDetailPage/Busy}"
    header={createHeader()}
    mainContents={createTenantDetailPageLayout()}

  />;

  page.addEventDelegate({

    onBeforeShow: async({ data: { id } }) => {

      dispatch({ type: Constants.Actions.TenantDetailPage.OnRefresh });

      try {

        const tenant = await fetchTenantDetail(id);

        dispatch({ type: Constants.Actions.TenantDetailPage.SetTenantPageInfo, param: tenant });

      } catch (error) {

        dispatch({ type: Constants.Actions.Global.Error, param: error });

      }

      dispatch({ type: Constants.Actions.TenantDetailPage.RefreshFinished });

    },

    onAfterHide: () => {
      // clean data
      dispatch({ type: Constants.Actions.TenantDetailPage.SetTenantPageInfo, param: {} });
    }

  });

  registerReducer({
    type: Constants.Actions.TenantDetailPage.OnRefresh,
    perform: (_, oState) => {
      oState.TenantDetailPage.Busy = true;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantDetailPage.RefreshFinished,
    perform: (_, oState) => {
      oState.TenantDetailPage.Busy = false;
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantDetailPage.SetTenantPageInfo,
    perform: ({ param }, oState) => {
      oState.TenantDetailPage.TenantInfo = param;
      return oState;
    }
  });

  return page;

};

export const createTenantDetailPage = bindStore(creator);