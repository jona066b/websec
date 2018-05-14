// Wait for the DOM to be ready
$(function() {
    $.get( '/user' , function( data ){
    }).done(function( data ) {
        // TO DO ON DONE
        //console.log("data: ", data);
        //console.log("Success");
        console.log(data)
        showUser(data);
    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        //console.log("error", data.status);
        //This shows status message eg. Forbidden
        //console.log("STATUS: "+xhr);
    }).always(function(data) {
        console.log(data);
        //TO-DO after fail/done request.
        //console.log("ended");
    });
});

function showUser(data) {
    var htmlUserSection = "";
    var htmlUser="";
    $("#lblProfileSection").html("");
    htmlUser =   '<div class="row">\
                                <div class="col-sm">\
                                    <img src="../public/images/uploads/'+data[0].image+'" width="250" height="250" alt="avatar">\
                                </div>\
                                <div class="col-sm">\
                                    <div class="name">\
                                        <div class="font-weight-bold"><i class="fa fa-user"></i>Name</div>\
                                        <div>'+data[0].name+'</div>\
                                    </div>\
                                    <div class="address">\
                                        <div class="font-weight-bold"><i class="fa fa-map-marker"></i>Address</div>\
                                        <div>'+data[0].address+'</div>\
                                    </div>\
                                    <div class="phone">\
                                        <div class="font-weight-bold"><i class="fa fa-phone"></i>Phone</div>\
                                        <div>'+data[0].phone+'</div>\
                                    </div>\
                                    <div class="email">\
                                        <div class="font-weight-bold"><i class="fa fa-at"></i>Email</div>\
                                        <div>'+data[0].email+'</div>\
                                    </div>\
                                    <div class="user-name">\
                                        <div class="font-weight-bold"><i class="fa fa-user"></i>User name</div>\
                                        <div>'+data[0].name+'</div>\
                                    </div>\
                                </div>\
                            </div>';
    htmlUserSection = htmlUser;
    $("#lblProfileSection").html(htmlUserSection);

}

$("#profile-link").click(function() {
    window.location.replace("/profile");  
});


checkSession();