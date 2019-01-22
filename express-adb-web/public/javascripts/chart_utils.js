


function init_chart_page(){

    // add result-card divs in cause-effect-card container
    data.forEach(function(x){
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

    update_chart_page();
}

function update_chart_page(){

  problems = data.filter(x => x['type'] == 'problem');
  causes = data.filter(x => x['type'] == 'cause');
  effects = data.filter(x => x['type'] == 'effect');
  
  effects.forEach(function(x){
      span_card = $('<div/>', {"class" :  'chart-card ' + x['type'] });
      span_card.append(x['text'])
      $("#effect-container").append(span_card)
    });


    problems.forEach(function(x){
        span_card = $('<div/>', {"class" :  'chart-card ' + x['type'] });
        span_card.append(x['text'])
        $("#problem-container").append(span_card)
      });

    causes.forEach(function(x){
        span_card = $('<div/>', {"class" :  'chart-card ' + x['type'] });
        span_card.append(x['text'])
        $("#cause-container").append(span_card)
      });



  jQuery(document).ready(function() {
    jQuery('.problem').connections({ to: '.cause' });
    jQuery('.problem').connections({ to: '.effect' });
  });
}

