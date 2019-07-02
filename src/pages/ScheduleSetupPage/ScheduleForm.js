import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Label from "sap/m/Label";
import Select from "sap/m/Select";
import ListItem from "sap/ui/core/ListItem";
import { dispatch } from "../../store/Store";
import { SourceTenantChanged } from "./Actions";

export const createScheduleForm = () => {

  const tenantItem: ListItem = <ListItem
    key="{ID}"
    text="{Name}"
    additionalText="{Description}"
  />;

  const form: SimpleForm = <SimpleForm>
    <Label required={true}>Source Tenant</Label>
    <Select
      name="SourceTenant"
      showSecondaryValues={true}
      selectedKey="{/ScheduleSetupPage/Form/SourceTenant}"
      items={{
        path: "/ScheduleSetupPage/TenantsList",
        template: tenantItem
      }}
      change={(e) => {
        dispatch(SourceTenantChanged);
      }}
    />
    <Label required={true}>Solution</Label>
    <Select
      name="Solution"
      showSecondaryValues={true}
      selectedItemId="{/ScheduleSetupPage/Form/Solution}"
      items={{
        path: "/ScheduleSetupPage/SolutionsList",
        template: <ListItem key="{ID}" text="{Name}" additionalText="{Description}" />
      }}
    />

    <Label required={true}>Target Tenant</Label>
    <Select
      name="TargetTenant"
      showSecondaryValues={true}
      selectedKey="{/ScheduleSetupPage/Form/TargetTenant}"
      items={{
        path: "/ScheduleSetupPage/TargetTenantsList",
        template: tenantItem
      }}
    />

  </SimpleForm>;



  return form;
};