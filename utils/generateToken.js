const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envConfig');

const generateToken = (user) => {
    const token = {
        id: user._id,
        email: user.email,
        phone: user.phone
    };

    const options = {
        expiresIn: '3d', // Token expiration time
    };

    return jwt.sign(token, JWT_SECRET, options);
};

module.exports = generateToken;
