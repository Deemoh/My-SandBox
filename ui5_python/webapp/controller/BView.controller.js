sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat"
], (Controller, DateFormat) => {
    "use strict";

    return Controller.extend("root.ui5python.controller.BView", {
        onInit() {

            var oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel);
            // var oData = this.getView().getModel("jsonModel");
            // oData.setData({
            //     "EntryCollection": [{
            //     "Author": "",
            //     "Type": "Request",
            //     "Text": ""  
            //     }]
            // });
            this.loadData();

            var oData = this.getView().getModel();
            oData.setData({
                "EntryCollection": [{
                    Text: "Welcome to the AI Chatbot",
                    AuthorPicUrl: "https://cdn-icons-gif.flaticon.com/11260/11260839.gif"
                 }]
            });


        },

        loadData: function () {
        },

        onPost: function (oEvent) {

            var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
            var oDate = new Date();
            var sDate = oFormat.format(oDate);
   
            // create new entry
            var sValue = oEvent.getParameter("value");
            var oEntry = {
                Author: "You",
                AuthorPicUrl: "https://media.lordicon.com/icons/wired/flat/288-avatar-man-search.gif",
                Type: "Request",
                Date: "" + sDate,
                Text: sValue
            };

            // update model
            var oModel = this.getView().getModel();
            var aEntries = oModel.getData().EntryCollection;
            // aEntries = [];
            aEntries.unshift(oEntry);
            oModel.setData({
                EntryCollection: aEntries
            });

            var oList = this.getView().byId("IDFeedListItem");
            // oList.refresh();

            var that = this;
            $.ajax({
                url: "http://127.0.0.1:5000/api/llm",
                crossOriginIsolated: true,
                type: "GET",
                data: {
                    "param1": sValue
                },
                dataType: "json",
                success: function (data) {
                    var oModel = that.getView().getModel();
            var oSFormat = DateFormat.getDateTimeInstance({ style: "medium" });        
            var oSDate = new Date();
            var sUDate = oSFormat.format(oSDate);                    
                    var oEntry = {
                        Author: "AI",
                        AuthorPicUrl: "https://cdn-icons-gif.flaticon.com/11260/11260839.gif",
                        Type: "Request",
                        Date: "" + sUDate,
                        Text: data.Message
                    };
                    var oModel = that.getView().getModel();
                    var aEntries = oModel.getData().EntryCollection;
                    aEntries.unshift(oEntry);
                    oModel.setData({
                        EntryCollection: aEntries
                    });
                    // sap.m.MessageToast.show(data.Message);
                },
                error: function (xhr, status, error) {
                    sap.m.MessageToast.show("Error: " + error);
                    console.log("Error: " + error);
                }
            });

        },

        onSub: function () {

            var that = this;
            var oQuest = this.getView().byId("idIp").getValue();
            $.ajax({
                url: "http://127.0.0.1:5000/api/llm",
                crossOriginIsolated: true,
                type: "GET",
                data: {
                    "param1": oQuest
                },
                dataType: "json",
                success: function (data) {
                    var oModel = that.getView().getModel();
                    oModel.setData(data);
                    sap.m.MessageToast.show(data.Message);
                },
                error: function (xhr, status, error) {
                    sap.m.MessageToast.show("Error: " + error);
                }
            });

        }

    });
});