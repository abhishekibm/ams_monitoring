sap.ui.jsview("sap_pi_monitoring_tool.ChannelMonitor", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.ChannelMonitor
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.ChannelMonitor";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.ChannelMonitor
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Title",
			content: [
			          
			]
		});
	}

});