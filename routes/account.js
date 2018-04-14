/************************Packages***********************/
global.gSession = null;
var express = require("express");
var router = express.Router();

/*******************************************************/

/************************Modules************************/
var dbController = require("../database/databasecontroller.js");
var hasher = require("../helpers/hasher.js");
var user = require("../models/UserDTO.js");
/******************************************************/

/************************APIS************************/
router.post("/", function(req, res, next){
    var userNo = null;
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    var userName = req.body.userName;
    var password = req.body.password;
    var image = req.body.image;
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
               res.send(sjData);
            } else {
                res.status(409)
                res.send(JSON.stringify({response: 'Already Exists'}));
            }
    });
});

router.post("/login", function(req, res, next){
    var userName = req.body.userName;
    var password = req.body.password;
    var sQuery = "select roleName, password, passwordSalt, userName from user as u " + 
    "join role as r on u.roleNo = r.roleNo where userName = ?";
    dbController.query(sQuery, [userName], (err, sjData) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        var jData = JSON.parse(sjData);
        console.log(jData);
        dbSalt = jData[0].passwordSalt;
        dbHash = jData[0].password;
        var sResult = hasher.verifyPw(password, dbSalt, dbHash);
        var jResult = JSON.parse(sResult);
        if(jResult.status == false){
            res.status(403);
            res.send(JSON.stringify({response: "Username or Password is incorrect!"}));
        } else {
           
            var isLoggedIn = req.session.isLoggedIn = true;
            var isInRole = req.session.isInRole = jData[0].roleName;
            var userName = req.session.userName = jData[0].userName;
            req.session.save();
            var jUserSession = JSON.stringify({isLoggedIn: isLoggedIn, isInRole: isInRole, userName: userName});
            global.gSession = jUserSession;
            console.log(req.session);
            res.send(JSON.stringify({response: "Successfully logged in"}));
        }  
    });
}); 

router.get("/logout", function(req, res, next){
    var jSession = JSON.parse(global.gSession);
    if(jSession != null){
        jSession == null;
        res.send(JSON.stringify({response: "Successfully logged out!"}));
    }
});

router.put("/:userNo", function(req,res,next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    if(jSession != null && jSession.isLoggedIn == true){
        var userNo = req.params.userNo;
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;

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

    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if (jSession != null && jSession.isLoggedIn == true){
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