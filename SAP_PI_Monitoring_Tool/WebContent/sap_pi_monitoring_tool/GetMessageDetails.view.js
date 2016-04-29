oTable = null;
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
		oTable = new sap.ui.table.Table(this.createId("MessageLog"), {
			title: "Message Log"
		});
		
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				
				text : "Time"
			}),
			
			
			template : new sap.ui.commons.TextField().bindProperty("value", "rn2:timeStamp/text()")
			
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				
				text : "Status"
			}),
			
			
			template : new sap.ui.commons.TextField().bindProperty("value", "rn2:textKey/text()")
			
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				
				text : "Description"
			}),
			
		
			template : new sap.ui.commons.TextField().bindProperty("value", "rn2:localizedText/text()")
			
		}));
		
		oTable.bindRows({
			path : "/SOAP-ENV:Body/rpl:getLogEntriesResponse/rpl:Response/rn2:AuditLogEntryData/"
		});
		var oModel = new sap.ui.model.xml.XMLModel();
		oTable.setModel(oModel);
		return oTable;
	}

});
