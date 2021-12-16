$(document).ready(function() {


  // If the user is not logged in, access is not possible.
  if (localStorage.getItem("current_user") == null) {
    $("body").hide();
    $("body").after("<p>You do not have permission to access this page. Please log in first.</p>");
  }


  $(".problem").mouseover(function() {
      $(this).css({"background-color" : "green"})
  });

  $(".problem").mouseleave(function() {
      $(this).css({"background-color" : "white"})
  });

  $(".problem").click(function() {
    location.href = "problem_" + this.id + ".html";
  });

  $("#problems").click(function() {
    location.href = "problems.html";
  });

  $("#ranking").click(function() {
    location.href = "ranking.html";
  });


  $("#logout_button").click(function() {
    localStorage.removeItem("current_user");
    location.href = "login.html";
  });



});
