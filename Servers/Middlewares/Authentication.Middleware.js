const jwt = require('jsonwebtoken');
const userModel = require('../Model/Registration.Model');

const AuthenticationMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: "Unauthorize HTTP, token not provided"
        })
    }


    try {

        const jwtToken = token.replace(/bearer/i, "").trim();
        // console.log(jwtToken);
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const userData = await userModel.findOne({ _id: isVerified.userId }).select({
            password: 0,
            cpassword: 0
        });

        console.log("isver", userData);

        req.user = userData;
        req.token = token;
        req.userId = isVerified.userId;
        // console.log(`req.userId : ${req.userId }`);
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, Invalid Token"
        })
    }
}

module.exports = AuthenticationMiddleware;