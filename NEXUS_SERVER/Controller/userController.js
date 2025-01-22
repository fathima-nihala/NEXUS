const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Middlewares/errorHandler");
const User = require('../Model/userModel');
const sendToken = require("../Utils/sendToken");

exports.register = catchAsyncError(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return next(new ErrorHandler(messages.join(', '), 400));
        }
        next(error);
    }
})

exports.Login = catchAsyncError(async (req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return next(new ErrorHandler('Please enter name and password', 400));
    }

    const user = await User.findOne({ name }).select('+password');

    if (!user || !(await user.isValidPassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
});