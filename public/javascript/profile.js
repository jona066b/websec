// Wait for the DOM to be ready
$(function() {
    $.get( '/user' , function( data ){
    }).done(function( data ) {
        // TO DO ON DONE
        console.log("data: ", data);
        console.log("Success");
        showUser(data);
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

function showUser(data) {
    var jdata = $.parseJSON(data);
    var htmlUserSection = "";
    var htmlUser="";
    $("#lblProfileSection").html("");

    htmlUser =   '<div class="row">\
                                <div class="col-sm">\
                                    <img src="../public/images/uploads/'+jdata[0].image+'" width="250" height="250" alt="avatar">\
                                </div>\
                                <div class="col-sm">\
                                    <div class="name">\
                                        <div class="font-weight-bold"><i class="fa fa-user"></i>Name</div>\
                                        <div>'+jdata[0].name+'</div>\
                                    </div>\
                                    <div class="address">\
                                        <div class="font-weight-bold"><i class="fa fa-map-marker"></i>Address</div>\
                                        <div>'+jdata[0].address+'</div>\
                                    </div>\
                                    <div class="phone">\
                                        <div class="font-weight-bold"><i class="fa fa-phone"></i>Phone</div>\
                                        <div>'+jdata[0].phone+'</div>\
                                    </div>\
                                    <div class="email">\
                                        <div class="font-weight-bold"><i class="fa fa-at"></i>Email</div>\
                                        <div>'+jdata[0].email+'</div>\
                                    </div>\
                                    <div class="user-name">\
                                        <div class="font-weight-bold"><i class="fa fa-user"></i>User name</div>\
                                        <div>'+jdata[0].name+'</div>\
                                    </div>\
                                </div>\
                            </div>';
    htmlUserSection = htmlUser;
    $("#lblProfileSection").html(htmlUserSection);

}

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