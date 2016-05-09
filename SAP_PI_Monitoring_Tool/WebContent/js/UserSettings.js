default_settings = {
	mode : 'demo', //prod, dev, debug, demo
	mode_allowed : ["prod", "dev", "debug" ],
	mode_desc : 'Use Debug mode to see the detailed log.',
	proxy : true,
	proxy_allowed : ["true", "false" ],
	proxy_desc : 'Using "proxy"=true when local proxy needs to forward cross-domain ajax calls.',
	/// Scheduling 
	AlertAjaxTimeout : 0,
	AlertAjaxTimeout_allowed : [5000, 10000, 20000, 50000, 100000 ],
	AlertAjaxTimeout_desc : 'This is Ajax timeout parameter for alert fetching',
	ChannelFetchAjaxTimeout : 500000,
	ChannelFetchAjaxTimeout_allowed :[5000, 10000, 20000, 50000, 100000, 500000 ],
	ChannelFetchAjaxTimeout_desc : 'This is Ajax timeout parameter for channel fetching',
	WaitBetweenAjaxCall : 5000,
	WaitBetweenAjaxCall_allowed : [5000, 10000, 20000, 50000, 100000 ],
	WaitBetweenAjaxCall_desc : 'This is the minimum wait between two consecutive ajax calls',
	MaxRetryCount : 5,
	MaxRetryCount_allowed : [0, 2, 5, 10, 20, 100],
	MaxRetryCount_desc : 'This is the Max retry count when a ajax fails due to timeout',
	ActiveAjaxCheckTimer : 10000,
	ActiveAjaxCheckTimer_desc : 'This will check whether any active ajax is there or not',
	ActiveAjaxCheckTimer_allowed : [3000, 5000, 10000, 15000, 200000],
	MaxMessageFetchLimit : 100,
	MaxMessageFetchLimit_desc : 'These many message will be fetched maximum',
	MaxMessageFetchLimit_allowed : [100, 1000, 2000, 5000]
} 

settings = default_settings;

function updateSettings(property, newValue){
	console.log('Current settings');
	console.log(settings);
	settings[property] = newValue;
	console.log("Settings changed : "+ property + " has been changed.");
	console.log(settings);
}

