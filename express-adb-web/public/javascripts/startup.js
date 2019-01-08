
function on_page_load(){
	// Get the input field
	search_box = document.getElementById("search_box");

	// Execute a function when the user releases a key on the keyboard
	search_box.addEventListener("keyup", function(event) {
	  // Cancel the default action, if needed
	  event.preventDefault();

	  get_suggestions(event.currentTarget.value)
	  
	  // Number 13 is the "Enter" key on the keyboard
	  if (event.keyCode === 13) {
	    // Trigger the button element with a click
	    document.getElementById("search_button").click();
	  }
	}); 
}

