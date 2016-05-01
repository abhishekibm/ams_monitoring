var default_settings = {
	//appname : 'SAP PI Monitoring Tool',
	mode : 'debug', //prod, dev, debug
	proxy : true,
	/// Scheduling 
	AlertAjaxTimeout : 1000000,
	ChannelFetchAjaxTimeout : 500000,
	MaxRetryCount : 5,
	WaitBetweenAjaxCall : 5000
	
}

jQuery.sap.require("jquery.sap.storage");
var s = jQuery.sap.storage(jQuery.sap.storage.Type.local); 
s.put('settings', default_settings);

settings = 	s.get('settings');

function update(property, value){
	var s = s.get('settings');
	s.property = value;
	s.put('settings', s);
	settings = s.get('settings');
}