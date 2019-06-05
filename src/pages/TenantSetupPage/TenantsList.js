import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import CustomData from "sap/ui/core/CustomData";
import ObjectAttribute from "sap/m/ObjectAttribute";
import { registerReducer, dispatch } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import { fetchCurrentUserAllTenants } from "../../api/Tenant";

/**
 * create list part for setup page
 */
export const createTenantsList = () => {

  const list: List = <List
    growing={true}
    growingScrollToLoad={true}
    growingThreshold={6}
    busyIndicatorDelay={0}
    busy="{/TenantSetupPage/RefreshNow}"
    items={{
      path: "/TenantSetupPage/Tenants",
      template: (
        <ObjectListItem
          title="{Name}"
          type="Active"
          customData={<CustomData key="ObjectID" value="{ID}" />}
          attributes={[
            <ObjectAttribute title="Hostname" text="{TenantHost}" />,
            <ObjectAttribute title="Tenant User" text="{TenantUser}" />
          ]}

          // when press, get data from custom data
          press={(e) => {
            var itemId = e.getSource().getCustomData()[0].getValue();
            // may be need refactor
            window.location.hash = `#/${Constants.Pages.TenantDetailPage}/${itemId}`;
          }}
        />
      )
    }}
  />;

  registerReducer({
    type: Constants.Actions.TenantSetupPage.RefreshTenantsList,
    perform: ({ param }, oState) => {
      oState.TenantSetupPage.RefreshNow = true;
      fetchCurrentUserAllTenants().then(({ Tenants }) => {
        dispatch({ type: Constants.Actions.TenantSetupPage.SetTenantsListData, param: Tenants });
      });
      return oState;
    }
  });

  registerReducer({
    type: Constants.Actions.TenantSetupPage.SetTenantsListData,
    perform: ({ param }, oState) => {
      oState.TenantSetupPage.Tenants = param;
      oState.TenantSetupPage.RefreshNow = false;
      return oState;
    }
  });


  return list;

};