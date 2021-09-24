


$("#email").on('input', function () {
    var email_field = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,20})?$/;
  
    if (this.value.length < 0) {
      email_err.html("email should not be blank")
      $(this).css({ borderColor: "red" })
      email_val = false;
  
    }
    else if (this.value.charAt(0) == " ") {
      $("#email_err").html("Email should not start with space")
      $(this).css({ borderColor: "red" })
      name_val = false;
    }
  
    else if (this.value.includes("  ")) {
      $("#email_err").text("Email should not have more 2 spaces ")
      $(this).css({ borderColor: "red" })
      name_val = false;
  
    }
  
    else if (!email_field.test(this.value)) {
      $("#email_err").html("invalid format")
      $(this).css({ borderColor: "red" })
      email_val = false;
  
    }
    else {
      $("#email_err").html("")
      $(this).css({ borderColor: "green" })
      email_val = true
    }
  
  })
  
