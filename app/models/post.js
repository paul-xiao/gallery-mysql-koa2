const connection = require('../utils/connection')
const { fields, where } = require('../utils/statement')
class Post {
    static create(obj) {
        const query = fields(obj)
        const sql = `INSERT INTO post SET ${query}`
        console.log(sql)
        return connection.query(sql)

    }
    static update(val, opt) {
        const query = fields(val)
        const filter = where(opt)
        const sql = `UPDATE post SET ${query}  WHERE ${filter}`
        console.log(sql)
        return connection.query(sql)

    }
    static findAll(opt) {
        const filter = where(opt)
        let sql = filter ? `SELECT * FROM post WHERE ${filter}` : `SELECT * FROM post`
        console.log(filter)
        console.log(sql)
        return connection.query(sql)
    }
    static findByPk(id) {
        const sql = `SELECT * FROM post WHERE id = ${id}`
        return connection.query(sql)
    }
    static removeByPK(id) {
        const sql = `DELETE FROM post WHERE id = ${id}`
        console.log(sql)
        return connection.query(sql)
    }
    static isLikeExists(obj) {
        const filter = where(obj)
        const sql = `SELECT status FROM user_post_like_relation WHERE ${filter}`
        console.log(sql)
        return connection.query(sql)
    }
    static addLike(obj) {
        const query = fields(obj)
        const sql = `INSERT INTO user_post_like_relation SET ${query}`
        console.log(sql)
        return connection.query(sql)
    }
    static updateLike(val, opt) {
        const query = fields(val)
        const filter = where(opt)
        const sql = `UPDATE user_post_like_relation SET ${query} WHERE ${filter}`
        console.log(sql)
        return connection.query(sql)
    }
    static findAllWithLikes() {
        let sql = `SELECT a.*, b.post_id, COUNT(status) as likes FROM post a LEFT JOIN user_post_like_relation b ON a.id = b.post_id AND b.status = 1 GROUP BY a.id`
        console.log(sql)
        return connection.query(sql)
    }
}

module.exports = Post