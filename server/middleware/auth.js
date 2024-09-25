const jwt = require('jsonwebtoken');

function generateAccessToken(email) {
    return jwt.sign(email, process.env.JWT_SECRET_KEY);
}

function JWTAuthenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    })
};

module.exports = { generateAccessToken, JWTAuthenticationMiddleware }