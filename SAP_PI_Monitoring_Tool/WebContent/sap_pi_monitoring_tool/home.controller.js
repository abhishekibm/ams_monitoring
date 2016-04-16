sap.ui.controller("sap_pi_monitoring_tool.home", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.home
*/
	onInit: function() {
		console.log('home init');
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_monitoring_tool.home
*/
  	onBeforeRendering: function() {
  		console.log('home before rendering');
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_monitoring_tool.home
*/
	onAfterRendering: function() {
		console.log('home after rendering');
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.home
*/
	onExit: function() {
		console.log('home exit');
	}

});