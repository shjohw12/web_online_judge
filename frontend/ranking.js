$(document).ready(function() {

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


  let arr = [];

  // Sort and rank based on the number of problems solved.
  for (let i = 0; i < localStorage.length; i++) {
    let cur_id = localStorage.key(i);
    if (cur_id == "current_user") {
      continue;
    }

    let js = JSON.parse(localStorage.getItem(cur_id));
    let solved = js["solved"];
    let cur = [solved.length, cur_id];

    arr.push(cur);
  }

  // sort descending order
  arr.sort(function(a, b)  {
      return a[0] > b[0] ? -1 : (a[0] < b[0] ? 1 : 0);
  });

  for (let i=0; i<arr.length; i++) {
    let row = "";
    row += "<tr style='background-color: white" + ";'>";
    row += "<td>" + (i+1) + "</td>";
    row += "<td>" + arr[i][1] + "</td>";
    row += "<td>" + arr[i][0] + "</td>";
    row += "</tr>";

    $("#t1").append(row);
  }




});
