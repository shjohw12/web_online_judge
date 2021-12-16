$(document).ready(function() {

  // If the user is not logged in, access is not possible.
  if (localStorage.getItem("current_user") == null) {
    $("body").hide();
    $("body").after("<p>You do not have permission to access this page. Please log in first.</p>");
  }

  $("#logout_button").click(function() {
    localStorage.removeItem("current_user");
    location.href = "login.html";
  });


  $("#problems").click(function() {
    location.href = "problems.html";
  });

  $("#ranking").click(function() {
    location.href = "ranking.html";
  });




});
