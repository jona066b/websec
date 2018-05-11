function checkSession() {
    var cookie = localStorage.getItem("cookie");
    console.log("cookie: ", cookie);
    if(cookie !== null){
        $('#profile-link').removeClass('d-none');
        $( "#btn-logIn").addClass('d-none');
        $( "#btn-logOut").removeClass('d-none');
        $( "#btn-register").addClass('d-none');
        return true;
    }
    return false;
}