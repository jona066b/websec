// Load modules
var express = require('express');
var app = express();
var chalk = require('chalk');

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

// Load default page (index)
app.get('/', (req, res) => {
 
    return res.sendFile(__dirname + '/test/index.html');

});

// UNIX socket awaiting connections on given port
app.listen(8080, err => {
    if(err) {
        gLog('err', 'Cannot use that port');
        return false;
    }
    gLog('ok', 'Server is listening to port 8080');
});