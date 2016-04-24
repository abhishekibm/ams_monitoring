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
		var msgContainer = new sap.ui.commons.TextView({id:"msg", width: '400px', height: '200px',wrapping: true,  text:(localStore('sessionObject').msg)? localStore('sessionObject').msg:""});
		msgContainer.addStyleClass('errorMessageContainer');
		/*var o = localStore('sessionObject');
		delete o.msg;
		oStorage.put('sessionObject', o)*/
		var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				"sf1",
				{
					maxContainerCols: 2,
					editable: true,
					content:[
							//new sap.ui.core.Title({text:"Login"}),
							new sap.ui.commons.Label({icon: "sap-icon://it-host",text:"Host"}),
							new sap.ui.commons.TextField({id:"host", value:(localStore('sessionObject').host)? localStore('sessionObject').host: "inmbzr0096.in.dst.ibm.com", required: true, 
								liveChange: function (oControlEvent){
									console.log(oControlEvent.getParameters().liveValue);
									if(oControlEvent.getParameters().liveValue.trim() == ""){
										sap.ui.getCore().getElementById('msg').setText("Host cannot be empty.");
										this.setValueState(sap.ui.core.ValueState.Error);
										sap.ui.getCore().getElementById('btn').setEnabled(false);
									}else{
										this.setValueState(sap.ui.core.ValueState.Success);
										sap.ui.getCore().getElementById('btn').setEnabled(true);
									}
									
								}
							}),
							new sap.ui.commons.Label({icon: "sap-icon://number-sign",text:"Port"}),
							new sap.ui.commons.TextField({id: "port", value:(localStore('sessionObject').port)?localStore('sessionObject').port :"50000", maxLength: 5, required: true}),
							
							new sap.ui.commons.RadioButtonGroup({id: "protocol",
								
								columns: 2,
								items: [new sap.ui.core.Item({id: "http",text: "http", checked: "true"}),
												new sap.ui.core.Item({id: "https", text: "https"})]
							}),
							
							new sap.ui.commons.Label({icon: "sap-icon://account", text:"Username"}),
							new sap.ui.commons.TextField({id: "username", value:(localStore('sessionObject').username)?localStore('sessionObject').username:""}),
							new sap.ui.commons.Label({text:"Password"}),
							new sap.ui.commons.PasswordField({id: "password", value:""}),	
							new sap.ui.commons.Label({text:""}),
							msgContainer,
							new sap.ui.commons.Label({text:""}),
							new sap.ui.commons.Label({text:""}),
							new sap.ui.commons.Button({ id : "btn",
								icon : "sap-icon://log",
								text : "Enter",
								tooltip : "Click here to login",
								enabled : true,
								press : function() {
									console.log(sap.ui.getCore().getElementById('protocol').getSelectedItem().getText());
									
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
