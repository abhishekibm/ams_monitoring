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
		
		console.log(settings);
		for(prop in settings){
			
			if(!prop.endsWith("_allowed")){
			var lbProp = new sap.ui.commons.Label({text : prop+' : '});
			var ddBox = new sap.ui.commons.DropdownBox();
			var lbCurrent = new sap.ui.commons.Label({text : ' Current value: '+settings[prop]});
			var lbDefault = new sap.ui.commons.Label({text : ' Default value: '+default_settings[prop]});
			for(var k=0; k<settings[prop+'_allowed'].length; k++ ){
			oItem = new sap.ui.core.ListItem();
			oItem.setText(settings[prop+'_allowed'][k]);
			ddBox.addItem(oItem);
			
			}
			//ddBox.attachChange(function(){ update(prop, ddBox.getValue()); oTextView.setText(JSON.stringify(settings));});
			oLayout.createRow(lbProp, ddBox, lbCurrent, lbDefault);
			}
		}
		
		
		//oLayout.createRow(oTextView);
		return oLayout;
	}

});