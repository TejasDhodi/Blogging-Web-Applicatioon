const user = require('../Model/Registration.Model');
const registerController = async(req, res) => {
    try {
        const {userName, email, password, cpassword} = req.body;

        const emailExists = await user.findOne({email});

        if(!userName, !email, !password, !cpassword) {
            res.status(400).json({message: "All Fields are mandatory"})
        } else if(emailExists) {
            res.status(400).json({message: "Email Already In Use"})
        } else if(password !== cpassword) {
            res.status(400).json({message: "Both Password Needs to be same"})
        }

        const registerUser = await user.create({
            userName,
            email,
            password,
            cpassword
        })
        res.status(201).json({message: "Success"})
        console.log(registerUser);
    } catch (error) {
        console.log(error);
    }
}

module.exports = registerController;