

$(document).ready(function() {

  // If the user is not logged in, access is not possible.
  if (localStorage.getItem("current_user") == null) {
    $("body").hide();
    $("body").after("<p>You do not have permission to access this page. Please log in first.</p>");
  }

  $(".info").hide();

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



  $("#submit").click(function() {

    // Users have to choose the language to submit.
    if ($("input[name='lang']:checked").val() == null) {
        alert("Please select the language.");
    }
    else {
      let lang = $("input[name='lang']:checked").val();

      let code = $("#code").val();

      // Code should not be empty.
      if (code == "") {
        alert("Please enter the source code.");
      }
      else {


        let problem_id = $("#problem_id").html();
        let time_limit = $("#time_limit").html();
        let memory_limit = $("#memory_limit").html();
        let test_case = $("#test_case").html();

        // Send the submission information to the server as json data.
        fetch("http://127.0.0.1:5000/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code : code,
            lang : lang,
            problem_id : problem_id,
            time_limit : time_limit,
            memory_limit : memory_limit,
            test_case : test_case
          }),
        }).then((response) => console.log(response));

        location.href = "result.html";

      }

    }

  });

});
