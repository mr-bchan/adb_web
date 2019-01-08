function search_query(){
	console.log('Query:' + search_box.value)
    query = search_box.value

    // Check if query is undefined or blank
    if(query && query.trim().length > 0){
    	query = encodeURIComponent(query.trim())
    	console.log('Encoded URI: ' + query)
    	window.location.href = "/search?q=" + query;
    }
	// call pam's api to get output
}

function get_suggestions(){
	console.log('Current input: ' + search_box.value)
}