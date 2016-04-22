sap.ui.jsview("sap_pi_monitoring_tool.Initial", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.Initial
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Initial";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.Initial
	*/ 
	createContent : function(oController) {
		var loginBox = new sap.ui.layout.form.SimpleForm(
				"sf1",
				{
					maxContainerCols: 1,
					editable: true,
					content:[
							//new sap.ui.core.Title({text:"Login"}),
							new sap.ui.commons.Label({icon: "sap-icon://it-host",text:"Host"}),
							new sap.ui.commons.TextField({id:"host", value:"inmbzr0096.in.dst.ibm.com", required: true, 
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
							new sap.ui.commons.TextField({id: "port", value:"50000", maxLength: 5, required: true}),
							
							new sap.ui.commons.RadioButtonGroup({id: "protocol",
								
								columns: 2,
								items: [new sap.ui.core.Item({id: "http",text: "http", checked: "true"}),
												new sap.ui.core.Item({id: "https", text: "https"})]
							}),
							
							new sap.ui.commons.Label({icon: "sap-icon://account", text:"Username"}),
							new sap.ui.commons.TextField({id: "username", value:""}),
							new sap.ui.commons.Label({text:"Password"}),
							new sap.ui.commons.PasswordField({id: "password", value:""}),	
							new sap.ui.commons.Label({text:""}),
							new sap.ui.commons.Label({id:"msg", text:""}),
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
									
									$("#content").html("");
									login(oParameters);

									
								}
							})
					         ],
					        layoutData : new sap.ui.layout.GridData({
									span : "L6 M6 S12"
							})
				});
		var LeftGrid = new sap.ui.layout.VerticalLayout({
			
			content :[
			          	new sap.ui.commons.Image({src: 'images/ibm-logos/64px-IBM_logo.svg.png'}),
						new sap.ui.commons.TextView({
							text : '\n\nPI Monitoring Tool. \nBrief description About this tool. Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy \nFeatures: 1. 2. 3. \n\n\nCredits. @IBM'
						})
			],
			layoutData : new sap.ui.layout.GridData({
				span : "L6 M6 S12"
		    })
		});
		var oGrid1 = new sap.ui.layout.Grid({
			hSpacing: 2,
			vSpacing: 1,
			content: [
				loginBox,
				LeftGrid
			]
		});
		
		loginBox.addStyleClass('loginBox');
		return oGrid1;
	}

});