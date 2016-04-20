sap.ui.controller("sap_pi_monitoring_tool.notification", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.notification
*/
	onInit: function() {
		oCon = this;
		var eventBus = sap.ui.getCore().getEventBus();
		
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
            oCon.byId("alert_noti").setIcon('images/loading.gif'); 
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
		             }).done(function(data) {  
		                   response = data; 
		                   console.log(data);
		                   parser=new DOMParser();  
		                    xmlDoc=parser.parseFromString(response,"text/xml");  
		                    nodeList = xmlDoc.getElementsByTagNameNS("*","AlertConsumers");  
	                		eventBus.publish("FetchAlertConsumersFromNotificationBar", "onNavigateEvent", nodeList);
		                    oStorage.put("alertConsumers", nodeList);
		                    
		                    setInterval(function(){
		                    	
		                    for(i=0; i< nodeList.length; i++) {
		                    	console.log(nodeList[i].textContent);
		                    	//////////////////////
		                    	
		                    	var req =
		                    		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aler="http://sap.com/xi/BASIS/alerting"> \
		                    		   <soapenv:Header/> \
		                    		   <soapenv:Body> \
		                    		      <aler:RetrieveSingleAlertsRequest>\
		                    		         <ConsumerID>'+nodeList[i].textContent+'</ConsumerID>\
		                    		         <MaxAlerts>10</MaxAlerts>\
		                    		      </aler:RetrieveSingleAlertsRequest>\
		                    		   </soapenv:Body>\
		                    		</soapenv:Envelope>';
		                		    var oModel = new sap.ui.model.xml.XMLModel();  
		                		    var response = "";
		                              var returnVal = "";
		                              console.log(serviceAPIs.alertAPI_single_alert());
		                               
		                		             $.ajax({  
		                		             url : serviceAPIs.alertAPI_single_alert(),  
		                		             type : "POST",  
		                		             data : req,  
		                		             dataType : "text",  
		                		             contentType : "text/xml; charset=\"utf-8\"",
		                		             timeout: 10000,
		                		             headers : {
		                					    	'Access-Control-Allow-Origin': '*',
		                					    	'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
		                					    }
		                		             }).done(function(data) {  		                		                    
		                		                   console.log(data);
		                		                   parser=new DOMParser();  
		                		                   xmlDoc=parser.parseFromString(data,"text/xml");  
		                		                   alerts = xmlDoc.getElementsByTagNameNS("*","Alert");  
		                		                   console.log(alerts);
		                		                    
		                		                    for(j=0; j< alerts.length; j++)  {
		                		                    console.log(JSON.parse(alerts[j].childNodes[0].textContent));
		                		                    var obj = JSON.parse(alerts[j].childNodes[0].textContent);
		                		                		var now = (new Date()).toUTCString();
		                		                		var oMessage = new sap.ui.core.Message({
		                		                			text :  obj.ErrText,
		                		                			level : sap.ui.core.MessageType.Error,
		                		                			timestamp : obj.Timestamp
		                		                		});
		                		                		var snd = new Audio("media/notification.mp3"); // buffers automatically when created
		                		                		snd.play();
		                		                		oCon.byId("alert_noti").addMessage(oMessage);
		                		                		eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", JSON.parse(alerts[j].childNodes[0].textContent));
		                		                		eventBus.publish("FetchAlertCountFromNotificationBar", "onNavigateEvent", 1);
		                		                    }
		                		                    
		                		                    if(false/*alerts.length == 0*/){
		                		                    	var now = (new Date()).toUTCString();
		                		                		var oMessage = new sap.ui.core.Message({
		                		                			text :  "No alert yet",
		                		                			timestamp : now
		                		                		});
		                		                		var snd = new Audio("media/notification.mp3"); // buffers automatically when created
		                		                		snd.play();
		                		                		oCon.byId("alert_noti").addMessage(oMessage);
		                		                		eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", { foo : i + ' '+ j });
		                		                    }
		                		             }).fail(function (jqXHR, exception) {
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
		                		            	 oCon.byId("alert_noti").setIcon('');
		                		             });
		                		             
		                    	//////////////////////
		                    }
		                    }, 10000);
		             })  
		             .fail(function (jqXHR, exception) {
		                 // Our error logic here
		            	 console.log(jqXHR.status +"--->"+jqXHR.responseText);
		                 var msg = '';
		                 if (jqXHR.status == 0) {
		                     msg = 'Not connect. Verify Network.';
		                     //openLoginDialog();
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
		                 eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", { err : jqXHR.responseText });
		             })
		             .always(function () {
		            	 console.log("complete");
		             });
		               
				    
				
              
              				 
		
		
		
		 
	},

	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_monitoring_tool.notification
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_monitoring_tool.notification
*/
	onAfterRendering: function() {
		
			
	}
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.notification
*/
//	onExit: function() {
//
//	}

});