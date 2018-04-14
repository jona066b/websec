/************************Packages***********************/
var express = require("express");
var router = express.Router();
/*******************************************************/

/************************Modules************************/
var dbController = require("../database/databasecontroller.js");
var account = require(__dirname + "/account.js");
/******************************************************/

/************************APIS*************************/
// Get all products
router.get("/", function(req, res, next){
    var sQuery = "select * from product";
    dbController.query(sQuery, (err, sjData) => {
        if(err){
            return res.send(err);
            console.log(err);
        }
        console.log(sjData);
        return res.send(sjData);
       
    });
});

// Create a product
router.post("/", function(req,res,next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    } 
    else if (jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Admin"){
        var productNo = null;
        var name = req.body.name;
        var quantity = req.body.quantity;
        var model = req.body.model;
        var brand = req.body.brand;
        var image = req.body.image;
        var color = req.body.color;
        var size = req.body.size;
        var type = req.body.type;
        var price = req.body.price;
        var description = req.body.description;
    
        var sp = "call AddUpdateProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        dbController.query(sp, [productNo, name, quantity, model, brand, image, color, 
        size, type, price, description], (err, sjData) => {
            if(err){
                console.log(err);
                res.send(err);
            } 
                console.log(sjData);
               res.send(sjData);
                
        });
    } 
    else {
        res.status(401);
        res.send(JSON.stringify({response: "Unauthorized access!"}));
    }
});

// Update a product
router.put("/:productNo",function(req,res,next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    } 
    else if (jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Admin"){
        var productNo = req.params.productNo;
        var name = req.body.name;
        var quantity = req.body.quantity;
        var model = req.body.model;
        var brand = req.body.brand;
        var image = req.body.image;
        var color = req.body.color;
        var size = req.body.size;
        var type = req.body.type;
        var price = req.body.price;
        var description = req.body.description;

        var sp = "call AddUpdateProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        dbController.query(sp, [productNo, name, quantity, model, brand, image, color, 
        size, type, price, description], (err, sjData) => {
            if(err){
                console.log(err);
                 res.send(err);
            } else {
                console.log(sjData);
                res.send(sjData); 
            }
                   
        });

    } else {
        res.status(401);
        res.send(JSON.stringify({response: "Unauthorized access!"}));
    }
    
   
});

// Delete a product
router.delete("/:productNo", function(req,res,next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    } 
    else if (jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Admin"){
        var productNo = req.params.productNo;
        var sQuery = "DELETE FROM product WHERE productNo = ?";
    
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

// Search for a specific product by product id
router.get("/:productNo", function(req,res,next){
    var jSession = JSON.parse(global.gSession);
    if(jSession == null){
        res.status(403);
        res.send(JSON.stringify({response: "You need to be logged in!"}));
    }
    else if (jSession != null && jSession.isLoggedIn == true && jSession.isInRole == "Admin"){
        var productNo = req.params.productNo;
        var sQuery = "select * from product WHERE productNo = ?";

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