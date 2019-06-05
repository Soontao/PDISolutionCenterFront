import ToolPage from "sap/tnt/ToolPage";
import Title from "sap/m/Title";
import BlockLayout from "sap/ui/layout/BlockLayout";
import BlockLayoutRow from "sap/ui/layout/BlockLayoutRow";
import BlockLayoutCell from "sap/ui/layout/BlockLayoutCell";
import VerticalLayout from "sap/ui/layout/VerticalLayout";
import Icon from "sap/ui/core/Icon";
import Link from "sap/m/Link";
import { bindStore, dispatch } from "../../store/Store";
import { Constants } from "../../constants/Constants";
import Text from "sap/m/Text";
import { createHeader } from "../Shared/Header";



const creator = (): ToolPage => {

  const iconSize = "3rem";

  const page: ToolPage = <ToolPage
    header={createHeader()}

    mainContents={
      <BlockLayout background="Default">
        <BlockLayoutRow >
          <BlockLayoutCell
            title="Welcome to PDI Solution Center"
            titleLevel="H1"
            backgroundColorSet="ColorSet11"
            backgroundColorShade="ShadeD"
          >
            <VerticalLayout>
              <Text>Provide the central PDI solutions management tool</Text>
            </VerticalLayout>
          </BlockLayoutCell>
        </BlockLayoutRow>
        <BlockLayoutRow >
          <BlockLayoutCell backgroundColorSet="ColorSet11" backgroundColorShade="ShadeA">
            <VerticalLayout>
              <Icon src="sap-icon://it-system" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom">Tenants</Title>
              <Link press={() => { dispatch({ type: Constants.Actions.Router.NavTo, param: Constants.Pages.TenantSetupPage }); }}>
                Setup tenant information
              </Link>
            </VerticalLayout>
          </BlockLayoutCell>
          <BlockLayoutCell backgroundColorSet="ColorSet11" backgroundColorShade="ShadeB">
            <VerticalLayout>
              <Icon src="sap-icon://product" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom" >Solutions</Title>
              <Link>Setup solution information</Link>
            </VerticalLayout>
          </BlockLayoutCell>
          <BlockLayoutCell backgroundColorSet="ColorSet11" backgroundColorShade="ShadeC">
            <VerticalLayout>
              <Icon src="sap-icon://activity-2" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom" >Schedule Job</Title>
              <Link>Setup schedule job</Link>
            </VerticalLayout>
          </BlockLayoutCell>
          <BlockLayoutCell backgroundColorSet="ColorSet11" backgroundColorShade="ShadeD">
            <VerticalLayout>
              <Icon src="sap-icon://wrench" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom" >Tools</Title>
              <Link>Some util tools</Link>
            </VerticalLayout>
          </BlockLayoutCell>
        </BlockLayoutRow>
      </BlockLayout>
    }
  />;

  return page;
};

export const createHomePage = bindStore(creator);