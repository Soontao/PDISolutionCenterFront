import JSONModel from "sap/ui/model/json/JSONModel";
import ToolPage from "sap/tnt/ToolPage";
import ToolHeader from "sap/tnt/ToolHeader";
import Button from "sap/m/Button";
import NavContainer from "sap/m/NavContainer";
import Page from "sap/m/Page";

interface Props {
  AppRouter: NavContainer;
  Pages: { [string]: Page };
}

const createTenantSetupPage = (props: Props): ToolPage => {
  const state = new JSONModel();
  const page: ToolPage = <ToolPage
    header={
      <ToolHeader>
        <Button press={() => { props.AppRouter.to(props.Pages.HomePage); }}>Back</Button>
      </ToolHeader>
    }
  />;


  return page.setModel(state);
};


export { createTenantSetupPage };