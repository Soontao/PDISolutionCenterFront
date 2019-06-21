import ToolPage from "sap/tnt/ToolPage";
import { createHeader } from "../Shared/Header";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import { dispatch } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import ObjectPageHeader from "sap/uxap/ObjectPageHeader";
import ObjectPageHeaderActionButton from "sap/uxap/ObjectPageHeaderActionButton";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";
import { createScheduleFormPopupDialog } from "./ScheduleFormPopupDialog";
import { OpenScheduleForm } from "./Actions";

const creator = () => {

  const formDialog = createScheduleFormPopupDialog();

  const layout: ObjectPageLayout = <ObjectPageLayout
    headerTitle={
      <ObjectPageHeader
        headerDesign="Light"
        objectTitle="Schedule Plans"
        objectSubtitle="Information"
        actions={[
          <ObjectPageHeaderActionButton text="Add new schedule plan" hideIcon={true} hideText={false} press={() => {
            dispatch(OpenScheduleForm);
          }} />,
          <ObjectPageHeaderActionButton text="Refresh" hideIcon={true} hideText={false} press={async() => {
            dispatch({ type: Constants.Actions.ScheduleSetupPage.RefreshList });
          }} />
        ]}
      />
    }
    sections={
      <ObjectPageSection
        showTitle={false}
        subSections={
          <ObjectPageSubSection

          />
        }
      />
    }
  />;

  const page: ToolPage = <ToolPage
    header={createHeader()}
    mainContents={layout}
  />;

  page.addDependent(formDialog);

  page.addEventDelegate({
    onBeforeShow: ()=> {
      dispatch({ type: Constants.Actions.ScheduleSetupPage.RefreshList });
    }
  });

  return page;

};


export const createScheduleSetupPage = creator;