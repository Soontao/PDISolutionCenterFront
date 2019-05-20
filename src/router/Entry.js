import NavContainer from "sap/m/NavContainer";
import { createHomePage } from "../pages/HomePage";

const AppRouter: NavContainer = <NavContainer
  height="16em"
  pages={[
    createHomePage()
  ]}
/>;

export { AppRouter };