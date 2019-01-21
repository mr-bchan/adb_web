
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

function select_cause_effect(event, type_input){

	checkbox = event.target;
	parent = event.target.parentElement
	text = parent.textContent // text content of card

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

	}
}