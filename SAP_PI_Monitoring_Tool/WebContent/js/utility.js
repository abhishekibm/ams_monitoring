
jQuery.sap.require("jquery.sap.storage");
oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); 
/*oLocalStorage.put('alertCounts', [
                   {type: 'VERYHIGH', tickets : 0},
                   {type: 'HIGH', tickets : 0},
                   {type: 'MEDIUM', tickets : 0},
                   {type: 'LOW', tickets : 0},
                   {type: 'ELSE', tickets : 0}
                 ]);*/
//
// Define your database
//
db = new Dexie("monitoring_tool");

db.version(1).stores({
    alerts: '++id, payload,severity,channel,timestamp'
    // ...add more stores (tables) here...
});
//
// Open it
//
db.open().catch(function (e) {
    alert ("Open failed: " + e);
});



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
if(settings.mode.toLowerCase() != 'debug'){
	console.log = function() {}
}

//Here all service APIs will be mentioned
serviceAPIs  = {
		alertAPI_all_alert_consumers: function(){
			if(settings.proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRuleInService/AlertRuleInImplBean');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRuleInService/AlertRuleInImplBean');
		},
		
		alertAPI_single_alert: function(){
			if(settings.proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRetrieveAPI_Service/AlertRetrieveAPIImplBean');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRetrieveAPI_Service/AlertRetrieveAPIImplBean');
		},
		
		messageAPI: function(){
			if(settings.proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AdapterMessageMonitoring/basic?style=document');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AdapterMessageMonitoring/basic?style=document');
			
		},
		
		channelListAPI: function(){
			if(settings.proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/CommunicationChannelInService/CommunicationChannelInImplBean');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/CommunicationChannelInService/CommunicationChannelInImplBean');
		},
		
		channelStatusAPI: function(){
			if(settings.proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/ChannelAdminService/ChannelAdmin');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/ChannelAdminService/ChannelAdmin');
		}
}

/**
 * Function to check any host and user information has been entered or not
 * @returns {Boolean}
 */
function isLoggedin(){
	//console.log(getCookie('sessionObject'));
	if(getCookie('sessionObject') != ""){
		oStorage.put('sessionObject', JSON.parse(getCookie('sessionObject')));
	}
	if(localStore('sessionObject') == null || localStore('sessionObject').username == 'undefined' || localStore('sessionObject').password == 'undefined'){
		console.log("Not logged in");
		return false;
	}else{
		console.log("Logged in");
		return true;
	}
}


/**
 * Function to store host and user information into session variable
 * @param sessionObject
 */
function login(sessionObject, rememberMe){
	if(oLocalStorage.get("Saved_PI_Servers") == null){
		oLocalStorage.put("Saved_PI_Servers", {servers : []});
	}
	//if()
	if(!oLocalStorage.get("Saved_PI_Servers").servers.contains({protocol : sessionObject.protocol , host : sessionObject.host, port : sessionObject.port})){
	var a = oLocalStorage.get("Saved_PI_Servers").servers;
	console.log(a.indexOf({protocol : sessionObject.protocol , host : sessionObject.host, port : sessionObject.port}));
	a.push({protocol : sessionObject.protocol , host : sessionObject.host, port : sessionObject.port});
	oLocalStorage.put("Saved_PI_Servers", {servers : a});
	}
	sessionObject.isLoggedin = true;
	oStorage.put('sessionObject', sessionObject);
	if(rememberMe)
	setCookie('sessionObject', JSON.stringify(sessionObject), 365);
	location.reload();
}

function deleteSavedPIServers(){
	oLocalStorage.put("Saved_PI_Servers", null);
}
/**
 * Funtion to delete host and user credential information form session variable
 */
function logoff(){
	oStorage.clear();
	oLocalStorage.put("AllAlerts", null);
	setCookie("sessionObject", "", -1);
	db.delete();
	location.reload();
}


//Function to create the dialog

function openLoginDialog() {
	
	var loginview = sap.ui.view({
		viewName : "sap_pi_monitoring_tool.Login",
		type : sap.ui.core.mvc.ViewType.JS
		
	});
	
	
	
	var loginDialog = new sap.ui.commons.Dialog({
		modal : true,
		keepInWindow : true,
		showCloseButton  : false,
		autoReposition: true,
		width: '400px',
		content : [ loginview ]
	});
	
	loginDialog.changeView = function(loginview) {
		this.removeAllContent();
		this.addContent(loginview);
	}
	$(window).resize(function() {
		loginDialog.changeView(loginview);
	});
	sap.ui.commons.Dialog.prototype.onsapescape = function(){ }; 
	//loginDialog.open();
}

function openViewDialog(view) {
	$('.sapUiDlg').hide();
	var objDialog = new sap.ui.commons.Dialog({
		modal : false,
		keepInWindow : true,
		showCloseButton  : true,
		autoReposition: true,
		width: '600px',
		height: '500px',
		content : [ view ]
	});
	
	objDialog.changeView = function(view) {
		this.removeAllContent();
		this.addContent(view);
	}
	$(window).resize(function() {
		objDialog.changeView(view);
	});
	//sap.ui.commons.Dialog.prototype.onsapescape = function(){ }; 
	objDialog.open();
}
function openObjectDialog(jsonObj) {
	$('.sapUiDlg').hide();
	console.log(jsonObj);
	var oLayout = new sap.ui.commons.layout.MatrixLayout({
		layoutFixed : false
	});
	for (var i in jsonObj) {
		var oLabelProperty = new sap.ui.commons.Label({text : i});
		if(i.toLowerCase() != 'channel'){
			var oLabelValue = new sap.ui.commons.Label({text : jsonObj[i]});
			oLayout.createRow(oLabelProperty , oLabelValue);
		}else{
			var oLinkValue = new sap.ui.commons.Link({
				text : jsonObj[i],
				href : localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port +'/webdynpro/resources/sap.com/tc~lm~itsam~ui~mainframe~wd/FloorPlanApp?applicationID=com.sap.itsam.mon.xi.adapter.channel&channel_name='+jsonObj[i]+'&component='+jsonObj.ChannelService+'&party='+jsonObj.ChannelParty+'#'
			});
			oLinkValue.setTarget("_blank");
			oLayout.createRow(oLabelProperty , oLinkValue);
		}
		
    }

	
	
	var objDialog = new sap.ui.commons.Dialog({
		modal : false,
		keepInWindow : true,
		showCloseButton  : true,
		autoReposition: true,
		width: '600px',
		height: '500px',
		content : [ oLayout ]
	});
	
	objDialog.changeView = function(oLayout) {
		this.removeAllContent();
		this.addContent(oLayout);
	}
	$(window).resize(function() {
		objDialog.changeView(oLayout);
	});
	//sap.ui.commons.Dialog.prototype.onsapescape = function(){ }; 
	objDialog.open();
}

function localStore(name, obj){
	console.log("trying to put"+ JSON.stringify(obj));
	oStorage.put(name, obj);
	console.log("Successfully put"+ JSON.stringify(obj));
}

function localStore(name){ 
	return oStorage.get(name);  
}

// Broswer Notification code

//request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(title, msg) {
  if (!Notification) {
    console.log('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('IBM Monitoring: '+ title, {
      icon: 'images/favicon1.png',
      body: msg,
    });

    notification.onclick = function () {
     window.open(window.location);      
    };

  }

}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (JSON.stringify(this[i]) === JSON.stringify(obj)) {
            return true;
        }
    }
    return false;
}



