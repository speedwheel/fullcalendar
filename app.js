document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventDidMount: function(info) {
      tippy(info.el, {
        allowHTML: true,
        interactive: true,
        trigger: 'click',
        maxWidth: 'none',
        content: info.event.extendedProps.description,
      });
    }
  });
  calendar.render();

  addEvents(calendar);
});

function addEvents(calendar) {
  $.ajax({
    url: "https://calendar.homeschoolacademy.com/api/events",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa('edovate' + ":" + 'c#F}ZAp32e36f7ES'));
    },
    success: function (data) {
      console.data
      $.each(data, function (index, event) {
        calendar.addEvent({
          title: event.summary,
          description: event.description,
          start: event.start.dateTime,
          end: event.end.dateTime,
          allDay: true
        });
      });

    },
    error: function () {

    }
  });
}