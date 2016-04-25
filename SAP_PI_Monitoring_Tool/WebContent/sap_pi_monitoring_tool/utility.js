mode = 'debug';// prod, debug
proxy = true;

jQuery.sap.require("jquery.sap.storage");
oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

if(mode.toLowerCase() != 'debug'){
	console.log = function() {}
}

//Here all service APIs will be mentioned
serviceAPIs  = {
		alertAPI_all_alert_consumers: function(){
			if(proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRuleInService/AlertRuleInImplBean');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRuleInService/AlertRuleInImplBean');
		},
		
		alertAPI_single_alert: function(){
			if(proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRetrieveAPI_Service/AlertRetrieveAPIImplBean');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AlertRetrieveAPI_Service/AlertRetrieveAPIImplBean');
		},
		
		messageAPI: function(){
			if(proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AdapterMessageMonitoring/basic?style=document');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/AdapterMessageMonitoring/basic?style=document');
			
		},
		
		channelListAPI: function(){
			if(proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/CommunicationChannelInService/CommunicationChannelInImplBean');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + '/CommunicationChannelInService/CommunicationChannelInImplBean');
		},
		
		channelStatusAPI: function(){
			if(proxy)
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
function login(sessionObject){
	sessionObject.isLoggedin = true;
	oStorage.put('sessionObject', sessionObject);
	
	console.log(localStore('sessionObject'));
	location.reload();
}
	
/**
 * Funtion to delete host and user credential information form session variable
 */
function logoff(){
	oStorage.clear();
	location.reload();
}


//Function to create the dialog

function openLoginDialog() {
	loginview = sap.ui.view({
		viewName : "sap_pi_monitoring_tool.Login",
		type : sap.ui.core.mvc.ViewType.JS
		
	});
	var loginDialog = new sap.ui.commons.Dialog({
		title : "Login",
		modal : true,
		keepInWindow : true,
		showCloseButton  : false,
		autoReposition: true,
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
	loginDialog.open();
}

function pollSingleAlert(alertConsumer){
	 
	 
}

function localStore(name, obj){
	console.log("trying to put"+ JSON.stringify(obj));
	oStorage.put(name, obj);
	console.log("Successfully put"+ JSON.stringify(obj));
}

function localStore(name){ 
	return oStorage.get(name);  
}

// Brower Notification code

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


$.ajaxSetup({
    /*error: function (x, status, error) {
        if (x.status == 403) {
            alert("Sorry, your session has expired. Please login again to continue");
            //window.location.href ="/Account/Login";
        }
        else {
            alert("An error occurred: " + status + "nError: " + error);
        }
    }*/
});
