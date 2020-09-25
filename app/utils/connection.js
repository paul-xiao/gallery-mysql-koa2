const mysql = require('mysql2');
const { DB_CONF } = require('../config')
// create the connection to database
const connection = mysql.createConnection(DB_CONF).promise();

module.exports = connection