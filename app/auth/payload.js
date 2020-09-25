const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
module.exports = async (token) => {
    const payload = jwt.verify(token.split(' ')[1], SECRET)
    return payload
}