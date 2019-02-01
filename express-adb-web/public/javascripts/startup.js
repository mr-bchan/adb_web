
var search_box;
var api_output_problems;
var api_output_cause_effects;


function on_page_load(){
	// Get the input field
	search_box = document.getElementById("search_box");

	if(search_box){
	// Execute a function when the user releases a key on the keyboard
	search_box.addEventListener("keyup", function(event) {
	  // Cancel the default action, if needed
	  event.preventDefault();

	  // Number 13 is the "Enter" key on the keyboard
	  if (event.keyCode === 13) {
	    // Trigger the button element with a click
	   	document.getElementById("search_button").click();
	  }

	  // Number 27 is the "Escape" key on the keyboard
	  else if (event.keyCode === 27) {

	  	search_box.value = ''
	    // clear auto suggestions
		$("#autosuggest").empty();
		$("#autosuggest").css('visibility', 'hidden');
		  }

		else{
			      
      // Script: event_handler.js
      // populate with suggested keywords
	  get_suggestions_index()
	  
		}

	});

	// Execute a function when the user releases a key on the keyboard
	search_box.addEventListener("click", function(event) {
	  // Cancel the default action, if needed
	  event.preventDefault();
      
      // Script: event_handler.js
      // populate with suggested keywords
	  get_suggestions_index()

	});

	search_box.focus();

	// move pointer to end of input field
	search_box.selectionStart = search_box.selectionEnd = search_box.value.length

	} //if search-box


    $("#download").click(function() { 
        html2canvas($("#chart-container-center"), {
        	scale: 2,
            onrendered: function(canvas) {
                saveAs(canvas.toDataURL(), 'problem_tree.png');
            }
        });
    });


    $("#close").click(function() { 
        window.close();
    });


    $("#save").click(function() { 
        console.log(data)

        //send data to API for updating graph
        update_problem();



    });
}

  function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

