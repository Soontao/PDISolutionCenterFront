import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import CustomData from "sap/ui/core/CustomData";
import ObjectAttribute from "sap/m/ObjectAttribute";

/**
 * create list part for setup page
 */
export const createSchedulePlanList = () => {

  const list: List = <List
    growing={true}
    growingScrollToLoad={true}
    growingThreshold={6}
    busyIndicatorDelay={0}
    busy="{/ScheduleSetupPage/RefreshNow}"
    items={{
      path: "/ScheduleSetupPage/Plans",
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


          }}
        />
      )
    }}
  />;



  return list;

};