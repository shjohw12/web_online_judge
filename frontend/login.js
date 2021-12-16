



// The ID should contain English case letters and be 6-20 length English case letters and digits.
function email_check(email_input) {
  let re = /^[a-z]+[a-z0-9]{5,19}$/g;
  return re.test(email_input);
}



// The password should contain English case letters, digits and special characters and be 6-20 length.
function password_check(password_input) {
  if (password_input.length < 6 || password_input.length > 20) {
    return false;
  }

  let re = /[!@#$%\^&*(){}[\]<>?/|\-.:;_-]+/;

  if (re.test(password_input) == false) {
    return false;
  }

  re = /[0-9]+/;
  if (re.test(password_input) == false) {
    return false;
  }

  re = /[a-z]+/;
  if (re.test(password_input) == false) {
    return false;
  }

  re = /[A-Z]+/;
  if (re.test(password_input) == false) {
    return false;
  }

  return true;
}



$(document).ready(function() {

  $(".signup").hide();
  $(".signedup").hide();


  $("#signup_mode").click(function() {
    $(".login").hide();
    $(".signedup").hide();
    $(".signup").show();
    $("#main_box").css({"height" : "500px"});
    $("#login_bar").css({"background-color" : "#DEDEDE"});
    $("#login_mode").css({"background-color" : "#DEDEDE", "color" : "grey"});
    $("#signup_bar").css({"background-color" : "green"});
    $("#signup_mode").css({"background-color" : "white", "color" : "black"});
  });



  $("#login_mode").click(function() {
    $(".signup").hide();
    $(".signedup").hide();
    $(".login").show();
    $("#main_box").css({"height" : "400px"});
    $("#signup_bar").css({"background-color" : "#DEDEDE"});
    $("#signup_mode").css({"background-color" : "#DEDEDE", "color" : "grey"});
    $("#login_bar").css({"background-color" : "green"});
    $("#login_mode").css({"background-color" : "white", "color" : "black"});
  });



  $("#signup_button").click(function() {

    let email_input = $("#signup_email_input").val();

    let id_check = false, pw_check = false, confirm_check = false;

    if (email_check(email_input) == false) {
      $("#signup_email_input").css({"border-color" : "red"});
    }
    else {
      id_check = true;
      $("#signup_email_input").css({"border-color" : "green"});
    }

    let password_input = $("#signup_password_input").val();
    if (password_check(password_input) == false) {
      $("#signup_password_input").css({"border-color" : "red"});
    }
    else {
      pw_check = true;
      $("#signup_password_input").css({"border-color" : "green"});
    }


    if ($("#signup_confirm_password_input").val() != password_input) {
      $("#signup_confirm_password_input").css({"border-color" : "red"});
    }
    else {
      confirm_check = true;
      $("#signup_confirm_password_input").css({"border-color" : "green"});
    }


    if (id_check && pw_check && confirm_check) {
      if (localStorage.getItem(email_input) != null) {
        alert("This ID is being used.");
        $("#signup_email_input").css({"border-color" : "red"});
      }
      else {
        let js = {
          "password" : password_input,
          "solved" : []
        };

        localStorage.setItem(email_input, JSON.stringify(js));
        $(".signup").hide();
        $(".signedup").show();
        $("#main_box").css({"height" : "120px"});
      }
    }
    else {
      alert((id_check == false ? "The ID format is not correct. The ID should contain English case letters and be 6-20 length English case letters and digits.\n" : "\n") +
    (pw_check == false ? "The password format is not correct. The password should contain English case letters, digits and special characters and be 6-20 length.\n" : "\n") +
  (confirm_check == false ? "Confirm password is different from password." : ""));

    }
  });



  // Check to see if it matches the stored account information.
  $("#login_button").click(function() {

    let email = $("#email_input").val();

    if (localStorage.getItem(email) == null) {
      $("#p2").text("Credential do not match!");
      $("#p2").css({"color" : "red", "font-weight" : "bold"});
    }
    else {
      let val = JSON.parse(localStorage.getItem(email));
      let password = $("#password_input").val();

      if (val["password"] != password) {
        $("#p2").text("Credential do not match!");
        $("#p2").css({"color" : "red", "font-weight" : "bold"});
      }
      // If it matches, log in and enter the main page.
      else {
        localStorage.setItem("current_user", email);
        location.href = "main.html";
      }
    }





  });


});
