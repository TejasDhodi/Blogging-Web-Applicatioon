const user = require('../Model/Registration.Model');
const bcrypt = require('bcryptjs');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await user.findOne({ email });

        if (!userExists) {
            res.status(400).json({ message: "User Does not exists" })
        } else if (!email || !password) {
            res.status(400).json({ message: "All Fields Are Mandatory" })
        }

        const checkPassword = await bcrypt.compare(password, userExists.password);

        if (!checkPassword) {
            res.status(401).json({ message: "Invalid Credentials" })
        } else {
            return res.status(201).json({
                message: "Login SuccessFull",
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
                userName: userExists.userName.toString()
            })
        }

    } catch (error) {
        res.status(400).send({ "Error while handling login": error })
    }

}

// To Get The Data of Authorized User
const showprofile = async (req, res) => {
    try {
        const userData = req.user;
        const token = req.token;
        console.log("token : ", token);
        return res.status(200).json({
            verifiedUser: userData
        })
    } catch (error) {
        console.log(`error from showProfile route ${error}`);
    }
    // const {token} = req.headers;
    // await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, info) => {
    //     if(err) throw err;
    //     res.json(info)
    // })
}
module.exports = { loginController, showprofile };