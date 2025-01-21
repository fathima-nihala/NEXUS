const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const router = require('./Router/router');
const globalErrorMiddleware = require('./Middlewares/globalError');


require('dotenv').config();

const dotenvConfig = dotenv.config({
    path: path.resolve(__dirname, './config', '.env')
})

app.use('/upload', express.static(path.join(__dirname, 'upload')));


if (dotenvConfig.error) {
    console.log('Error Loading .env file', dotenvConfig.error);
}

app.use(express.json());
app.use(cookieParser());
app.use(globalErrorMiddleware);

// app.use(cors());

app.use(cors({
    // origin: '*', 
    // origin: ['http://localhost:5173', 'http://127.0.0.1:5500'],  
    origin: ['https://admin.gamescorner.ae', 'https://gamescorner.ae'],  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,


    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 600,

}));

mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected successfully 😎 ");
    app.listen(process.env.PORT, () => {
        console.log(`Server connected at 🖥️ ${process.env.PORT}`);
    });
}).catch(error => {
    console.error('Database connection error:', error);
    process.exit(1);  // Exit the process if the connection fails
});

app.use('/api', router)

module.exports = app;