const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const { errorHandler } = require("../helpers/dbErrorHandler");

class Authentication {
    /*singup menthod: Find the user based on the email in, if the user found we log User already exist else we save the user details while saving we setting the salt and password to undefined as they both are managed via database methods
    */
    static async signup(req, res) {
        const { name, email } = req.body
        try {
            const user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exist" })
            const salt = undefined;
            const hashed_password = undefined;
            const result = await User.create({ name, email, hashed_password, role, about })
            res.json({ result });
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    };
    /*singin menthod: Find the user based on the email in, if the user not found we log User with that email does not exist. Please signup then check for password comparison using bycryt, followed by generate a signed token with user id and secret and persist the token as 't' in cookie with expiry date finally return response with user and token to frontend client
    */
    static async signin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email })
            if (!user) {s
                res.status(400).json({ error: "User with that email does not exist. Please signup" })
            }
            if (!user.authenticate(password)) {
                return res.status(401).json({ error: "Email and password dont match" });
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.cookie("t", token, { expire: new Date() + 9999 });
            const { _id, name, email, role } = user;
            return res.status(200).json({ token, user: { _id, email, name, role } });
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
