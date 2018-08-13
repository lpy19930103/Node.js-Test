var express = require('express');
var router = express.Router();
var sql = require('./sql');
/* GET users listing. */
router.get('/', function (req, res, next) {
    var querySql = 'SELECT\n' +
        'name,\n' +
        'age\n' +
        'FROM\n' +
        'user';
    var addSql = 'INSERT INTO user(name,age) VALUES(?,?)';
    var addParams = ['lipy', 26];
    res.send(`user = ${sql.add(addSql, addParams)}`);
});

module.exports = router;
