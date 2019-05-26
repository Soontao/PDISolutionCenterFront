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

  /**
   * receive new data
   *
   * @param {object} data
   */
  setData(data) {
    // if chart exist, update option
    if (this._chartRef) {
      this._chartRef.setOption(data);
    }
    this.setProperty("data", data, true);
  }

  onAfterRendering() {
    // after render, dom existed
    this._chartRef = echarts.init(document.getElementById(this._chartContainerId));
    this._chartRef.setOption(this.getProperty("data"));
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