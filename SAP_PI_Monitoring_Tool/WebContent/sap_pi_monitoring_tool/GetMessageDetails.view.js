var messageLogTable = null;
sap.ui.jsview("sap_pi_monitoring_tool.GetMessageDetails", {

	getControllerName : function() {
		
		return "sap_pi_monitoring_tool.GetMessageDetails";
	},

	
	createContent : function(oController) {
		//alert(oController);
		/*var oTableMessagelist = sap.ui.getCore().byId("MessageListTable");
				
		oTableMessagelist.attachRowSelectionChange(function(){
			//alert("Row is selected");
			//alert(oTableMessagelist.getSelectedIndex());
			console.log("Row is Selected");			
			oController.doIt1();
					
		});*/
		var messagelogLayout = new sap.ui.commons.layout.MatrixLayout(this.createId('messagelogLayout'));
		messageLogTable = new sap.ui.table.Table(this.createId("MessageLog"), {
			title: "Message Log",
			visibleRowCount: 7,
 			firstVisibleRow: 3,
 			selectionMode: sap.ui.table.SelectionMode.Single,
 			navigationMode: sap.ui.table.NavigationMode.Paginator,
			
		});
		
		messageLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				
				text : "Time"
			}),
			
			
			template : new sap.ui.commons.TextField().bindProperty("value", "rn2:timeStamp/text()")
			
		}));
		messageLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				
				text : "Status"
			}),
			
			
			template : new sap.ui.commons.TextField().bindProperty("value", "rn2:textKey/text()")
			
		}));
		messageLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				
				text : "Description"
			}),
			
		
			template : new sap.ui.commons.TextField().bindProperty("value", "rn2:localizedText/text()")
			
		}));
		
		messageLogTable.bindRows({
			path : "/SOAP-ENV:Body/rpl:getLogEntriesResponse/rpl:Response/rn2:AuditLogEntryData/"
		});
		var oModel = new sap.ui.model.xml.XMLModel();
		messageLogTable.setModel(oModel);
		messagelogLayout.createRow(messageLogTable);
		messagelogLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
		messagelogLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
		//messagelogLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
		//messagelogLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
		//messagelogLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
		//messagelogLayout.createRow(new sap.ui.commons.TextView({text : "  "}));
		this.addContent(messagelogLayout);
		//return messageLogTable;
	}

});
