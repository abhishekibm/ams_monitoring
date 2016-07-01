 
 var MessageListTable = null;
 //layout = null;
 var resultPannel = null;
 var oModel = null;
 var startDate = "";
 var endDate = "";
 var startTime = "";
 var endTime = "";
 //var statusType = "systemError";
 var statusType = "";
 //var timeIntervalinHours = "24";
 var timeIntervalinHours = "";
 var startDateTime = "";
 var endDateTime = "";
 sap.ui.jsview("sap_pi_monitoring_tool.MessageMonitoring", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.display
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.MessageMonitoring";
	},
	
	
	
	

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.messageMonitoring
	*/ 
	createContent : function(oController) {
		
									var layout = new sap.ui.commons.layout.MatrixLayout(this.createId('layout'));    
									//layout.setWidth('100%');    
									// Search Box starts here   
									var searchPannel = new sap.ui.commons.Panel('searchPannel');  
									var sTitle = new sap.ui.commons.Title('sTitle');  
									sTitle.setText('Search Message');  
									searchPannel.setTitle(sTitle);  
									var sLayout = new sap.ui.commons.layout.MatrixLayout('sLayout'); 
									
									var customLayout = new sap.ui.commons.layout.MatrixLayout('customLayout', {
										colSpan : 2
									});
									//customLayout.setWidth('80%');   
									var lbSearch = new sap.ui.commons.Label('lbSearch');  
									lbSearch.setText("Type");  
									//var txt_search = new sap.ui.commons.TextField('txt_search');   
									//txt_search.setTooltip('Please provide Order id!..'); 
									
									//var oCmbType = new sap.ui.commons.DropdownBox("oCmbType");
									
									var oCmbType = new sap.ui.commons.DropdownBox({

										  items: [

										      new sap.ui.core.ListItem("item1", {text: "System Error"}),
										      new sap.ui.core.ListItem("item2", {text: "Delivered"}),
										      new sap.ui.core.ListItem("item3", {text: "Delivering"}),
										      new sap.ui.core.ListItem("item4", {text: "Cancelled"}),
										      new sap.ui.core.ListItem("item5", {text: "Holding"}),
										      new sap.ui.core.ListItem("item6", {text: "Waiting"}),
										      new sap.ui.core.ListItem("item7", {text: "To Be Delivered"})
										  ]

									});
									
									oCmbType.setTooltip("Type");
									oCmbType.setEditable(true);
									
									var oCmbTimeInterval = new sap.ui.commons.DropdownBox({

										  items: [

										      new sap.ui.core.ListItem({text: "Last One Hour"}),
										      new sap.ui.core.ListItem({text: "Last Two Hours"}),
										      new sap.ui.core.ListItem({text: "Last Six Hours"}),
										      new sap.ui.core.ListItem({text: "Last Twelve Hours"}),
										      new sap.ui.core.ListItem({text: "Last 24 Hours"}),
										      new sap.ui.core.ListItem({text: "Custom"}),
										      
										  ]

									});
									
									var lbMaxCount = new sap.ui.commons.Label('lbMaxCount');  
									lbMaxCount.setText("Max Count");
									
									var oCmbMaxCount = new sap.ui.commons.DropdownBox({
										  Id: this.createId('oCmbMaxCount'),
										  items: [

										      new sap.ui.core.ListItem({text: "100"}),
										      new sap.ui.core.ListItem({text: "1000"}),
										      new sap.ui.core.ListItem({text: "2000"}),
										      new sap.ui.core.ListItem({text: "5000"}),
										      
										      
										  ]

									});
									
									oCmbMaxCount.setValue("100");
									
									var lbTimeInterval = new sap.ui.commons.Label('lbTimeInterval');  
									lbTimeInterval.setText("Time Interval");
									
									oCmbTimeInterval.setTooltip("Time Interval");
									oCmbTimeInterval.setEditable(true);
									oCmbTimeInterval.setValue("Last 24 Hours");
									
									oCmbTimeInterval.attachChange(function(oControlEvent) {
										//var interval = oController.returnInterval(oCmbTimeInterval.getLiveValue());
										var strInterval = oCmbTimeInterval.getValue();
										
										if(strInterval == "Custom"){
											//interval = "systemError";
											customLayout.setVisible(true);
										}
										else{
											customLayout.setVisible(false);
											//startDateTime = oController.calculateBackDate(oCmbTimeInterval.getValue());
											//endDateTime = oController.formattedCurrentDate();
											console.log("endDateTime oninit change event in message mnitoring"); 
											console.log(endDateTime); 
											//oController.extractData(this, startDateTime,endDateTime);
										}
										
										//timeIntervalinHours = interval;
										
									});
									
									
									oCmbType.attachChange(function(oControlEvent) {
										statusType = oCmbType.getValue();
										/*var Type = "";
										var strType = oCmbType.getValue();
										if(strType == "System Error"){
											Type = "System Error";
										}
										else if(strType == "Delivered"){
											Type = "Delivered";
										}
										else if(strType == "Delivering"){
											Type = "delivering";
										}
										else if(strType == "Holding"){
											Type = "holding";
										}
										else if(strType == "Waiting"){
											Type = "waiting";
										}
										else if(strType == "Cancelled"){
											Type = "canceled";
										}
										else if(strType == "To Be Delivered"){
											Type = "toBeDelivered";
										}
										console.log("type");
								        console.log(Type);
								        statusType = Type;
								        console.log(statusType);*/
								    });
									
									//Startdate
									
									/*var oStartDate = new sap.m.DatePicker(this.createId("datePickerTest"), {
								  
									
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
									
									var lbStartDate = new sap.ui.commons.Label('lbStartDate');  
									lbStartDate.setText("Start Date");
									var oStartDatePicker = new sap.m.DatePicker(this.createId("datePickerStart"), {
								        
										displayFormat: 'dd/MM/yyyy',
								        valueFormat: 'yyyy-MM-dd' ,
								        dateValue : new Date(),
								        change: function(oEvent) {
											startDate = oStartDatePicker.getValue();
									        console.log("startDate");
									        console.log(startDate);
									        //startDateTime = startDate;
										}
										
								    });
									
									var lbStartTime = new sap.ui.commons.Label('lbStartTime');  
									lbStartTime.setText("Start Time"); 
									var oStartTimePicker = new sap.m.TimePicker(this.createId("timePickerStart"), {
										
											valueFormat : "HH:mm:ss",
											displayFormat : "HH:mm:ss",
								            dateValue : new Date(),
								            change: function(oEvent) {
												startTime = oStartTimePicker.getValue();
										        console.log("startTime");
										        console.log(startTime);
										        //startDateTime = startDateTime + "T" + startTime;
										        //console.log("startDateTime");
										        //console.log(startDateTime);
											}
								    });
									
									//startDateTime = satrtDate + "T" + startTime;
									//console.log("startDateTime");
							        //console.log(startDateTime);
									
									var lbEndDate = new sap.ui.commons.Label('lbEndDate');  
									lbEndDate.setText("End Date");
									var oEndDatePicker = new sap.m.DatePicker(this.createId("datePickerEnd"), {
								        
										displayFormat: 'dd/MM/yyyy',
								        valueFormat: 'yyyy-MM-dd' ,
								        dateValue : new Date(),
								        change: function(oEvent) {
											endDate = oEndDatePicker.getValue();
									        console.log("endDate");
									        console.log(endDate);
									        //endDateTime = endDate;
										}
										
								    });
									
									var lbEndTime = new sap.ui.commons.Label('lbEndTime');  
									lbEndTime.setText("End Time");
									var oEndTimePicker = new sap.m.TimePicker(this.createId("timePickerEnd"), {
								        
										valueFormat : "HH:mm:ss",
										displayFormat : "HH:mm:ss",
								        dateValue : new Date(),
								        change: function(oEvent) {
											endTime = oEndTimePicker.getValue();
									        console.log("endTime");
									        console.log(endTime);
									        //endDateTime = endDateTime + "T" + endTime;
									        //console.log("endDateTime");
									        //console.log(endDateTime);
										}
								    });
									
									//endDateTime = endDate + "T" + endTime;
									
									//oCmbType.setListBox(list);
									var btnSearch = new sap.ui.commons.Button("btnSearch");   
									btnSearch.setText("Search");  
									var btnSearch = new sap.ui.commons.Button({
										  text : "   Show  ",
										  press: function(e) {
											 
											//sap.ui.getCore().byId("display").getController().submitData(); 
											//sap.ui.getCore().byId("display").submitData();
											//oController.getView().extractData(statusType,startDateTime,endDateTime);
											//if(statusType == "")
												//var strStatusType = oCmbType.getValue();
											statusType = oController.returnType(oCmbType.getLiveValue());
											var interval = oController.returnInterval(oCmbTimeInterval.getLiveValue());
											timeIntervalinHours = interval;
											if(oCmbTimeInterval.getValue() == "Custom"){
													if(startDate == "")
														startDate = oStartDatePicker.getValue();
													if(startTime == "")
														startTime = oStartTimePicker.getValue();
													if(endDate == "")
														endDate = oEndDatePicker.getValue();
													if(endTime == "")
														endTime = oEndTimePicker.getValue();
												
													console.log("startDate in showbutton click");
													console.log(startDate);
													startDateTime = startDate + "T" + startTime;
													endDateTime = endDate + "T" + endTime;
											}
											else{
													//startDateTime = startDate;
													//endDateTime = endDate;
												    
													startDateTime = oController.calculateBackDate(timeIntervalinHours);
													endDateTime = oController.formattedCurrentDate();
														
											}
											
											
											oController.extractData(statusType,startDateTime,endDateTime,oCmbMaxCount.getLiveValue());
											console.log(startDateTime);
											//resultPannel.setVisible(true);
										    //uPanel.setVisible(true);
										    //oShell.invalidate();
											lbMessageCount.setVisible(true);
											layout.setBusy(true);
											  //lbMessageCount.setText("Total Messages Found " + MessageListTable.getBinding());
										  }
									});
									
									var oRow = new sap.ui.commons.layout.MatrixLayoutRow();

									sLayout.addRow(oRow);

									var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
										colSpan : 8 });

									
									customLayout.createRow(lbStartDate, oStartDatePicker, lbStartTime, oStartTimePicker, lbEndDate, oEndDatePicker, lbEndTime, oEndTimePicker);
									oCell.addContent(customLayout);
									oRow.addCell(oCell);
									
									customLayout.setVisible(false);
									//btnSearch.attachPress(oController.searchAction);   
									sLayout.createRow(lbSearch, oCmbType, lbTimeInterval, oCmbTimeInterval, lbMaxCount, oCmbMaxCount);  
									
									sLayout.addRow(oRow);
									sLayout.createRow(btnSearch);
									searchPannel.addContent(sLayout);  
									layout.createRow(searchPannel); 
									
									
									
									
									//Create an instance of the table control
			        		 		MessageListTable = new sap.ui.table.Table(this.createId("MessageListTable"),{
			        		 			
			        		 			visibleRowCount: 7,
			        		 			firstVisibleRow: 3,
			        		 			selectionMode: sap.ui.table.SelectionMode.Single,
			        		 			navigationMode: sap.ui.table.NavigationMode.Paginator,
			        		 			/*footer : new sap.ui.commons.Label({

		        		 			    	  text : ""

		        		 			    })*/
			        		 		});
			        		 		
			        		 		var btnExport = new sap.ui.commons.Button({
										  text : "Export",
										  press: function(e) {
											  
											  jQuery.sap.require("sap.ui.core.util.Export");
											  jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
											  MessageListTable.exportData().saveFile("MessageList"); 
											 
										  }
									});
			        		 		btnExport.addStyleClass('align_control_right');
			        		 		
			        		 		var lbMessageCount = new sap.ui.commons.Label(this.createId('lbMessageCount'));
			        		 		lbMessageCount.addStyleClass('align_text_left');
			        		 		lbMessageCount.setVisible(false);
			        		 		MessageListTable.setToolbar(new sap.ui.commons.Toolbar({items: [ lbMessageCount, btnExport ]}));  
			        		 		
			        		 		MessageListTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "Status"}),       
			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:status/text()"),
			        		 			          sortProperty: "rn5:status",
			        		 			    	  filterProperty: "rn5:status"

			        		 			     })
			        		 			     
			        		 			    

			        		 			);
			        		 		
			        		 			MessageListTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "Direction"}),       
			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:direction/text()"),
			        		 			          sortProperty: "rn5:direction",
			        		 			    	  filterProperty: "rn5:direction"

			        		 			     })

			        		 			);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Error Category"}),       
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:errorCategory/text()"),
				        		 			          sortProperty: "rn5:errorCategory",
				        		 			    	  filterProperty: "rn5:errorCategory"

				        		 			     })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Error Code"}),       
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:errorCode/text()"),
				        		 			          sortProperty: "rn5:errorCode",
				        		 			    	  filterProperty: "rn5:errorCode"

				        		 			     })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Start Time"}),       
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:startTime/text()"),
				        		 			          sortProperty: "rn5:startTime",
				        		 			    	  filterProperty: "rn5:startTime"

				        		 			     })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "End Time"}),       
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:endTime/text()"),
				        		 			          sortProperty: "rn5:endTime",
				        		 			    	  filterProperty: "rn5:endTime"

				        		 			     })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Sender Party"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:senderParty/rn2:name/text()"),
				        		 			          sortProperty: "rn5:senderParty/rn2:name",
				        		 			    	  filterProperty: "rn5:senderParty/rn2:name"

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Sender"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:senderName/text()"),
				        		 			          sortProperty: "rn5:senderName",
				        		 			    	  filterProperty: "rn5:senderName"

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Sender Namespace"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:senderInterface/rn2:namespace/text()"),
				        		 			          sortProperty: "rn5:senderInterface/rn2:namespace",
				        		 			    	  filterProperty: "rn5:senderInterface/rn2:namespace"

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Sender Interface"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:senderInterface/rn2:name/text()"),
				        		 			          sortProperty: "rn5:senderInterface/rn2:name",
				        		 			    	  filterProperty: "rn5:senderInterface/rn2:name"

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Receiver Party"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:receiverParty/rn2:name/text()"),
				        		 			          sortProperty: "rn5:receiverParty/rn2:name",
				        		 			    	  filterProperty: "rn5:receiverParty/rn2:name"

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Receiver"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:receiverName/text()"),
				        		 			          sortProperty: "rn5:receiverName",
				        		 			    	  filterProperty: "rn5:receiverName"

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Receiver Interface"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:receiverInterface/rn2:name/text()"),
				        		 			          sortProperty: "rn5:receiverInterface/rn2:name",
				        		 			    	  filterProperty: "rn5:receiverInterface/rn2:name"

				        		 			  })

				        		 		);

			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Receiver Namespace"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:receiverInterface/rn2:namespace/text()"),
				        		 			          sortProperty: "rn5:receiverInterface/rn2:namespace",
				        		 			    	  filterProperty: "rn5:receiverInterface/rn2:namespace"

				        		 			  })

				        		 		);
			        		 			MessageListTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "MessageID"}),
			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:messageID/text()"),
			        		 			          sortProperty: "rn5:messageID",
			        		 			    	  filterProperty: "rn5:messageID"

			        		 			  })

			        		 			);
			        		 			
			        		 			/*MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Message Key"}),
				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:messageKey/text()")

				        		 			  })

				        		 		);*/
			        		 			
			        		 			MessageListTable.bindRows({path: "/rpl:Response/rn5:list/rn5:AdapterFrameworkData"});
			        		 			
			        		 			resultPannel = new sap.ui.commons.Panel(this.createId('resultPannel'));	
			        		 			var getMessageDetailsView = sap.ui.view({
		        		 					//id : "idGetMessageDetails",
		        		 					viewName : "sap_pi_monitoring_tool.GetMessageDetails",
		        		 					type : sap.ui.core.mvc.ViewType.JS
		        		 				});
		        		 				
			        		 			MessageListTable.attachRowSelectionChange(function(oEvent){
			        		 			
			        		 				//alert("Row is selected");
			        		 				//alert(oTableMessagelist.getSelectedIndex());
			        		 				console.log("Row is Selected");	
			        		 				
			        		 				//console.log(MessageListTable.getSelectedIndex());
			        		 				//console.log(MessageListTable.getRows()[MessageListTable.getSelectedIndex()]);
			        		 				//console.log(MessageListTable.getRows()[MessageListTable.getSelectedIndex()].getCells()[15].getValue());
			        		 				//oController.doIt1();
			        		 				
			        		 				var tableModel= MessageListTable.getModel();
			        		 				//var contextPath="/SOAP-ENV:Body/rpl:getMessageListResponse/rpl:Response/rn5:list/rn5:AdapterFrameworkData/rn5:messageKey/";
			        		 				var contextPath="/rpl:Response/rn5:list/rn5:AdapterFrameworkData/rn5:messageKey/";
			        		 				console.log("strMessageKey");
			        		 				//console.log(oEvent.getParameter("rowIndex").getProperty(contextPath));
			        		 				console.log(oEvent.getParameters().rowContext.getProperty("rn5:messageKey"));
			        		 				//var currentRowContext = oEvent.getParameter("rowContext"); 
			        		 				//var strMessageKey = tableModel.getProperty(contextPath, MessageListTable.getSelectedIndex());
			        		 				console.log(MessageListTable.getSelectedIndex());
			        		 				//var strMessageKey = MessageListTable.getRows()[MessageListTable.getSelectedIndex()%MessageListTable.getVisibleRowCount()].getCells()[15].getValue();
			        		 				var strMessageKey = oEvent.getParameters().rowContext.getProperty("rn5:messageKey"); 
			        		 			    //console.log(strMessageKey);
			        		 				
			        		 				var strArchiveFlag="false";
			        		 				//var strDate = "2016-04-27T06:31:25.619-01:00";
			        		 				//var strDate = sap.ui.getCore().byId("myview").getController().formattedCurrentDate();
			        		 				var strDate = oController.formattedCurrentDate();
			        		 				getMessageDetailsView.getController().extractMessageLog(strMessageKey,strArchiveFlag,strDate);
			        		 				resultPannel.addContent(getMessageDetailsView);
			        		 				//getMessageDetailsView.byId('messagelogLayout').setBusy();
			        		 				//resultPannel.setBusy();
			        		 		  });
			        		 			
			        		 		//Create a model and bind the table rows to this model
			        			    console.log("before create model in view");
			        			    oModel = new sap.ui.model.xml.XMLModel(this.createId("oModel"));
			        			    MessageListTable.setModel(oModel);
			        		 		              
									var rTitle = new sap.ui.commons.Title('rTitle');     
									rTitle.setText('Message Details');     
									resultPannel.setTitle(rTitle);
									
			        		 		resultPannel.addContent(MessageListTable);    
									layout.createRow(resultPannel);
									resultPannel.setVisible(false);
									
									console.log("after seting result pannel");
									
										//layout.placeAt('content'); 
									this.addContent(layout);
									
									   
									}

			});

								
