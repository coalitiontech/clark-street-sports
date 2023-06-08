Papa.parse("//cdn.shopify.com/s/files/1/2242/6395/t/251/assets/toronto-raptors.csv?v=129946840475526976001685117652", {
             download: true,
             header:true,
             complete: function(results) {


    var events = [];
    var event = results.data;

    for (var i = 0; i < event.length; i++){
      events.push(event[i]);
    }    

    var all_events = {
      events
    };

    $('#fullcalendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      defaultDate: 'Tuesday May 30 2023',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events,
      dayRender: function(date, cell) {
      var myDate = new Date();

      //How many days to add from today?
      var daysToAdd = 7;

      myDate.setDate(myDate.getDate() + daysToAdd);

      if (date < myDate) {
      //TRUE Clicked date smaller than today + daysToadd
      cell.addClass('disabled');
    } 

                                    }


                                    });

    $("#fullcalendar").fullCalendar('addEventSource', all_events);

  }
  });
$(document).on('click', 'a.fc-day-grid-event', function(event){
  event.preventDefault();
  var link = $(this).attr('href');
  var event = $(this).find('.fc-content').text();
  var index = $(this).parent().index();
  var date = $(this).closest('table').find('thead tr td').eq(index).attr('data-date');
  //var data = '{attributes:{Date:'+date+'}}';
  $.ajax({
    url: '/cart/update.js',
    type:	'POST',
    data:  'attributes['+date+']='+event,
    success: function(){
      $.ajax({
        url: '/cart.js',
        type: "GET",
        dataType: 'JSON',
        success: function(cart){
          console.log(cart);
        }
      });
    },
    complete: function(){
      window.location.href = link;
      return false;
    }
  });
  return false;
});