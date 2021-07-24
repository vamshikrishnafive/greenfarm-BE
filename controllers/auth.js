const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const bcrypt = require("bcrypt");

const { JWT_SECRET } = require("../constants")
const { errorHandler } = require("../helpers/dbErrorHandler");

class Authentication {
    /*singup menthod: Find the user based on the email in, if the user found we log User already exist else we save the user details mean while we are hashing the password
    */
    static async signup(req, res) {
        const { name, email, password, role } = req.body
        try {
            const user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exist" })
            const hashed_password = await bcrypt.hash(password, 12)
            const result = await User.create({ name, email, password: hashed_password, role})
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
            if (!user) {
                res.status(400).json({ error: "User with that email does not exist. Please signup" })
            }
            const correctPassword  = await  bcrypt.compare(password, user.password)
            if (!correctPassword) {
                return res.status(401).json({ error: "Email and password dont match" });
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            res.cookie("t", token, { expire: new Date() + 9999 });
            return res.status(200).json({ token, user});
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
