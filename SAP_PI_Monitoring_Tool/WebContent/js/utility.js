
jQuery.sap.require("jquery.sap.storage");
oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); 





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
if(settings.mode.toLowerCase() != 'debug' && settings.mode.toLowerCase() != 'demo'){
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
		},
		
		channelStatusAPI2 : function(){
			if(settings.proxy)
				return ('proxy/'+localStore('sessionObject').protocol+'/'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + 
						'/AdapterFramework/ChannelAdminServlet?party=&service=*&channel=*&action=status');
			else
				return (localStore('sessionObject').protocol+'://'+localStore('sessionObject').host +':'+ localStore('sessionObject').port + 
						'/AdapterFramework/ChannelAdminServlet?party=&service=*&channel=*&action=status');
		
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
	//db.delete();
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


function exportToCSV(table, filename){
	jQuery.sap.require("sap.ui.core.util.Export");
	jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
	//table.setBusy(true);
	table.exportData().saveFile(filename+(new Date()));
	
}



function exportAlerts(ReportTitle, ShowLabel){
	var alertsAll = [];
	console.log(alertsAll);
	db.alerts
	.each(function(alert){
		alertsAll.push(alert);
	}).then(function(alerts){
		console.log(alertsAll);
		if(alertsAll.length > 0)
			return JSONToCSVConvertor(JSON.parse(JSON.stringify(alertsAll)), ReportTitle, ShowLabel);
		else{
			console.log("Not alert found.")
			return "Not alert found.";
		}
	}).catch (function (err) {

	    // Transaction will abort!
	    console.log(err);
	    return err;
	});
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        //alert("Invalid data");
        return "JSON data is invalid. File couldn't be extracted";
    }   
    
    //Generate a file name
    var fileName = "Monitoring Report_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return 'File has been successfully extracted';
}

aboutTool = 
	'\n\nPI Monitoring Tool. \
	\n\nAMS PI Monitoring tool is a web based standalone tool. It provides option to search successful and failed messages (system error, delivering, holding, waiting, to be delivered) from the specified PI server. It displays alert notifications whenever any message failure occurs in the PI system in a single screen. It also provides the option of excel download of successful and failed messages, alert notifications, channel errors.\
	\n\n Features:\n\
	1. It shows the live alert count\n\
	2. Automatically Fetches raised alerts\n\
	3. Message monitoring to search messages\n\
	4. Auto extract data for reporting purpose';