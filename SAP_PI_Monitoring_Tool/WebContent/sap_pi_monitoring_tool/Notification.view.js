sap.ui.jsview("sap_pi_monitoring_tool.Notification", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.notification
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Notification";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.Notification
	*/ 
	createContent : function(oController) {
		var sText = "Dummy message Dummy message Dummy message Dummy message Dummy message ";

		function displayListener(oEvent) {
			var bShow = true; //oEvent.getParameter("show");

			if (bShow) {
				/*
				 * Now the application can decide how to display the bar. It can be maximized, default, minimized (please see NotificationBarStatus)
				 */
				var sStatus = sap.ui.ux3.NotificationBarStatus.Default;
				//oNotiBar2.setVisibleStatus(sStatus);
			} else {
				var sStatus = sap.ui.ux3.NotificationBarStatus.None;
				//oNotiBar2.setVisibleStatus(sStatus);
			}
		};

		
		function clickListener(oEvent) {
			var oMessage = oEvent.getParameter("message");
			console.log(oMessage.data());
			alert("Message selected: " + oMessage.getText());
		};
		function clickAlertListener(oEvent) {
			var oMessage = oEvent.getParameter("message");
			console.log(oMessage.data().alert);
			openObjectDialog(oMessage.data().alert);
		};
		

			      	/*
			    	 * Creating a notifier
			    	 */
			    	var oNotifier = new sap.ui.ux3.Notifier(this.createId("conn_noti"), {
			    		title : "Connection",
			    		icon : "images/connecting.gif",
			    		tooltip: "Connecting..."
			    	});
			    	oNotifier.attachMessageSelected(clickListener);
			    	var now = (new Date());//.toUTCString();
		    		var oMessage = new sap.ui.core.Message({
		    			text : 'Connection initiated...',
		    			timestamp : now
		    		});
		    		oNotifier.addMessage(oMessage);
			    	
			    	var oAlertNotifier = new sap.ui.ux3.Notifier(this.createId("alert_noti"),
			    			{
			    			title: "Alerts",
			    			icon: 'images/alert.png'	
			    			});
			    	
			    	oAlertNotifier.attachMessageSelected(clickAlertListener);
			    	//////Channel notifier
			    	var oChannelNotifier = new sap.ui.ux3.Notifier(this.createId("channel_noti"),
			    			{
			    			title : "Channel Errors",
			    			icon: 'images/channel.png'
			    			});
			    	
			    	oChannelNotifier.attachMessageSelected(clickAlertListener);
			    	
			    	///////
			    	
			    	var oNotiBar3 = new sap.ui.ux3.NotificationBar({
			    		//display : displayListener,
			    		visibleStatus : "Default"
			    	});
			    	oNotiBar3.addStyleClass("sapUiNotificationBarDemokit");
			    	oNotiBar3.addNotifier(oNotifier);
			    	//oNotiBar3.addNotifier(oNotifier2);
			    	oNotiBar3.addNotifier(oAlertNotifier);
			    	oNotiBar3.addNotifier(oChannelNotifier);
			    	
			    	//oNotiBar3.setMessageNotifier(oMessageNotifier);
			    	//oNotiBar3.setAlwaysShowToggler(true);
			    	return oNotiBar3;
	}

});