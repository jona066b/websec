/************************Packages***********************/
var express = require("express");
var router = express.Router();
/*******************************************************/

/************************Modules************************/
var dbController = require("../database/databasecontroller.js");
var account = require(__dirname + "/account.js");
/******************************************************/

router.get("/", function(req, res, next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if(jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Admin"){
        var sQuery = "select userNo, name, address, phone, email, userName, image from user as u join role as r on u.roleNo = r.roleNo where r.roleName = ?";
        var roleName = "Support";
    
        dbController.query(sQuery, [roleName], (err, sjData) => {
            if(err){
                console.log(err);
                res.send(err);
            }
            res.send(sjData);
            console.log(sjData);
        });
    } else {
        res.status(401);
        res.send(JSON.stringify({response: "Unauthorized access!"}));
    }
});

router.put("/:userNo",function(req, res, next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if(jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Admin"){
        var userNo = req.params.userNo;
        var roleName = req.body.roleName;
        var sp = "call UpdateRoles (?, ?);"
        dbController.query(sp, [userNo, roleName], (err, sjData) => {
            if(err){
                console.log(err);
                return res.send(JSON.stringify(err));
            }
            console.log(sjData);
            return res.send(sjData);
        });
    } else {
        res.status(401);
        res.send(JSON.stringify({response: "Unauthorized access!"}));
    }

});

module.exports = router;