var oModel_chart = new sap.ui.model.json.JSONModel();

var startDateTime = "";
var endDateTime = "";
sap.ui.jsview("sap_pi_monitoring_tool.DashboardReport", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.dashboardReport
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.DashboardReport";
	},
	
	

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.dashboardReport
	*/ 
	createContent : function(oController) {
		
		
		/// Alert ///
		var oPanel = new sap.ui.commons.Panel(this.createId("oPanel"));
		oPanel.setText('Alert Monitoring');

		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false
		});
		
		var control = new sap.ui.commons.Label();
		control.setText("Total alert count: ");
		var alertCount = new sap.ui.commons.TextView(this.createId('alertCount'));
		alertCount.setText('0');
		alertCount.addStyleClass('alertCount');
		alertCount.addStyleClass('red');
		
		oLayout.createRow( control, alertCount );
		
		control = new sap.ui.commons.Label();
		control.setText("Total channel alert count: ");
		var channelErrorCount = new sap.ui.commons.TextView(this.createId('channelAlertCount'));
		channelErrorCount.setText('0');
		channelErrorCount.addStyleClass('alertCount');
		channelErrorCount.addStyleClass('yellow');
		oLayout.createRow( control, channelErrorCount );
		
		var oChart = new sap.makit.Chart({

			type : sap.makit.ChartType.Column,
			showTotalValue : true,
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
		//oChart.setBusy(true);
		oPanel.addContent(oLayout);
		oPanel.addContent(oChart);
		
		
		console.log(oLocalStorage.get('alertCounts'));
		var h = [
                  {type: 'VERYHIGH', tickets : 0},
                  {type: 'HIGH', tickets : 0},
                  {type: 'MEDIUM', tickets : 0},
                  {type: 'LOW', tickets : 0},
                  {type: 'ELSE', tickets : 0}
                ];
		
		var alertsAll = [];
		var chaErr = 0;
		db.alerts
		.each(function(alert){
			alertsAll.push(alert);
			if(alert.severity === 'VERYHIGH')
				h[0].tickets += 1;
			if(alert.severity === 'HIGH')
				h[1].tickets += 1;
			else if(alert.severity === 'MEDIUM')
				h[2].tickets += 1;
			else if(alert.severity === 'LOW')
				h[3].tickets += 1;
			else if(alert.severity === 'ELSE')
				h[4].tickets += 1;
			
			if(alert.channel!=''){
				chaErr++;
			}
		}).then(function(alerts){
			oLocalStorage.put('alertCounts', h);
			console.log(h);
			if(h!=null){
				alertCount.setText(h[0].tickets +h[1].tickets +h[2].tickets +h[3].tickets +h[4].tickets );
			}else{
				alertCount.setText(0);
			}
			channelErrorCount.setText(chaErr);
			oModel_chart.setData(oLocalStorage.get('alertCounts'));
		}).catch (function (err) {

		    // Transaction will abort!
		    console.log(err);

		});
		/// Message Monitoring ///
		/// Message Monitoring ///
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : this.createId("layoutID"),
			layoutFixed : false
		});    
		//layout.setWidth('100%');    
		// Search Box starts here   
		var displayPannel = new sap.ui.commons.Panel('displayPannel');  
		var dashboardTitle = new sap.ui.commons.Title('dashboardTitle');  
		dashboardTitle.setText('Message Monitoring');  
		displayPannel.setTitle(dashboardTitle);  
		var displayLayout = new sap.ui.commons.layout.MatrixLayout({
			
			id: 'displayLayout',
			layoutFixed : false
			
		});  
		//sLayout.setWidth('80%'); 
		
		//var timeIntervalLayout = new sap.ui.commons.layout.MatrixLayout('timeIntervalLayout');  
		//successLayout.setWidth('80%'); 
		
		//var timeIntervalExtendedLayout = new sap.ui.commons.layout.MatrixLayout('timeIntervalExtendedLayout');  
		//timeIntervalExtendedLayout.setVisible(false);
		//cancellLayout.setWidth('80%');
		
		//var systemErrorLayout = new sap.ui.commons.layout.MatrixLayout('systemErrorLayout');  
		//systemErrorLayout.setWidth('80%');
		        
		//var waitingLayout = new sap.ui.commons.layout.MatrixLayout('waitingLayout');  
		//waitingLayout.setWidth('80%');
		
		//var holdingLayout = new sap.ui.commons.layout.MatrixLayout('holdingLayout');  
		//holdingLayout.setWidth('80%');
		
		//var deliveringLayout = new sap.ui.commons.layout.MatrixLayout('deliveringLayout');  
		//deliveringLayout.setWidth('80%');
		
		//var toBeDeliveredLayout = new sap.ui.commons.layout.MatrixLayout('toBeDeliveredLayout');  
		//toBeDeliveredLayout.setWidth('80%');
		
		//var channelErrorLayout = new sap.ui.commons.layout.MatrixLayout('channelErrorLayout');  
		//channelErrorLayout.setWidth('80%');
		
		var oCmbTimeInterval = new sap.ui.commons.DropdownBox(this.createId("oCmbTimeInterval"),{

			  items: [

			      new sap.ui.core.ListItem("i1",{text: "Last One Hour"}),
			      new sap.ui.core.ListItem("i2",{text: "Last Two Hours"}),
			      new sap.ui.core.ListItem("i3",{text: "Last Six Hours"}),
			      new sap.ui.core.ListItem("i4",{text: "Last Twelve Hours"}),
			      new sap.ui.core.ListItem("i5",{text: "Last 24 Hours"}),
			      new sap.ui.core.ListItem("i6",{text: "Custom"}),
			      
			  ]

		});
		oCmbTimeInterval.setValue("Last 24 Hours");
		
		oCmbTimeInterval.attachChange(function(oControlEvent) {
			//lbMessageStatusInterval.setText(oCmbTimeInterval.getValue());
			
			
			var interval = "";
			var strInterval = oCmbTimeInterval.getValue();
			
			/*if(strInterval == "Last One Hour"){
				interval = "1";
			}
			else if(strInterval == "Last Two Hours"){
				interval = "2";
			}
			else if(strInterval == "Last Six Hours"){
				interval = "6";
			}
			else if(strInterval == "Last Twelve Hours"){
				interval = "12";
			}
			else if(strInterval == "Last 24 Hours"){
				interval = "24";
			}*/
			
			if(strInterval == "Custom"){
				//interval = "systemError";
				//timeIntervalExtendedLayout.setVisible(true);
			}
			else{
				
				//timeIntervalExtendedLayout.setVisible(false);
				var interval = oController.returnInterval(oCmbTimeInterval.getLiveValue());
				startDateTime = oController.calculateBackDate(interval);
				endDateTime = oController.formattedCurrentDate();
				console.log("endDateTime timeinterval change event in Dashboard"); 
				console.log(endDateTime); 
				oController.extractData(oController, startDateTime,endDateTime);
				layout.setBusy(true);
			}
			
		});
		
		var lbStartDate = new sap.ui.commons.Label('lbStartDate1');  
		lbStartDate.setText("Start Date");
		/*var oStartDatePicker = new sap.m.DatePicker(this.createId("datePickerStart1"), {
	        
			displayFormat: 'dd/MM/yyyy',
	        valueFormat: 'yyyy-MM-dd' ,
	        dateValue : new Date(),
	        change: function(oEvent) {
				startDate = oStartDatePicker.getValue();
		        console.log("startDate");
		        console.log(startDate);
		        //startDateTime = startDate;
			}
			
	    });
		
		var lbStartTime = new sap.ui.commons.Label('lbStartTime1');  
		lbStartTime.setText("Start Time"); 
		var oStartTimePicker = new sap.m.TimePicker(this.createId("timePickerStart1"), {
			
				valueFormat : "HH:mm:ss",
				displayFormat : "HH:mm:ss",
	            dateValue : new Date(),
	            change: function(oEvent) {
					startTime = oStartTimePicker.getValue();
			        console.log("startTime");
			        console.log(startTime);
			        //startDateTime = startDateTime + "T" + startTime;
			        //console.log("startDateTime");
			        //console.log(startDateTime);
				}
	    });*/
		
		//startDateTime = satrtDate + "T" + startTime;
		//console.log("startDateTime");
        //console.log(startDateTime);
		
		/*var lbEndDate = new sap.ui.commons.Label('lbEndDate1');  
		lbEndDate.setText("End Date");
		var oEndDatePicker = new sap.m.DatePicker(this.createId("datePickerEnd1"), {
	        
			displayFormat: 'dd/MM/yyyy',
	        valueFormat: 'yyyy-MM-dd' ,
	        dateValue : new Date(),
	        change: function(oEvent) {
				endDate = oEndDatePicker.getValue();
		        console.log("endDate");
		        console.log(endDate);
		        //endDateTime = endDate;
			}
			
	    });
		
		var lbEndTime = new sap.ui.commons.Label('lbEndTime1');  
		lbEndTime.setText("End Time");
		var oEndTimePicker = new sap.m.TimePicker(this.createId("timePickerEnd1"), {
	        
			valueFormat : "HH:mm:ss",
			displayFormat : "HH:mm:ss",
	        dateValue : new Date(),
	        change: function(oEvent) {
				endTime = oEndTimePicker.getValue();
		        console.log("endTime");
		        console.log(endTime);
		        //endDateTime = endDateTime + "T" + endTime;
		        //console.log("endDateTime");
		        //console.log(endDateTime);
			}
	    });*/
		
		
		var lbtimeinterval = new sap.ui.commons.Label(this.createId("lbtimeinterval")); 
		lbtimeinterval.setText("Time Interval : ");
		
		var lbMessageStatus = new sap.ui.commons.Label(this.createId("lbMessageStatus")); 
		lbMessageStatus.setText("Messages Ststus in ");
		var lbMessageStatusInterval = new sap.ui.commons.Label(this.createId("lbMessageStatusInterval"));
		//lbMessageStatusInterval.setText(oCmbTimeInterval.getItems(oCmbTimeInterval.getSelectedItemId()));
		lbMessageStatusInterval.setText(oCmbTimeInterval.getLiveValue());
		
		var lbSuccess = new sap.ui.commons.Label(this.createId("lbSuccess")); 
		lbSuccess.setText("No of Successfull Messages    ");
		//lbSuccess.addStyleClass('messageCount');
		var lbSuccessCtr = new sap.ui.commons.Label(this.createId("lbSuccessCtr"));
		lbSuccessCtr.addStyleClass('messageCount');
		lbSuccessCtr.addStyleClass('green');
		
		var lbDelivering = new sap.ui.commons.Label(this.createId("lbDelivering")); 
		lbDelivering.setText("No of Delivering Messages    ");
		var lbDeliveringCtr = new sap.ui.commons.Label(this.createId("lbDeliveringCtr"));
		lbDeliveringCtr.addStyleClass('messageCount');
		lbDeliveringCtr.addStyleClass('red');
		
		var lbCancelled = new sap.ui.commons.Label(this.createId("lbCancelled")); 
		lbCancelled.setText("No of Cancelled Messages    "); 
		var lbCancelledCtr = new sap.ui.commons.Label(this.createId("lbCancelledCtr"));
		lbCancelledCtr.addStyleClass('messageCount');
		lbCancelledCtr.addStyleClass('red');
		
		var lbSystemError = new sap.ui.commons.Label(this.createId("lbSystemError")); 
		lbSystemError.setText("No of System Error Messages    ");
		var lbSystemErrorCtr = new sap.ui.commons.Label(this.createId("lbSystemErrorCtr"));
		lbSystemErrorCtr.addStyleClass('messageCount');
		lbSystemErrorCtr.addStyleClass('red');
		
		var lbWaiting = new sap.ui.commons.Label(this.createId("lbWaiting")); 
		lbWaiting.setText("No of Waiting Messages    ");
		var lbWaitingCtr = new sap.ui.commons.Label(this.createId("lbWaitingCtr"));
		lbWaitingCtr.addStyleClass('messageCount');
		lbWaitingCtr.addStyleClass('red');
		
		var lbHolding = new sap.ui.commons.Label(this.createId("lbHolding")); 
		lbHolding.setText("No of Holding Messages    ");
		var lbHoldingCtr = new sap.ui.commons.Label(this.createId("lbHoldingCtr"));
		lbHoldingCtr.addStyleClass('messageCount');
		lbHoldingCtr.addStyleClass('red');
		
		var lbToBeDelivered = new sap.ui.commons.Label(this.createId("lbToBeDelivered")); 
		lbToBeDelivered.setText("No of To Be Delivered Messages    ");
		var lbToBeDeliveredCtr = new sap.ui.commons.Label(this.createId("lbToBeDeliveredCtr"));
		lbToBeDeliveredCtr.addStyleClass('messageCount');
		lbToBeDeliveredCtr.addStyleClass('red');
		
		
		
		//displayLayout.createRow(lbtimeinterval);
		//displayLayout.createRow(new sap.ui.layout.HorizontalLayout({content : [lbtimeinterval, oCmbTimeInterval]}));
		//timeIntervalLayout.createRow(lbtimeinterval, oCmbTimeInterval);
		//timeIntervalExtendedLayout.createRow(lbStartDate, oStartDatePicker, lbStartTime, oStartTimePicker, lbEndDate, oEndDatePicker, lbEndTime, oEndTimePicker);
		displayLayout.createRow(lbtimeinterval, oCmbTimeInterval);
		displayLayout.createRow(lbMessageStatus,lbMessageStatusInterval);
		displayLayout.createRow(lbSuccess,lbSuccessCtr);
		displayLayout.createRow(lbDelivering,lbDeliveringCtr);
		displayLayout.createRow(lbCancelled,lbCancelledCtr);
		displayLayout.createRow(lbSystemError,lbSystemErrorCtr);
		displayLayout.createRow(lbWaiting,lbWaitingCtr);
		displayLayout.createRow(lbHolding,lbHoldingCtr);
		displayLayout.createRow(lbToBeDelivered,lbToBeDeliveredCtr);
		
		//displayPannel.addContent(timeIntervalLayout); 
		//displayPannel.addContent(timeIntervalExtendedLayout);
		displayPannel.addContent(displayLayout);
		/*displayPannel.addContent(deliveringLayout);
		displayPannel.addContent(cancellLayout);
		displayPannel.addContent(systemErrorLayout);
		displayPannel.addContent(waitingLayout);
		displayPannel.addContent(holdingLayout);
		displayPannel.addContent(toBeDeliveredLayout);
		displayPannel.addContent(channelErrorLayout);*/
		  
		layout.createRow(displayPannel); 
		
		this.addContent(layout);
		//layout.setBusy(true);
			
		/// Grid view ///
			var oGrid = new sap.ui.layout.Grid({
				hSpacing: 1,
				vSpacing: 1,
				content: [
				         oPanel,layout
					
				]
			});
			var eventBus = sap.ui.getCore().getEventBus();
			//eventBus.subscribe("FetchAlertCountFromNotificationBar", "onNavigateEvent", this.onAlertCountReceived, this);
			eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent",
					this.onAlertCountReceived, this);
			
			return oGrid;
	},
	onAlertCountReceived : function(channel, event, alert){
		var h = oLocalStorage.get('alertCounts');
console.log(alert.Severity);
console.log(alert.Severity === 'VERYHIGH');
console.log(alert.Severity === "VERYHIGH");
console.log(alert.Severity == 'VERYHIGH');
		if(alert.Severity === 'VERYHIGH')
			h[0].tickets += 1;
		else if(alert.Severity === 'HIGH')
			h[1].tickets += 1;
		else if(alert.Severity === 'MEDIUM')
			h[2].tickets += 1;
		else if(alert.Severity === 'LOW')
			h[3].tickets += 1;
		else if(alert.Severity === '' || alert.Severity == undefined)
			h[4].tickets += 1;
		oLocalStorage.put('alertCounts', h);
		oModel_chart.setData(h);
		
		this.byId('alertCount').setText(parseInt(this.byId('alertCount').getText()) + 1);
		if(alert.Channel != "")
		this.byId('channelAlertCount').setText(parseInt(this.byId('channelAlertCount').getText()) + 1);
    }

});