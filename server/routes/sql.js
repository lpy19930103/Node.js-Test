const sql = require('mysql');
var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test'
});

connection.connect();


module.exports.query =
    function query(querySql) {
        return connection.query(querySql, (error, results, fields) => {
            if (error) throw error;
            return results[0];
        });
    };

module.exports.add = function add(addSql, addParams) {
    connection.query(addSql, addParams, (error, result) => {
        if (error) throw error;
        console.log('The solution is: ', result);
    });
    connection.end();
};

module.exports.update = function update(modSql, modSqlParams) {
    connection.query(modSql, modSqlParams, (err, res) => {
        if (err) throw  err;
        console.log(res);
    });
    connection.end();
};

module.exports.deleteSql = function deleteSql(delSql) {
    connection.query(delSql, (err, res) => {
        if (err) throw  err;
        console.log(res);
    });
    connection.end();
};
var querySql = 'SELECT\n' +
    'name,\n' +
    'age\n' +
    'FROM\n' +
    'user';

var addSql = 'INSERT INTO user(name,age) VALUES(?,?)';
var addParams = ['lipy', 26];

var modSql = 'UPDATE user SET name = ?,age = ? WHERE Id = ?';
var modSqlParams = ['lipy', 26, 3];

var delSql = 'DELETE FROM user where id=3';


