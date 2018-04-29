var url = window.location.href;
var productId = url.substring(url.lastIndexOf('/') + 1);

// Wait for the DOM to be ready
$(function() {
    //get product
    $.get( '/product/' + productId , function( data ){
        
    }).done(function( data ) {
        // TO DO ON DONE
        
        console.log("Success");
        showProduct(data);
    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        console.log("error", data.status);
        //This shows status message eg. Forbidden
        console.log("STATUS: "+xhr);

    }).always(function() {
        //TO-DO after fail/done request.
        
        console.log("ended");
    });

    //get product comments
    $.get( '/product/' + productId + "/comments" , function( data ){

    }).done(function( data ) {
        // TO DO ON DONE
        console.log("Success");
        showComments(data);
      
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

function checkSession() {
    var cookie = localStorage.getItem("cookie");
    if(cookie !== null){
        $('#profile-link').removeClass('d-none');
        $( "#btn-logIn").addClass('d-none');
        $( "#btn-logOut").removeClass('d-none');
        $( "#btn-register").addClass('d-none');
        return true;
    } 
    return false;
}

function showComments(data){
    var jData = JSON.parse(data);
    var htmlComments = "";
    var htmlComment = "";
    var loggedUserComment = "";
    $("#comments").html("");
    var sessionCheck = checkSession();
    if(sessionCheck == true){
        loggedUserComment = '<div class="comment-wrap">\
                        <div class="photo">\
                            <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif")"></div>\
                        </div>\
                        <div class="comment-block">\
                            <form id="frmComment">\
                                <textarea name="" id="txtComment" cols="30" rows="3" placeholder="Add new comment.."></textarea>\
                                <button id="btnSubmit" class="btn btn-gold my-2 my-sm-0 text-uppercase" type="button">Submit</button>\
                            </form>\
                        </div>\
                    </div>';
    } else {
        loggedUserComment = '<div class="comment-wrap">\
                                <div class="photo">\
                                    <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif")"></div>\
                                </div>\
                                <div class="comment-block">\
                                    <form action="">\
                                        <textarea name="" id="" cols="30" rows="3" placeholder="You need to be logged in!" disabled></textarea>\
                                        <button id="btnSubmit" class="btn btn-gold my-2 my-sm-0 text-uppercase" disabled >Submit</button>\
                                    </form>\
                                </div>\
                            </div>';
        } 
    for (let i = 0; i < jData.length; i++) {
        var createTime = new Date(jData[i].commentCreateDateTime);
        var locale = "en-us";
        var minutes = createTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
         }
        var formatDate = createTime.toLocaleString(locale, {month: "long"}) + " " + createTime.getDate() + ", " 
        + createTime.getFullYear() + " @ " + createTime.getHours() + ":" + minutes;
        htmlComment =   '<div class="comment-wrap">\
                            <div class="photo">\
                                <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif")"></div>\
                            </div>\
                            <div class="comment-block">\
                                <p class="comment-text">' + jData[i].comment +'</p>\
                                <div class="bottom-comment">\
                                <div class="comment-date">' + formatDate +'</div>\
                                <ul class="comment-actions">\
                                    <li class="complain">By ' + jData[i].email + '</li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>';
        htmlComments += htmlComment;      
    }
    $("#comments").html(htmlComments);
    $("#comments").prepend(loggedUserComment);
    addComment();

}	

function addComment() {
    $("#btnSubmit").click(function() {
        var sCookie = localStorage.getItem("cookie");
        var jCookie = JSON.parse(sCookie);

        var txtComment = $("textarea#txtComment").val();
        var sjComment = {"comment":txtComment,"userNo": jCookie.userNo, "productNo": productId};
        console.log(sjComment);

        $.post( '/user/comment' , sjComment , function( data ){
        }).done(function(data) {
            // TO DO ON DONE
            console.log("Success");
            var jComment = JSON.parse(data);
            var createTime = new Date(jComment[0][0].commentCreateDateTime);
            var locale = "en-us";
            var minutes = createTime.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
                }
            var formatDate = createTime.toLocaleString(locale, {month: "long"}) + " " + createTime.getDate() + ", " 
            + createTime.getFullYear() + " @ " + createTime.getHours() + ":" + minutes;
            console.log(formatDate);
            var htmlComment =   '<div class="comment-wrap">\
                            <div class="photo">\
                                <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif")"></div>\
                            </div>\
                            <div class="comment-block">\
                                <p class="comment-text">' + jComment[0][0].comment +'</p>\
                                <div class="bottom-comment">\
                                <div class="comment-date">' + formatDate +'</div>\
                                <ul class="comment-actions">\
                                    <li class="complain">By ' + jComment[0][0].email + '</li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>';
        $("#comments").append(htmlComment);
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
    });
}

function showProduct(data) {
    var jData = JSON.parse(data);
    console.log(jData);
    var htmlShopProduct = "";
    $("#product-container").html("");
        htmlShopProduct =   '<div class="card" style="width: 30rem; height: 50rem;">\
                                <img class="card-img-top" src="http://via.placeholder.com/450x350" alt="Card image cap">\
                                     <div class="card-body">\
                                         <h5 class="card-title">' + jData[0].name +'</h5>\
                                         <p class="card-text">Color: ' + jData[0].color +'</p>\
                                         <p class="card-text">Model: ' + jData[0].model +'</p>\
                                         <p class="card-text">Prize: ' + jData[0].prize +' DKK</p>\
                                         <p class="card-text">Size: ' + jData[0].size +'</p>\
                                         <p class="card-text">Type: ' + jData[0].type +'</p>\
                                         <p class="card-text">Description: ' + jData[0].description +'</p>\
                                         <p class="card-text">Quantity: ' + jData[0].quantity +'</p>\
                                     </div>\
                             </div>';
    $("#product-container").html(htmlShopProduct);
}

checkSession();

