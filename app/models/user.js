const connection = require('../utils/connection')
class User {
    static create(obj) {
        connection.query('INSERT INTO `user` (`name`, `phone`, `password`, `avatar`, `email`, `region`, `createdAt`) VALUES (?,?,?,?,?,?,?)', Object.values(obj), function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        })
    }
    static findAll() {
        connection.query('SELECT * FROM `user`', function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        })
    }
    static findByPk(id) {
        connection.query('SELECT * FROM `user` where id = ?', [id], function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
        })
    }
}

module.exports = User