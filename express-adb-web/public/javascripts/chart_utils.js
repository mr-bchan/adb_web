

function init_page(){

    // add result-card divs in cause-effect-card container
    get_data().forEach(function(x){
      result_card = $('<div/>', {"class" : 'result-card'});
      
      result_card.append("<p class='font-blue cursor-pointer capitalize'>")
      
      if(x['type']== 'problem'){
        type_index = 0
      }
      else if(x['type'] == 'cause'){
        type_index = 1
      }
      else {type_index = 2}

      type_color = 'bg-grey'
      result_card.append('<h4 class="font-blue">' + x['text']+ "<br>" );

      // Cause-Effect tag
      span_type = $('<span/>', {"class" :  type_color +' tag-input'});
      span_type.append('problem')
      result_card.append(span_type)

      // Cause-Effect tag
      span_type = $('<span/>', {"class" :  type_color +' tag-input'});
      span_type.append('cause')
      result_card.append(span_type)

      // Cause-Effect tag
      span_type = $('<span/>', {"class" :  type_color +' tag-input'});
      span_type.append('effect')
      result_card.append(span_type)


      result_card.append("</h4><br> <hr>" );

      result_card[0].getElementsByClassName('tag-input')[type_index].classList.add("selected");

      $("#candidates-card").append(result_card)
    })
}

// Get dummy data
function get_data(){
  dummy_data = [
    {
      'text': 'this is a sample problem',
      'type': 'problem'
    },

    {
      'text': 'this is a sample problem',
      'type': 'problem'
    },

    {
      'text': 'this is a sample cause',
      'type': 'cause'
    },

    {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    },
        {
      'text': 'this is a sample effect',
      'type': 'effect'
    }
  ]

  return dummy_data
}
