/**
 * View for Alerts
 * @author Abhishek Saha
 */
sap.ui.jsview("sap_pi_monitoring_tool.alertDashboard",
		{

			/**
			 * Specifies the Controller belonging to this View. In the case that
			 * it is not implemented, or that "null" is returned, this View does
			 * not have a Controller.
			 * 
			 * @memberOf sap_pi_monitoring_tool.alertDashboard
			 */
			getControllerName : function() {
				return "sap_pi_monitoring_tool.alertDashboard";
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is constructed. Since
			 * the Controller is given to this method, its event handlers can be
			 * attached right away.
			 * 
			 * @memberOf sap_pi_monitoring_tool.alertDashboard
			 */
			createContent : function(oController) {
				var oPanel = new sap.ui.commons.Panel(this.createId("oPanel"));
				var myModel = oController.getMyModel(2,3,14);
				var myChart = oController.createMyChart("Alert Dashboard", "Dashboard", myModel);
          
				var textArea = new sap.ui.commons.TextArea({  
                    id : "textArea1"  
				});
				
				
				//return myChart;
				  
			    var request = 
			    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bas="http://sap.com/xi/BASIS">\
			    	<soapenv:Header/>\
			    	<soapenv:Body>\
			    		<bas:AlertRuleQueryRequest>\
			    		</bas:AlertRuleQueryRequest>\
			    	</soapenv:Body> \
			    </soapenv:Envelope>';
			    var oModel = new sap.ui.model.xml.XMLModel();  
			    var response = "";
                  var returnVal = "";
                  console.log(serviceAPIs.alertAPI_all_alert_consumers());
                  
                  (function poll(){
                	//setTimeout(function() {  
                		console.log(localStore('sessionObject').username+':'+localStore('sessionObject').password);
			             $.ajax({  
			             url : serviceAPIs.alertAPI_all_alert_consumers(),  
			             type : "POST",  
			             data : request,  
			             dataType : "text",  
			             contentType : "text/xml; charset=\"utf-8\"",
			             timeout: 10000,
			             headers : {
						    	'Access-Control-Allow-Origin': '*',
						    	'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
						    }
			             })
			             .done(function(data) {  
			                   response = data; 
			                   console.log(data);
			                   parser=new DOMParser();  
			                    xmlDoc=parser.parseFromString(response,"text/xml");  
			                    returnVal = xmlDoc.getElementsByTagNameNS("*","AlertRuleQueryResponse")[0];  
			                    if(returnVal != null){
			                    uicontrols();
			                    //poll();
			                    }
			                   
			             })  
			             .fail(function (jqXHR, exception) {
			                 // Our error logic here
			            	 console.log(jqXHR.status +"--->"+jqXHR.responseText);
			                 var msg = '';
			                 if (jqXHR.status === 0) {
			                     msg = 'Not connect.\n Verify Network.';
			                 } else if (jqXHR.status == 404) {
			                     msg = 'Requested page not found. [404]';
			                 } else if (jqXHR.status == 500) {
			                     msg = 'Internal Server Error [500].';
			                 } else if (exception === 'parsererror') {
			                     msg = 'Requested XML parse failed.';
			                 } else if (exception === 'timeout') {
			                     msg = 'Time out error.';
			                 } else if (exception === 'abort') {
			                     msg = 'Ajax request aborted.';
			                 } else {
			                     msg = 'Uncaught Error.\n' + jqXHR.responseText;
			                 }
			                 
			                 console.log(msg);
			             })
			             .always(function () {
			            	 console.log("complete");
			             });
			               
					    // }, 2000);
                	})();
					
                  
                  				function uicontrols(){  
					             oModel.setXML(new XMLSerializer().serializeToString(returnVal));  
					             }  
					
                  				
                  				
						var oTable = new sap.ui.table.Table({  
							             id: "table1"  
							}); 
					
					     oTable.addColumn(new sap.ui.table.Column({          
					                          label: new sap.ui.commons.Label({text: "Severity"}),          
					                          template: new sap.ui.commons.TextField().bindProperty("value", "Severity/text()")    
					     				})   
					      );   
					      oTable.addColumn(new sap.ui.table.Column({          
					                      label: new sap.ui.commons.Label({text: "AlertConsumers"}),          
					                      template: new sap.ui.commons.TextField().bindProperty("value", "AlertConsumers/text()")    
					      				})   
					      );   
					      oTable.setModel(oModel);     
					      oTable.bindRows({path: "/AlertRule"});  
					      oPanel.addContent(oTable);
					      
					      
					      
				         var eventBus = sap.ui.getCore().getEventBus();
				   		 // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
				   		 eventBus.subscribe("FetchAlertsFromNotificationBar", "onNavigateEvent", this.onDataReceived, this);
				   		 eventBus.subscribe("FetchAlertConsumersFromNotificationBar", "onNavigateEvent", this.onAlertConsumersReceived, this);
					     return oPanel;
          },
          
          onAlertConsumersReceived : function(channel, event, data){
        	  var oModel = new sap.ui.model.xml.XMLModel();
        	  oModel.setXML(data);
        	  
          },
          onDataReceived : function(channel, event, data) {
     		 alert(data[ErrText]);
     		 console.log("Inside ondatareceived -> view");
     		 // do something with the data (bind to model)
     		 var oTextView = new sap.ui.commons.TextView({
     				text : 'Test',
     				tooltip : JSON.stringify(data),
     				wrapping : true,
     				width : '200px',
     				semanticColor: sap.ui.commons.TextViewColor.Positive,
     				design: sap.ui.commons.TextViewDesign.H3
     				});  
     		 
     		 console.log(this.byId('oPanel'));
     		
     		this.byId('oPanel').addContent(oTextView);
     		//this.byId('oPanel').rerender();
	 
     	}
			
		});
