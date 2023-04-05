const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = verifyToken