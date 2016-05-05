var oTable = new sap.ui.table.Table();
/**

 * View for Alerts
 * @author Abhishek Saha
 */
sap.ui.jsview("sap_pi_monitoring_tool.AlertMonitoring",
		{
	 oCon: this,
			/**
			 * Specifies the Controller belonging to this View. In the case that
			 * it is not implemented, or that "null" is returned, this View does
			 * not have a Controller.
			 * 
			 * @memberOf sap_pi_monitoring_tool.alertDashboard
			 */
			getControllerName : function() {
				return "sap_pi_monitoring_tool.AlertMonitoring";
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is constructed. Since
			 * the Controller is given to this method, its event handlers can be
			 * attached right away.
			 * 
			 * @memberOf sap_pi_monitoring_tool.AlertMonitoring
			 */
			createContent : function(oController) {
				oCon = this;
				var oPanel = new sap.ui.commons.Panel(this.createId("oPanel"));
				var oLayout = new sap.ui.commons.layout.MatrixLayout({
					layoutFixed : false
				});
				
				oTable = new sap.ui.table.Table(this.createId("alertTable"), {
		 			visibleRowCount: 7,
		 			//firstVisibleRow: 3,
		 			selectionMode: sap.ui.table.SelectionMode.Single,
		 			navigationMode: sap.ui.table.NavigationMode.Paginator,
		 			//fixedColumnCount: 2,
		 			//enableCustomFilter: true,
		 			//enableCellFilter: true
		 		});
		 		oTable.setToolbar(new sap.ui.commons.Toolbar({items: [   
		 		                                                      new sap.ui.commons.Label({text : "Find"}),   
		 		                                                      new sap.ui.commons.TextField("SearchText",{liveChange: this.Change}),  
		 		                                                      new sap.ui.commons.Button({text: "Go", press: function(){}})  
		 		                                             ]}));
 				oTable.columns = [  
 			                    new sap.ui.table.Column({label: "Severity", template:new sap.ui.commons.Link().bindProperty("text", "severity"), filterProperty:"Severity" }),  
 			                    new sap.ui.table.Column({label: "Payload", template:new sap.ui.commons.TextView().bindProperty("text", "payload"), filterProperty:"payload" }),  
 			                    new sap.ui.table.Column({label: "Timestamp", template:new sap.ui.commons.TextField().bindProperty("value", "timestamp"), filterProperty:"ProductCategoryDescription" }),  
 			                    //new sap.ui.table.Column({label: "Created By", template:new sap.ui.commons.Link().bindProperty("text", "CreatedBy").bindProperty("href", "CreatedByhref"),filterProperty:"CreatedBy"  }),  
 			                    //new sap.ui.table.Column({label: "Date/Time", template:"DateTime", filterProperty:"DateTime" })  
 			                    ] ;
 				
 				oTable.addColumn(new sap.ui.table.Column({ 
		            width : '100px',
                    label: new sap.ui.commons.Label({text: "Severity"}),          
                    template: new sap.ui.commons.TextField().bindProperty("value", "severity")    
 					})   
 				);
 				
 				oTable.addColumn(new sap.ui.table.Column({ 
		            //width : '100px',
                    label: new sap.ui.commons.Label({text: "Payload"}),          
                    template: new sap.ui.commons.TextView().addStyleClass('wrap').bindProperty("text", "payload")    
 					})   
 				);
 				oTable.addColumn(new sap.ui.table.Column({ 
		            width : '100px',
                    label: new sap.ui.commons.Label({text: "Timestamp"}),          
                    template: new sap.ui.commons.TextField().bindProperty("value", "timestamp")    
 					})   
 				);
 		    	oTable.setTitle("Alerts");
 		    	//oTable.sort(oTable.getColumns()[2]);
 		    	oTable.setNoData(new sap.ui.commons.TextView({text: "Sorry, no data available!"}));

 		    	//oModel.setXML(new XMLSerializer().serializeToString(returnVal));  
 		         oTable.attachRowSelectionChange(function(Event){
 		        	// console.log(oEvent.getParameters().rowContext.getProperty("Payload"));
 		        	openObjectDialog(JSON.parse(oEvent.getParameters().rowContext.getProperty("Payload")));
 		        	console.log(JSON.parse(oTable.getRows()[oTable.getSelectedIndex()%oTable.getVisibleRowCount()].getCells()[1].getText()));
 		        	
 		        	
 		         });
 		    	
 		        oTable.attachColumnSelect(function(oData, fnFunction, oListener){
 		        	oTable.sort(oListener);
 		        });
 		    	oLayout.createRow(oTable);
 		    	oLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
 		    	oLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
 		    	oLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
 		    	oLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
 		    	oPanel.addContent(oLayout);
		 		
			    return oPanel;
          },
          Change: function(oEvent){  
              console.log("change function");
              var searchText = oEvent.getParameters().liveValue;   
              var filters=[];  
                
              if(searchText.trim()!=''){  
                    
                  var filter1 = new sap.ui.model.Filter({path:"Severity",operator:sap.ui.model.FilterOperator.Contains,value1:searchText});   
                  var filter2 = new sap.ui.model.Filter({path:"Payload",operator:sap.ui.model.FilterOperator.Contains,value1:searchText});   
                  var filter3 = new sap.ui.model.Filter({path:"Timestamp",operator:sap.ui.model.FilterOperator.Contains,value1:searchText});   
                  var filter4 = new sap.ui.model.Filter({path:"status/@activationState",operator:sap.ui.model.FilterOperator.Contains,value1:searchText});   
                  filters = [filter2];  
                  var finalFilter = new sap.ui.model.Filter({filters:filters, and:false});  
                  oTable.getBinding("rows").filter(filter2, sap.ui.model.FilterType.Application);  
              }else{  
            	  oTable.getBinding("rows").filter([], sap.ui.model.FilterType.Application);  
                  }  
                
                
          } 
			
		});
