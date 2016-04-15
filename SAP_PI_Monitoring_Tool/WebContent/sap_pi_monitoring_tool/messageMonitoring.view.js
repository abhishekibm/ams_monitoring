 
 oTable = null;
 //layout = null;
 resultPannel = null;
 //oModel = null;
 //satrtDate = "";
 //endDate = "";
 //startTime = "";
 //endTime = "";
 statusType = "";
 startDateTime = "";
 endDateTime = "";
sap.ui.jsview("sap_pi_monitoring_tool.messageMonitoring", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.display
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.messageMonitoring";
	},
	
	extractData : function (statusType,startDateTime,endDateTime){
		
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
     	"       <urn:maxMessages>100</urn:maxMessages>\n" +
  		"		</urn:getMessageList>\n"  +
			"     </soapenv:Body>\n" +
		"</soapenv:Envelope>";
	   console.log("request");
	   console.log(request);
		var response = "";	
	  
		$.ajax({

		     url : serviceAPIs.messageAPI(),
			 
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
		     error: function(xhr, status)

		     {
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
		         
	/*response = response.replace("<SOAP-ENV:Envelope xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"
		        		 ,"");
		        		 		response = response.replace("<SOAP-ENV:Body xmlns:rpl='urn:AdapterMessageMonitoringVi'>","");
		        		 		response = response.replace("</SOAP-ENV:Body>", "");                  
		        		 		response = response.replace("</SOAP-ENV:Envelope>", "");*/
		         				console.log("S"); 
		        		 		console.log(s); 
		        		 		/*try{

		        		 			  alert("response after modification>>>>:"+ response);

		        		 			  }catch(e){

		        		 			  alert(e.message);

		        		 		}*/
		        		 		
		        		 		

		        		 		
		        		 		//Create a model and bind the table rows to this model
		        		 		console.log("before create model");
		        		 		oModel = new sap.ui.model.xml.XMLModel();
		        		 		oModel.refresh(true);
		        		 		oModel.setXML(s);
		        		 		console.log("after create model");
		        		 		
		        		 		
																
								
		        		 		
		        		 			console.log("before set model");
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
		        		 			oTable.setModel(oModel);
		        		 			console.log("after set model");
		        		 			oTable.bindRows({path: "/rpl:Response/rn5:list/rn5:AdapterFrameworkData"});
		        		 			
		        		 			     
									
									/*resultPannel.addContent(oTable);    
									layout.createRow(resultPannel);*/
									resultPannel.setVisible(true);
									
		        		 			console.log("after bindrows");
		        		 			
		        		 			
		     }

		});
		
		/*try{

			  alert("response>>>>:"+ response);

			  }catch(e){

			  alert(e.message);

		}*/
		
	},
	//end of extractData

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.messageMonitoring
	*/ 
	createContent : function(oController) {
		
		/*var oDisplayForm = new sap.ui.layout.form.SimpleForm(
				"display1",
				{
					maxContainerCols: 1,
					editable: true,
					content:[
							new sap.ui.core.Title({text:"Display"}),
							new sap.ui.commons.Label({text:"Type"}),
							new sap.ui.commons.DropdownBox("drpBoxType", {
								rows: 2,
								items: [
								        new sap.ui.core.ListItem("Error",{text: "Error"}),
								        new sap.ui.core.ListItem("Successfull",{text: "Successfull"})
								]
							}),
							
							
							
							new sap.ui.commons.Button({
								text : "Show",
								tooltip : "show Messages",
								press : function() {
									

									var oTable = new sap.ui.table.Table({

									     id: "table1"

									});

									 

									oTable.addColumn(

									     new sap.ui.table.Column({

									          label: new sap.ui.commons.Label({text: "ErrorCategory"}),       

									          template: new sap.ui.commons.TextField().bindProperty("value", "errorCategory/text()") 

									     })

									);

									oTable.addColumn(

									     new sap.ui.table.Column({

									          label: new sap.ui.commons.Label({text: "ErrorCode"}),

									          template: new sap.ui.commons.TextField().bindProperty("value", "errorCode")

									  })

									);
									
									oTable.addColumn(

										     new sap.ui.table.Column({

										          label: new sap.ui.commons.Label({text: "Interface"}),

										          template: new sap.ui.commons.TextField().bindProperty("value", "interface/name")

										  })

										);

									oTable.setModel(oModel);

									oTable.bindRows({path: "/rpl:getMessageListResponse"});*/
		
		
									var layout = new sap.ui.commons.layout.MatrixLayout('layout');    
									layout.setWidth('100%');    
									// Search Box starts here   
									var searchPannel = new sap.ui.commons.Panel('searchPannel');  
									var sTitle = new sap.ui.commons.Title('sTitle');  
									sTitle.setText('Search Message');  
									searchPannel.setTitle(sTitle);  
									var sLayout = new sap.ui.commons.layout.MatrixLayout('sLayout');  
									sLayout.setWidth('100%');   
									var lbSearch = new sap.ui.commons.Label('lbSearch');  
									lbSearch.setText("Type");  
									//var txt_search = new sap.ui.commons.TextField('txt_search');   
									//txt_search.setTooltip('Please provide Order id!..'); 
									
									var oCmbType = new sap.ui.commons.DropdownBox("oCmbType");
									oCmbType.setTooltip("Type");
									oCmbType.setEditable(true);
									oCmbType.setWidth("250px");    
									//var list = new sap.ui.commons.ListBox({allowMultiSelect: false, visibleItems: 1});    
									var oItem = new sap.ui.core.ListItem("item1");
									oItem.setText("systemError");
									oCmbType.addItem(oItem);
									oItem = new sap.ui.core.ListItem("item2");
									oItem.setText("Delivered");
									oCmbType.addItem(oItem);
									oItem = new sap.ui.core.ListItem("item3");
									oItem.setText("Delivering");
									oCmbType.addItem(oItem);
									
									oCmbType.attachChange(function(oControlEvent) {
										
										var type = oCmbType.getValue();
										console.log("type");
								        console.log(type);
								        statusType = type;
								    });
									
									//Startdate
									
									/*var oStartDate = new sap.m.DatePicker(this.createId("datePickerTest"), {
								        type: "Date",
								        width: '200px',
								        value: {
								            path:"/dateValue", 
								            type: dateType
								        },
								        placeholder: "Date"
								    });*/
									
									var lbStartDate = new sap.ui.commons.Label('lbStartDate');  
									lbStartDate.setText("Start Date"); 
									var oStartDatePicker = new sap.m.DatePicker(this.createId("datePickerStart"), {
								        
								        displayFormat: 'dd/MM/yyyy',
								        valueFormat: 'yyyy-MM-dd' ,
								        dateValue : new Date() ,
										change: function(oEvent) {
											var satrtDate = oStartDatePicker.getValue();
									        console.log("satrtDate");
									        console.log(satrtDate);
									        startDateTime = satrtDate;	
										}
								    });
									
									/*oStartDatePicker.attachChange(function(oControlEvent) {
										
										var satrtDate = oStartDatePicker.getDateValue();
										console.log("satrtDate");
								        console.log(satrtDate);
								        
								    });*/
									var lbStartTime = new sap.ui.commons.Label('lbStartTime');  
									lbStartTime.setText("Start Time"); 
									var oStartTimePicker = new sap.m.TimePicker(this.createId("timePickerStart"), {
										
											valueFormat : "HH:mm:ss",
											displayFormat : "HH:mm:ss",
								            dateValue : new Date(),
								            change: function(oEvent) {
												var startTime = oStartTimePicker.getValue();
										        console.log("startTime");
										        console.log(startTime);
										        startDateTime = startDateTime + "T" + startTime;
										        console.log("startDateTime");
										        console.log(startDateTime);
											}
								    });
									
									//startDateTime = satrtDate + "T" + startTime;
									console.log("startDateTime");
							        console.log(startDateTime);
									
									var lbEndDate = new sap.ui.commons.Label('lbEndDate');  
									lbEndDate.setText("End Date");
									var oEndDatePicker = new sap.m.DatePicker(this.createId("datePickerEnd"), {
								        
										displayFormat: 'dd/MM/yyyy',
								        valueFormat: 'yyyy-MM-dd' ,
								        dateValue : new Date(),
								        change: function(oEvent) {
											var endDate = oEndDatePicker.getValue();
									        console.log("endDate");
									        console.log(endDate);
									        endDateTime = endDate;
										}
										
								    });
									
									var lbEndTime = new sap.ui.commons.Label('lbEndTime');  
									lbEndTime.setText("End Time");
									var oEndTimePicker = new sap.m.TimePicker(this.createId("timePickerEnd"), {
								        
										valueFormat : "HH:mm:ss",
										displayFormat : "HH:mm:ss",
								        dateValue : new Date(),
								        change: function(oEvent) {
											var endTime = oEndTimePicker.getValue();
									        console.log("endTime");
									        console.log(endTime);
									        endDateTime = endDateTime + "T" + endTime;
									        console.log("endDateTime");
									        console.log(endDateTime);
										}
								    });
									
									//endDateTime = endDate + "T" + endTime;
									
									//oCmbType.setListBox(list);
									var btnSearch = new sap.ui.commons.Button("btnSearch");   
									btnSearch.setText("Search");  
									var btnSearch = new sap.ui.commons.Button({
										  text : "   Show  ",
										  press: function(e) {
											  /*try{

												  //alert("responsecp>>>>:"+ sap.ui.getCore().byId("iddisplay"));
												  alert("responsecp>>>>:"+ oController.getView());

												  }catch(e){

												  alert(e.message);

											}*/
											//sap.ui.getCore().byId("display").getController().submitData(); 
											//sap.ui.getCore().byId("display").submitData();
											oController.getView().extractData(statusType,startDateTime,endDateTime); 
											//resultPannel.setVisible(true);
										    //uPanel.setVisible(true);
										    //oShell.invalidate();
										  }
									});
									
									
									//btnSearch.attachPress(oController.searchAction);   
									sLayout.createRow(lbSearch, oCmbType, lbStartDate, oStartDatePicker, lbStartTime, oStartTimePicker, lbEndDate, oEndDatePicker, lbEndTime, oEndTimePicker, btnSearch);  
									searchPannel.addContent(sLayout);  
									layout.createRow(searchPannel); 
									
									
									
									
									//Create an instance of the table control
			        		 		oTable = new sap.ui.table.Table({
			        		 			
			        		 			visibleRowCount: 7,
			        		 			firstVisibleRow: 3,
			        		 			selectionMode: sap.ui.table.SelectionMode.Single,
			        		 		});
			        		 		
			        		 		oTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "Direction"}),       

			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:direction/text()") 

			        		 			     })

			        		 			);

			        		 			oTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "MessageID"}),

			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:messageID/text()")

			        		 			  })

			        		 			);
			        		 			
			        		 			oTable.addColumn(

			        		 				     new sap.ui.table.Column({

			        		 				          label: new sap.ui.commons.Label({text: "Interface"}),

			        		 				          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:interface/rn2:name/text()")

			        		 				  })

			        		 			);
			        		 		
			        		 		resultPannel = new sap.ui.commons.Panel('resultPannel');              
									var rTitle = new sap.ui.commons.Title('rTitle');     
									rTitle.setText('Message Details');     
									resultPannel.setTitle(rTitle);
									
			        		 		resultPannel.addContent(oTable);    
									layout.createRow(resultPannel);
									resultPannel.setVisible(false);
									//Create an instance of the table control
			        		 		/*oTable = new sap.ui.table.Table({
			        		 			
			        		 			visibleRowCount: 7,
			        		 			firstVisibleRow: 3,
			        		 			selectionMode: sap.ui.table.SelectionMode.Single,
			        		 		});*/
			        		 		
			        		 		/*var resultPannel = new sap.ui.commons.Panel('resultPannel');              
									var rTitle = new sap.ui.commons.Title('rTitle');     
									rTitle.setText('Message Details');     
									resultPannel.setTitle(rTitle);     
									resultPannel.setVisible(false);*/
									console.log("after setinf result pannel");
									
										//layout.placeAt('content'); 
									this.addContent(layout);
									//oController.getView().addContent(layout);
									
									/*try{

										  alert("GETXML>>>>:"+oModel.getXML());

										  }catch(e){

										  alert(e.message);

									}
									function uicontrols(){

									     oModel.setXML(response);

									}*/
													
									/*oModel.setXML("<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+

									  "<config>"+

									  "<item date=\"January 2009\">"+

									  "<mode>1</mode>"+

									  "<unit>900</unit>"+

									  "<current>1</current>"+

									  "<interactive>1</interactive>"+

									  "</item>"+

									  "<item date=\"February 2009\">"+

									  "<mode>2</mode>"+

									  "<unit>400</unit>"+

									  "<current>2</current>"+

									  "<interactive>5</interactive>"+

									  "</item>"+

									  "<item date=\"December 2009\">"+

									  "<mode>9</mode>"+

									  "<unit>5</unit>"+

									  "<current>100</current>"+

									  "<interactive>3</interactive>"+

									  "</item>"+

									  "</config>");

									 

									  try{

									  alert("GETXML>>>>:"+oModel.getXML());

									  }catch(e){

									  alert(e.message);

									  }

									 

									  oTable.addColumn(

									  new sap.ui.table.Column({

									  label: new sap.ui.commons.Label({text: "Date"}),

									  template: new sap.ui.commons.TextField().bindProperty("value", "@date")  }

									  )

									  );

									  oTable.addColumn(

									  new sap.ui.table.Column({

									  label: new sap.ui.commons.Label({text: "Mode"}),

									  template: new sap.ui.commons.TextField().bindProperty("value", "mode/text()")  }

									  )

									  );

									  oTable.addColumn(

									  new sap.ui.table.Column({

									  label: new sap.ui.commons.Label({text: "Unit"}),

									  template: new sap.ui.commons.TextField().bindProperty("value", "unit/text()")  }

									  )

									  );

									  oTable.addColumn(

									  new sap.ui.table.Column({

									  label: new sap.ui.commons.Label({text: "Current"}),

									  template: new sap.ui.commons.TextField().bindProperty("value", "current/text()")  }

									  )

									  );

									  oTable.addColumn(

									  new sap.ui.table.Column({

									  label: new sap.ui.commons.Label({text: "Interactive"}),

									  template: new sap.ui.commons.TextField().bindProperty("value", "interactive/text()")  }

									  )

									  );*/
									
									

									  /*oTable.setModel(oModel);

									  oTable.bindRows({path: "/item/"});*/
									          
									   
									}

			});

								
