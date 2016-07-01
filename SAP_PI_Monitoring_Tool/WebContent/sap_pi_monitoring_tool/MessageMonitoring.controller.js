var obj = "";
sap.ui.controller("sap_pi_monitoring_tool.MessageMonitoring", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.display
*/

	formattedCurrentDate : function(){
		var toDay = new Date();
		var dd    = toDay.getDate();
	    var mm    = toDay.getMonth() + 1;
	    var yyyy  = toDay.getFullYear();
	    var hour  = toDay.getHours();
	    var mins  = toDay.getMinutes();
	    var secs  = toDay.getSeconds();
	    
	    var formattedDate = yyyy + "-" + mm + "-" + dd + "T" + hour + ":" + mins + ":" + secs;
	    console.log("formattedStartDt");
	    console.log(dd);
	    console.log(mm);
	    console.log(yyyy);
	    console.log(formattedDate);
		//var backdate = new Date(myDate).toIOCtring();
		return formattedDate;
	},
	
	calculateBackDate : function(interval){
		var intervalHours = interval;
		var dateOffset = (parseInt(intervalHours)*60*60*1000); 
		var myDate = new Date().getTime() - dateOffset;
		console.log("myDate " + myDate);
		var backdate = new Date(myDate);
		var dd    = backdate.getDate();
	    var mm    = backdate.getMonth() + 1;
	    var yyyy  = backdate.getFullYear();
	    var hour  = backdate.getHours();
	    var mins  = backdate.getMinutes();
	    var secs  = backdate.getSeconds();
	    
	    if(dd <10)
	    	dd = "0" + dd;
	    if(mm <10)
	    	mm = "0" + mm;
	    if(hour < 10)
	    	hour = "0" + hour;
	    if(mins < 10)
	    	mins = "0" + mins;
	    if(secs < 10)
	    	secs = "0" + secs;
	    var formattedDate = yyyy + "-" + mm + "-" + dd + "T" + hour + ":" + mins + ":" + secs;
	    console.log("formattedStartDt");
	    console.log(dd);
	    console.log(mm);
	    console.log(yyyy);
	    console.log(formattedDate);
		//var backdate = new Date(myDate).toIOCtring();
		return formattedDate;
		
	},
	
	returnInterval : function(interval) {
		var strInterval = "";
		if(interval == "Last One Hour"){
			strInterval = "1";
		}
		else if(interval == "Last Two Hours"){
			strInterval = "2";
		}
		else if(interval == "Last Six Hours"){
			strInterval = "6";
		}
		else if(interval == "Last Twelve Hours"){
			strInterval = "12";
		}
		else if(interval == "Last 24 Hours"){
			strInterval = "24";
		}
		return strInterval;
		
	},
	
	returnType : function(type){
		var strTyp = "";
		if(type == "System Error"){
			strTyp = "systemError";
		}
		else if(type == "Delivered"){
			strTyp = "success";
		}
		else if(type == "Delivering"){
			strTyp = "delivering";
		}
		else if(type == "Holding"){
			strTyp = "holding";
		}
		else if(type == "Waiting"){
			strTyp = "waiting";
		}
		else if(type == "Cancelled"){
			strTyp = "canceled";
		}
		else if(type == "To Be Delivered"){
			strTyp = "toBeDelivered";
		}
		return strTyp;
	},
	
	extractData : function (statusType,startDateTime,endDateTime, maxCount){
		obj = this;
		var maxMessageSearched = 0;
		var maxMessageFound = 0;
		maxMessageSearched = parseInt(maxCount) + 1;
		/*var startDateTime = "";
		var endDateTime = "";
		
		if(statusType == "Custom"){
			if(startDate == "")
				startDate = obj.byId("datePickerStart").getValue();
			if(startTime == "")
				startTime = obj.byId("timePickerStart").getValue();
			if(endDate == "")
				endDate = obj.byId("datePickerEnd").getValue();
			if(endTime == "")
				endTime = obj.byId("timePickerEnd").getValue();
		
			console.log("startDate in extractData");
			console.log(startDate);
			startDateTime = startDate + "T" + startTime;
			endDateTime = endDate + "T" + endTime;
		}
		else{
			startDateTime = startDate;
			endDateTime = endDate;
				
		}*/
		
		var request = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:AdapterMessageMonitoringVi\" xmlns:urn1=\"urn:com.sap.aii.mdt.server.adapterframework.ws\" xmlns:urn2=\"urn:com.sap.aii.mdt.api.data\" xmlns:lang=\"urn:java/lang\">\n" +
        "    <soapenv:Header/>\n" +
			"      <soapenv:Body>\n" +
        "       <urn:getMessageList>\n" +
        "          <urn:filter>\n" +
        "				<urn1:archive>false</urn1:archive>\n" +
       	"               <urn1:dateType></urn1:dateType>\n" +
        "               <!--Optional:-->\n" +
        //"               <urn1:fromTime>2016-02-28T13:10:57.000</urn1:fromTime>\n" +
        "               <urn1:fromTime>" + startDateTime + "</urn1:fromTime>\n"  + 
        "               <urn1:nodeId></urn1:nodeId>\n" +
        "               <urn1:onlyFaultyMessages></urn1:onlyFaultyMessages>\n" +
        " 				<urn1:retries></urn1:retries>\n" +
        "				<urn1:retryInterval></urn1:retryInterval>\n" +
        "				<!--Optional:-->\n" +
        "				<urn1:status>" + statusType + "</urn1:status>\n" +
        
        "				<urn1:timesFailed></urn1:timesFailed>\n" +
        "				<!--Optional:-->\n" +
        //"				<urn1:toTime>2016-03-29T13:10:57.000</urn1:toTime>\n" +
        "               <urn1:toTime>" + endDateTime + "</urn1:toTime>\n" +
        "				<urn1:wasEdited>false</urn1:wasEdited>\n" +
        "		</urn:filter>\n" +
     	"       <!--Optional:-->\n" +
     	"       <urn:maxMessages>" + maxMessageSearched + "</urn:maxMessages>\n" +
  		"		</urn:getMessageList>\n"  +
			"     </soapenv:Body>\n" +
		"</soapenv:Envelope>";
	   console.log("request in message monitoring controller");
	   console.log(maxMessageSearched);
	   console.log(request);
	   var response = "";	
	   
	   console.log("obj");
	   console.log(obj);
	   $.ajax({

		     url : serviceAPIs.messageAPI(),
			 //url : "http://dssapux6u0v.dsg.dk:8830/AdapterMessageMonitoring/basic?style=document",
			
		     type : "POST",
		     data : request,
		     dataType : "text",
		     contentType : "text/xml; charset=\"utf-8\"",
		     headers: {
		    	 	'Access-Control-Allow-Origin': '*',
					'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
             },
		     success : function(data, textStatus, jqXHR) {
		          response = data;
		          console.log("SUCCESS");
		          console.log(response);

		     },
		     error: function(xhr, status) {
		          console.log("ERROR");
		          console.log(xhr);

		     },

		     complete: function(xhr,status) {

		         console.log("COMPLETE"); 
		         parser=new DOMParser();  
                 
		         xmlDoc=parser.parseFromString(response,"text/xml");  
		         			                    
		         returnVal = xmlDoc.getElementsByTagNameNS("*","getMessageListResponse")[0]; 
		         console.log("prob"); 
		         console.log(new XMLSerializer().serializeToString(returnVal)); 
		         var s= new XMLSerializer().serializeToString(returnVal);
		         //var xmlWithoutNS = s.replace("xmlns(:\w+)?=""[^""]*""","");
		         
	
		         console.log("S"); 
		         console.log(s); 
		        		 		
		        
		        //oModel.refresh(true);
		        
		        
		       		 		
		        //console.log("before set model");
		        /*oModel.setNameSpace("urn:AdapterMessageMonitoringVi","rp11");
		        oModel.setNameSpace("java:sap/standard","rn11");
		        oModel.setNameSpace("urn:java.lang","rn01");
		        oModel.setNameSpace("urn:com.sap.aii.mdt.api.data","rn21");
		        oModel.setNameSpace("http://schemas.xmlsoap.org/soap/encoding/","rn41");
		        oModel.setNameSpace("urn:com.sap.exception","rn31");
		        oModel.setNameSpace("urn:com.sap.aii.mdt.server.adapterframework.ws","rn51");
		        oModel.setNameSpace("urn:com.sap.aii.mdt.api.data.esiext","rn61");
		        oModel.setNameSpace("urn:com.sap.aii.mdt.server.adapterframework.ws.esiext","rn71");*/
		        //oModel.setNameSpace("urn:com.sap.aii.mdt.server.adapterframework.ws.esiext","rn7");
		        //oModel.setNameSpace("urn:com.sap.aii.mdt.server.adapterframework.ws.esiext","rn7");
		        //oModel.setNameSpace("urn:java/lang","rn81");
		        console.log("test");
		        obj.byId("MessageListTable").getModel().setXML(s);
		        //console.log("test1");
		        //console.log(sap.ui.getCore().getModel());
		        //obj.byId("oModel").setXML(s);
		        console.log("after set model in controller");
		        //obj.byId("MessageListTable").bindRows({path: "/rpl:Response/rn5:list/rn5:AdapterFrameworkData"});
		        maxMessageFound = obj.byId("MessageListTable").getBinding().getLength();
		        if(maxMessageFound > maxCount){
		        	obj.byId("lbMessageCount").setText("More Than " +  maxCount + " Messages Found");
		        }	
		        else{
		        	obj.byId("lbMessageCount").setText("Total Messages Found " + obj.byId("MessageListTable").getBinding().getLength());
		        }					
				/*resultPannel.addContent(MessageListTable);    
				layout.createRow(resultPannel);*/
		        obj.byId("resultPannel").setVisible(true);
									
		        console.log("after bindrows");
		        obj.byId("layout").setBusy(false);		 			
		        		 			
		     }

		});
		
		
		
	},
	//end of extractData
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_monitoring_tool.display
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_monitoring_tool.display
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.display
*/
//	onExit: function() {
//
//	}

});