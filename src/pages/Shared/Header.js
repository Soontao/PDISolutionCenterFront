import ToolHeader from "sap/tnt/ToolHeader";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Title from "sap/m/Title";

export const createHeader = () => {
  return (
    <ToolHeader>
      <ToolbarSpacer />
      <Title text="{/AppName}" titleStyle="H3" />
      <ToolbarSpacer />
    </ToolHeader>
  );
};