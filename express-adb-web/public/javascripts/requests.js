
var API_URL = 'http://0.0.0.0:8000/'

var API_URL_PROBLEM = API_URL + 'get_problems'
var API_URL_CAUSE_EFFECT = API_URL + 'get_causes_effects'

 function httpGetAsync(url, callback)
{


	console.log('sending GET request.');
	console.log('GET ' + url);
    
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.ontimeout = function (e) {
    		console.log('[error] Request TIMEOUT on GET ' + url);
    };

    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.timeout = HTTP_TIMEOUT_MS

    xmlHttp.send(null);
}

 function httpPostAsync(comments, url, callback)
{	
		console.log('sending POST request.');
		console.log('POST ' + url);

		var xmlHttp = new XMLHttpRequest();	

		xmlHttp.onreadystatechange = function() { 
        	if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            	callback(xmlHttp.responseText);
    	}

		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-type", "application/json");
		xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "POST");
		xmlHttp.setRequestHeader("Access-Control-Allow-Headers","Content-Type");

        console.log('Sending POST data: ' + JSON.stringify({'data':comments}));
		xmlHttp.send(JSON.stringify({'data':comments}));
}