sap.ui.controller("sap_pi_monitoring_tool.ChannelMonitor", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
//	onExit: function() {
//
//	}
	
	getChannels: function(){
		
		var request =
		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bas="http://sap.com/xi/BASIS">\
		   <soapenv:Header/>\
		   <soapenv:Body>\
		      <bas:CommunicationChannelQueryRequest>\
		      </bas:CommunicationChannelQueryRequest>\
		   </soapenv:Body>\
		</soapenv:Envelope>';
		
		(function poll(){
        	//setTimeout(function() {  
        		
	             $.ajax({  
	             url : serviceAPIs.channelListAPI(),  
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
	}
});