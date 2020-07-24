const mysql = require('mysql')
const config = require('./config/db')
const connection = mysql.createConnection(config)
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + connection.threadId)
})
