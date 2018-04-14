/************************Packages***********************/
var express = require("express");
var router = express.Router();
/*******************************************************/

/************************Modules************************/
var dbController = require("../database/databasecontroller.js");
var account = require(__dirname + "/account.js");
/******************************************************/

/************************APIS*************************/

// Find a specific order by orderNo
router.get("/:orderNo", function(req,res,next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if (jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Support"){
        var productNo = req.params.productNo;
        var sQuery = "select * from order WHERE orderNo = ?";

        dbController.query(sQuery, [productNo], (err, sjData) => {
            if(err){
                console.log(err);
                return res.send(JSON.stringify(err));
            }
            console.log(sjData);
            return res.send(sjData);
        });
    }
    else {
        res.status(401);
        res.send(JSON.stringify({response: "Unauthorized access!"}));
    }
});
module.exports = router;