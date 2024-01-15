const express = require('express');
const router = express.Router();

const registerController = require('../Controller/Register.Controller');
const registerValidatorSchema = require('../Validators/Register.Validator');
const validate = require('../Middlewares/Validate.Middleware');

router.route('/register').post(validate(registerValidatorSchema), registerController);

module.exports = router;