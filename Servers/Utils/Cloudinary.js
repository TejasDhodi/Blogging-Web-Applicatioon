const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadToCloudinary = async (localPath) => {
    try {
        // Check Localpath
        if (!localPath) {
            console.log('Local Path Missing');
            return null;
        }

        // To Upload Image on Cloudinary
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto'
        })

        console.log('Image Uploaded Successfully', response.url);
        return response;
    } catch (error) {
        console.log('Error while uploading Image', error);
        fs.unlinkSync(localPath);
        return null;
    }
};

module.exports = uploadToCloudinary;