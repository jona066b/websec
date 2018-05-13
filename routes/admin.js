/************************Packages***********************/
var express = require("express");
var router = express.Router();
/*******************************************************/

/************************Modules************************/
var dbController = require(__dirname+ "/database/databaseController.js");


/************************APIS************************/
router.get("/", function(req, res, next){
    console.log(req.session);
    if(req.session == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if(req.session  != null && req.session.isLoggedIn == true && req.session.isInRole == "Admin"){
        var sQuery = "SELECT userNo, name, address, phone, email, userName, image FROM user AS u JOIN role AS r ON u.roleNo = r.roleNo WHERE r.roleName = ?";
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
    if(req.session == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if(req.session != null && req.session.isLoggedIn == true && req.session.isInRole == "Admin"){
        var inputParams = [];
        inputParams.push(req.inputParamsaramsarams.userNo, req.body.roleName);
        var checkedParams = parameterChecker.check(req, inputParams);

        var userNo = checkedParams[0];
        var roleName = checkedParams[1];
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