//strResponse = "";
var ctrSuccess = 0;
var ctrCancelled = 0;
var ctrSystemError = 0;
var ctrHolding = 0;
var ctrDelivering = 0;
var ctrWaiting = 0;
var ctrToBeDelivered = 0;
//var obj = "";

sap.ui.controller("sap_pi_monitoring_tool.DashboardReport", {

	
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
	    
	    var formattedDate = yyyy + "-" + mm + "-" + dd + "T" + hour + ":" + mins + ":" + secs;
	    console.log("formattedStartDt");
	    console.log(dd);
	    console.log(mm);
	    console.log(yyyy);
	    console.log(formattedDate);
		//var backdate = new Date(myDate).toIOCtring();
		return formattedDate;
		
	},
	
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
	
	returnInterval : function( interval) {
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
			strInterval	= "12";	
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
	
	
extractData : function (obj,startDateTime,endDateTime,strStatus,maxCount,counter){
	 if(counter==0)
	    	return "";
	 else{
		//obj.byId('layoutID').setBusy(true);
		//status = "success";
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
        "			  <urn1:status>" + strStatus + "</urn1:status>\n" +
        
        "				<urn1:timesFailed></urn1:timesFailed>\n" +
        "				<!--Optional:-->\n" +
        //"				<urn1:toTime>2016-03-29T13:10:57.000</urn1:toTime>\n" +
        "               <urn1:toTime>" + endDateTime + "</urn1:toTime>\n" +
        "				<urn1:wasEdited>false</urn1:wasEdited>\n" +
        "		</urn:filter>\n" +
     	"       <!--Optional:-->\n" +
     	"       <urn:maxMessages>" + maxCount + "</urn:maxMessages>\n" +
  		"		</urn:getMessageList>\n"  +
			"     </soapenv:Body>\n" +
		"</soapenv:Envelope>";
	   console.log("request");
	   console.log(request);
		var response = "";	
		var s = "";
		
		obj = this;
		console.log("Dashboard this : ");
		console.log(serviceAPIs.messageAPI());
		var isError = true;
		var errText = "";
		$.ajax({

		     url : serviceAPIs.messageAPI(),
		     type : "POST",
		     data : request,
		     dataType : "text",
		     timeout : 3*60*3600,
		     contentType : "text/xml; charset=\"utf-8\"",
		     headers: {
		    	 	'Access-Control-Allow-Origin': '*',
					'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
             },
             beforeSend:function(){
                 // show image here
                 //$("#busy").show();
            	 obj.byId('layoutID').setBusy(true);
             },
             //obj.byId('layoutID').setBusy(true);
		     success : function(data, textStatus, jqXHR) {
		    	 isError = false; 
		    	 response = data;
		          console.log("SUCCESS");
		          console.log(response);

		     },
		     error: function(xhr, status)

		     {
		          console.log("ERROR");
		          console.log("status");
		          console.log(status);
		          console.log(xhr.responseText);
		          isError = true;
		          errText = xhr.responseText;
		     },

		     complete: function(xhr,status) {

		         console.log("COMPLETE");
		         if(isError){
		        	 var o = localStore('sessionObject');
                	 o.msg = errText;
                	 oStorage.put('sessionObject', o);
                	 
                	 //$.xhrPool.abortAll();
                	 openLoginDialog();
		        	 return;
		         }
		         parser=new DOMParser();  
                 
		         xmlDoc=parser.parseFromString(response,"text/xml");  
		         			                    
		         returnVal = xmlDoc.getElementsByTagNameNS("*","getMessageListResponse")[0]; 
		         console.log("prob"); 
		         //console.log(new XMLSerializer().serializeToString(returnVal)); 
		        // strResponse = new XMLSerializer().serializeToString(returnVal);
		         //var xmlWithoutNS = s.replace("xmlns(:\w+)?=""[^""]*""","");
		         
	/*response = response.replace("<SOAP-ENV:Envelope xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"
		        		 ,"");
		        		 		response = response.replace("<SOAP-ENV:Body xmlns:rpl='urn:AdapterMessageMonitoringVi'>","");
		        		 		response = response.replace("</SOAP-ENV:Body>", "");                  
		        		 		response = response.replace("</SOAP-ENV:Envelope>", "");*/
		         				//console.log("strResponse"); 
		        		 		//
		         
		        var AdapterFrameworkDataList = xmlDoc.getElementsByTagNameNS("*","AdapterFrameworkData");
		 		var AdapterFrameworkDataNo = AdapterFrameworkDataList.length;
		 		console.log("AdapterFrameworkDataNo");
		 		console.log(AdapterFrameworkDataNo);
		 		/*for(var i=0;i<AdapterFrameworkDataNo;i++){
		 			var AdapterFrameworkDataNode = AdapterFrameworkDataList.item(i);
		 			var statusNode = AdapterFrameworkDataNode.getElementsByTagNameNS("*","status").item(0);
		 			console.log("statusNode");
		 			console.log(statusNode.textContent);
			 		console.log(statusNode.nodeName);
		 			if(statusNode.textContent == "success"){
		 				ctrSuccess = ctrSuccess + 1;
		 			}
		 			else if(statusNode.textContent == "delivering"){
		 				ctrDelivering = ctrDelivering + 1;
		 			}
		 			else if(statusNode.textContent == "canceled"){
		 				ctrCancelled = ctrCancelled + 1;
		 			}
		 			else if(statusNode.textContent == "systemError"){
		 				ctrSystemError = ctrSystemError + 1;
		 			}
		 			
		 			else if(statusNode.textContent == "holding"){
		 				ctrHolding = ctrHolding + 1;
		 			}
		 			else if(statusNode.textContent == "waiting"){
		 				ctrWaiting = ctrWaiting + 1;
		 			}
		 			else if(statusNode.textContent == "toBeDelivered"){
		 				ctrToBeDelivered = ctrToBeDelivered + 1;
		 			}
		 		}*/
		 		
		 		if(strStatus == "success"){
	 				ctrSuccess = AdapterFrameworkDataNo;
	 				obj.byId("lbSuccessCtr").setText(ctrSuccess);
	 				console.log("ctrSuccess");
	 				console.log(ctrSuccess);
	 			}
	 			else if(strStatus == "delivering"){
	 				ctrDelivering = AdapterFrameworkDataNo;
	 				obj.byId("lbDeliveringCtr").setText(ctrDelivering);
	 			}
	 			else if(strStatus == "canceled"){
	 				ctrCancelled = AdapterFrameworkDataNo;
	 				obj.byId("lbCancelledCtr").setText(ctrCancelled);
	 				console.log("canceled");
			        console.log(ctrCancelled);
	 			}
	 			else if(strStatus == "systemError"){
	 				ctrSystemError = AdapterFrameworkDataNo;
	 				obj.byId("lbSystemErrorCtr").setText(ctrSystemError);
	 				 console.log("systemError");
			         console.log(ctrSystemError);
	 			}
	 			else if(strStatus == "holding"){
	 				ctrHolding = AdapterFrameworkDataNo;
	 				obj.byId("lbHoldingCtr").setText(ctrHolding);
	 			}
	 			else if(strStatus == "waiting"){
	 				ctrWaiting = AdapterFrameworkDataNo;
	 				obj.byId("lbWaitingCtr").setText(ctrWaiting);
	 			}
	 			else if(strStatus == "toBeDelivered"){
	 				ctrToBeDelivered = AdapterFrameworkDataNo;
	 				obj.byId("lbToBeDeliveredCtr").setText(ctrToBeDelivered);
	 			}
		          
		         //this.byId("layoutID").setVisible(true);
			     //console.log("this.byId(lbSuccess)");
			     //console.log(this.byId("lbSuccess"));
		         obj.byId("layoutID").setBusy(false);
		         counter = counter - 1;
		         obj.extractData(obj,startDateTime,endDateTime,statuses[counter - 1],maxCount,counter);
		         
		     }
		});
		
	 }
		
		//return s;
   },

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.dashboardReport
*/
	onInit: function() {
		/*var interval = this.returnInterval(this.byId("oCmbTimeInterval").getValue());
		var startDateTime = this.calculateBackDate(interval);
		var endDateTime = this.formattedCurrentDate();
		console.log("endDateTime oninit"); 
		console.log(endDateTime); 
		this.extractData(this,startDateTime,endDateTime);*/
		//this.byId('layoutID').setBusy(true);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_monitoring_tool.dashboardReport
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_monitoring_tool.dashboardReport
*/
	onAfterRendering: function() {
		var counter = 7;
		statuses = ["success", "delivering", "canceled", "holding", "waiting","systemError","toBeDelivered"]; 
		var objThis = this;
		var interval = this.returnInterval(this.byId("oCmbTimeInterval").getValue());
		var startDateTime = this.calculateBackDate(interval);
		var endDateTime = this.formattedCurrentDate();
		var maxCount = objThis.byId("oCmbMaxCount").getLiveValue();
		console.log("endDateTime oninit"); 
		console.log(endDateTime); 
		console.log("maxCount");
		console.log(maxCount);
		/*setTimeout(function(){
			objThis.extractData(objThis,startDateTime,endDateTime,"success");
			setTimeout(function(){
				objThis.extractData(objThis,startDateTime,endDateTime,"delivering");
				setTimeout(function(){
					objThis.extractData(objThis,startDateTime,endDateTime,"canceled");
					setTimeout(function(){
						objThis.extractData(objThis,startDateTime,endDateTime,"holding");
						setTimeout(function(){
							objThis.extractData(objThis,startDateTime,endDateTime,"waiting");
							setTimeout(function(){
								objThis.extractData(objThis,startDateTime,endDateTime,"systemError");
								setTimeout(function(){
									
									objThis.extractData(objThis,startDateTime,endDateTime,"toBeDelivered");
								}, 10000);
							}, 10000);
						}, 10000);
					}, 10000);
				}, 10000);
			}, 10000);
		}, 100);*/
		
		objThis.extractData(objThis,startDateTime,endDateTime,statuses[counter-1],maxCount,counter);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.dashboardReport
*/
//	onExit: function() {
//
//	}

});