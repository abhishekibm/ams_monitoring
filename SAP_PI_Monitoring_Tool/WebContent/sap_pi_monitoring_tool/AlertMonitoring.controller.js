var oCon;
var oModel_Alerts = new sap.ui.model.json.JSONModel();
var oModel_chart = new sap.ui.model.json.JSONModel();
sap.ui.controller("sap_pi_monitoring_tool.AlertMonitoring", {
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf sap_pi_monitoring_tool.AlertMonitoring
	 */
	onInit : function() {

		oCon = this;
		var eventBus = sap.ui.getCore().getEventBus();
		// 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
		eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent",
				this.onDataReceived, oCon);
		
		

		// ///////////////END of CHart initi
		
		
		//this.byId('oPanel').addContent(oTable);
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf sap_pi_monitoring_tool.alertDashboard
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf sap_pi_monitoring_tool.alertDashboard
	 */
	onAfterRendering : function() {
		/// Get alerts from IndexedDB
		var alertsAll = [];
		var h = oLocalStorage.get('alertCounts');
		db.alerts
		.each(function(alert){
			alertsAll.push(alert);
			if(alert.severity == 'VERYHIGH')
				h[0].tickets += 1;
			if(alert.severity == 'HIGH')
				h[1].tickets += 1;
			else if(alert.severity == 'MEDIUM')
				h[2].tickets += 1;
			else if(alert.severity == 'LOW')
				h[3].tickets += 1;
			else
				h[4].tickets += 1;
		}).then(function(alerts){
			oLocalStorage.put('alertCounts', h);
			oModel_Alerts.setData(alertsAll);
		});

		/*
		 * "AdapterNamespace": "http://sap.com/xi/XI/System", "AdapterType":
		 * "File", "Channel": "FileSendChannel_WorkingEarlier", "ChannelParty":
		 * "GBS_Saurav", "ChannelService": "BC_Saurav", "Component":
		 * "af.po7.inmbzr0096", "ErrCat": "", "ErrCode": "", "ErrLabel": "9999",
		 * "ErrText": "No suitable sender agreement found", "FromParty":
		 * "GBS_Saurav", "FromService": "BC_Saurav", "RuleId":
		 * "f262f39bc7ae35d3a326061723d96499", "Severity": "VERYHIGH",
		 * "Timestamp": "2016-04-22T19:14:44Z"
		 */

		this.byId("alertTable").setModel(oModel_Alerts);     
		this.byId("alertTable").bindRows({path: "/"}); ;
	},
	onDataReceived : function(channel, event, alertObj) {
		
		notifyMe('New Alert', alertObj.ErrText + '\n' + alertObj.Timestamp);
		
		var alertsAll = [];
		db.alerts
		.each(function(alert){
			alertsAll.push(alert);
		}).then(function(alerts){
			oModel_Alerts.setData(alertsAll);
		});
		
		
	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf sap_pi_monitoring_tool.alertDashboard
	 */
	// onExit: function() {
	//
	// }
	
});