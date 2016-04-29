
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
		
		oPanel.addContent(oLayout);
		
		
		/// Message Monitoring ///
			var layout = new sap.ui.commons.layout.MatrixLayout(this.createId("layoutID"));    
			//layout.setWidth('100%');    
			// Search Box starts here   
			var displayPannel = new sap.ui.commons.Panel('displayPannel');  
			var dashboardTitle = new sap.ui.commons.Title('dashboardTitle');  
			dashboardTitle.setText('Message Monitoring');  
			displayPannel.setTitle(dashboardTitle);  
			var displayLayout = new sap.ui.commons.layout.MatrixLayout('displayLayout');  
			//sLayout.setWidth('80%'); 
			
			//var successLayout = new sap.ui.commons.layout.MatrixLayout('successLayout');  
			//successLayout.setWidth('80%'); 
			
			//var cancellLayout = new sap.ui.commons.layout.MatrixLayout('cancellLayout');  
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
			
			lbtimeinterval = new sap.ui.commons.Label(this.createId("lbtimeinterval")); 
			lbtimeinterval.setText("Time Interval : ");
			
			lbSuccess = new sap.ui.commons.Label(this.createId("lbSuccess")); 
			lbSuccess.setText("No of Successfull Messages 0"); 
			
			lbDelivering = new sap.ui.commons.Label(this.createId("lbDelivering")); 
			lbDelivering.setText("No of Successfull Messages 0");
			
			lbCancelled = new sap.ui.commons.Label(this.createId("lbCancelled")); 
			lbCancelled.setText("No of Cancelled Messages 0"); 
			
			lbSystemError = new sap.ui.commons.Label(this.createId("lbSystemError")); 
			lbSystemError.setText("No of System Error Messages 0");
			
			lbWaiting = new sap.ui.commons.Label(this.createId("lbWaiting")); 
			lbWaiting.setText("No of Waiting Messages 0");
			
			lbHolding = new sap.ui.commons.Label(this.createId("lbHolding")); 
			lbHolding.setText("No of Holding Messages 0");
			
			lbToBeDelivered = new sap.ui.commons.Label(this.createId("lbToBeDelivered")); 
			lbToBeDelivered.setText("No of To Be Delivered Messages 0");
			
			lbChannelError = new sap.ui.commons.Label(this.createId("lbChannelError")); 
			lbChannelError.setText("No of Channel Errors 0");
			
			var oCmbTimeInterval = new sap.ui.commons.DropdownBox({

				  items: [

				      new sap.ui.core.ListItem({text: "One Hour"}),
				      new sap.ui.core.ListItem({text: "Two Hours"}),
				      new sap.ui.core.ListItem({text: "Six Hours"}),
				      new sap.ui.core.ListItem({text: "Twelve Hours"}),
				      new sap.ui.core.ListItem({text: "24 Hours"}),
				      new sap.ui.core.ListItem({text: "Custom"}),
				      
				  ]

			});
			
			//displayLayout.createRow(lbtimeinterval);
			displayLayout.createRow(new sap.ui.layout.HorizontalLayout({content : [lbtimeinterval, oCmbTimeInterval]}));
			displayLayout.createRow(lbSuccess);
			displayLayout.createRow(lbDelivering);
			displayLayout.createRow(lbCancelled);
			displayLayout.createRow(lbSystemError);
			displayLayout.createRow(lbWaiting);
			displayLayout.createRow(lbHolding);
			displayLayout.createRow(lbToBeDelivered);
			displayLayout.createRow(lbChannelError);
			  
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
			layout.setBusy(true);
			
			
			var oGrid = new sap.ui.layout.Grid({
				hSpacing: 1,
				vSpacing: 1,
				content: [
				         oPanel,layout
					
				]
			});
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("FetchAlertCountFromNotificationBar", "onNavigateEvent", this.onAlertCountReceived, this);
			return oGrid;
	},
	onAlertCountReceived : function(channel, event, data){
		this.byId('alertCount').setText(parseInt(this.byId('alertCount').getText()) + 1);
		if(data.Channel != "")
		this.byId('channelAlertCount').setText(parseInt(this.byId('channelAlertCount').getText()) + 1);
    }

});