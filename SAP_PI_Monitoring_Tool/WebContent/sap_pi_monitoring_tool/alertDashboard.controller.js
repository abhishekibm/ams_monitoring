var oCon;
sap.ui.controller("sap_pi_monitoring_tool.alertDashboard", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf sap_pi_monitoring_tool.alertDashboard
	 */
	 onInit: function() {
		 oCon = this;
		 
		 console.log(oCon);
		 //var eventBus = sap.ui.getCore().getEventBus();
		 // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
		 //eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent", this.onDataReceived, this);
		 
	 },
	 
	 onDataReceived : function(channel, event, data) {
		 console.log(JSON.stringify(data));
		 console.log("Inside ondatareceived ->");
		 console.log(oCon);
		 // do something with the data (bind to model)
		 var oTextView = new sap.ui.commons.TextView({
				text : JSON.stringify(data),
				tooltip : 'This is a Tooltip',
				wrapping : true,
				width : '100px',
				semanticColor: sap.ui.commons.TextViewColor.Positive,
				design: sap.ui.commons.TextViewDesign.H3
				});  
		 
		 console.log(oCon.byId('inputtext'));
		 oCon.byId('inputtext').setValue("hi");
		 
		 
		 
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
	onAfterRendering: function() {
		 
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
	
	getMyModel : function(a1, a2, a3) {

		var data = [ {
			type : "Critical",
			tickets : a1
		}, {
			type : "Medium",
			tickets : a2
		}, {
			type : "Success",
			tickets : a3
		} ];

		var model = new sap.ui.model.json.JSONModel();
		model.setData(data);
		return model;

	},

	createMyChart : function(id, title, model) {

		var oChart = new sap.makit.Chart({
			width : "50%",
			height : "500px",
			type : sap.makit.ChartType.Donut,
			showRangeSelector : false,
			showTotalValue : true,
			valueAxis : new sap.makit.ValueAxis({}),
			categoryAxis : new sap.makit.CategoryAxis({}),
			category : new sap.makit.Category({
				column : "type"
			}),

			values : [ new sap.makit.Value({

				expression : "tickets",

				format : "number"

			}) ]

		});

		oChart.addColumn(new sap.makit.Column({
			name : "type",
			value : "{type}"
		}));

		oChart.addColumn(new sap.makit.Column({
			name : "tickets",
			value : "{tickets}",
			type : "number"
		}));

		oChart.setModel(model);

		oChart.bindRows("/");

		return oChart;

	}
});