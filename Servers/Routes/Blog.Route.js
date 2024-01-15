const express = require('express');
const router = express.Router();
const {createBlog, getBlogData, getSingleBlog, updateBlog, deleteBlog} = require('../Controller/Blog.Controller');
const upload = require('../Middlewares/Multer.Middleware');
const validate = require('../Middlewares/Validate.Middleware');
const blogValidatorSchema = require('../Validators/Blog.Validator');

router.route('/createBlog').post([upload, validate(blogValidatorSchema)], createBlog);
router.route('/blogs').get(getBlogData);
router.route('/blogs/:id').get(getSingleBlog);
router.route('/blogs/edit/:id').put([upload, validate(blogValidatorSchema)], updateBlog);
router.route('/blogs/delete/:id').delete(deleteBlog);

module.exports = router;