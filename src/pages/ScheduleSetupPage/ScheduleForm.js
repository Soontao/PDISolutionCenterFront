import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Label from "sap/m/Label";
import Select from "sap/m/Select";
import ListItem from "sap/ui/core/ListItem";

export const createScheduleForm = () => {

  const form: SimpleForm = <SimpleForm>
    <Label required={true}>Source Tenant</Label>
    <Select
      name="SourceTenant"
      showSecondaryValues={true}
      selectedItemId="{/ScheduleSetupPage/Form/SourceTenant}"
      items={{
        path: "{/ScheduleSetupPage/TenantsList}",
        template: <ListItem key="{ID}" text="{Name}" additionalText="{Description}" />
      }}
      change={(e) => {

      }}
    />
    <Label required={true}>Solution</Label>
    <Select
      name="Solution"
      showSecondaryValues={true}
      selectedItemId="{/ScheduleSetupPage/Form/Solution}"
      items={{
        path: "{/ScheduleSetupPage/SolutionsList}",
        template: <ListItem key="{ID}" text="{Name}" additionalText="{Description}" />
      }}
    />

    <Label required={true}>Target Tenant</Label>
    <Select
      name="TargetTenant"
      showSecondaryValues={true}
      selectedItemId="{/ScheduleSetupPage/Form/TargetTenant}"
      items={{
        path: "{/ScheduleSetupPage/TenantsList}",
        template: <ListItem key="{ID}" text="{Name}" additionalText="{Description}" />
      }}
    />

  </SimpleForm>;



  return form;
};