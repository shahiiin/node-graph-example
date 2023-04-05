const verify = require("argon2")
const verifyPassword = async (hash, password) => {
    return await verify.verify(hash, password);
};
module.exports = verifyPassword