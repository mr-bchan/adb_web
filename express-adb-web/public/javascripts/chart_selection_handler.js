function prompt_response(event) {
  text = event.target.parentElement.previousSibling.previousSibling.textContent

  var updated_text = prompt("Please enter your revisions: ", text);
  if (updated_text != null) {
  		data.forEach(function(x){
  			if(x['text'] == text){
  				x['text'] = updated_text
  			}
  		})
  }
  init_chart_page()
}


function delete_response(event){
  console.log(event.target.parentElement)
	text = event.target.parentElement.previousSibling.previousSibling.textContent

	data = data.filter(x => x['text'] != text)
	filtered_data = filtered_data.filter(x => x['text'] != text)

	init_chart_page()
}


function add_problem(type){

  var new_text = prompt("Please enter your new " + type + ": ", "");

  new_data = {
    'text': new_text,
    'type': type
  }

  if (new_text != null){
      data.push(new_data)
  // filtered_data.push(new_data)

    init_chart_page()
  }
}

function update_problem(){
    confirm('User updates saved!')

    httpPostAsync(data, API_URL_UPDATE_PROBLEM, function(x){
      console.log('updating problem tree saved!')
    })
}