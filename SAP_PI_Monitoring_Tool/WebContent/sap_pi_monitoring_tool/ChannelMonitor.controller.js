var oModel = new sap.ui.model.xml.XMLModel();
var oTable = new sap.ui.table.Table();
var oController;
sap.ui.controller("sap_pi_monitoring_tool.ChannelMonitor", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
	onInit: function() {
		oController = this;
		this.byId('oChannelListPanel').addContent(
			sap.ui.view({
			viewName : "sap_pi_monitoring_tool.Loading",
			type : sap.ui.core.mvc.ViewType.HTML
			})
		);
		
		
		oTable.setToolbar(new sap.ui.commons.Toolbar({items: [   
                                                      //new sap.ui.commons.Label({text : "Find"}),   
                                                      //new sap.ui.commons.TextField({liveChange: oController.Change}),  
                                                      //new sap.ui.commons.Button({text: "Go", press: function(){}}),
                                                      new sap.ui.commons.Button({text: "Export", press: function(){
                                                    	  exportToCSV(oTable, 'Channel List Report');
                                                      }})
                                             ]}));
		/*oTable.columns = [  
	                    new sap.ui.table.Column({label: "Component", template:new sap.ui.commons.Link().bindProperty("text", "Component").bindProperty("href", "Component"), filterProperty:"Component" })  
	                    new sap.ui.table.Column({label: "Material Description", template:new sap.ui.commons.Link().bindProperty("text", "MaterialDescription").bindProperty("href", "MaterialDescriptionhref"), filterProperty:"MaterialDescription" }),  
	                    new sap.ui.table.Column({label: "Product Category Description", template:"ProductCategoryDescription", filterProperty:"ProductCategoryDescription" }),  
	                    new sap.ui.table.Column({label: "Created By", template:new sap.ui.commons.Link().bindProperty("text", "CreatedBy").bindProperty("href", "CreatedByhref"),filterProperty:"CreatedBy"  }),  
	                    new sap.ui.table.Column({label: "Date/Time", template:"DateTime", filterProperty:"DateTime" })  
	                    ] ;*/
		
    	oTable.setTitle("Channel status");
    	oTable.setNoData(new sap.ui.commons.TextView({text: "No data available!"}));

    	//oModel.setXML(new XMLSerializer().serializeToString(returnVal));  
         
    	
    	oTable.addColumn(new sap.ui.table.Column({ 
    		              width : '50px',
                          label: new sap.ui.commons.Label({text: "Party"}),          
                          template: new sap.ui.commons.TextField().bindProperty("value", "@party"),
                          filterProperty: "@party",
                          sortProperty: "@party"
     		})   
          );
	     oTable.addColumn(new sap.ui.table.Column({          
	                          label: new sap.ui.commons.Label({text: "Service"}),          
	                          template: new sap.ui.commons.TextField().bindProperty("value", "@service"),
	                          filterProperty: "@service",
	                          sortProperty: "@service"
	     				})   
	      );   
	      oTable.addColumn(new sap.ui.table.Column({          
	                      label: new sap.ui.commons.Label({text: "Channel"}),          
	                      template: new sap.ui.commons.TextField().bindProperty("value", "@name"),
	                      filterProperty: "@name",
                          sortProperty: "@name"
	      				})   
	      );
	      oTable.addColumn(new sap.ui.table.Column({          
              label: new sap.ui.commons.Label({text: "status/@activationState"}),
              filterProperty: "status/@activationState",
              sortProperty: "status/@activationState",
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
            	                  if(cellValue == null){
            	                	  
            	                  }else if (cellValue.toLowerCase() == 'started') {  
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
              label: new sap.ui.commons.Label({text: "Error"}),          
              template: new sap.ui.commons.TextField().bindProperty("value", "ShortLog"),
              filterProperty: "ShortLog",
              sortProperty: "ShortLog"
				})   
);
	      oTable.addColumn(new sap.ui.table.Column({          
              label: new sap.ui.commons.Label({text: "Channel State"}),
              filterProperty: "ChannelState",
              sortProperty: "ChannelState",
              template: new sap.ui.layout.HorizontalLayout({  
            	    content : [  
            	               new sap.ui.commons.TextView({  			                    	                   
            	                 textAlign: sap.ui.core.TextAlign.Left,  
            	                 visible : true  
            	               }).bindProperty("text", "ChannelState", function(cellValue){
            	            	  // remove styles else it will overwrite   
            	                  this.removeStyleClass('green');  
            	                  this.removeStyleClass('yellow');  
            	                  this.removeStyleClass('red');  
            	                  // Set style Conditionally  
            	                  if(cellValue == null){
            	                	  
            	                  }else if (cellValue.toLowerCase() == 'ok') {  
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
            	               }).bindProperty("text", "ActivationState", function(cellValue){
            	            	  if(cellValue == null){
            	            		  
            	            	  }else if (cellValue.toLowerCase() == 'started') {  
            	                      return "Stop";  
            	                  } else{  
            	                	  return "Start";               
            	                  }  
            	               })  
            	             ]  
            	           })     
				})   
	      );
	      oTable.setVisibleRowCount(5);
	      oTable.setModel(oModel);     
	      oTable.bindRows({path: "/channelStatus"});  
	      //colorRows(oTable, oModel);
	      this.byId('oChannelListPanel').destroyContent();
	      this.byId('oChannelListPanel').addContent(oTable);
	      
	      oTable.setBusy(true);
		  
	     
	      var oController = this;
			setTimeout(function(){
				  //oController.getChannels(oController);
			  }, 10);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
	onBeforeRendering: function() {
		
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
	onAfterRendering: function() {
		var oController = this;
		setTimeout(function(){
			  oController.getChannels(oController);
		  }, 10);
		//this.getChannels(this);
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sap_pi_monitoring_tool.ChannelMonitor
*/
//	onExit: function() {
//
//	}
	
	Change: function(oEvent){
          
          
    }  ,
    getChannelStatus : function(obj){
    	$.ajax({  
            url : serviceAPIs.channelStatusAPI2(), //"NewFile.xml",// 
            type : "POST",
            dataType : "text",  
            contentType : "text/xml; charset=\"utf-8\"",
            timeout: getSettings().ChannelFetchAjaxTimeout,
            xhrFields: {
            	withCredentials: true
            },
            headers : {
            		'Access-Control-Allow-Headers': 'X-Requested-With, X-Token, x-token, accept, content-type',
            		'Access-Control-Allow-Methods': 'GET,POST, OPTIONS',
			    	'Access-Control-Allow-Origin': '*',
			    	'Authorization': 'Basic ' + btoa(localStore('sessionObject').username+':'+localStore('sessionObject').password)
			    }
            })
            .done(function(data) { 
            	console.log(data);
            	parser=new DOMParser();  
                xmlDoc=parser.parseFromString(data,"text/xml");  
                returnVal = xmlDoc.getElementsByTagNameNS("*","Channels")[0];
                oModel.setXML(new XMLSerializer().serializeToString(returnVal));
                oTable.setBusy(false);
            })
            
    },
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
	             timeout: getSettings().ChannelFetchAjaxTimeout,
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
	                    		            	 console.log(data);
	                    		            	 parser=new DOMParser();  
	                    		                 xmlDoc=parser.parseFromString(data,"text/xml");  
	                    		                 returnVal = xmlDoc.getElementsByTagNameNS("*","getChannelAutomationStatusResponse")[0];
	                    		                 oModel.setXML(new XMLSerializer().serializeToString(returnVal));
	                    		                 sap.ui.getCore().setModel(oModel); 
	                    		                 
	                    		                 /*jQuery.sap.require("sap.ui.core.util.Export");
	                    		            	 jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
	                    		            	 oTable.exportData({
	                    		            		    exportType: new sap.ui.core.util.ExportType({
	                    		            		    	fileExtension : 'xls',
	                    		            		    	//mimeType : 'application/vnd.ms-excel'
	                    		            		    })
	                    		            		})
	                    		            		.saveFile("Channel1");
	                    		            	 
	                    		            	 oTable.exportData({
	                    		            		    exportType: new sap.ui.core.util.ExportType({
	                    		            		    	fileExtension : 'xls',
	                    		            		    	//mimeType : 'application/x-dos_ms_excel'
	                    		            		    })
	                    		            		})
	                    		            		.saveFile("cChannel2");
	                    		            	 oTable.exportData({
	                    		            		    exportType: new sap.ui.core.util.ExportType({
	                    		            		    	fileExtension : 'xls',
	                    		            		    	//mimeType : 'application/x-excel'
	                    		            		    })
	                    		            		})
	                    		            		.saveFile("cChannel2");
	                    		            	 oTable.exportData({
	                    		            		    exportType: new sap.ui.core.util.ExportType({
	                    		            		    	fileExtension : 'xls',
	                    		            		    	//mimeType : 'application/xls'
	                    		            		    })
	                    		            		})
	                    		            		.saveFile("cChannel3");*/
	                    		             })
	                    		             .fail(function(jqXHR, exception){
	                    		            	 sap.ui.commons.MessageBox.alert(jqXHR.responseText);
	                    		             
	                    		             })
	                    		             .always(function(){
	                    		            	 
	                    		            	 
	                    		            	 oTable.setBusy(false);
	                    		             });
	                    
	                        
	                    }      
	             })  
	             .fail(function (jqXHR, exception) {
	                 // Our error logic here
	            	 sap.ui.commons.MessageBox.alert(jqXHR.responseText);
	                 var msg = '';
	                 if (jqXHR.status === 0) {
	                     msg = jqXHR.responseText;
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
	            	 oTable.setBusy(false);
	            	 
	            	 
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
 
