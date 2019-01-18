

function clear_input_field(){

	// clear auto suggestions
	$("#autosuggest").empty();
	$("#autosuggest").css('visibility', 'hidden');

	search_box.value = '';
	search_box.focus();
}

function search_query(){
	console.log('Query:' + search_box.value)
    query = search_box.value

    // Check if query is undefined or blank
    if(query && query.trim().length > 0){
    	query = encodeURIComponent(query.trim())
    	console.log('Encoded URI: ' + query)
    	window.location.href = "/search?q=" + query;
    }
}

function get_suggestions_index(){
	text = search_box.value
	console.log('Current input: ' + text);

	// dummy values
	dummy_values = [
		'traffic signs traffic',
		'traffic advisory',
		'heavy traffic',
		'trafficking',
		'Philippine traffic'
	];

	$("#autosuggest").empty();

	if(text == ''){
		$("#autosuggest").css('visibility', 'hidden');
	}

	else{
		if(search_box.parentElement.className == 'example index')
			search_function = 'use_suggestion(event)'
		else{
			search_function = 'update_search_box(event)'
		}

		dummy_values.forEach(function(x){
			// replace occurences of text with color blue
			text = text.trim();	
			tokens = text.split(" ");


			tokens.forEach(function(token){
				if(token != ''){
				regexp = "(" + token + ")(?![^<]*>|[^<>]*<\/)"
				x = x.replace(new RegExp(regexp, 'gim'), '<b><font color="blue">'+token+'</b></font>');}
			})

			$("#autosuggest").append("<div class='suggestion', onclick=" + search_function + ">" + x.toLowerCase() + "</div> <hr>	")
		})
		
		$("#autosuggest").css('visibility', 'visible');
	}
}

function use_suggestion(event){
	search_box.value = event.target.textContent
	search_query()
}

function update_search_box(event){
	text = event.target.textContent;
	search_box.value = text;

	// run search with new value
	get_problems();
}

// Clicking related keyword for filtering data
// 1. source - by source
// 2. problem - by match and update problem div
// 3. cause_effect - by match and update cause/effect div
function filter_keyword(event, target_div){
	text = event.target.textContent;

	if(target_div == 'source'){
		filtered_data = data['data'].filter(function(x) {
			return x['source'] == text;
	});
	}

	else{
		filtered_data = data['data'].filter(function(x) {
			return x['match'].includes(text)});
	}

	if(target_div == 'problem' || target_div == 'source'){
		update_problem_div(filtered_data);
	}
	else{
		update_cause_effect_div(filtered_data)
	}
	
}

// show problems in #left-card div
function get_problems(){
	console.log('[get_problems] User query:' + search_box.value)

	// clear auto suggestions
	$("#autosuggest").empty();
	$("#autosuggest").css('visibility', 'hidden');

	// send POST to API
	keywords = search_box.value
	httpPostAsync(comments = {
		'text': keywords
	}, url=API_URL_PROBLEM, callback=function(data){
		keywords = JSON.parse(data)['data']['related_keywords']
		data = JSON.parse(data)['data']['data']

		// Update results div
		$("#result_count").text("Results 1 to " +  data.length + " of " + data.length +" for " + search_box.value + "			")
		update_related_keywords_div(keywords)
		update_problem_div(data)
	})
}


// show cause effect in #middle-card div
function get_cause_effects(event){

	$("#cause-effect-card").empty();
	span_keywords = event.target.parentElement.getElementsByClassName('bg-blue')
	keywords = ''

	for (var i = 0; i < span_keywords.length; i++) {
	    keywords = keywords + ' ' + span_keywords[i].textContent; //second console output
	}

	httpPostAsync(comments = {
		'text': keywords
	}, url=API_URL_PROBLEM, callback=function(data){

		data = JSON.parse(data)['data']['data']
		update_cause_effect_div(data)
	})

	// toggle visibility of #middle-card div element
	if($("#middle-card").css('visibility') == 'hidden'){
		$("#middle-card").css('visibility', 'visible')
	}

}


function update_related_keywords_div(keywords){
	console.log('[update_related_keywords_div]: Updating related_keywords div')
	console.log(keywords)
	$("#related_results").empty();

	keywords.forEach(function(x){
		span_related_keyword = $('<span/>', {"class" : 'bg-grey tag-input'});
		span_related_keyword.append(x);
		$("#related_results").append(span_related_keyword);

		span_related_keyword[0].onclick = function(event){update_search_box(event)};
	});
}


function update_problem_div(data){
	console.log('[update_problem_div]: Updating problem div')
	$("#left-card").empty();
	data.forEach(function(x){
		result_card = $('<div/>', {"class" : 'result-card'});
		
		result_card_html = "<h4 class='font-blue cursor-pointer capitalize', onclick='get_cause_effects(event)'>" + x.text + "</h4>"
		result_card_html = result_card_html + "<a href=" + x.link + ", target='blank'>"
		result_card_html = result_card_html + "<p class='cursor-pointer'>" + x.title + "</p></a>"
		result_card_html = result_card_html + "<p class='font-grey'> Project Number: " + x.project_no
		result_card_html = result_card_html + " | Country: " + x.country
		result_card_html = result_card_html + " | Section: " + x.section + "</p>"

		result_card_html = result_card_html + "<span class='bg-orange tag-input', onclick='filter_keyword(event, \"source\")'>" + x.source + "</span>"
		result_card.append(result_card_html);

		x['match'].forEach(function(match){
			span_match = $('<span/>', {"class" : 'bg-blue tag-input'});
			span_match.append(match)
			result_card.append(span_match)

			span_match[0].onclick = function(event){filter_keyword(event, 'problem')};
		})

		result_card.append( "<br> <hr>");
		$("#left-card").append(result_card)
	});


}

function reset_problems_div(){
	update_problem_div(data['data'])
}
function reset_cause_effect_div(){
	update_cause_effect_div(data['data'])
}

function update_cause_effect_div(data){
		console.log('[update_cause_effect_div]: Updating cause/effect div')
		// clear cause-effect-card container
		$("#cause-effect-card").empty();

		// add result-card divs in cause-effect-card container
		data.forEach(function(x){
			result_card = $('<div/>', {"class" : 'result-card'});
			
			result_card.append( "<p class='font-blue cursor-pointer capitalize'>" + x['text']+ "</p>" );
			result_card.append( "<a href=" + x['link'] + " target='_blank'> <p class='font-grey'><i>" + x['title']+ "</i></p></a>" );
			
			// Cause-Effect tag
			span_type = $('<span/>', {"class" : 'bg-red tag-input'});
			span_type.append('cause')
			result_card.append(span_type)

			span_type = $('<span/>', {"class" : 'bg-green tag-input'});
			span_type.append('effect')
			result_card.append(span_type)

			x['match'].forEach(function(match){
				span_match = $('<span/>', {"class" : 'bg-blue tag-input'});
				span_match.append(match)
				result_card.append(span_match)

				span_match[0].onclick = function(event){filter_keyword(event, 'cause_effect')};
			})


			result_card.append( "<br> <hr>");

			$("#cause-effect-card").append(result_card)
		})
		
}