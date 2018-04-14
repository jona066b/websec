/***********************Packages***********************/
var express = require("express");
var bodyParser = require("body-parser");
var chalk = require("chalk");
var session = require('express-session');
var cookieParser = require("cookie-parser");

var app = express();
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
app.use(session({
  secret: 'KjdsijWERR45S',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

/***********************Modules***********************/
var accountRoute = require(__dirname + "/routes/account.js");
var productRoute = require(__dirname + "/routes/product.js");
var adminRoute = require(__dirname + "/routes/admin.js");
var adminRoute = require(__dirname + "/routes/order.js");
/****************************************************/

/***********************Routes***********************/
app.use("/user", accountRoute);
app.use("/product", productRoute);
app.use("/admin", adminRoute);
app.use("/order", adminRoute);
/****************************************************/



/***********************Server***********************/
// Global console log formatting
global.gLog = (status, message) => {

     switch(status) {
        case 'ok':
        console.log(chalk.green(message));
        break; 

        case 'err':
        console.log(chalk.red(message));
        break;

        case 'ex':
        console.log(chalk.magenta(message));
        break;

        case 'info':
        console.log(message);
        break;

    }
};
// UNIX socket awaiting connections on given port
app.listen(8080, err => {
    if(err) {
        gLog('err', 'Cannot use that port');
        return false;
    }
    gLog('ok', 'Server is listening to port 8080');
});
/****************************************************/