const _mysql = require("mysql");
global.gPool = null;

const _pool = _mysql.createPool({
    host: 'localhost',
    // user: 'sola',
    // password: '951025',
    user: 'root',
    password: '',
    database: 'websec'
});

global.gPool = _pool;