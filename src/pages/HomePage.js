import JSONModel from "sap/ui/model/json/JSONModel";
import ToolPage from "sap/tnt/ToolPage";
import ToolHeader from "sap/tnt/ToolHeader";
import Title from "sap/m/Title";
import BlockLayout from "sap/ui/layout/BlockLayout";
import BlockLayoutRow from "sap/ui/layout/BlockLayoutRow";
import BlockLayoutCell from "sap/ui/layout/BlockLayoutCell";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import VerticalLayout from "sap/ui/layout/VerticalLayout";
import Icon from "sap/ui/core/Icon";
import Link from "sap/m/Link";
import NavContainer from "sap/m/NavContainer";
import Page from "sap/m/Page";

interface Props {
  AppRouter: NavContainer;
  Pages: { [string]: Page };
}

export const createHomePage = (props: Props): ToolPage => {
  const state = new JSONModel({
    title: "PDI Solution Center",
    welcome: "Welcome to PDI Solution Center ",
    solutions: "Solutions"
  });

  const iconSize = "3rem";

  const page: ToolPage = <ToolPage
    header={
      <ToolHeader >
        <ToolbarSpacer />
        <Title text="{/title}" titleStyle="H3" />
        <ToolbarSpacer />
      </ToolHeader>
    }
    mainContents={
      <BlockLayout background="Default">
        <BlockLayoutRow >
          <BlockLayoutCell
            title="{/welcome}"
            titleLevel="H1"
            backgroundColorSet="ColorSet11"
            backgroundColorShade="ShadeD"
          />
        </BlockLayoutRow>
        <BlockLayoutRow >
          <BlockLayoutCell
            backgroundColorSet="ColorSet11"
            backgroundColorShade="ShadeA"
          >
            <VerticalLayout>
              <Icon src="sap-icon://it-system" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom" >Tenants</Title>
              <Link press={() => { props.AppRouter.to(props.Pages.TenantSetupPage); }}>Setup tenant information</Link>
            </VerticalLayout>
          </BlockLayoutCell>
          <BlockLayoutCell
            backgroundColorSet="ColorSet11"
            backgroundColorShade="ShadeB"
          >
            <VerticalLayout>
              <Icon src="sap-icon://product" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom" >Solutions</Title>
              <Link>Setup solution information</Link>
            </VerticalLayout>
          </BlockLayoutCell>
          <BlockLayoutCell
            backgroundColorSet="ColorSet11"
            backgroundColorShade="ShadeC"
          >
            <VerticalLayout>
              <Icon src="sap-icon://activity-2" size={iconSize} color="Default" />
              {/* with some margin */}
              <Title titleStyle="H2" class="sapUiTinyMarginTopBottom" >Schedule Job</Title>
              <Link>Setup schedule job</Link>
            </VerticalLayout>
          </BlockLayoutCell>
          <BlockLayoutCell
            backgroundColorSet="ColorSet11"
            backgroundColorShade="ShadeD"
          >
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

  return page.setModel(state);
};