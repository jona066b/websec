// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("#frmRegister").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name:       "required",
            address:    "required",
            phone:      {
                required: false
            },
            email: {
                required: true,
                email: true
            },
            userName:   "required",
            password: {
                required: true,
                //minlength: 5
            },
            image: {
                required: false,
                //accept: "image/jpeg, image/png"
            }
        },
        // Specify validation error messages
        messages: {
            name: "Please enter your name",
            address: "Please enter your address",
            userName: "Please enter your user name",
            password: {
                required: "Please provide a password",
                //minlength: "Your password must be at least 5 characters long"
            },
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            // form.submit();
        }
    });
});

$("#btnRegister").click(function () {

    var form = $("#frmRegister");
    if(form.valid()){

        var oFrmUser = form.serialize();
        console.log(oFrmUser);

        $.post( '/user' , oFrmUser , function( data ){
        }).done(function() {
            // TO DO ON DONE
            console.log("Success");
            $('#register-err-msg').text('');
            $('#register-success-msg').removeClass('d-none');

        }).fail(function(data, textStatus, xhr) {
            //This shows status code eg. 403
            console.log("error", data.status);
            //This shows status message eg. Forbidden
            console.log("STATUS: "+xhr);

            var response = JSON.parse(data.responseText);
            $('#login-err-msg').text(response.response);

        }).always(function() {
            //TO-DO after fail/done request.
            console.log("ended");
        });
    }
});

$("#proceed-to-login").click(function () {

    $('#modalLoginForm').modal("toggle");
    $('#modalRegisterForm').modal("toggle");
    $('#register-success-msg').addClass('d-none');
});