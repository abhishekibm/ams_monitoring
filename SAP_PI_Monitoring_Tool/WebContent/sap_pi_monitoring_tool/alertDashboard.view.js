/**
 * View for Alerts
 * @author Abhishek Saha
 */
sap.ui.jsview("sap_pi_monitoring_tool.alertDashboard",
		{

			/**
			 * Specifies the Controller belonging to this View. In the case that
			 * it is not implemented, or that "null" is returned, this View does
			 * not have a Controller.
			 * 
			 * @memberOf sap_pi_monitoring_tool.alertDashboard
			 */
			getControllerName : function() {
				return "sap_pi_monitoring_tool.alertDashboard";
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is constructed. Since
			 * the Controller is given to this method, its event handlers can be
			 * attached right away.
			 * 
			 * @memberOf sap_pi_monitoring_tool.alertDashboard
			 */
			createContent : function(oController) {
				var oPanel = new sap.ui.commons.Panel(this.createId("oPanel"));
				var myModel = oController.getMyModel(2,3,14);
				var myChart = oController.createMyChart("Alert Dashboard", "Dashboard", myModel);
          
				var textArea = new sap.ui.commons.TextArea({  
                    id : "textArea1"  
});
				//return myChart;
				  
			    var request = 
			    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bas="http://sap.com/xi/BASIS">\
			    	<soapenv:Header/>\
			    	<soapenv:Body>\
			    		<bas:AlertRuleQueryRequest>\
			    		</bas:AlertRuleQueryRequest>\
			    	</soapenv:Body> \
			    </soapenv:Envelope>';
			    var oModel = new sap.ui.model.xml.XMLModel();  
			    var response = "";
                  var returnVal = "";
                  console.log(serviceAPIs.alertAPI_all_alert_consumers());
                  
                  (function poll(){
                	//setTimeout(function() {  
                		console.log(localStore('sessionObject').username+':'+localStore('sessionObject').password);
			             $.ajax({  
			             url : serviceAPIs.alertAPI_all_alert_consumers(),  
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
			                    returnVal = xmlDoc.getElementsByTagNameNS("*","AlertRuleQueryResponse")[0];  
			                    if(returnVal != null){
			                    uicontrols();
			                    //poll();
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
					
                  
                  				function uicontrols(){  
					             oModel.setXML(new XMLSerializer().serializeToString(returnVal));  
					             }  
					
					
							var oTable = new sap.ui.table.Table({  
							             id: "table1"  
							}); 
					
					     oTable.addColumn(new sap.ui.table.Column({          
					                          label: new sap.ui.commons.Label({text: "Severity"}),          
					                          template: new sap.ui.commons.TextField().bindProperty("value", "Severity/text()")    
					     				})   
					      );   
					      oTable.addColumn(new sap.ui.table.Column({          
					                      label: new sap.ui.commons.Label({text: "AlertConsumers"}),          
					                      template: new sap.ui.commons.TextField().bindProperty("value", "AlertConsumers/text()")    
					      				})   
					      );   
					      oTable.setModel(oModel);     
					      oTable.bindRows({path: "/AlertRule"});  
					      oPanel.addContent(oTable);
					      var oInput1 = new sap.ui.commons.TextField(this.createId("inputtext"));
					      oPanel.addContent(oInput1);
					      
					      
					//////// TEMPLATE SECTION //////////////////////////////////////////////////////////////////
				            //
				            // create the template to be used for ViewRepeater items
				            var oRowTemplate_NoViews = new sap.ui.commons.layout.HorizontalLayout("rowTemplateNoViews");
				            oRowTemplate_NoViews.addStyleClass("rowTemplateNoViews");

				            var  control;
				            //image
				            control = new sap.ui.commons.Image();
				            control.setHeight("60px");
				            control.setWidth("50px");
				            control.bindProperty("src","src");
				            oRowTemplate_NoViews.addContent(control);

				            //text fields
				            var oTextSectionLayout = new sap.ui.commons.layout.VerticalLayout("textSection");
				            oTextSectionLayout.addStyleClass("rowTemplateNoViewsTextSection");
				            oRowTemplate_NoViews.addContent(oTextSectionLayout);

				            //name field
				            control = new sap.ui.commons.TextView();
				            control.bindProperty("text", {
				                parts: [
				                    {path: "name", type: new sap.ui.model.type.String()},
				                    {path: "lastName", type: new sap.ui.model.type.String()}
				                ],
				                formatter: function(name, lastName){ // all parameters are strings
				                    name = name || "";
				                    lastName = lastName || "";
				                    return name + " " + lastName;
				                }
				            });
				            oTextSectionLayout.addContent(control);

				            //country field
				            control = new sap.ui.commons.TextView();
				            control.bindProperty("text","country");
				            oTextSectionLayout.addContent(control);

				            //link field
				            control = new sap.ui.commons.Link();
				            control.bindProperty("text","href");
				            oTextSectionLayout.addContent(control);
				            //
				            //////// End of TEMPLATE SECTION ///////////////////////////////////////////////////////////


				            //////// CONTROL SECTION ///////////////////////////////////////////////////////////////////
				            //
				            //create view repeater title (optional)
				            var oTitle_NoViews = new sap.ui.commons.Title({
				                text:"REPEATER with default view",
				                level: sap.ui.commons.TitleLevel.H1
				            });

				            // create the row repeater control
				            var oViewRepeater_NoViews = new sap.suite.ui.commons.ViewRepeater("vr_noViews", {
				                title: oTitle_NoViews,
				                noData: new sap.ui.commons.TextView({text: "Sorry, no data available!"}),

				                showViews: false, // disable view selector
				                showSearchField: false,
				                showMoreSteps: 10, // you can use 'Show More' feature instead of paging

				                //set view properties directly to the repeater
				                responsive: true,
				                itemMinWidth: 210,
				                numberOfRows: 12, // view property NumberOfTiles has legacy name here
				                rows: {
				                    path: "/data",
				                    template: oRowTemplate_NoViews
				                }
				            });
				            oViewRepeater_NoViews.addStyleClass("vrNoViews");
				            
				            //
				            //////// End of CONTROL SECTION ////////////////////////////////////////////////////////////
				            oPanel.addContent(oViewRepeater_NoViews);
					      return oPanel;
          }

		});
