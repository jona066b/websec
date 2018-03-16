
var databaseController = {};

controller.queryWithoutParams = ( sQuery, fCallback ) =>{
  global.db.query( sQuery, ( err, result )=>{
   if(err){
       console.log(err);
       return fCallback(true, err);
   } 
      return fCallback(false, result);
  });  
};

controller.queryWitParams = ( sQuery, params, fCallback ) =>{
    global.db.query( sQuery, params, ( err, result )=>{
        if(err){
            console.log(err);
            return fCallback(true, err);
        }
        return fCallback(false, result);
    });
};