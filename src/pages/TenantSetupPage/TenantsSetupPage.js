import ToolPage from "sap/tnt/ToolPage";
import ToolHeader from "sap/tnt/ToolHeader";
import Button from "sap/m/Button";
import { dispatch, bindStore } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import ObjectPageHeader from "sap/uxap/ObjectPageHeader";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";
import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import ObjectAttribute from "sap/m/ObjectAttribute";
import ObjectPageHeaderActionButton from "sap/uxap/ObjectPageHeaderActionButton";
import ObjectStatus from "sap/m/ObjectStatus";
import Dialog from "sap/m/Dialog";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import MessageToast from "sap/m/MessageToast";
import CustomData from "sap/ui/core/CustomData";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Title from "sap/m/Title";


const creator = (): ToolPage => {

  const form: SimpleForm = <SimpleForm />;

  const dialog: Dialog = <Dialog title="New Tenant">{form}</Dialog>;

  const list: List = <List
    growing={true}
    growingScrollToLoad={true}
    growingThreshold={6}
    items={{
      path: "/TenantSetupPage/Tenants",
      template: <ObjectListItem
        title="{Name}"
        type="Active"
        customData={<CustomData key="ObjectID" value="{ID}" />}
        number={{ path: "Version", formatter: v => `Version: ${v}` }}
        attributes={[
          <ObjectAttribute title="Hostname" text="{Host}" />,
          <ObjectAttribute title="Status" text="{Status}" />
        ]}
        firstStatus={<ObjectStatus text="{Status}" state={{ path: "Status", formatter: s => (s == "In Development" || s == "Deployed") ? "Success" : "Warning" }} />}
        press={(e) => { var itemId = e.getSource().getCustomData()[0].getValue(); MessageToast.show(`Click Item: ${itemId}`); }}
      />
    }}
  />;


  const layout: ObjectPageLayout = <ObjectPageLayout
    headerTitle={
      <ObjectPageHeader
        headerDesign="Light"
        objectTitle="PDI Tenants"
        objectSubtitle="Information"
        actions={[
          <ObjectPageHeaderActionButton text="Add new tenant" hideIcon={true} hideText={false} press={() => {
            // replace with action
            dialog.open();
          }} />,
          <ObjectPageHeaderActionButton text="Refresh" hideIcon={true} hideText={false} press={() => { }} />

        ]}
      />
    }
    sections={
      <ObjectPageSection
        showTitle={false}
        subSections={<ObjectPageSubSection blocks={list} />}
      />
    }
  />;

  const page: ToolPage = <ToolPage
    header={
      <ToolHeader >
        <Button press={() => { dispatch({ type: Constants.Actions.Router.Back }); }} type="Transparent">Back</Button>
        <ToolbarSpacer />
        <Title text="{/AppName}" titleStyle="H3" />
        <ToolbarSpacer />
      </ToolHeader>
    }
    mainContents={layout}
  />;

  return page;
};

export const createTenantSetupPage = bindStore(creator);