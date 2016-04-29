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
		
		// /////////////CHART

		var oChart = new sap.makit.Chart({
			id : oCon.createId('altrs'),
			width : "500px",
			height : "250px",
			type : sap.makit.ChartType.Column,
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

		oChart.setModel(oModel_chart);

		oChart.bindRows("/");
		this.byId('oPanel').addContent(oChart);

		// ///////////////END of CHart initi

		console.log(alertsAll);
		var alertsAll = oLocalStorage.get("AllAlerts");
		// create the row repeater control
		var oRowRepeater = new sap.ui.commons.RowRepeater();
		oRowRepeater.setNoData(new sap.ui.commons.TextView({
			text : "Sorry, no data available!"
		}));

		// create JSON model

		oModel_Alerts.setData(alertsAll);
		sap.ui.getCore().setModel(oModel_Alerts);

		// create title
		var oTitle = new sap.ui.core.Title({
			text : "Alerts",
			icon : "images/alert_white_24.png",
			tooltip : "Alerts"
		});

		// create filters
		// var oFilter1 = new
		// sap.ui.commons.RowRepeaterFilter("first_filter",{text:"All
		// Countries"});
		// var oFilter2 = new
		// sap.ui.commons.RowRepeaterFilter("second_filter",{text:"Germany",filters:[new
		// sap.ui.model.Filter("country","EQ", "DE")],tooltip:"Show Employees
		// working in Germany"});
		// var oFilter3 = new
		// sap.ui.commons.RowRepeaterFilter("third_filter",{text:"USA",filters:[new
		// sap.ui.model.Filter("country", "EQ","US")],tooltip:"Show Emloyees
		// working in USA"});

		// create sorters
		var oSorter1 = new sap.ui.commons.RowRepeaterSorter({
			text : "Channel",
			sorter : new sap.ui.model.Sorter("Channel", true),
			tooltip : "Sort By Channel"
		});
		var oSorter2 = new sap.ui.commons.RowRepeaterSorter({
			text : "Channel Service",
			sorter : new sap.ui.model.Sorter("ChannelService", false),
			tooltip : "Sort By Channel Service"
		});
		// var oSorter3 = new
		// sap.ui.commons.RowRepeaterSorter("second_sorter",{text:"Last
		// Name",sorter:new sap.ui.model.Sorter("lastName",false)});

		// add title
		oRowRepeater.setTitle(oTitle);

		// add filters and sorters
		// oRowRepeater.addFilter(oFilter1);
		// oRowRepeater.addFilter(oFilter2);
		// oRowRepeater.addFilter(oFilter3);

		oRowRepeater.addSorter(oSorter1);
		oRowRepeater.addSorter(oSorter2);
		// oRowRepeater.addSorter(oSorter3);

		// configure the RowRepeater
		oRowRepeater.setDesign("Standard");
		oRowRepeater.setNumberOfRows(20);
		oRowRepeater.setCurrentPage(1);
		oRowRepeater.setTitle(oTitle);

		// create the template control that will be repeated and will display
		// the data
		var oRowTemplate = new sap.ui.commons.layout.MatrixLayout();

		var matrixRow, matrixCell, control;
		// main matrix
		oRowTemplate.setWidth("70%");
		// main row
		matrixRow = new sap.ui.commons.layout.MatrixLayoutRow();
		// image

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
		// label 1
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "Severity");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "AdapterNamespace");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "AdapterType");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "ChannelService");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		// label 2
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "ChannelParty");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		// label 3
		control = new sap.ui.commons.Link();
		control.bindProperty("text", "Channel");
		control.bindProperty("href", {
            parts: [
                "ChannelParty",
                "ChannelService",
                "Channel"
            ],
            formatter: function(party, service, channel) {
                return localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port +'/webdynpro/resources/sap.com/tc~lm~itsam~ui~mainframe~wd/FloorPlanApp?applicationID=com.sap.itsam.mon.xi.adapter.channel&channel_name='+channel+'&component='+service+'&party='+party+'#';
            }
        });
		control.setTarget("_blank");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		// link
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "MsgId");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "Interface");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		control = new sap.ui.commons.Link();
		control.bindProperty("text", "Monitoring Link");
		control.bindProperty("href", "MonitoringUrl");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "ErrCat");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		control = new sap.ui.commons.Link();
		control.bindProperty("text", "ErrCat");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		// label 3
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "ErrText");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		
		control = new sap.ui.commons.Label();
		control.bindProperty("text", "Timestamp");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		// add row to matrix
		oRowTemplate.addRow(matrixRow);

		// attach data to the RowRepeater
		oRowRepeater.bindRows("/data", oRowTemplate);
		// this.byId('oPanel').destroyContent();
		this.byId('oPanel').addContent(oRowRepeater);
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
		oModel_Alerts.setData(oLocalStorage.get("AllAlerts"));
	},
	onDataReceived : function(channel, event, alertObj) {
		console.log(oLocalStorage.get("AllAlerts"));
		notifyMe('New Alert', alertObj.ErrText + '\n' + alertObj.Timestamp);
		var a = oLocalStorage.get("AllAlerts");
		if (a == null) {
			a = {
				data : []
			};
		}
		a.data.push(alertObj);
		oLocalStorage.put("AllAlerts", a);
		console.log("Alert received");

		oModel_Alerts.setData(oLocalStorage.get("AllAlerts"));

		oModel_chart.setData([ {
			type : "Very High",
			tickets : Math.floor((Math.random() * 10) + 1)
		}, {
			type : "High",
			tickets : Math.floor((Math.random() * 10) + 1)
		}, {
			type : "Medium",
			tickets : Math.floor((Math.random() * 10) + 1)
		}, {
			type : "Low",
			tickets : Math.floor((Math.random() * 10) + 1)
		} ]);
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
	getMyModel : function(a1, a2, a3, a4) {
		// VERYHIGH, HIGH, MEDIUM, or LOW
		var data = [ {
			type : "Very High",
			tickets : a1
		}, {
			type : "High",
			tickets : a2
		}, {
			type : "Medium",
			tickets : a3
		}, {
			type : "Low",
			tickets : a4
		} ];

		var model = new sap.ui.model.json.JSONModel();
		model.setData(data);
		return model;

	},

	createMyChart : function(id, title, model) {
		var oCon = this;
		var oChart = new sap.makit.Chart({
			id : oCon.createId(id),
			width : "500px",
			height : "250px",
			type : sap.makit.ChartType.Bar,
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

		oChart.setModel(oModel_chart);

		oChart.bindRows("/");

		return oChart;

	}
});