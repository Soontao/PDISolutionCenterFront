import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import CustomData from "sap/ui/core/CustomData";
import ObjectAttribute from "sap/m/ObjectAttribute";
import ObjectStatus from "sap/m/ObjectStatus";
import MessageToast from "sap/m/MessageToast";

/**
 * create list part for setup page
 */
export const createTenantsList = () => {

  const list: List = <List
    growing={true}
    growingScrollToLoad={true}
    growingThreshold={6}
    items={{
      path: "/TenantSetupPage/Tenants",
      template: (
        <ObjectListItem
          title="{Name}"
          type="Active"
          customData={<CustomData key="ObjectID" value="{ID}" />}
          number={{ path: "Version", formatter: v => `Version: ${v}` }}
          attributes={[
            <ObjectAttribute title="Hostname" text="{Host}" />,
            <ObjectAttribute title="Status" text="{Status}" />
          ]}
          firstStatus={
            <ObjectStatus
              text="{Status}"
              state={{
                path: "Status",
                formatter: s => (s == "In Development" || s == "Deployed") ? "Success" : "Warning"
              }}
            />
          }
          // when press, get data from custom data
          press={(e) => { var itemId = e.getSource().getCustomData()[0].getValue(); MessageToast.show(`Click Item: ${itemId}`); }}
        />
      )
    }}
  />;

  return list;

};