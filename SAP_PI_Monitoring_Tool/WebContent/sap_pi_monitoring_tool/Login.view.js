/**
 * View for Login
 * @author Abhishek Saha
 */
sap.ui.jsview("sap_pi_monitoring_tool.Login", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.login
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Login";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.login
	*/ 
	createContent : function(oController) {
		var msgContainer = new sap.ui.commons.TextView({id:"msg", width: '400px',wrapping: true,  text:(localStore('sessionObject') && localStore('sessionObject').msg)? localStore('sessionObject').msg:""});
		msgContainer.addStyleClass('errorMessageContainer');
		
		var protocol = new sap.ui.commons.RadioButtonGroup({id: "protocol",
			columns: 2,
			items: [new sap.ui.core.Item({id: "http",text: "http", checked: "true"}),
							new sap.ui.core.Item({id: "https", text: "https"})]
		}); 
		//new sap.ui.commons.Label({icon: "sap-icon://it-host",text:"Host"}),
		//new sap.ui.commons.Label({text:"://"}),
		var hostField = new sap.ui.commons.TextField({id:"host", placeholder: "Host",value:(localStore('sessionObject') && localStore('sessionObject').host)? localStore('sessionObject').host: "inmbzr0096.in.dst.ibm.com", required: true, 
			liveChange: function (oControlEvent){
				if(oControlEvent.getParameters().liveValue.trim() == ""){
					msgContainer.setText("Host cannot be empty.");
					this.setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().getElementById('btn').setEnabled(false);
				}else{
					msgContainer.setText("");
					this.setValueState(sap.ui.core.ValueState.Success);
					sap.ui.getCore().getElementById('btn').setEnabled(true);
				}
				
			}
		});
		var port = new sap.ui.commons.TextField({id: "port", placeholder: "Port", width: "50px", value:(localStore('sessionObject') && localStore('sessionObject').port)?localStore('sessionObject').port :"50000", maxLength: 5, required: true,
				liveChange: function (oControlEvent){
					if(oControlEvent.getParameters().liveValue.trim() == ""){
						msgContainer.setText("Port cannot be empty.");
						this.setValueState(sap.ui.core.ValueState.Error);
						sap.ui.getCore().getElementById('btn').setEnabled(false);
					}else{
						msgContainer.setText("");
						this.setValueState(sap.ui.core.ValueState.Success);
						sap.ui.getCore().getElementById('btn').setEnabled(true);
					}
					
				}
		
		});
		var s_pi = new sap.ui.commons.Menu("menu1");
		s_pi.attachItemSelect(function(oEvent){
			var obj = oEvent.getParameter("item").data("data");
			hostField.setValue(obj.host);
			port.setValue(obj.port);
		});
		if(oLocalStorage.get("Saved_PI_Servers") != null){
			var h = oLocalStorage.get("Saved_PI_Servers").servers;
			for (var i =0 ; i<h.length ; i++) {
				var item = new sap.ui.commons.MenuItem({id : "item"+i+"-", text: h[i].protocol+"://"+h[i].host + ":" + h[i].port, obj : h[i], obj : h[i]
				
				});
				item.data("data", h[i]);
				s_pi.addItem(item);
			}
			var item = new sap.ui.commons.MenuItem({id : "delete", text: "Clear"});
			s_pi.addItem(item);
		}else{
			
		}
		
		/*var o = localStore('sessionObject');
		delete o.msg;
		oStorage.put('sessionObject', o)*/
		var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				"sf1",
				{
					maxContainerCols: 2,
					editable: true,
					content:[
							new sap.ui.core.Title({text:"Login : "}),
							
							new sap.ui.layout.HorizontalLayout({
								content : [
								           	protocol,
											hostField,
											//new sap.ui.commons.Label({icon: "sap-icon://number-sign",text:"Port"}),
											new sap.ui.commons.Label({text:" : "}),
											port,
											new sap.ui.commons.MenuButton({
												text: "Saved instances",
												tooltip: "Saved instances",
												menu: s_pi
											})
											
								]
							}),
							
							
							
							
							
							new sap.ui.commons.Label({icon: "sap-icon://account", text:"Username"}),
							new sap.ui.commons.TextField({id: "username", value:(localStore('sessionObject') && localStore('sessionObject').username)?localStore('sessionObject').username:"", required: true, 
									liveChange: function (oControlEvent){
										if(oControlEvent.getParameters().liveValue.trim() == ""){
											msgContainer.setText("Username cannot be empty.");
											this.setValueState(sap.ui.core.ValueState.Error);
											sap.ui.getCore().getElementById('btn').setEnabled(false);
										}else{
											msgContainer.setText("");
											this.setValueState(sap.ui.core.ValueState.Success);
											sap.ui.getCore().getElementById('btn').setEnabled(true);
										}
										
									}
							
							}),
							new sap.ui.commons.Label({text:"Password"}),
							new sap.ui.commons.PasswordField({id: "password", value:"", required: true, 
								liveChange: function (oControlEvent){
									if(oControlEvent.getParameters().liveValue == ""){
										msgContainer.setText("Password cannot be empty.");
										this.setValueState(sap.ui.core.ValueState.Error);
										sap.ui.getCore().getElementById('btn').setEnabled(false);
									}else{
										msgContainer.setText("");
										this.setValueState(sap.ui.core.ValueState.Success);
										sap.ui.getCore().getElementById('btn').setEnabled(true);
									}
									
								}
							
							}),	
							new sap.ui.commons.Label({text:""}),
							msgContainer,
							new sap.ui.commons.Label({text:""}),
							new sap.ui.commons.Label({text:""}),
							new sap.ui.commons.Button({ id : "btn",
								icon : "sap-icon://log",
								text : "Enter",
								tooltip : "Click here to Enter",
								enabled : true,
								press : function() {
									
									var oParameters = {
									           "username" : sap.ui.getCore().getElementById('username').getValue(),
									           "password" : sap.ui.getCore().getElementById('password').getValue(),
									           "host" : sap.ui.getCore().getElementById('host').getValue(),
									           "port" : sap.ui.getCore().getElementById('port').getValue(),
									           "protocol" : sap.ui.getCore().getElementById('protocol').getSelectedItem().getText(),
									           "isLoggedin" : false
									};
									
									
									login(oParameters);
									
								}
							})
					         ]
				});
		
		
		
		return oSimpleForm;
	}

});

function validateLoginForm(){
	 var u = sap.ui.getCore().getElementById('username').getValue();
     var p = sap.ui.getCore().getElementById('password').getValue();
     var h = sap.ui.getCore().getElementById('host').getValue();
     var po = sap.ui.getCore().getElementById('port').getValue();
     var pro = sap.ui.getCore().getElementById('protocol').getSelectedItem().getText();
     
     
}