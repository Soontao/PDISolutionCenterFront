import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import ObjectAttribute from "sap/m/ObjectAttribute";


export const createTenantDetailSolutionList = () => {

  const list = <List
    growing={true}
    growingScrollToLoad={true}
    growingThreshold={6}
    busyIndicatorDelay={0}
    items={{
      path: "/TenantDetailPage/TenantInfo/Solutions",
      template: (
        <ObjectListItem
          title="{Description}"
          // type="Active"
          attributes={[
            <ObjectAttribute title="Solution ID" text="{Name}" />,
            <ObjectAttribute title="Patch Solution" text="{PatchSolution}" />,
            <ObjectAttribute title="Contact" text="{Contact}" />,
            <ObjectAttribute title="Contact Email" text="{ContactEmail}" />,
            <ObjectAttribute title="Status" text="{CurrentStatus}" />
          ]}

        />
      )
    }}

  />;

  return list;

};