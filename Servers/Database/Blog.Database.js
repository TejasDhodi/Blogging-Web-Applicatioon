const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connection Established');
    } catch (error) {
        console.log('Unable to connect to Database', error);
    }
};

module.exports = connectToDatabase;;