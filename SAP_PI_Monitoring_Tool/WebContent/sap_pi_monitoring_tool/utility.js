mode = 'debug';// prod, debug
proxy = true;

jQuery.sap.require("jquery.sap.storage");
oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); 


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
	
	console.log(localStore('sessionObject'));
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
	oLocalStorage.put("AllAlerts", {data : []});
	
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

/*$.ajaxSetup({
    error: function (x, status, error) {
    	console.log(x);
   	    console.log(status);
   	    console.log(error);
        var msg = '';
        if (x.status == 0) {
            msg = 'Retrying...';
            x;
        } 
        if (x.status == 404) {
            msg = 'Requested page not found. [404]';
        } 
        if (x.status == 500 || x.status == 401 || x.status == 403) {
       	 var o = localStore('sessionObject');
       	 o.msg = x.responseText;
       	 oStorage.put('sessionObject', o);
       	 openLoginDialog();
        } 
        if (error === 'parsererror') {
            msg = 'Requested XML parse failed.';
        }
        if (error === 'timeout') {
            msg = 'Time out error.';
            
        } 
        if (error === 'abort') {
            msg = 'Ajax request aborted.';
        } 
        
        
        
        console.log(msg);
        //eventBus.publish("FetchAlertsFromNotificationBar", "onNavigateEvent", { err : jqXHR.responseText });
    },
    complete : function () {
   	 console.log("complete");
    }
});*/

