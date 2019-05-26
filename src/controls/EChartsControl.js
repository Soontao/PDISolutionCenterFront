import Control from "sap/ui/core/Control";
import HTML from "sap/ui/core/HTML";
import echarts from "echarts";

const CHARTS = "chart";

export default class EChartsControl extends Control {

  metadata = {
    properties: {
      data: {
        type: "object"
      }
    },
    aggregations: {
      _html: {
        type: "sap.ui.core.HTML",
        multiple: false,
        visibility: "hidden"
      }
    },
    defaultAggregation: "data"
  }

  init() {
    super.init();
    const divId = `${this.getId()}_${CHARTS}`;
    const div = `<div id="${divId}" style="height:100%;"></div>`;
    this.setAggregation("_html", <HTML content={div} />);
    this._chartContainerId = divId;
  }

  onAfterRendering() {
    // after render, dom existed
    this._chartRef = echarts.init(document.getElementById(this._chartContainerId));

    // change on dynamic
    // generally, control use getter/setter to update dom
    // but for this control. we use a directly way
    this.getBinding("data").attachEvent("change", (e) => {
      this._chartRef.setOption(e.getSource().getValue());
    });

  }

  renderer(oRM, oControl) {
    oRM.write("<div");
    oRM.writeControlData(oControl);
    oRM.writeClasses();
    oRM.write(">");
    oRM.renderControl(oControl.getAggregation("_html"));
    oRM.write("</div>");
  }

}