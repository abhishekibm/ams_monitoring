jQuery.sap.require('sap.ui.core.routing.Router');
jQuery.sap.require('sap.ui.core.routing.HashChanger');
/**
 * View for Home after login Which will contain Alert dashboard, Message Monitoring, channel Monitoring views
 * @author Abhishek Saha
 */
sap.ui.jsview("sap_pi_monitoring_tool.Home", {
	
	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap_pi_monitoring_tool.home
	*/ 
	getControllerName : function() {
		return "sap_pi_monitoring_tool.Home";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap_pi_monitoring_tool.home
	*/ 
	createContent : function(oController) {
		
		/*console.log('Home view');
		var dashboardView = sap.ui.view({
			id : "iddashboardView",
			viewName: 'sap_pi_monitoring_tool.DashboardReport',
			type : sap.ui.core.mvc.ViewType.JS
		});
		var alertView = sap.ui.view({
			id : "iddashboardView1",
			viewName : "sap_pi_monitoring_tool.AlertMonitoring",
			type : sap.ui.core.mvc.ViewType.JS
			
		});
		var messageMonitroringView = new sap.ui.view({
			id : 'msgView',
			viewName : "sap_pi_monitoring_tool.messageMonitoring",
			type : sap.ui.core.mvc.ViewType.JS
			
		});
		
		getMessageDetailsView = sap.ui.view({
				id : "idGetMessageDetails",
				viewName : "sap_pi_monitoring_tool.GetMessageDetails",
				type : sap.ui.core.mvc.ViewType.JS
		});
		
		var channelMonitroringView = new sap.ui.view({
			id : 'chaView',
			viewName : "sap_pi_monitoring_tool.ChannelMonitor",
			type : sap.ui.core.mvc.ViewType.JS
			
		});*/
		var settingsView = new sap.ui.view({
			viewName : "sap_pi_monitoring_tool.Settings",
			type : sap.ui.core.mvc.ViewType.JS
			
		});
		var oShell = new sap.ui.ux3.Shell("myShell", {
			appTitle: "IBM AMS Monitoring Tool",
			appIcon: "images/ibm-logos/64px-IBM_logo.svg.png",
			appIconTooltip: "IBM AMS Monitoring Tool",
			showLogoutButton: true,
			showSearchTool: false,
			showInspectorTool: false,
			showFeederTool: false,
			worksetItems: [new sap.ui.ux3.NavigationItem("dashboard",{key:"dashboard",text:"Dashboard"}),
			               new sap.ui.ux3.NavigationItem("alert",{key:"alert",text:"Alert Monitoring"}),
			               new sap.ui.ux3.NavigationItem("message",{key:"message",text:"Message Monitoring"}),
			               new sap.ui.ux3.NavigationItem("channel",{key:"channel",text:"Channel Monitoring"})],
			paneBarItems: [ new sap.ui.core.Item("PI_Date",{key:"pi_date",text:"date"}),
			                new sap.ui.core.Item("PI_Browser",{key:"pi_browser",text:"browser"})],
			content: "",
			
			headerItems: [new sap.ui.commons.TextView({text:(isLoggedin()? localStore('sessionObject').username : "User Name"),tooltip:"Username"}),
			              new sap.ui.commons.TextView({text:(isLoggedin()? localStore('sessionObject').host +':'+localStore('sessionObject').port : "Not defined"),tooltip:"Host:Port"}),
			              new sap.ui.commons.Button({text:"Personalize",tooltip:"Personalize",press:function(oEvent){openViewDialog(settingsView)}}),
										new sap.ui.commons.MenuButton({
											text: "Settings",
											tooltip: "Settings",
											menu: new sap.ui.commons.Menu("menu1",{items:[
												new sap.ui.commons.MenuItem("menuitem1",{text:"Help"}),
												new sap.ui.commons.MenuItem("menuitem2",{text:"Report Incident"}),
												new sap.ui.commons.MenuItem("menuitem3",{text:"About"})]})
										})],
			worksetItemSelected: function(oEvent){
				/*var sId = oEvent.getParameter("id");
				var oShell = oEvent.oSource;
				switch (sId) {
				case "WI_dashboard":
					isLoggedin()?oShell.setContent(dashboardView):"";
					break;
				case "WI_alert":
					//This will open alert dashboard
					isLoggedin()?oShell.setContent(alertView):"";
					break;
				case "WI_MSG":
					isLoggedin()?oShell.setContent(messageMonitroringView):"";	
					break;
				case "WI_CHANNEL":
					isLoggedin()?oShell.setContent(channelMonitroringView):"";
					break;
				default:
					break;
					}*/
				this.removeAllContent();
				var sSelected = oEvent.getParameter("id"),
				oHashChanger = sap.ui.core.routing.HashChanger.getInstance();

			    oHashChanger.setHash(router.getURL(sSelected));
				
			},
			paneBarItemSelected: function(oEvent){
				var sKey = oEvent.getParameter("key");
				var oShell = oEvent.oSource;
				switch (sKey) {
				case "pi_date":
					var oDate = new Date();
					oShell.setPaneContent(new sap.ui.commons.TextView({text:oDate.toLocaleString()}), true);
					break;
				case "pi_browser":
					oShell.setPaneContent(new sap.ui.commons.TextView({text:"You browser provides the following information:\n"+navigator.userAgent}), true);
					break;
				default:
					break;
				}
			},
			logout:function(){
				logoff();
			},
		 	search:function(oEvent){
		 		alert("Search triggered: " + oEvent.getParameter("text"));
		 	},
		 	feedSubmit:function(oEvent){
		 		alert("Feed entry submitted: " + oEvent.getParameter("text"));
		 	},
		 	paneClosed : function(oEvent) {
		 	    alert("Pane has been closed: " + oEvent.getParameter("id"));
		 	}
		});
		
		//oShell.setSelectedWorksetItem("WI_dashboard");
		//oShell.fireWorksetItemSelected({id : "WI_dashboard"});
		
		

		var router = new sap.ui.core.routing.Router([
		             {
		            	 pattern : "",
		            	 name : "dashboard",
		            	 view : "sap_pi_monitoring_tool.DashboardReport",
		            	 viewType : sap.ui.core.mvc.ViewType.JS,
		            	 targetControl : "myShell",
		            	 targetAggregation : "content",
		            	 clearTarget : true,
		            	 callback : function (){
		            		 oShell.setSelectedWorksetItem("dashboard");
		            	 }
		             },
		             {
		            	 pattern : ["alert", "alert"],
		            	 name : "alert",
		            	 view : "sap_pi_monitoring_tool.AlertMonitoring",
		            	 viewType : sap.ui.core.mvc.ViewType.JS,
		            	 targetControl : "myShell",
		            	 targetAggregation : "content",
		            	 clearTarget : true,
		            	 callback : function (){
		            		 oShell.setSelectedWorksetItem("alert");
		            	 }
		             },
		             {
		            	 pattern : ["message", "message"],
		            	 name : "message",
		            	 view : "sap_pi_monitoring_tool.messageMonitoring",
		            	 viewType : sap.ui.core.mvc.ViewType.JS,
		            	 targetControl : "myShell",
		            	 targetAggregation : "content",
		            	 clearTarget : true,
		            	 callback : function (){
		            		 oShell.setSelectedWorksetItem("message");
		            	 }
		             },
		             {
		            	 pattern : ["channel", "channel"],
		            	 name : "channel",
		            	 view : "sap_pi_monitoring_tool.ChannelMonitor",
		            	 viewType : sap.ui.core.mvc.ViewType.JS,
		            	 targetControl : "myShell",
		            	 targetAggregation : "content",
		            	 clearTarget : true,
		            	 callback : function (){
		            		 oShell.setSelectedWorksetItem("channel");
		            	 }
		             }

		                                             
		             ]);
		
		router.register('appRouter');
		router.initialize();
		return oShell;
		
	}

});
