/*global QUnit*/

sap.ui.define([
	"root/ui5python/controller/BView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BView Controller");

	QUnit.test("I should test the BView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
