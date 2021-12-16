let info = {};

// Once the server has completed the evaluation, the evaluation data is received and the results are displayed on the web page.
let process = function() {

  $("#wait").hide();
  $("#bt").show();

  let problem_id = "Problem ID: " + info["problem_id"];

  let verdict = "";

  if (info["status"] == 0) {
    verdict = "Verdict: Accepted";
    let cur_id = localStorage.getItem("current_user");

    let js = JSON.parse(localStorage.getItem(cur_id));

    js["solved"].push(parseInt(info["problem_id"]));
    js["solved"] = Array.from(new Set(js["solved"]));
    localStorage.setItem(cur_id, JSON.stringify(js));
  }
  else if (info["status"] == 1) {
    verdict = "Verdict: Wrong answer on test " + info["tc"];
  }
  else if (info["status"] == 2) {
    verdict = "Verdict: Time limit exceeded on test " + info["tc"];
  }
  else if (info["status"] == 3) {
    verdict = "Verdict: Memory limit exceeded on test " + info["tc"];
  }
  else if (info["status"] == 4) {
    verdict = "Verdict:	Compilation error";
  }
  else if (info["status"] == 5) {
    verdict = "Verdict: Runtime error on test " + info["tc"];
  }

  let time_used = "Time: " + info["time_used"] + " ms";
  let memory_used = "Memory: " + info["memory_used"] + " KB";


  alert(problem_id + "\n" + verdict + "\n" + time_used + "\n" + memory_used + "\n");

}

// send a GET request until the server completes evaluation
let myfetch = function() {
  fetch("http://127.0.0.1:5000/get")
    .then((res) => res.json())
    .then((res) => {

      // send a GET request every second
      if (jQuery.isEmptyObject(res)) {
        setTimeout(() => myfetch(), 1000);
      }
      else {
        info = res;
        process();
      }

    });
}


$(document).ready(function() {
  $("#bt").hide();


  // If the user is not logged in, access is not possible.
  if (localStorage.getItem("current_user") == null) {
    $("body").hide();
    $("body").after("<p>You do not have permission to access this page. Please log in first.</p>");
  }

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

  $("#bt").click(function() {
    location.href = "main.html";
  });


  myfetch();

});
