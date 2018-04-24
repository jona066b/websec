/***********************Packages***********************/
var express = require("express");
var bodyParser = require("body-parser");
var chalk = require("chalk");
var session = require('express-session');
var cookieParser = require("cookie-parser");
var expressSanitizer = require("express-sanitizer");
var fs = require("fs");
var https = require("https");

var app = express();
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
app.use(session({
  secret: 'KjdsijWERR45S',
  rolling: true,    
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000, httpOnly: true }
}));
app.use(cookieParser('KjdsijWERR45S'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/public", express.static("public"));
app.use(expressSanitizer());

/***********************Modules***********************/
var accountRoute = require(__dirname + "/routes/account.js");
var productRoute = require(__dirname + "/routes/product.js");
var adminRoute = require(__dirname + "/routes/admin.js");
var orderRoute = require(__dirname + "/routes/order.js");
const key = fs.readFileSync("../websec/certificate/WebShop.key", "utf8");
const cert = fs.readFileSync("../websec/certificate/WebShop.crt", "utf8");
const ca = fs.readFileSync("../websec/certificate/ca.crt", "utf8");

const options = {
    key: key,
    cert: cert,
    ca: ca
};
/****************************************************/

/***********************Views***********************/
app.get("/login", (req, res) => {
    fs.readFile(__dirname + "/views/login.html", "utf8", (ree, data) => {
        res.send(data);
    });
});
/****************************************************/

/***********************Routes***********************/
app.use("/user", accountRoute);
app.use("/product", productRoute);
app.use("/admin", adminRoute);
app.use("/order", orderRoute);
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

var httpsServer = https.createServer(options, app);
httpsServer.listen(8443, err => {
    if(err) {
        gLog('err', 'Cannot use that port');
        return false;
    }
    gLog('ok', 'Server is listening to port 8443');
});

/****************************************************/