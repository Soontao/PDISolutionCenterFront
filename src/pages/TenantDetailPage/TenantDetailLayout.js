import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import ObjectPageHeader from "sap/uxap/ObjectPageHeader";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";
import { createTenantDetailSolutionList } from "./SolutionList";
import ObjectAttribute from "sap/m/ObjectAttribute";


export const createTenantDetailPageLayout = () => {

  const layout: ObjectPageLayout = <ObjectPageLayout
    headerTitle={
      <ObjectPageHeader
        headerDesign="Light"
        objectTitle="{/TenantDetailPage/TenantInfo/Name}"
        objectSubtitle="{/TenantDetailPage/TenantInfo/Description}"
      />
    }
    headerContent={[
      <ObjectAttribute title="Tenant Host" text="{/TenantDetailPage/TenantInfo/TenantHost}" />,
      <ObjectAttribute title="Tenant User" text="{/TenantDetailPage/TenantInfo/TenantUser}" />,
      <ObjectAttribute title="Created at" text="{/TenantDetailPage/TenantInfo/CreatedAt}" />
    ]}
    sections={
      <ObjectPageSection
        title="Solutions"
        subSections={
          <ObjectPageSubSection
            blocks={createTenantDetailSolutionList()}
          />
        }
      />
    }
  />;

  return layout;
};