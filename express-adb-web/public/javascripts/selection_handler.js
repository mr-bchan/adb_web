
var problems = []
var causes = []
var effects = []

function select_problem(event){

	checkbox = event.target;
	parent = event.target.parentElement
	text = parent.textContent // text content of card


	// add problem in problems list
	if(checkbox.checked){

		console.log('checkbox - checked')
		problems.push(text.trim())
		console.log(problems)
		card = parent.parentElement
		card.style.backgroundColor = "#f6fbfc"; 

	}
	else{

		problems = problems.filter(problem => problem.trim() != text.trim())
		console.log(problems)

		card = (parent.parentElement)
		card.style.backgroundColor = ""; 

	}
}

function select_cause_effect(event){

	checkbox = event.target;
	parent = event.target.parentElement
	text = parent.textContent // text content of card

	type_span = parent.parentElement.getElementsByTagName('span')[0];

	if(type_span.classList.contains('tag-cause')){
		type_input = 'cause'
	}
	else{
		type_input = 'effect'
	}

	console.log(type_input);

	// add problem in problems list
	if(checkbox.checked){
		
		if(type_input == 'cause'){
			causes.push(text.trim())
		}
		else{
			effects.push(text.trim())
		}
			card = (parent.parentElement)
			card.style.backgroundColor = "#f6fbfc"; 

		console.log(causes);
		console.log(effects)
	}
	else{

		if(type_input == 'cause'){
			causes = causes.filter(x => x.trim() != text.trim())
		}
		else{
			effects = effects.filter(x => x.trim() != text.trim())
		}

		card = (parent.parentElement)
		card.style.backgroundColor = ""; 

		console.log(causes);
		console.log(effects)

	}
}