sap.ui.jsview("sap_pi_monitoring_tool.Dashboard", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.Dashboard
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Dashboard";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.Dashboard
	*/ 
	createContent : function(oController) {
		var oPanel = new sap.ui.commons.Panel(this.createId("oPanel"));
		oPanel.setText('Alert');
		
		
		
		
		
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
		
		var oPanelMessage = new sap.ui.commons.Panel(this.createId("oPanelMessage"));
		oPanelMessage.setText('Message Monitoring');
		oPanelMessage.addContent(new sap.ui.commons.TextView({
					text : "Hi",
					tooltip : "hi",
					wrapping : true
					//width : '200px'
					}));
		var oGrid = new sap.ui.layout.Grid({
			hSpacing: 1,
			vSpacing: 1,
			content: [
			         oPanel,oPanelMessage
				
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