const connection = require('../utils/connection')
const { fields, where } = require('../utils/statement')
class User {
    static create(obj) {
        const query = fields(obj)
        const sql = `INSERT INTO user SET ${query}`
        console.log(sql)
        return connection.query(sql)

    }
    static update(val, opt) {
        const query = fields(val)
        const filter = where(opt)
        const sql = `UPDATE user SET ${query}  WHERE ${filter}`
        console.log(sql)
        return connection.query(sql)

    }
    static findAll(opt) {
        const filter = where(opt)
        let sql = filter ? `SELECT * FROM user WHERE ${filter}` : `SELECT * FROM user`
        console.log(filter)
        console.log(sql)
        return connection.query(sql)
    }
    static findByPk(id) {
        const sql = `SELECT * FROM user WHERE id = ${id}`
        return connection.query(sql)
    }
    static removeByPK(id) {
        const sql = `DELETE FROM user WHERE id = ${id}`
        console.log(sql)
        return connection.query(sql)
    }
}

module.exports = User