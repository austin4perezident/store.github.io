// Insert current year for Copyright
$(function(){
    var theYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = theYear;
});

$('#rsvpForm').validate({
      rules: {
          name: {
              minlength: 2,
              required: true
          },
          email: {
              required: true,
              email: true
          },
          rsvpType: {
            required: true
          },
          guests: {
            required: true,
            digits: true
          },
          message: {
              minlength: 15
          }
      },
      highlight: function (element) {
          $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      success: function (element) {
        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();
        element.addClass('valid').closest('.form-group').removeClass('has-error').addClass('has-success');
        $(element).remove();
      }
  });

// Variable to hold request
var request;

// Bind to the submit event of our form
$("#rsvpForm").submit(function(event){

  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  if ($("#rsvpForm").valid()) {
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwsvL22-vP8qMUCSOGSSpB_PNqcvaIncgel-lFb7uOp9i9YjcsO/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        Cookies.set('rsvp', true, { expires: 365 });
        $('#rsvpContainer').hide();
        $('#rsvpSuccess').show();

    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

  }

});

  $(document).ready(function() {

      $('[data-toggle="popover"]').popover();   

      var match = "hipposandsharks";
      var remember = Cookies.get('remember');
      var rsvp = Cookies.get('rsvp');
      var siteTitle = '{{ site.password }}';

      if (remember == 'true') 
      {
          $('#rsvpContainer').show();
          $('.jumbotron-registry').show();
          $('#directions').show();
          $('#passwordRow').hide();
          $('#invalidCode').hide();
          $('.jumbotron-main').css({'background-image':'url("../assets/images/ah_3.jpg")'});
      };

      if (rsvp == 'true') {
          $('#rsvpContainer').hide();
          $('#rsvpSuccess').hide();
      };


  $("#password").submit(function(e) {
      e.preventDefault();
      var password = $('.password-text').val().toLowerCase().match(/\b(\w+)\b/g).join('');

      // set cookies to expire in 14 days
      if (password == match) {
          Cookies.set('remember', true, { expires: 365 });

          $('.jumbotron-registry').show();
          $('#rsvpContainer').show();
          $('#directions').show();
          $('#passwordRow').hide();
          $('#invalidCode').hide();
          $('.jumbotron-main').css({'background-image':'url("../assets/images/ah_3.jpg")'});
      } else {
          $('#password').addClass('has-error');
          $('#invalidCode').show();
      };
});
});

  // Countdown Timer for RSVP

  // Set the date we're counting down to
  var countDownDate = new Date("Dec 2, 2018").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(parseFloat(distance / (1000 * 60 * 60 * 24)));
    var hours = Math.floor(parseFloat((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    var minutes = Math.floor(parseFloat((distance % (1000 * 60 * 60)) / (1000 * 60)));
    var seconds = Math.floor(parseFloat((distance % (1000 * 60)) / 1000));

    // Display the result in the element with id="demo"
    if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      document.getElementById("timer").innerHTML = "December 1st, 2018";
    } else {
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    };

    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      $('#rsvpContainer').hide();
      document.getElementById("timer").innerHTML = "EXPIRED";
    };
  }, 1000);

  function isiPhone(){
  return (
      (navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPod") != -1)
  );
  };
  if(isiPhone()){
     document.getElementById('ceremony-address').innerHTML =
      '<a href="http://maps.apple.com/?q=33.5519552,-117.13690759999997">' +
      '39022 Sky Canyon Dr. <br>' +
      'Murrieta, CA 92563' +
      '</a>';

     document.getElementById('reception-address').innerHTML =
      '<a href="http://maps.apple.com/?q=33.5798199,-116.99487679999999">' +
      '37635 Remuda Dr. <br>' +
      'Temecula, CA 92592' +
      '</a>';
  } else {
     document.getElementById('ceremony-address').innerHTML =
      '<a href="https://www.google.com/maps/place/39022+Sky+Canyon+Dr,+Murrieta,+CA+92563">' +
      '39022 Sky Canyon Dr. <br>' +
      'Murrieta, CA 92563' +
      '</a>';

     document.getElementById('reception-address').innerHTML =
      '<a href="https://www.google.com/maps/place/37635+Remuda+Dr,+Temecula,+CA+92592">' +
      '37635 Remuda Dr. <br>' +
      'Temecula, CA 92592' +
      '</a>';

  };

  // Google Maps Start
  function initMap() {
    // Reception
    var reception = {lat: 33.5798199, lng: -116.99487679999999};
    var mapReception = new google.maps.Map(
        document.getElementById('mapReception'), {zoom: 13, center: reception});
    var marker = new google.maps.Marker({position: reception, map: mapReception});

    // Ceremony
    var ceremony = {lat: 33.5519552, lng: -117.13690759999997};
    var mapCeremony = new google.maps.Map(
        document.getElementById('mapCeremony'), {zoom: 15, center: ceremony});
    var marker = new google.maps.Marker({position: ceremony, map: mapCeremony}); 
  };
  // Google Maps END