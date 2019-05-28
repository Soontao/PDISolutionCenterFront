import ToolPage from "sap/tnt/ToolPage";
import ToolHeader from "sap/tnt/ToolHeader";
import { bindStore, dispatch } from "../../store/Store";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import ObjectPageHeader from "sap/uxap/ObjectPageHeader";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";
import ObjectPageHeaderActionButton from "sap/uxap/ObjectPageHeaderActionButton";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Title from "sap/m/Title";
import { createTenantsList } from "./TenantsList";
import { createTenantFormPopupDialog } from "./TenantFormPopupDialog";
import { Constants } from "../../constants/Constants";

const creator = (): ToolPage => {

  const dialog = createTenantFormPopupDialog();

  const list = createTenantsList();

  const layout: ObjectPageLayout = <ObjectPageLayout
    headerTitle={
      <ObjectPageHeader
        headerDesign="Light"
        objectTitle="PDI Tenants"
        objectSubtitle="Information"
        actions={[
          <ObjectPageHeaderActionButton text="Add new tenant" hideIcon={true} hideText={false} press={() => {
            dispatch({ type: Constants.Actions.TenantSetupPage.OpenForm });
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
      <ToolHeader>
        <ToolbarSpacer />
        <Title text="{/AppName}" titleStyle="H3" />
        <ToolbarSpacer />
      </ToolHeader>
    }
    mainContents={layout}
  />;

  // if dependent addded, the data binding could be applied
  page.addDependent(dialog);

  return page;
};

export const createTenantSetupPage = bindStore(creator);