 
 var MessageListTable = null;
 //layout = null;
 var resultPannel = null;
 var oModel = null;
 var startDate = "";
 var endDate = "";
 var startTime = "";
 var endTime = "";
 var statusType = "systemError";
 var startDateTime = "";
 var endDateTime = "";
 sap.ui.jsview("sap_pi_monitoring_tool.messageMonitoring", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.display
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.messageMonitoring";
	},
	
	
	
	

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.messageMonitoring
	*/ 
	createContent : function(oController) {
		
									var layout = new sap.ui.commons.layout.MatrixLayout('layout');    
									//layout.setWidth('100%');    
									// Search Box starts here   
									var searchPannel = new sap.ui.commons.Panel('searchPannel');  
									var sTitle = new sap.ui.commons.Title('sTitle');  
									sTitle.setText('Search Message');  
									searchPannel.setTitle(sTitle);  
									var sLayout = new sap.ui.commons.layout.MatrixLayout('sLayout'); 
									
									var customLayout = new sap.ui.commons.layout.MatrixLayout('customLayout', {
										colSpan : 4
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

										      new sap.ui.core.ListItem({text: "One Hour"}),
										      new sap.ui.core.ListItem({text: "Two Hours"}),
										      new sap.ui.core.ListItem({text: "Six Hours"}),
										      new sap.ui.core.ListItem({text: "Twelve Hours"}),
										      new sap.ui.core.ListItem({text: "24 Hours"}),
										      new sap.ui.core.ListItem({text: "Custom"}),
										      
										  ]

									});
									
									
									var lbTimeInterval = new sap.ui.commons.Label('lbTimeInterval');  
									lbTimeInterval.setText("Time Interval");
									
									oCmbTimeInterval.setTooltip("Time Interval");
									oCmbTimeInterval.setEditable(true);
									
									oCmbTimeInterval.attachChange(function(oControlEvent) {
										var interval = "";
										var strInterval = oCmbTimeInterval.getValue();
										
										if(strInterval == "Custom"){
											//interval = "systemError";
											customLayout.setVisible(true);
										}
										else{
											customLayout.setVisible(false);
											
										}
										
									});
									//oCmbType.setWidth("250px");    
									//var list = new sap.ui.commons.ListBox({allowMultiSelect: false, visibleItems: 1});    
									/*var oItem = new sap.ui.core.ListItem("item1");
									oItem.setText("System Error");
									oCmbType.addItem(oItem);
									oItem = new sap.ui.core.ListItem("item2");
									oItem.setText("Delivered");
									oCmbType.addItem(oItem);
									oItem = new sap.ui.core.ListItem("item3");
									oItem.setText("Delivering");
									oItem = new sap.ui.core.ListItem("item4");
									oItem.setText("Successfull");
									oCmbType.addItem(oItem);
									oItem = new sap.ui.core.ListItem("item5");
									oItem.setText("Cancelled");
									oCmbType.addItem(oItem);*/
									
									oCmbType.attachChange(function(oControlEvent) {
										var Type = "";
										var strType = oCmbType.getValue();
										if(strType == "System Error"){
											Type = "systemError";
										}
										else if(strType == "Delivered"){
											Type = "success";
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
								        console.log(type);
								        statusType = type;
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
											  oController.extractData(statusType,startDate,startTime,endDate,endTime);
											  console.log(startDate);
											//resultPannel.setVisible(true);
										    //uPanel.setVisible(true);
										    //oShell.invalidate();
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
									sLayout.createRow(lbSearch, oCmbType, lbTimeInterval, oCmbTimeInterval);  
									
									sLayout.addRow(oRow);
									sLayout.createRow(btnSearch);
									searchPannel.addContent(sLayout);  
									layout.createRow(searchPannel); 
									
									
									
									
									//Create an instance of the table control
			        		 		MessageListTable = new sap.ui.table.Table(this.createId("MessageListTable"),{
			        		 			
			        		 			visibleRowCount: 7,
			        		 			firstVisibleRow: 3,
			        		 			selectionMode: sap.ui.table.SelectionMode.Single,
			        		 		});
			        		 		
			        		 		var btnExport = new sap.ui.commons.Button({
										  text : "Export",
										  press: function(e) {
											 
										  }
									});
			        		 		MessageListTable.setToolbar(new sap.ui.commons.Toolbar({items: [ btnExport ]}));  
			        		 		
			        		 		MessageListTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "Direction"}),       

			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:direction/text()") 

			        		 			     })

			        		 			);

			        		 			MessageListTable.addColumn(

			        		 			     new sap.ui.table.Column({

			        		 			          label: new sap.ui.commons.Label({text: "MessageID"}),

			        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:messageID/text()")

			        		 			  })

			        		 			);
			        		 			
			        		 			MessageListTable.addColumn(

				        		 			     new sap.ui.table.Column({

				        		 			          label: new sap.ui.commons.Label({text: "Message Key"}),

				        		 			          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:messageKey/text()")

				        		 			  })

				        		 		);
			        		 			
			        		 			MessageListTable.addColumn(

			        		 				     new sap.ui.table.Column({

			        		 				          label: new sap.ui.commons.Label({text: "Interface"}),

			        		 				          template: new sap.ui.commons.TextField().bindProperty("value", "rn5:interface/rn2:name/text()")

			        		 				  })

			        		 			);
			        		 			resultPannel = new sap.ui.commons.Panel(this.createId('resultPannel'));	
			        		 			var getMessageDetailsView = sap.ui.view({
		        		 					id : "idGetMessageDetails",
		        		 					viewName : "sap_pi_monitoring_tool.GetMessageDetails",
		        		 					type : sap.ui.core.mvc.ViewType.JS
		        		 				});
		        		 				
			        		 			MessageListTable.attachRowSelectionChange(function(oEvent){
			        		 				//alert("Row is selected");
			        		 				//alert(oTableMessagelist.getSelectedIndex());
			        		 				console.log("Row is Selected");	
			        		 				//console.log(MessageListTable.getRows());
			        		 				//console.log(MessageListTable.getRows()[MessageListTable.getSelectedIndex()]);
			        		 				//console.log(MessageListTable.getRows()[MessageListTable.getSelectedIndex()].getCells()[2].getValue());
			        		 				//oController.doIt1();
			        		 				
			        		 				var tableModel= MessageListTable.getModel();
			        		 				//var contextPath="/SOAP-ENV:Body/rpl:getMessageListResponse/rpl:Response/rn5:list/rn5:AdapterFrameworkData/rn5:messageKey/";
			        		 				//var contextPath="/rpl:Response/rn5:list/rn5:AdapterFrameworkData/rn5:messageKey/";
			        		 				//var currentRowContext = oEvent.getParameter("rowContext"); 
			        		 				//var strMessageKey = tableModel.getProperty(contextPath, MessageListTable.getSelectedIndex());
			        		 				console.log(MessageListTable.getSelectedIndex());
			        		 				var strMessageKey = MessageListTable.getRows()[MessageListTable.getSelectedIndex()].getCells()[2].getValue();
			        		 				console.log("strMessageKey");
			        		 			    console.log(strMessageKey);
			        		 				
			        		 				var strArchiveFlag="false";
			        		 				//var strDate = "2016-04-27T06:31:25.619-01:00";
			        		 				//var strDate = sap.ui.getCore().byId("myview").getController().formattedCurrentDate();
			        		 				var strDate = oController.formattedCurrentDate();
			        		 				getMessageDetailsView.getController().doIt1(strMessageKey,strArchiveFlag,strDate);
			        		 				resultPannel.addContent(getMessageDetailsView);
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

								
