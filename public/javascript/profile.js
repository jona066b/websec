function hideElements() {
    $('#login-err-msg').text('');
    $('#modalLoginForm').modal("toggle");
    $('#profile-link').removeClass('d-none');
    $( "#btn-logIn").addClass('d-none');
    $( "#btn-logOut").removeClass('d-none');
    $( "#btn-register").addClass('d-none');
}
hideElements();
$("#btn-logOut").click(function () {
    $.get( '/user/logout' , function( data ){
    }).done(function() {
        // TO DO ON DONE
        console.log("Success");
        window.location.href = window.location.origin + '/'
    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        console.log("error", data.status);
        //This shows status message eg. Forbidden
        console.log("STATUS: "+xhr);

    }).always(function() {
        //TO-DO after fail/done request.
        console.log("ended");
    });
});