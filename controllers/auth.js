const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const { errorHandler } = require("../helpers/dbErrorHandler");

class Authentication {
    static async signup(req, res) {
        const user = new User(req.body);
        try {
            await user.save((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                user.salt = undefined;   //setting the salt and password to undefined as they both 
                user.hashed_password = undefined; //are managed via modelss methods
                res.json({ user });
            });
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    };
    static async signin(req, res) {
        // find the user based on email
        const { email, password } = req.body;
        try {
            await User.findOne({ email }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({ error: "User with that email does not exist. Please signup" });
                }
                // if user is found make sure the email and password match
                // create authenticate method in user model
                if (!user.authenticate(password)) {
                    return res.status(401).json({
                        error: "Email and password dont match"
                    });
                }
                // generate a signed token with user id and secret
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                // persist the token as 't' in cookie with expiry date
                res.cookie("t", token, { expire: new Date() + 9999 });
                // return response with user and token to frontend client
                const { _id, name, email, role } = user;
                return res.json({ token, user: { _id, email, name, role } });
            });
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    };
    static signout(req, res) {
        res.clearCookie("t");
        res.json({ message: "Signout success" });
    };
}

module.exports = Authentication;
