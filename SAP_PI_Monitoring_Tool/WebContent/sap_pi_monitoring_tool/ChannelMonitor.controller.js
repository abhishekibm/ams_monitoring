sap.ui.controller("sap_pi_monitoring_tool.ChannelMonitor", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
	onInit: function() {
		
		this.byId('oChannelListPanel').addContent(
			sap.ui.view({
			viewName : "sap_pi_monitoring_tool.Loading",
			type : sap.ui.core.mvc.ViewType.HTML
			})
		);
		
		
	},

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
	onAfterRendering: function() {
		this.getChannels(this);
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
//	onExit: function() {
//
//	}
	
	getChannels: function(obj){
		
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
	             url : serviceAPIs.channelListAPI(), //"NewFile.xml",// 
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
	                    parties = xmlDoc.getElementsByTagNameNS("*","PartyID");
	                    services = xmlDoc.getElementsByTagNameNS("*","ComponentID");
	                    channels = xmlDoc.getElementsByTagNameNS("*","ChannelID");
	                    if(channels != null){
	                    	
	                    	var req = 
	                    		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:com:sap:netweaver:pi:monitoring">\
	                    		   <soapenv:Header/>\
	                    		   <soapenv:Body>\
	                    		      <urn:getChannelAutomationStatus>';
	                    	for(i=0;i<channels.length; i++){
	                    		
	                    		req += 
	                    			'<channels name="'+channels.item(i).textContent+'" service="'+services.item(i).textContent+'" party="'+parties.item(i).textContent+'">\
	                    		     </channels>';
	                    	}	         
	                    		      req += '</urn:getChannelAutomationStatus>\
	                    		   </soapenv:Body>\
	                    		</soapenv:Envelope>';
	                    	console.log(req);
	                    		      $.ajax({  
	                    		             url : serviceAPIs.channelStatusAPI(),//'ChannelStatus.xml',//'proxy/http/inmbzr0096.in.dst.ibm.com:50000/ChannelAdminService/ChannelAdmin',  
	                    		             type : "POST",  
	                    		             data : req,  
	                    		             dataType : "text",  
	                    		             contentType : "text/xml; charset=\"utf-8\"",
	                    		             timeout: 100000,
	                    		             headers : {
	                    					    	'Access-Control-Allow-Origin': '*',
	                    					    	'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
	                    					    }
	                    		             })
	                    		             .done(function(data) {
	                    		            	 
	                    		            	 parser=new DOMParser();  
	                    		                 xmlDoc=parser.parseFromString(data,"text/xml");  
	                    		                 returnVal = xmlDoc.getElementsByTagNameNS("*","getChannelAutomationStatusResponse")[0];
	                    		            	 var oModel = new sap.ui.model.xml.XMLModel();
	                 	                    	 var oTable = new sap.ui.table.Table(); 
	                 	                    	oTable.setTitle("Channel status");
	                 	                    	
	                 	                    	oModel.setXML(new XMLSerializer().serializeToString(returnVal));  
	                 				             
	                 	                    	
	                 	                    	oTable.addColumn(new sap.ui.table.Column({ 
	                 	                    		              width : '100px',
	                 					                          label: new sap.ui.commons.Label({text: "Party"}),          
	                 					                          template: new sap.ui.commons.TextField().bindProperty("value", "@party")    
	                 					     		})   
	                 					          );
	                 						     oTable.addColumn(new sap.ui.table.Column({          
	                 						                          label: new sap.ui.commons.Label({text: "Component"}),          
	                 						                          template: new sap.ui.commons.TextField().bindProperty("value", "@service")    
	                 						     				})   
	                 						      );   
	                 						      oTable.addColumn(new sap.ui.table.Column({          
	                 						                      label: new sap.ui.commons.Label({text: "Channel"}),          
	                 						                      template: new sap.ui.commons.TextField().bindProperty("value", "@name")    
	                 						      				})   
	                 						      );
	                 						      oTable.addColumn(new sap.ui.table.Column({          
	                 			                      label: new sap.ui.commons.Label({text: "Running Status"}),          
	                 			                      template: new sap.ui.layout.HorizontalLayout({  
	                 			                    	    content : [  
	                 			                    	               new sap.ui.commons.TextView({  			                    	                   
	                 			                    	                 textAlign: sap.ui.core.TextAlign.Left,  
	                 			                    	                 visible : true  
	                 			                    	               }).bindProperty("text", "status/@activationState", function(cellValue){
	                 			                    	            	  // remove styles else it will overwrite   
	                 			                    	                  this.removeStyleClass('green');  
	                 			                    	                  this.removeStyleClass('yellow');  
	                 			                    	                  this.removeStyleClass('red');  
	                 			                    	                  // Set style Conditionally  
	                 			                    	                  if (cellValue.toLowerCase() == 'started') {  
	                 			                    	                      this.addStyleClass('green');  
	                 			                    	                  } else{  
	                 			                    	                	  this.addStyleClass('red');               
	                 			                    	                  }  
	                 			                    	                  return cellValue; 
	                 			                    	               })  
	                 			                    	                
	                 			                    	             ]  
	                 			                    	           })     
	                 			      				})   
	                 						      );
	                 						     oTable.addColumn(new sap.ui.table.Column({          
	                 			                      label: new sap.ui.commons.Label({text: "Running Status"}),          
	                 			                      template: new sap.ui.layout.HorizontalLayout({  
	                 			                    	    content : [  	                 			                    	                
	                 			                    	               new sap.ui.commons.Button({  
	                 			                    	                 text : "Approve",  
	                 			                    	                 press : function(){
	                 			                    	                	 
	                 			                    	                 },  
	                 			                    	                 visible : true  
	                 			                    	               }).bindProperty("text", "status/@activationState", function(cellValue){
	                 			                    	            	  if (cellValue.toLowerCase() == 'started') {  
	                 			                    	                      return "Stop";  
	                 			                    	                  } else{  
	                 			                    	                	  return "Start";               
	                 			                    	                  }  
	                 			                    	               })  
	                 			                    	             ]  
	                 			                    	           })     
	                 			      				})   
	                 						      );
	                 						      oTable.setModel(oModel);     
	                 						      oTable.bindRows({path: "/channelStatus"});  
	                 						      colorRows(oTable, oModel);
	                 						      obj.byId('oChannelListPanel').destroyContent();
	                 						      obj.byId('oChannelListPanel').addContent(oTable);
	                 	                    
	                    		             });
	                    
	                        
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
//Set Row Color Conditionally  
var colorRows = function(oTable, oModel) {  
    var rowCount = oTable.getVisibleRowCount(); //number of visible rows  
    var rowStart = oTable.getFirstVisibleRow(); //starting Row index  
    var currentRowContext;  
    for (var i = 0; i < rowCount; i++) {  
      currentRowContext = oTable.getContextByIndex(rowStart + i); //content  
        // Remove Style class else it will overwrite  
        //oTable.getRows()[i].$().removeClass("yellow");  
        //oTable.getRows()[i].$().removeClass("green");  
        //oTable.getRows()[i].$().removeClass("red");  
        var cellValue = oModel.getProperty("status/@activationState", currentRowContext); // Get status  
        //alert(cellValue);
        // Set Row color conditionally  
        if (cellValue.toLowerCase() == 'started') {  
            $(oTable.getRows()[i]).addClass("green");  
        } else {  
            $(oTable.getRows()[i]).addClass("red");  
        }  
    }  
}  
 