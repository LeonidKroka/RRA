var image = ["url('/assets/title.png') no-repeat", "url('/assets/title2.png') no-repeat"];
var i=true;
var timerId = setInterval(function() {
  if (i == true) {
    $(".root-content").css("background", image[1]);
    $(".root-content").css("background-size", "100%");
    $(".root-content").css("width", "300px");
    i = false;
  }
  else {
    $(".root-content").css("background", image[0]);
    $(".root-content").css("background-size", "100%");
    $(".root-content").css("width", "200px");
    i = true;
  }
}, 5000);
