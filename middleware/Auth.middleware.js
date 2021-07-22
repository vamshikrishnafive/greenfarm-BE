const expressJwt = require("express-jwt"); // for authorization check
const { JWT_SECRET } = require("../constants")

exports.requireSignin  = (req, res, next) => {
    if(expressJwt({
    secret: JWT_SECRET,
    userProperty: "auth"})) {
        next();
    }};
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};