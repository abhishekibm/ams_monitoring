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
		msgContainer = new sap.ui.commons.TextView({wrapping: true,  text:(localStore('sessionObject') && localStore('sessionObject').msg)? localStore('sessionObject').msg:""});
		msgContainer.addStyleClass('errorMessageContainer');
		msgContainer.addStyleClass('hide');
		protocol = new sap.ui.commons.DropdownBox({
			editable : true,
			width : "60px",
		    items : [
		             new sap.ui.core.ListItem({text : 'http'}),
		             new sap.ui.core.ListItem({text : 'https'})
		            ]
		});
		
		
		hostField = new sap.ui.commons.TextField({ width: "200px", placeholder: "Host",value:(localStore('sessionObject') && localStore('sessionObject').host)? localStore('sessionObject').host: "inmbzr0096.in.dst.ibm.com", required: true, 
			liveChange: function (oControlEvent){
				validateLoginForm(usernameField.getValue().trim(), passwordField.getValue().trim(), oControlEvent.getParameters().liveValue.trim(), port.getValue(),protocol.getValue());
				if(oControlEvent.getParameters().liveValue.trim() == ""){
					//msgContainer.setText("Host cannot be empty.");
					this.setValueState(sap.ui.core.ValueState.Error);
					//button.setEnabled(false);
				}else{
					//msgContainer.setText("");
					this.setValueState(sap.ui.core.ValueState.Success);
					//button.setEnabled(true);
				}
				
			}
		});
		port = new sap.ui.commons.TextField({ placeholder: "Port", width: "50px", value:(localStore('sessionObject') && localStore('sessionObject').port)?localStore('sessionObject').port :"50000", maxLength: 5, required: true,
				liveChange: function (oControlEvent){
					var n = oControlEvent.getParameters().liveValue.trim();
					validateLoginForm(usernameField.getValue().trim(), passwordField.getValue().trim(), oControlEvent.getParameters().liveValue.trim(), oControlEvent.getParameters().liveValue.trim(),protocol.getValue());
					if(n == ""){
						
						this.setValueState(sap.ui.core.ValueState.Error);
						//button.setEnabled(false);
					}else{
						//msgContainer.setText("");
						this.setValueState(sap.ui.core.ValueState.Success);
						//button.setEnabled(true);
					}
					
				}
		
		});
		
		usernameField = new sap.ui.commons.TextField({ value:(localStore('sessionObject') && localStore('sessionObject').username)?localStore('sessionObject').username:"", required: true, 
				liveChange: function (oControlEvent){
					validateLoginForm(oControlEvent.getParameters().liveValue.trim(), passwordField.getValue().trim(), oControlEvent.getParameters().liveValue.trim(), port.getValue(),protocol.getValue());
					if(oControlEvent.getParameters().liveValue.trim() == ""){
						
						this.setValueState(sap.ui.core.ValueState.Error);
						//button.setEnabled(false);
					}else{
						
						this.setValueState(sap.ui.core.ValueState.Success);
						//button.setEnabled(true);
					}
					
				}
		
		});
		
		passwordField = new sap.ui.commons.PasswordField({ value:"", required: true, 
			liveChange: function (oControlEvent){
				validateLoginForm(usernameField.getValue().trim(), oControlEvent.getParameters().liveValue, oControlEvent.getParameters().liveValue.trim(), port.getValue(),protocol.getValue());
				if(oControlEvent.getParameters().liveValue == ""){
					
					this.setValueState(sap.ui.core.ValueState.Error);
					//button.setEnabled(false);
				}else{
					
					this.setValueState(sap.ui.core.ValueState.Success);
					//button.setEnabled(true);
				}
				
			}
		
		});
		
	   rememberMe = new sap.ui.commons.CheckBox({
			text : 'Remember me',
			tooltip : 'Remember me',
			checked : true
			});
	   button = new sap.ui.commons.Button({
			icon : "sap-icon://log",
			text : "Enter",
			tooltip : "Click here to Enter",
			enabled : true,
			press : function() {
				
				var oParameters = {
				           "username" : usernameField.getValue().trim(),
				           "password" : passwordField.getValue().trim(),
				           "host" : hostField.getValue().trim(),
				           "port" : port.getValue(),
				           "protocol" : protocol.getValue(),
				           "isLoggedin" : false
				};
				
				console.log(oParameters);
				
				login(oParameters , rememberMe.getChecked());
				
			}
		})
		var s_pi = new sap.ui.unified.Menu();
		s_pi.attachItemSelect(function(oEvent){
			var obj = oEvent.getParameter("item").data("data");
			if(obj != null || obj != undefined){
			hostField.setValue(obj.host);
			port.setValue(obj.port);
			}else{
				s_pi.destroyItems();
				s_pi.setEnabled(false);
				deleteSavedPIServers();
			}
		});
		if(oLocalStorage.get("Saved_PI_Servers") != null){
			s_pi.setEnabled(true);
			var h = oLocalStorage.get("Saved_PI_Servers").servers;
			for (var i =0 ; i<h.length ; i++) {
				var item = new sap.ui.commons.MenuItem({ text: h[i].protocol+"://"+h[i].host + ":" + h[i].port, obj : h[i], obj : h[i]
				
				});
				item.data("data", h[i]);
				s_pi.addItem(item);
			}
			var item = new sap.ui.commons.MenuItem({ text: "Clear"});
			s_pi.addItem(item);
		}else{
			s_pi.setEnabled(false);
		}
		
		/*var o = localStore('sessionObject');
		delete o.msg;
		oStorage.put('sessionObject', o)*/
		var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				{
					maxContainerCols: 2,
					editable: true,
					content:[
							new sap.ui.core.Title({text:"Login : "}),
							
							
							new sap.ui.layout.HorizontalLayout({
								width: "100%",
								allowWrapping : true,
								hSpacing : 3,
								content : [
								           	
								           	protocol,
											hostField,
											port,
											new sap.ui.commons.MenuButton({
												text: "",
												tooltip: "Saved instances",
												menu: s_pi,
												icon: "sap-icon://expand"
											})
											
								]
							}),
							
							
							
							
							
							new sap.ui.commons.Label({icon: "sap-icon://account", text:"Username"}),
							usernameField,
							new sap.ui.commons.Label({text:"Password"}),
							passwordField,	
							new sap.ui.commons.Label({text:""}),
							rememberMe, new sap.ui.commons.Link({
								text: "Settings",
								tooltip: "Click here to change global settings",
								press: function() {
									var settings_view = sap.ui.view({
										viewName : "sap_pi_monitoring_tool.Settings",
										type : sap.ui.core.mvc.ViewType.JS
										
									});
									openViewDialog(settings_view);
								}
							}),
							new sap.ui.commons.Label({text:""}),
							msgContainer,
							new sap.ui.commons.Label({text:""}),
							new sap.ui.commons.Label({text:""}),
							button
					         ]
				});
		
		
		
		return oSimpleForm;
	}

});

function validateLoginForm(u,p,h,po,pro){
	
	 /*
	 usernameField.getValue().trim(), passwordField.getValue().trim(), hostField.getValue().trim(), port.getValue(),protocol.getValue()
	 var u = usernameField.getValue().trim();
     var p = passwordField.getValue().trim();
     var h = hostField.getValue().trim();
     var po = port.getValue();
     var pro = protocol.getValue();*/
     
     var msg = "";
     if(u == ""){
    	 msg += "User name cannot be empty. ";
     }
     if(p == ""){
    	 msg += "Password name cannot be empty. ";
     }
     if(h == ""){
    	 msg += "Host cannot be empty. ";
     }
     if(po == ""){
    	 msg += "Port cannot be empty. ";
     }else if(isNaN(parseInt(po, 10)) || !isFinite(po)){
    	 msg += "Port should be a number. ";
     }
     if(pro == ""){
    	 msg += "Protocol cannot be empty. ";
     }
     if(msg!= ""){
    	 msgContainer.removeStyleClass('hide');
    	 msgContainer.addStyleClass('show');
    	 msgContainer.setText(msg);
     	button.setEnabled(false);
     	return false;
     }else{
    	 msgContainer.removeStyleClass('show');
    	 msgContainer.addStyleClass('hide');
    	 button.setEnabled(true);
    	 return true;
     }
     
}