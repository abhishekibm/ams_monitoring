/**
 * View for Alerts
 * @author Abhishek Saha
 */
sap.ui.jsview("sap_pi_monitoring_tool.AlertMonitoring",
		{

			/**
			 * Specifies the Controller belonging to this View. In the case that
			 * it is not implemented, or that "null" is returned, this View does
			 * not have a Controller.
			 * 
			 * @memberOf sap_pi_monitoring_tool.alertDashboard
			 */
			getControllerName : function() {
				return "sap_pi_monitoring_tool.AlertMonitoring";
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is constructed. Since
			 * the Controller is given to this method, its event handlers can be
			 * attached right away.
			 * 
			 * @memberOf sap_pi_monitoring_tool.AlertMonitoring
			 */
			createContent : function(oController) {
				var oPanel = new sap.ui.commons.Panel(this.createId("oPanel"));
				var myModel = oController.getMyModel(3,4,1,0);
				var myChart = oController.createMyChart(this.createId("oChart"), "Dashboard", myModel);
				
				
				var textArea = new sap.ui.commons.TextArea({  
                    id : "textArea1"  
				});
				
				oPanel.addContent(myChart);
				//return myChart;
				  
			    
					      
					      
					      
				         var eventBus = sap.ui.getCore().getEventBus();
				   		 // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
				   		 eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent", this.onDataReceived, this);
				   		 eventBus.subscribe("FetchAlertConsumersFromNotificationBar", "onNavigateEvent", this.onAlertConsumersReceived, this);
					     return oPanel;
          },
          
          onAlertConsumersReceived : function(channel, event, data){
        	  //var oModel = new sap.ui.model.xml.XMLModel();
        	  //oModel.setXML(data);
        	  
          },
          onDataReceived : function(channel, event, data) {
        	 notifyMe('New Alert', data.ErrText +'\n' + data.Timestamp);
        	  //alert(data.ErrText);
     		 console.log("Inside ondatareceived -> view");
     		 // do something with the data (bind to model)
     		 var oTextView = new sap.ui.commons.TextView({
     				text : data.ErrText +'\n' + data.Timestamp,
     				tooltip : JSON.stringify(data),
     				wrapping : true
     				});  
     		 oTextView.addStyleClass('alert_ticker');
     		 console.log(this.byId('oPanel'));
     		
     		this.byId('oPanel').addContent(oTextView);
     		//this.byId('oPanel').rerender();
     		
     		//var myModel = this.getMyModel(Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1));
     		//this.byId('oChart').setModel(model);
     	}
			
		});
