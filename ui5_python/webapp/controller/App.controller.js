sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("root.ui5python.controller.App", {
      onInit() {

        // this.getView().byId("app").getAggregation("_navMaster").setWidth("500px");

      }
  });
});