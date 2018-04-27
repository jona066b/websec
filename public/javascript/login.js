// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("#frmLogin").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            userName: "required",
            password: {
                required: true,
                //minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
            userName: "Please enter your user name",
            password: {
                required: "Please provide a password",
                //minlength: "Your password must be at least 5 characters long"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            // form.submit();
        }
    });
});

$("#btnLogin").click(function () {
    var form = $("#frmLogin");
    if(form.valid()){
        var oFrmUser = form.serialize();
        $.post( '/user/login' , oFrmUser , function( data ){
        }).done(function() {
            // TO DO ON DONE
            toggleBtnsVisibility();
            window.location.replace("/profile");                   
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
function toggleBtnsVisibility() {

    $('#login-err-msg').text('');
    $('#modalLoginForm').modal("toggle");
    $('#profile-link').removeClass('d-none');
    $( "#btn-logIn").addClass('d-none');
    $( "#btn-logOut").removeClass('d-none');
    $( "#btn-register").addClass('d-none');

}