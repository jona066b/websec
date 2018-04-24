/************************Packages***********************/
global.gSession = null;
var express = require("express");
var router = express.Router();

/*******************************************************/

/************************Modules************************/
var dbController = require("../database/databasecontroller.js");
var hasher = require("../helpers/hasher.js");
var user = require("../models/UserDTO.js");
var parameterChecker = require("../helpers/parameterChecker.js");
/******************************************************/

/************************APIS************************/
router.post("/", function(req, res, next){
    var optionalParams = [];
    optionalParams.push(req.body.name, req.body.address, req.body.phone,
        req.body.email,  req.body.userName, req.body.password, req.body.image);
    var checkedParams = parameterChecker.check(req, optionalParams);

    var userNo = null;
    var name = checkedParams[0];
    var address = checkedParams[1];
    var phone = checkedParams[2];
    var email = checkedParams[3];
    var userName = checkedParams[4];
    var password = checkedParams[5];
    var image = checkedParams[6];
    var roleName = 'Basic User';
    var hashResult = JSON.parse(hasher.hashPw(password));
    var pwSalt = hashResult.salt;
    var pwHashSalt = hashResult.data.pwHash;
    var sp = "call AddUpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    dbController.query(sp, [userNo, name, address, phone, email, userName,
        pwHashSalt, pwSalt, image, roleName], (err, sjData) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        var jData = JSON.parse(sjData);
        if(jData[1].length > 0){
            return res.send(sjData);
        } else {
            res.status(409);
            return res.send(JSON.stringify({response: 'Already Exists'}));
        }
    });
});

router.post("/login", function(req, res, next){
    var optionalParams = [];

    optionalParams.push(req.body.userName, req.body.password);
    var checkedParams = parameterChecker.check(req, optionalParams);

    var userName = checkedParams[0];
    var password = checkedParams[1];
    console.log(password);
    console.log(userName);
    var sQuery = "SELECT roleName, password, passwordSalt, userName FROM user AS u " +
        "JOIN role AS r ON u.roleNo = r.roleNo WHERE userName = ?";
    dbController.query(sQuery, [userName], (err, sjData) => {

        if(err){
            console.log(err);
            return res.send(err);
        }
        var jData = JSON.parse(sjData);
        var numRows = jData.length;
        console.log("jData.length: ", jData.length);
        if (numRows === 0) {
            res.status(401);
            return res.send(JSON.stringify({response: "User not found!"}));
        }else{
            dbSalt = jData[0].passwordSalt;
            dbHash = jData[0].password;
            var sResult = hasher.verifyPw(password, dbSalt, dbHash);
            var jResult = JSON.parse(sResult);
            if(jResult.status == false){
                res.status(403);
                return res.send(JSON.stringify({response: "Username or Password is incorrect!"}));

            } else {
                req.session.isLoggedIn = true;
                req.session.isInRole = jData[0].roleName;
                req.session.userName = jData[0].userName;
                console.log(req.session);
                return res.send(JSON.stringify({response: "Successfully logged in"}));
            }
        }

    });
});

router.get("/logout", function(req, res, next){
    req.session.destroy();
    return res.send(JSON.stringify({response: "Successfully logged out!"}));
});

router.put("/:userNo", function(req,res,next){
    if(req.session == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    if(req.session != null && req.session.isLoggedIn == true){
        var optionalParams = [];
        optionalParams.push(req.params.userNo, req.body.oldPassword, req.body.newPassword);
        var checkedParams = parameterChecker.check(req, optionalParams);

        var userNo = checkedParams[0];
        var oldPassword = checkedParams[1];
        var newPassword = checkedParams[2];

        var sQuery = "SELECT password, passwordSalt FROM user WHERE userNo = ?";
        dbController.query(sQuery, [userNo], (err, sjData) => {
            if(err){
                console.log(err);
                return res.send(err);
            }
            var jData = JSON.parse(sjData);
            console.log(jData);
            dbSalt = jData[0].passwordSalt;
            dbHash = jData[0].password;
            var sResult = hasher.verifyPw(oldPassword, dbSalt, dbHash);
            var jResult = JSON.parse(sResult);
            if(jResult.status == false){
                res.status(401);
                return res.send(JSON.stringify({response: "Username or Password is incorrect!"}));
            } else {
                var hashResult = JSON.parse(hasher.hashPw(newPassword));
                var pwSalt = hashResult.salt;
                var pwHashSalt = hashResult.data.pwHash;

                var sQuery = "UPDATE user SET password = ?, passwordSalt = ? WHERE userNo = ?";
                dbController.query(sQuery, [pwHashSalt, pwSalt, userNo], (err, sjData) => {
                    if(err){
                        console.log(err);
                        return res.send(err);
                    }
                    console.log(sjData);
                    return res.send(JSON.stringify({response: "Password successfully updated!"}));
                });
            }
        });
    }
});

// Access personal account
router.get("/", function(req,res,next){
    if(req.session == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    if(req.session != null && req.session.isLoggedIn == true){

        var userNo = jSession.userName;
        var sQuery = "SELECT userNo, name, address, phone, email, userName, image from user WHERE userName = ?";

        dbController.query(sQuery, [userNo], (err, sjData) => {
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