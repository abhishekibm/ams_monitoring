sap.ui.jsview("sap_pi_monitoring_tool.Initial", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.Initial
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Initial";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.Initial
	*/ 
	createContent : function(oController) {
		
		var loginBox = sap.ui.view({
			id : "idhome",
			viewName : "sap_pi_monitoring_tool.Login",
			type : sap.ui.core.mvc.ViewType.JS,
			layoutData : new sap.ui.layout.GridData({
				span : "L6"
		    })
		});
		
		/*
		 * layoutData : new sap.ui.layout.GridData({
									span : "L6 M6 S12"
							})
		 */
		var LeftGrid = new sap.ui.layout.VerticalLayout({
			
			content :[
			          	new sap.ui.commons.Image({src: 'images/ibm-logos/64px-IBM_logo.svg.png'}),
						new sap.ui.commons.TextView({
							text : '\n\nPI Monitoring Tool. \nBrief description About this tool. Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy \nFeatures: 1. 2. 3. \n\n\nCredits. @IBM'
						})
			],
			layoutData : new sap.ui.layout.GridData({
				span : "L6"
		    })
		});
		var oGrid1 = new sap.ui.layout.Grid({
			hSpacing: 2,
			vSpacing: 1,
			content: [
				loginBox,
				LeftGrid
			]
		});
		
		loginBox.addStyleClass('loginBox');
		return oGrid1;
	}

});