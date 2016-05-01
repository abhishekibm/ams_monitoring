default_settings = {
	mode : 'debug', //prod, dev, debug
	mode_allowed : ["prod", "dev", "debug" ],
	proxy : true,
	proxy_allowed : ["true", "false" ],
	
	/// Scheduling 
	AlertAjaxTimeout : 100000,
	AlertAjaxTimeout_allowed : [5000, 10000, 20000, 50000, 100000 ],
	ChannelFetchAjaxTimeout : 500000,
	ChannelFetchAjaxTimeout_allowed :[5000, 10000, 20000, 50000, 100000 ],
	WaitBetweenAjaxCall : 5000,
	WaitBetweenAjaxCall_allowed : [5000, 10000, 20000, 50000, 100000 ],
	MaxRetryCount : 5,
	MaxRetryCount_allowed : [0, 2, 5, 10, 20, 100]
	
}

jQuery.sap.require("jquery.sap.storage");
var s = jQuery.sap.storage(jQuery.sap.storage.Type.local); 
s.put('settings', default_settings);

settings = 	s.get('settings');

function update(property, value){
	a = s.get('settings');
	a.property = value;
	s.put('settings', a);
	settings = s.get('settings');
}