let fname_val = false;
let lname_val = false;
let email_val = false;
let number_val = false;


$("#fname").on('input', function () {
    this.value = this.value.replace(/[^a-zA-Z ]/, '')
  
  
    if (this.value.charAt(0) == " ") {
      $("#fname_err").html("Do not start with space")
      $(this).css({ borderColor: "red" })
      fname_val = false;
    }
  
    else if (this.value.length < 3) {
      $("#fname_err").text("Minimum  2 character")
      $(this).css({ borderColor: "red" })
      fname_val = false;
  
    }
  
  
  
  
    else if (this.value.length > 20) {
      $("#fname_err").text("User name should be max 20  character")
      $(this).css({ borderColor: "red" })
      fname_val = false;
  
    }
  
  
    else if (this.value.includes("  ")) {
      $("#fname_err").text("User name should not have more spaces ")
      $(this).css({ borderColor: "red" })
      fname_val = false;
  
    }
  
  
  
    else {
      $(this).css({ borderColor: "green" })
      $("#fname_err").html("")
      fname_val = true
    }
  })





$("#lname").on('input', function () {
  this.value = this.value.replace(/[^a-zA-Z ]/, '')


  if (this.value.charAt(0) == " ") {
    $("#lname_err").html("Do not start with space")
    $(this).css({ borderColor: "red" })
    lname_val = false;
  }

  else if (this.value.length < 1) {
    $("#lname_err").text("Minimum  2 character")
    $(this).css({ borderColor: "red" })
    lname_val = false;

  }




  else if (this.value.length > 20) {
    $("#lname_err").text("User name should be max 20  character")
    $(this).css({ borderColor: "red" })
    lname_val = false;

  }


  else if (this.value.includes("  ")) {
    $("#lname_err").text("User name should not have more spaces ")
    $(this).css({ borderColor: "red" })
    lname_val = false;

  }



  else {
    $(this).css({ borderColor: "green" })
    $("#lname_err").html("")
    lname_val = true
  }
}) 



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



$("#number").on('input', function () {
  this.value = this.value.replace(/[^0-9]/, '').replace(/(\..*)\./, '$1');;
  if (this.value.length != 10) {
    $("#number_err").html("Enter 10 number")
    $(this).css({ borderColor: "red" })
    number_val = false;

  }

  else {
    $("#number_err").html("")
    $(this).css({ borderColor: "green" })
    number_val = true;

  }


})



$("#submit-form").submit((e) => {
  e.preventDefault()
  console.log(fname_val);
  console.log(email_val);
  console.log(number_val);

  if (fname_val == true &&lname_val==true && email_val == true && number_val == true ) {




    
    $.ajax({
      url: "/signup",
      data: $("#submit-form").serialize(),
      method: "post",
      success: function (response) {
        console.log(response);
        if (response.status) {
          alert("Account created succesfully");
        location.replace('/login');
          
        }
        else{
          alert("User Exist")
        }
        
      },
      error: function (err) {
        alert("Something Error")

      }
    })
  }

  else {


    alert("Please input all fields correctly")


  }



})

