const dotenv = require('dotenv');
dotenv.config({ path: "./Config/Config.env" });

const express = require('express');
const app = express();
const Database = require('./Database/Blog.Database');
const cors = require('cors');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Router Importing
const registerRoute = require('./Routes/Register.Route');
const loginRoute = require('./Routes/Login.Route');
const blogRoute = require('./Routes/Blog.Route');

// Route Declaration
app.use('/api/v1', registerRoute);
app.use('/api/v1', loginRoute);
app.use('/api/v1', blogRoute);

Database().then(
    app.listen(process.env.PORT, () => {
        console.log('Jay Shree Ram');
    })
);