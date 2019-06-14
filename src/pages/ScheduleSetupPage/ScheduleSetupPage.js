import { bindStore } from "../../store/Store";
import ToolPage from "sap/tnt/ToolPage";
import { createHeader } from "../Shared/Header";


const creator = () => {

  const page: ToolPage = <ToolPage
    header={createHeader()}
  />;

  return page;

};


export const createScheduleSetupPage = bindStore(creator);