import ToolPage from "sap/tnt/ToolPage";
import ToolHeader from "sap/tnt/ToolHeader";
import Button from "sap/m/Button";
import { dispatch, bindStore } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import ButtonType from "sap/m/ButtonType";


const creator = (): ToolPage => {

  const page: ToolPage = <ToolPage
    header={
      <ToolHeader >
        <Button press={() => { dispatch({ type: Constants.Actions.Router.Back }); }} type={ButtonType.Transparent}>Back</Button>
      </ToolHeader>
    }
  />;

  return page;
};

export const createTenantSetupPage = bindStore(creator);