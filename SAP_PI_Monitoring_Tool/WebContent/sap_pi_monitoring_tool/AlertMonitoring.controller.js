var oCon;
sap.ui.controller("sap_pi_monitoring_tool.AlertMonitoring", {
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf sap_pi_monitoring_tool.AlertMonitoring
	 */
	 onInit: function() {
		 oCon = this;
		 
		 console.log(oCon);
		 //var eventBus = sap.ui.getCore().getEventBus();
		 // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
		 //eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent", this.onDataReceived, this);
		 
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
		oCon = this;
		var eventBus = sap.ui.getCore().getEventBus();
  		 // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
  		 eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent", this.onDataReceived, oCon);
	},
	onDataReceived : function(channel, event, alertObj) {
		console.log(oStorage.get("AllAlerts"));
   	 notifyMe('New Alert', alertObj.ErrText +'\n' + alertObj.Timestamp);
   	var a = oStorage.get("AllAlerts");
   	 if(a == null){
   		a = {data:[]};
   		a.data.push(alertObj);
   		oStorage.put("AllAlerts", a);
   	} else {
   		a.data.push(alertObj);
   		oStorage.put("AllAlerts", a);
   	}
   	console.log("Alert received");
console.log(alertsAll);
   	var alertsAll = oStorage.get("AllAlerts"); 
  // create the row repeater control
		var oRowRepeater = new sap.ui.commons.RowRepeater();
		oRowRepeater.setNoData(new sap.ui.commons.TextView({text: "Sorry, no data available!"}));
		
		
		// create test data
	 	var dataObject = {data :[{"AdapterNamespace": "http://sap.com/xi/XI/System",
			"AdapterType": "File",
			"Channel": "FileSendChannel_WorkingEarlier",
			"ChannelParty": "GBS_Saurav",
			"ChannelService": "BC_Saurav",
			"Component": "af.po7.inmbzr0096",
			"ErrCat": "",
			"ErrCode": "",
			"ErrLabel": "9999",
			"ErrText": "No suitable sender agreement found",
			"FromParty": "GBS_Saurav",
			"FromService": "BC_Saurav",
			"RuleId": "f262f39bc7ae35d3a326061723d96499",
			"Severity": "VERYHIGH",
			"Timestamp": "2016-04-22T19:14:44Z"},{"AdapterNamespace": "http://sap.com/xi/XI/System",
				"AdapterType": "File",
				"Channel": "FileSendChannel_WorkingEarlier",
				"ChannelParty": "GBS_Saurav",
				"ChannelService": "BC_Saurav",
				"Component": "af.po7.inmbzr0096",
				"ErrCat": "",
				"ErrCode": "",
				"ErrLabel": "9999",
				"ErrText": "No suitable sender agreement found",
				"FromParty": "GBS_Saurav",
				"FromService": "BC_Saurav",
				"RuleId": "f262f39bc7ae35d3a326061723d96499",
				"Severity": "VERYHIGH",
				"Timestamp": "2016-04-22T19:14:44Z"}] };
		

		// create JSON model
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(alertsAll);
		sap.ui.getCore().setModel(oModel);


		//create title
		var oTitle = new sap.ui.core.Title({text:"Alerts", icon:"images/SAPLogo.gif", tooltip:"Employees"});

		// create filters
		//var oFilter1 = new sap.ui.commons.RowRepeaterFilter("first_filter",{text:"All Countries"});
		//var oFilter2 = new sap.ui.commons.RowRepeaterFilter("second_filter",{text:"Germany",filters:[new sap.ui.model.Filter("country","EQ", "DE")],tooltip:"Show Employees working in Germany"});
		//var oFilter3 = new sap.ui.commons.RowRepeaterFilter("third_filter",{text:"USA",filters:[new sap.ui.model.Filter("country", "EQ","US")],tooltip:"Show Emloyees working in USA"});

		// create sorters
		var oSorter1 = new sap.ui.commons.RowRepeaterSorter({text:"Channel",sorter:new sap.ui.model.Sorter("Channel",true),tooltip:"Sort By Channel"});
		var oSorter2 = new sap.ui.commons.RowRepeaterSorter({text:"Channel Service",sorter:new sap.ui.model.Sorter("ChannelService",false),tooltip:"Sort By Channel Service"});
		//var oSorter3 = new sap.ui.commons.RowRepeaterSorter("second_sorter",{text:"Last Name",sorter:new sap.ui.model.Sorter("lastName",false)});

		//add title
		oRowRepeater.setTitle(oTitle);

		//add filters and sorters
		//oRowRepeater.addFilter(oFilter1);
		//oRowRepeater.addFilter(oFilter2);
		//oRowRepeater.addFilter(oFilter3);

		oRowRepeater.addSorter(oSorter1);
		oRowRepeater.addSorter(oSorter2);
		//oRowRepeater.addSorter(oSorter3);

		//configure the RowRepeater
		oRowRepeater.setDesign("Standard");
		oRowRepeater.setNumberOfRows(5);
		oRowRepeater.setCurrentPage(1);
		oRowRepeater.setTitle(oTitle);



		//create the template control that will be repeated and will display the data
		var oRowTemplate = new sap.ui.commons.layout.MatrixLayout();

		var  matrixRow, matrixCell, control;
		// main matrix
		oRowTemplate.setWidth("70%");
		// main row
		matrixRow = new sap.ui.commons.layout.MatrixLayoutRow();
		//image
		
		/*"AdapterNamespace": "http://sap.com/xi/XI/System",
		"AdapterType": "File",
		"Channel": "FileSendChannel_WorkingEarlier",
		"ChannelParty": "GBS_Saurav",
		"ChannelService": "BC_Saurav",
		"Component": "af.po7.inmbzr0096",
		"ErrCat": "",
		"ErrCode": "",
		"ErrLabel": "9999",
		"ErrText": "No suitable sender agreement found",
		"FromParty": "GBS_Saurav",
		"FromService": "BC_Saurav",
		"RuleId": "f262f39bc7ae35d3a326061723d96499",
		"Severity": "VERYHIGH",
		"Timestamp": "2016-04-22T19:14:44Z"*/
		//label 1
		control = new sap.ui.commons.Label();
		control.bindProperty("text","ChannelService");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		//label 2
		control = new sap.ui.commons.Label();
		control.bindProperty("text","AdapterType");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		//label 3
		control = new sap.ui.commons.Label();
		control.bindProperty("text","Channel");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		//link
		control = new sap.ui.commons.Link();
		control.bindProperty("text","AdapterNamespace");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		
		//label 3
		control = new sap.ui.commons.Label();
		control.bindProperty("text","ErrText");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);
		// add row to matrix
		oRowTemplate.addRow(matrixRow);



		//attach data to the RowRepeater
		oRowRepeater.bindRows("/data", oRowTemplate);
		this.byId('oPanel').destroyContent();
		this.byId('oPanel').addContent(oRowRepeater); 
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
//VERYHIGH, HIGH, MEDIUM, or LOW
		var data = [ {
			type : "Very High",
			tickets : a1
		}, {
			type : "High",
			tickets : a2
		}, {
			type : "Medium",
			tickets : a3
		},{
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

		oChart.setModel(model);

		oChart.bindRows("/");

		return oChart;

	}
});