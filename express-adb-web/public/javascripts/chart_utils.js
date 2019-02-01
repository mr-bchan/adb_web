
function init_chart_page(){


    // reset containers
    $("#problem-card-container").empty();
    $("#cause-card-container").empty();
    $("#effect-card-container").empty();

    // add result-card divs in cause-effect-card container
    data.forEach(function(x){
      result_card = $('<div/>', {"class" : 'result-card padding-5px'});
      result_card.append("<p class='font-blue cursor-pointer'>")
      
      if(x['type']== 'problem'){
        card_div = '#problem-card-container'
      }
      else if(x['type'] == 'cause'){
        card_div = '#cause-card-container'
      }
      else {card_div = '#effect-card-container'}

      type_color = 'bg-grey'
      result_card.append('<h4 class="font-blue"> <input type="checkbox", onclick="filter_data(event)", checked> <font onclick="event.target.previousSibling.previousSibling.click()" class="cursor-pointer">' + x['text']+ "</font><br>" );
      // result_card[0].getElementsByClassName('tag-input')[type_index].classList.add("selected");

      $(card_div).append(result_card)
    })

    update_chart_page(data);
}

function update_chart_page(data){
  
  $("#cause-container").empty();
  $("#problem-container").empty();
  $("#effect-container").empty();


  problems = data.filter(x => x['type'] == 'problem');
  causes = data.filter(x => x['type'] == 'cause');
  effects = data.filter(x => x['type'] == 'effect');
  
  causes.forEach(function(x){
      span_card = $('<div/>', {"class" :  'chart-card ' + x['type'] });
      button_card = $('<span/>', {"class" :  'chart-buttons ' });

      span_card.append(x['text'])
      span_card.append('<hr>')

      button_card.append('<i onclick="prompt_response(event)", class="fa fa-pencil fa-lg padding-5px cursor-pointer font-blue"></i>')
      button_card.append('<i onclick="delete_response(event)", class="fa fa-trash fa-lg padding-5px cursor-pointer font-blue"></i>')

      span_card.append(button_card)
      $("#cause-container").append(span_card)
    });

    problems.forEach(function(x){
        span_card = $('<div/>', {"class" :  'chart-card ' + x['type'] });
        button_card = $('<span/>', {"class" :  'chart-buttons ' });

        span_card.append(x['text'])
        span_card.append('<hr>')

        button_card.append('<i onclick="prompt_response(event)", class="fa fa-pencil fa-lg padding-5px cursor-pointer font-blue"></i>')
        button_card.append('<i onclick="delete_response(event)", class="fa fa-trash fa-lg padding-5px cursor-pointer font-blue"></i>')

        span_card.append(button_card)
        $("#problem-container").append(span_card)
      });

    effects.forEach(function(x){
        span_card = $('<div/>', {"class" :  'chart-card ' + x['type'] });
        button_card = $('<span/>', {"class" :  'chart-buttons ' });

        span_card.append(x['text'])
        span_card.append('<hr>')

        button_card.append('<i onclick="prompt_response(event)", class="fa fa-pencil fa-lg padding-5px cursor-pointer font-blue"></i>')
        button_card.append('<i onclick="delete_response(event)", class="fa fa-trash fa-lg padding-5px cursor-pointer font-blue"></i>')

        span_card.append(button_card)
        $("#effect-container").append(span_card)
      });


      $( ".chart-card" ).hover(
            function() {
              $(this)[0].lastChild.style.display = 'inline' // show me on hover!
            }, function() {
              $(this)[0].lastChild.style.display = 'none' // tago tago muna!
            }
          );
           

      jQuery(document).ready(function() {
      jQuery('.effect').connections({ 'to': '#placeholder_1','within': '#chart-container-center',css: {border: '3px solid black','opacity': 0.5, 'z-index': 5}});
      jQuery('.problem').connections({ 'to': '#placeholder_1','within': '#chart-container-center',css: {border: '3px solid black','opacity': 0.5, 'z-index': 5}});
      
      jQuery('.cause').connections({ 'to': '#placeholder_2', 'within': '#chart-container-center',css: {border: '3px solid black','opacity': 0.5,'z-index': 5}});
      jQuery('.problem').connections({ 'to': '#placeholder_2', 'within': '#chart-container-center',css: {border: '3px solid black','opacity': 0.5,'z-index': 5}});
   
      setInterval(function(){$('connection').connections('update')}, 100);
    });
}

function filter_data(event){
  text = event.target.nextSibling.nextSibling.textContent
  is_checked = event.target.checked


  // uncheck event
  if(!is_checked){
    filtered_data = filtered_data.filter(x => x['text'] != text)
    console.log(text)
  }
  // check event
  else{
    to_add = data.filter(x => x['text'] == text)
    filtered_data.push(to_add[0])
  }
  update_chart_page(filtered_data)
}
