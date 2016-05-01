var ajaxCounter1 =0 ;
var ajaxCounter2 =0 ;
var eventBus = sap.ui.getCore().getEventBus();
var snd = new Audio("media/notification.mp3"); 
sap.ui.controller("sap_pi_monitoring_tool.Notification", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.notification
*/
	onInit: function() {
		oCon = this;
		
		oCon.fetchAlerts(this);
		               		 
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
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.notification
*/
//	onExit: function() {
//
//	}
	
	fetchAlerts : function(obj){
		ajaxCounter1++;
		obj.byId('conn_noti').setIcon('images/connecting.gif');
		

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
		    var ajax = $.ajax({  
		             url : serviceAPIs.alertAPI_all_alert_consumers(),  
		             type : "POST",  
		             data : request,  
		             dataType : "text",  
		             contentType : "text/xml; charset=\"utf-8\"",
		             timeout: settings.AlertAjaxTimeout,
		             headers : {
		            	    'X-Requested-With': 'XMLHttpRequest',
					    	'Access-Control-Allow-Origin': '*',
					    	'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
					    }
		             }).done(function(data) {
		            	   obj.byId('conn_noti').setIcon('images/Circle_Green.png');
		                   response = data; 
		                   //console.log(data);
		                   parser=new DOMParser();  
		                    xmlDoc=parser.parseFromString(response,"text/xml");  
		                    nodeList = xmlDoc.getElementsByTagNameNS("*","AlertConsumers");  
	                		eventBus.publish("FetchAlertConsumersFromNotificationBar", "onNavigateEvent", nodeList);
		                    //oStorage.put("alertConsumers", JSON.stringify(nodeList));
	                		setTimeout(function() { obj.fetchSingleAlert(nodeList, 0); }, 1000);
		                    
		             })  
		             .fail(function (jqXHR, exception) {

		                 // Our error logic here
		            	 console.log(jqXHR);
		                 var msg = '';
		                 if (jqXHR.status == 0) {
		                     msg = 'Not connect. Verify Network.';
		                     var now = (new Date()).toUTCString();
		                		var oMessage = new sap.ui.core.Message({
		                			text :  'Could not connect PI system.',
		                			level : sap.ui.core.MessageType.Error,
		                			timestamp : now
		                		});
		                		 // buffers automatically when created
		                	 //snd.play();
			            	 obj.byId('conn_noti').setIcon('images/Circle_Red.png');
		                 } 
		                 if (jqXHR.status == 404) {
		                     msg = 'Requested page not found. [404]';
		                 } 
		                 if (jqXHR.status == 500 || jqXHR.status == 401 || jqXHR.status == 403) {
		                	 var o = localStore('sessionObject');
		                	 o.msg = jqXHR.responseText;
		                	 oStorage.put('sessionObject', o);
		                	 obj.byId('conn_noti').setIcon('images/Circle_Red.png');
		                	 
		                	 openLoginDialog();
		                 } 
		                 if (exception === 'parsererror') {
		                     msg = 'Requested XML parse failed.';
		                 }
		                 if (exception === 'timeout') {
		                     msg = 'Time out error.';
		                     
		                     
		                     console.log("Max retrying count 5");
		                     if(ajaxCounter1 < 5){
		                    	 console.log("Timeout : Retrying count: "+ ajaxCounter1++);
		                    	 setTimeout(function(){obj.fetchAlerts(obj);}, 100);
		                     }
		                    	 
		                 } 
		                 if (exception === 'abort') {
		                     msg = 'Ajax request aborted.';
		                 } 
		                 
		                 
		                 
		                 console.log(msg);
		                 //eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", { err : jqXHR.responseText });
		             })
		             .always(function () {
		            	 console.log("complete");
		            	 ajaxCounter1--;
		             });
	},
	
	
    fetchSingleAlert: function(nodeList, i){
    	ajaxCounter2++;
    	console.log("Ajax call for "+ nodeList[i].textContent + " " + i +"/"+nodeList.length);
    	var oCon = this;
		oCon.byId('conn_noti').setIcon('images/connecting.gif');

    	var req =
    		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aler="http://sap.com/xi/BASIS/alerting"> \
    		   <soapenv:Header/> \
    		   <soapenv:Body> \
    		      <aler:RetrieveSingleAlertsRequest>\
    		         <ConsumerID>'+nodeList[i].textContent+'</ConsumerID>\
    		         <MaxAlerts>1000</MaxAlerts>\
    		      </aler:RetrieveSingleAlertsRequest>\
    		   </soapenv:Body>\
    		</soapenv:Envelope>';
		    var oModel = new sap.ui.model.xml.XMLModel();  
		    var response = "";
              var returnVal = "";
             
		             $.ajax({  
		             url : serviceAPIs.alertAPI_single_alert(),  
		             type : "POST",  
		             data : req,  
		             dataType : "text",  
		             contentType : "text/xml; charset=\"utf-8\"",
		             timeout: settings.AlertAjaxTimeout,
		             headers : {
					    	'Access-Control-Allow-Origin': '*',
					    	'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
					    }
		             }).done(function(data) {  		                		                    
		                   //console.log(data);
		                   oCon.byId('conn_noti').setIcon('images/Circle_Green.png');
		                   parser=new DOMParser();  
		                   xmlDoc=parser.parseFromString(data,"text/xml");  
		                   alerts = xmlDoc.getElementsByTagNameNS("*","Alert");  
		                   //console.log(alerts);
		                   
		                   /// Storing alerts in IndexedDB
		                	                   
		                   for(j=0; j< alerts.length; j++)  {
		                    console.log(JSON.parse(alerts[j].childNodes[0].textContent));
		                    var obj1 = JSON.parse(alerts[j].childNodes[0].textContent);
		                    
		                    db.alerts
		            		.add({
		            			payload: JSON.stringify(obj1),
		            			severity: obj1.Severity,
		            			timestamp: obj1.Timestamp
		            		});
		                    
		                		var now = (new Date()).toUTCString();
		                		var oMessage = new sap.ui.core.Message({
		                			text :  obj1.ErrText,
		                			level : sap.ui.core.MessageType.Error,
		                			timestamp : obj1.Timestamp
		                		});
		                		oMessage.data("alert", obj1);
		                		snd.play();
		                		oCon.byId("alert_noti").addMessage(oMessage);
		                		if(!(obj1.Channel == null || obj1.Channel == '')){
		                			// Channel in error
		                			oCon.byId("channel_noti").addMessage(oMessage);
		                		}
		                		eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", obj1);
		                		eventBus.publish("FetchAlertCountFromNotificationBar", "onNavigateEvent", 1);
		                    }
		                    
		                   if(i+1<nodeList.length){
			            		 //console.log("Starting next ajax ");
			            		 //console.log(nodeList);
			            		 //console.log(nodeList[i+1]);
			            		 
			            		 setTimeout(function() { ajaxCounter2 = 0; oCon.fetchSingleAlert(nodeList, i+1); }, settings.WaitBetweenAjaxCall);
			            		 
			            		 

			            	 }else{// When all consumers alerts fetched(or tried)
			            		 	var currentdate = new Date();
			            		 	if(currentdate.getHours()%20 == 0){ // Refrsh Alert Consumer List one time per day.
			            		 		setTimeout(function(){ajaxCounter1 = 0; ajaxCounter2 = 0 ; oCon.fetchAlerts(oCon);}, settings.WaitBetweenAjaxCall);
			            		 	}else{
			            		 		setTimeout(function(){ ajaxCounter2 = 0 ; oCon.fetchSingleAlert(nodeList, 0);}, settings.WaitBetweenAjaxCall);
			            		 	}
			            			  
			            		 
			            	 }
		                    
		             }).fail(function (jqXHR, exception) {
		            	 oCon.byId('conn_noti').setIcon('images/Circle_Red.png');

		            	// Our error logic here
		            	 console.log(jqXHR);
		                 var msg = '';
		                 if (jqXHR.status == 0) {
		                     msg = 'Not connect. Verify Network.';
		                     var now = (new Date()).toUTCString();
		                		var oMessage = new sap.ui.core.Message({
		                			text :  'Could not connect PI system.',
		                			level : sap.ui.core.MessageType.Error,
		                			timestamp : now
		                		});
		                		 // buffers automatically when created
		                	snd.play();
		                     oCon.byId("conn_noti").addMessage(oMessage);
		                 } 
		                 if (jqXHR.status == 404) {
		                     msg = 'Requested page not found. [404]';
		                 } 
		                 if (jqXHR.status == 500) {
		                	 var obj2 = localStore('sessionObject');
		                	 obj2.msg = jqXHR.responseText;
		                	 oStorage.put('sessionObject', obj2);
		                	 openLoginDialog();
		                 } 
		                 if (exception === 'parsererror') {
		                     msg = 'Requested XML parse failed.';
		                 }
		                 if (exception === 'timeout') {
		                     msg = 'Time out error.';
		                     
		                     console.log("Max retrying count 5");
		                     if(ajaxCounter2 < settings.MaxRetryCount){
		                    	 console.log('Timeout : Retrying count : ' + ajaxCounter2++);
		                    	 
		                    	 setTimeout(function(){oCon.fetchSingleAlert(nodeList, i);}, 100);
		                     }
		                 } 
		                 if (exception === 'abort') {
		                     msg = 'Ajax request aborted.';
		                 } 
		                 
		                 if (jqXHR.status == 401){
		                	 var obj3 = localStore('sessionObject');
		                	 obj3.msg = jqXHR.responseText;
		                	 oStorage.put('sessionObject', obj3);
		                	 openLoginDialog();
		                 }
		                 
		                 console.log(msg);
		             })
		             .always(function () {
		            	 ajaxCounter2--;
		            	 console.log("complete");
		            	 
		            		 
		             });
    }
});