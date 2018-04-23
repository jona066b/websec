btnLogin.addEventListener("click", function(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() 
    {
      if (this.readyState == 4 && this.status == 200) 
      {
           console.log(this.responseText);
        }
     }			
    ajax.open( "POST", "localhost:8080/user/login" , true );
    var jFrmLogin = new FormData( frmLogin );
    ajax.send( jFrmLogin );		
      
  });