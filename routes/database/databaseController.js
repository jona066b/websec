const dbController = {};
const dbConnection = require(__dirname + "/databaseconnection.js");

dbController.query = (sQuery, params, fCallback) => {
    var jResult = {};
    global.gPool.getConnection(function(err, connection){
        if(err){
            jResult = JSON.stringify(err);
            process.exit();
            return fCallback(true, jResult);
        } else {
            if(params.length > 0){
                connection.query(sQuery, params, (err, jData) => {
                    if(err){
                        jResult = JSON.stringify(err);
                        connection.release();
                        return fCallback(true, jResult);
                    }
                    jResult = JSON.stringify(jData);
                    connection.release();
                    return fCallback(false, jResult); 
                });
            } else {
                connection.query(sQuery, (err, jData) => {
                    if(err){
                        jResult = JSON.stringify(err);
                        connection.release();
                        return fCallback(true, jResult);
                    }
                    jResult = JSON.stringify(jData);
                    connection.release();
                    return fCallback(false, jResult); 
                });
            }
        }      
    });
}
module.exports = dbController;