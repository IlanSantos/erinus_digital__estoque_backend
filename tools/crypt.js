const bcrypt = require("bcrypt")

const HashEncryptGenerator = async data => {
    const hash = await bcrypt.hash(data, 14)
    return hash
}
const HashVerify = (password, hash_encrypted) => {
    return bcrypt.compare(password, hash_encrypted)
}


module.exports = {
    HashEncryptGenerator,
    HashVerify
}