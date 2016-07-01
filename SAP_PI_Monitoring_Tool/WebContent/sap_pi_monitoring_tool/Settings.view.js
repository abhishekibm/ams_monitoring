sap.ui.jsview("sap_pi_monitoring_tool.Settings", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.Settings
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Settings";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.Settings
	*/ 
	createContent : function(oController) {
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false
		});
		
		
		var oInputTextArea = new sap.ui.commons.TextArea({
			cols: 90,
			rows: 20
		});
		oInputTextArea.setValue(JSON.stringify(getSettings(), null, 2));

		oLayout.createRow(oInputTextArea);
		var btn = new sap.m.Button({
			text: "Save",
			press: function(oControlEvent){
				try{
				//settings = JSON.parse(oInputTextArea.getValue());
				setCookie("settings", JSON.stringify(JSON.parse(oInputTextArea.getValue())), 365);
				sap.ui.commons.MessageBox.show(
					      "Settings is succesfully saved",
					      sap.ui.commons.MessageBox.Icon.INFORMATION,
					      "Saved"
					      //[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
					      //function() { / * do something * / }
					  );
				console.log(getSettings());
				}catch(err){
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.alert(
						      err,
						      sap.ui.commons.MessageBox.Icon.INFORMATION,
						      "Error"
						      //[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
						      //function() { / * do something * / }
						  );
					console.log(getSettings());
				}
			}
		});
		var d_btn = new sap.m.Button({
			text: "Default Settings",
			press: function(oControlEvent){
				try{
					oInputTextArea.setValue(JSON.stringify(default_settings, null, 2))
					//settings = default_settings;
					setCookie("settings", JSON.stringify(default_settings), 365);
				sap.ui.commons.MessageBox.show(
					      "Default Settings is succesfully saved",
					      sap.ui.commons.MessageBox.Icon.INFORMATION,
					      "Saved"
					      //[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
					      //function() { / * do something * / }
					  );
				console.log(settings);
				}catch(err){
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.alert(
						      err,
						      sap.ui.commons.MessageBox.Icon.INFORMATION,
						      "Error"
						      //[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
						      //function() { / * do something * / }
						  );
					console.log(settings);
				}
			}
		});
		
		
		//// Timezone combobox ////
		
		var timezoneModel = new sap.ui.model.json.JSONModel();
		timezoneModel.loadData("data/timezones.json");
		//timezoneModel.setData(data);
        this.setModel(timezoneModel);
        var list = new sap.ui.commons.ComboBox("tz",{
        	displaySecondaryValues:true
        });
		
     // bind the List items to the data collection
        list.bindItems({
            path : "/", 
            //sorter : new sap.ui.model.Sorter("prodName"),
            //template : listTmpl
            template : new sap.ui.core.ListItem({
            	 text:"{text}", additionalText:"{offset}"
            })
        }); 
        oLayout.createRow(list);
		//////////////////////////
		
        oLayout.createRow(btn);
		oLayout.createRow(d_btn);
		return oLayout;
	}

});