
obj = "";
sap.ui.controller("sap_pi_monitoring_tool.GetMessageDetails", {

	onInit: function() {
		
		
		
		
		//this.doIt1();
	},
	
	
	doIt1 : function(strMessageKey,strArchiveFlag,strDate) {		
		
		console.log("Inside doIT");
		
		//var oTableMessagelist = this.byId("MessageListTable");
		
		/*var tableModel= oTableMessagelist.getModel();
		var contextPath="/SOAP-ENV:Body/rpl:getMessageListResponse/rpl:Response/rn5:list/rn5:AdapterFrameworkData/rn5:messageKey/";
		var strMessageKey = tableModel.getProperty(contextPath + "text()");	*/	
	    //alert(strMessageKey);
		
		//strArchiveFlag="false";
		
		//strDate = "2016-04-12T06:31:25.619-01:00";
		
		//alert(strDate);
		obj = this;
		var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:AdapterMessageMonitoringVi" xmlns:urn1="urn:com.sap.aii.mdt.server.adapterframework.ws">'
		   + '<soapenv:Header/>'
		   + '<soapenv:Body>'
		      + '<urn:getLogEntries>'
		         + '<urn:messageKey>'+ strMessageKey + '</urn:messageKey>'      
		         + '<urn:archive>'	 + strArchiveFlag + '</urn:archive>'
		         + '<urn:olderThan>' + strDate + '</urn:olderThan>'
		      + '</urn:getLogEntries>'
		   + '</soapenv:Body>'
		+ '</soapenv:Envelope>';

		// $.support.cors = true;

		console.log("soapRequest");
		console.log(soapRequest);
		
		$
				.ajax({

					// url : "proxy/http/localhost:50089/mockAdapterMessageMonitor",
					url : serviceAPIs.messageAPI(),
					dataType : "xml",
					processData : false,
					contentType : "text/xml; charset=\"utf-8\"",
					
					
					headers : {
						'Access-Control-Allow-Origin' : '*',
						'Authorization' : 'Basic '
							+btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
					},
					
					method : "POST",
					global : "false",

					data : soapRequest,

					success : function(data, statusText, jqXHR) {
						response = data;
						console.log("soapresponse");
						console.log(response);
						xmlTable(jqXHR.responseText);
					},

					error : function(jqXHR, statusText) {

				
						xmlTable(jqXHR.responseText);
					},

					always : function(jqXHR) {
						console.log(jqXHR.status);

					},

					complete : function(jqXHR, status) {
					
					}

				});

		function xmlTable(xmldata) {
			
			//var oModel = new sap.ui.model.xml.XMLModel();

	//alert("inside xmlTable");

			//oModel.setXML(xmldata);
			
			obj.byId("MessageLog").getModel().setXML(xmldata);
			//oTable.setModel(oModel);

	//alert(oTable.getModel().getXML());
			//oTable.unbindRows();
			//oTable.bindRows({
				//path : "/SOAP-ENV:Body/rpl:getLogEntriesResponse/rpl:Response/rn2:AuditLogEntryData/"
			//});
			
				// 	trying to refresh detail div.			
				//	$('#detail').innerHTML = "";
				//	$("#detail").html("");
			 
			// oTable.placeAt('detail');	 
				 
		}		
		
	
	}//doIt1 Close
	
	//code ends
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_ams_dashboard.GetMessageDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_ams_dashboard.GetMessageDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_ams_dashboard.GetMessageDetails
*/
//	onExit: function() {
//
//	}

});