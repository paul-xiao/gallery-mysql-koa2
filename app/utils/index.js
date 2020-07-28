const bcrypt = require('bcrypt')
const saltRounds = 10
exports.getEncryptedPwd = async (pwd) => {
  return await bcrypt.hash(pwd, saltRounds)
}
exports.checkPwd = async (pwd, hash) => {
  return await bcrypt.compare(pwd, hash)
}
