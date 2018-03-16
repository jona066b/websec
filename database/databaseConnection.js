var mysql = require('mysql');

global.db = null;

 var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "",
    database: "security"
});

con.connect( err => {
    if(err){
        console.log('error', err);
        process.exit(); //destroy the process !important so you prevent further usage of the db
    }
    console.log("connected");
    global.db = con;
});
