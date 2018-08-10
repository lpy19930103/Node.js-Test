const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test'
});
connection.connect();

var querySql = 'SELECT\n' +
    'name,\n' +
    'age\n' +
    'FROM\n' +
    'user';
/*connection.query(querySql, (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0]);
});*/

var addSql = 'INSERT INTO user(name,age) VALUES(?,?)';
var addParams = ['lipy', 26];
/*connection.query(addSql, addParams, (error, result) => {
    if (error) throw error;
    console.log('The solution is: ', result);
});*/

var modSql = 'UPDATE user SET name = ?,age = ? WHERE Id = ?';
var modSqlParams = ['lipy', 26, 3];
/*connection.query(modSql, modSqlParams, (err, res) => {
    if (err) throw  err;
    console.log(res);
});*/



var delSql = 'DELETE FROM user where id=3';
connection.query(delSql, (err, res) => {
    if (err) throw  err;
    console.log(res);
});

connection.end();