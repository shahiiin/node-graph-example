const hash = require("argon2")

const hashPassword = async (password) => {
    return await hash.hash(password);
};

module.exports = hashPassword