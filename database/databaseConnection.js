const _mysql = require("mysql");
global.gPool = null;

const _pool = _mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'websec'
});

global.gPool = _pool;