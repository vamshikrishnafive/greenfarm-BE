const expressJwt = require("express-jwt"); // for authorization check
const { JWT_SECRET } = require("../constants");

exports.requireSignin = expressJwt({
    secret: JWT_SECRET,
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};
exports.isFarmer = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Please subscribe to greenfarm as Farmer",
        });
    }
    next();
};
