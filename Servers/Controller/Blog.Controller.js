const uploadToCloudinary = require('../Utils/Cloudinary');
const blogModel = require('../Model/Blog.Model');

// Post Controller
const createBlog = async (req, res) => {
    try {
        const { title, summary, content, author, domain, category } = req.body;
        const image = req.files?.image[0]?.path;

        if (!title || !summary || !content || !image || !domain || !category) {
            return res.status(500).json({
                message: "All fields are Required"
            })
        }

        const imageUrl = await uploadToCloudinary(image);

        const blogData = await blogModel.create({
            title,
            summary,
            content,
            image: imageUrl.url,
            author,
            domain,
            category
        })

        res.status(201).json({ createdBlog: blogData });
        return blogData;

    } catch (error) {
        return res.status(400).json({
            message: `Unable to create blog :  ${error}`
        })
    }
}

// Get Controller
const getBlogData = async (req, res) => {
    const getData = await blogModel.find();
    res.status(200).json({
        foundBlog: getData
    })
}

// Get Single Post Info Controller
const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const singleBlog = await blogModel.findById(id);

        res.status(200).json({
            singleBlog: singleBlog
        })
    } catch (error) {
        res.status(400).json({
            message: `Unable to get single blog data : ${error}`
        })
    }
}

// Update Blog Controller 
const updateBlog = async (req, res) => {

    try {
        const { title, summary, content } = req.body;
        const image = req.files?.image[0]?.path;

        if (!title || !summary || !content || !image) {
            res.status(500).json({
                message: "All fields are Required"
            })
        }

        let imageUrl = req.body.image;

        if (image) {
            imageUrl = await uploadToCloudinary(image);

        }

        const updatedBlogData = await blogModel.findByIdAndUpdate(
            req.params.id, {
            title,
            summary,
            content,
            image: imageUrl.url
        }, {
            new: true
        }
        );

        if (!updatedBlogData) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ updatedBlogData });
    } catch (error) {
        console.error('Unable to update blog:', error);
        res.status(500).json({ message: 'Unable to Update the blog' });
    }

}

// Delete Blog
const deleteBlog = async (req, res) => {
    try {

        const { id } = req.params;
        const deletedBlog = await blogModel.findByIdAndDelete({ _id: id });
        res.status(200).json({ deletedBlog })

    } catch (error) {
        res.status(500).json("Unable to delete data")
    }
}
module.exports = { createBlog, getBlogData, getSingleBlog, updateBlog, deleteBlog };