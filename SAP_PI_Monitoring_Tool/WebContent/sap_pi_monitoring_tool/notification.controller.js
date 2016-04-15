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
              console.log(serviceAPIs.alertAPI_all_alert_consumers());
               
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
		                    nodeList = xmlDoc.getElementsByTagNameNS("*","AlertConsumers");  
		                    
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
		                		             })
		                		             .done(function(data) {  
		                		                    
		                		                   console.log(data);
		                		                   parser=new DOMParser();  
		                		                    xmlDoc=parser.parseFromString(data,"text/xml");  
		                		                    alerts = xmlDoc.getElementsByTagNameNS("*","Alert");  
		                		                    console.log(alerts);
		                		                    
		                		                    for(i=0; i< alerts.length; i++)  {
		                		                    
		                		                		var now = (new Date()).toUTCString();
		                		                		console.log("hihi");
		                		                		var oMessage = new sap.ui.core.Message({
		                		                			text :  alerts[i].textContent,
		                		                			timestamp : now
		                		                		});
		                		                		var snd = new Audio("media/notification.mp3"); // buffers automatically when created
		                		                		snd.play();
		                		                		oCon.byId("alert_noti").addMessage(oMessage);
		                		                		eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", { alert : alerts[i].textContent });
		                		                    }
		                		                    
		                		                    if(false/*alerts.length == 0*/){
		                		                    	var now = (new Date()).toUTCString();
		                		                		console.log("hihi");
		                		                		var oMessage = new sap.ui.core.Message({
		                		                			text :  "No alert yet",
		                		                			timestamp : now
		                		                		});
		                		                		var snd = new Audio("media/notification.mp3"); // buffers automatically when created
		                		                		snd.play();
		                		                		oCon.byId("alert_noti").addMessage(oMessage);
		                		                		eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", { foo : "bar" });
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
		                		             
		                    	//////////////////////
		                    }
		                    }, 10000);
		             })  
		             .fail(function (jqXHR, exception) {
		                 // Our error logic here
		            	 console.log(jqXHR.status +"--->"+jqXHR.responseText);
		                 var msg = '';
		                 if (jqXHR.status === 0) {
		                     msg = 'Not connect.\n Verify Network.';
		                     openLoginDialog();
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
		                     openLoginDialog();
		                 }
		                 
		                 console.log(msg);
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
		
			
	},
	
	pollSingleAlert: function(alertConsumer) {
		console.log('inside pollSigngleAlert');
		
	}
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.notification
*/
//	onExit: function() {
//
//	}

});