const express = require('express');
const router = express.Router();

const {loginController, showprofile} = require('../Controller/Login.Controller');
const AuthenticationMiddleware = require('../Middlewares/Authentication.Middleware');
const loginValidatorSchema = require('../Validators/Login.Validator');
const validate = require('../Middlewares/Validate.Middleware');

router.route('/login').post(validate(loginValidatorSchema), loginController);
router.route('/login/profile').get(AuthenticationMiddleware, showprofile);
module.exports = router;