
var selection = 0;

function update_index(index){
	selection = index
}
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
	text = search_box.value.toLowerCase()
	console.log('Current input: ' + text);

	if(text.trim() == ''){
		//hide suggestions
		$("#autosuggest").empty();
		$("#autosuggest").css('visibility', 'hidden');
	}
	else{

	httpPostAsync(comments = {
		'text': text.trim()
	}, url=API_URL_SUGGESTIONS, callback=function(data){

		data = JSON.parse(data)['data']

		$("#autosuggest").empty();
			if(search_box.parentElement.className == 'example index')
				search_function = 'use_suggestion'
			else{
				search_function = 'update_search_box'
			}

			data.forEach(function(x){
				// replace occurences of text with color blue

				original_text = x;
				text = text.trim();	
				tokens = text.split(" ");


				tokens.forEach(function(token){
					if(token != ''){
					regexp = "(" + token + ")(?![^<]*>|[^<>]*<\/)"
					x = x.replace(new RegExp(regexp, 'gim'), '<b><font class="font-blue">'+token+'</b></font>');}
				})

				div_suggestion = "<div class='suggestion font-grey', onclick='" + search_function + "(\"" +original_text+"\")'>" + x.toLowerCase() + "</div> <hr>"
				console.log(div_suggestion)
				$("#autosuggest").append(div_suggestion);
			})
			
			if(data.length > 0){
			$("#autosuggest").css('visibility', 'visible');
		}
		else{
			$("#autosuggest").css('visibility', 'hidden');
		}
		
	});

	}

}

function use_suggestion(event){
	search_box.value = event
	search_query()
}

function update_search_box(event){
	search_box.value = event;	
	// run search with new value
	get_problems();
}


function filter_by_type(type){
	filtered_data = api_output_cause_effects.filter(function(x) {
			return x['type'] == type;
		});
	update_cause_effect_div(filtered_data)
}

// Clicking related keyword for filtering data
// 1. source - by source
// 2. problem - by match and update problem div
// 3. cause_effect - by match and update cause/effect div
// 4. type - cause/problem filter
function filter_keyword(event, target_div){
	text = event.target.textContent;

	console.log(api_output_problems)

	if(target_div == 'source'){
		filtered_data = api_output_problems.filter(function(x) {
			return x['source'].trim() == text.split(':')[1].trim();
	});

		console.log(filtered_data)
	}

	else if(target_div == 'type'){
		filtered_data = api_output_cause_effects.filter(function(x) {
			return x['type'] == text;
		});
	}	

	else if(target_div == 'cause_effect'){
		filtered_data = api_output_cause_effects.filter(function(x) {
			return x['match'].includes(text);
		});
	}	

	else{
		filtered_data = api_output_problems.filter(function(x) {
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
		'text': keywords,
		'type': 'problem'
	}, url=API_URL_PROBLEM, callback=function(data){
		keywords = JSON.parse(data)['data']['related_keywords']
		data = JSON.parse(data)['data']['data']

		api_output_problems = data;

		// Update results div
		
		if(data.length == 0){
			$("#result_count").text("No results found for " + search_box.value + "			")
			return		
		}
		else{
			$("#result_count").html(data.length + " problems found for <i class=font-blue>" + search_box.value + "</i>")
		}
		update_related_keywords_div(keywords)
		update_problem_div(data)

	}) //-- httpPostAsync block
}


// show cause effect in #middle-card div
function get_cause_effects(event){

	$("#cause-effect-card").empty();

	span_keywords = event.target.parentElement.parentElement.getElementsByClassName('bg-blue')
	keywords = ''

	for (var i = 0; i < span_keywords.length; i++) {
	    keywords = keywords + ' ' + span_keywords[i].textContent; //second console output
	}


	httpPostAsync(comments = {
		'text': event.target.textContent.toLowerCase(),
		'type': 'cause_effect'
	}, url=API_URL_PROBLEM, callback=function(data){

		api_output_cause_effects = JSON.parse(data)['data']['data']
		update_cause_effect_div(api_output_cause_effects)
	})

	// toggle visibility of #middle-card div element
	if($("#middle-card").css('visibility') == 'hidden'){
		$("#middle-card").css('visibility', 'visible')
	}

}

function update_related_keywords_div(keywords){
	console.log('[update_related_keywords_div]: Updating related_keywords div')

	$("#related_results").empty();

	$("#related_results").html('<b class=font-blue> Related topics: </b>');

	keywords.forEach(function(x){
		span_related_keyword = $('<span/>', {"class" : 'bg-grey tag-input'});
		span_related_keyword.append(x);
		$("#related_results").append(span_related_keyword);

		span_related_keyword[0].onclick = function(event){update_search_box(x)};
	});
}


function update_problem_div(data){
	console.log('[update_problem_div]: Updating problem div')

	$("#left-card").empty();
	data.forEach(function(x){
		result_card = $('<div/>', {"class" : 'result-card'});
			
		if(problems.includes(x.text.trim())){
			is_checked = 'checked'

			// update background color
			result_card.css('backgroundColor', '#f6fbfc')
		}
		else{
			is_checked = ''
		}

		result_card_html = "<h4 class='font-blue cursor-pointer capitalize'> <input type='checkbox' onclick='select_problem(event)' " +  
			is_checked + "/> <span onclick='selection=0;get_cause_effects(event);this.previousSibling.previousSibling.click();'>" + x.text + "</span></h4>"
		
		result_card_html = result_card_html + "<a href=" + x.link + ", target='blank'>"
		result_card_html = result_card_html + "<p class='cursor-pointer'>" + x.title + "</p></a>"
		result_card_html = result_card_html + "<p class='font-grey'> Project Number: " + x.project_no
		result_card_html = result_card_html + " | Country: " + x.country
		result_card_html = result_card_html + " | Section: " + x.section + "</p>"

		result_card_html = result_card_html + "<span class='bg-orange tag-input', onclick='filter_keyword(event, \"source\")'> Document:" + x.source + "</span>"
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
	update_problem_div(api_output_problems)
}
function reset_cause_effect_div(){
	update_cause_effect_div(api_output_cause_effects)
}

function update_cause_effect_div(data){
		console.log('[update_cause_effect_div]: Updating cause/effect div')

		// update color and selection


		$('#middle-card').find($('span')).each(function (index, value) { 
			  if(index < 3){
			  if(index == selection){
			  	$(this).css('color', 'black')
			  	$(this).css('backgroundColor', 'white')
			  }
			  else{
				$(this).css('color', 'white')
			  	$(this).css('backgroundColor', '#605c57')	  	
			  }
			}
			});

		$("#cause-effect-card").empty()	
		// add result-card divs in cause-effect-card container
		data.forEach(function(x){
			result_card = $('<div/>', {"class" : 'result-card'});
				
			if(causes.includes(x.text.trim()) || effects.includes(x.text.trim())){
				is_checked = 'checked'

				// update background color
				result_card.css('backgroundColor', '#f6fbfc')
			}
			else{
				is_checked = ''
			}

			type_input = x.type

			result_card.append( "<p class='font-blue capitalize'> <input type='checkbox' onclick='select_cause_effect(event)' " + is_checked + "/> <font onclick='this.previousSibling.previousSibling.click()', class='cursor-pointer'>" + x['text']+ "</font></p>" );
			result_card.append( "<a href=" + x['link'] + " target='_blank'> <p class='font-grey'><i>" + x['title']+ "</i></p></a>" );
			
			// Cause-Effect tag
			if(type_input == 'cause'){
				span_class = 'bg-red tag-input tag-cause'
			}
			else{
				span_class = 'bg-green tag-input tag-effect'
			}

			span_type = $('<span/>', {"class" : span_class});
			span_type.append(type_input)
			span_type[0].onclick = function(event){filter_keyword(event, 'type')};

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