sap.ui.jsview("sap_pi_monitoring_tool.notification", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.notification
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.notification";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.notification
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
				oNotiBar2.setVisibleStatus(sStatus);
			} else {
				var sStatus = sap.ui.ux3.NotificationBarStatus.None;
				oNotiBar2.setVisibleStatus(sStatus);
			}
		};

		
		function clickListener(oEvent) {
			var oMessage = oEvent.getParameter("message");
			alert("Message selected: " + oMessage.getText());
		};

			      	/*
			    	 * Creating a notifier
			    	 */
			    	var oNotifier = new sap.ui.ux3.Notifier("first_noti", {
			    		title : "The first Notifier"
			    	});
			    	for (var i = 0; i < 5; i++) {
			    		var now = (new Date()).toUTCString();
			    		var oMessage = new sap.ui.core.Message({
			    			text : i + ". " + sText,
			    			timestamp : now
			    		});

			    		if (i % 2 == 0) {
			    			oMessage.setIcon("images/Thumbnail_32.png");
			    		}

			    		oNotifier.addMessage(oMessage);
			    	}
			    	oNotifier.attachMessageSelected(clickListener);

			    	/*
			    	 * Creating a second notifier
			    	 */
			    	var oNotifier2 = new sap.ui.ux3.Notifier({
			    		title : "The second Notifier",
			    		icon : "images/index.png"
			    	});
			    	for (var i = 0; i < 5; i++) {
			    		var now = (new Date()).toUTCString();
			    		var oMessage = new sap.ui.core.Message({
			    			text : i + ". " + sText,
			    			timestamp : now
			    		});

			    		if (i % 2 == 0) {
			    			oMessage.setIcon("images/Thumbnail_32.png");
			    		}

			    		oNotifier2.addMessage(oMessage);
			    	}
			    	oNotifier2.attachMessageSelected(clickListener);

			    	/*
			    	 * Creating the message notifier with some messages
			    	 */
			    	var oMessageNotifier = new sap.ui.ux3.Notifier(this.createId("alert_noti"));
			    	oMessageNotifier.setTitle("Alerts");
			    	
			    	oMessageNotifier.attachMessageSelected(clickListener);
			    	//////Channel notifier
			    	var oChannelNotifier = new sap.ui.ux3.Notifier(this.createId("channel_noti"));
			    	oChannelNotifier.setTitle("Channel Errors");
			    	oChannelNotifier.attachMessageSelected(clickListener);
			    	
			    	///////
			    	
			    	var oNotiBar3 = new sap.ui.ux3.NotificationBar({
			    		display : displayListener,
			    		visibleStatus : "Default"
			    	});
			    	oNotiBar3.addStyleClass("sapUiNotificationBarDemokit");
			    	oNotiBar3.addNotifier(oNotifier);
			    	oNotiBar3.addNotifier(oNotifier2);
			    	oNotiBar3.setMessageNotifier(oMessageNotifier);
			    	oNotiBar3.setAlwaysShowToggler(true);
			    	return oNotiBar3;
	}

});