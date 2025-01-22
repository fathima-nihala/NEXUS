const WebUser = require("../Model/webuserModel");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Middlewares/errorHandler");
const sendWebToken = require("../Utils/sendWebToken");

exports.webRegister = catchAsyncError(async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            contactNo,
            whatsappNo,
            email,
            state,
            referralCode,
            password,
            confirmPassword
        } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Check if user already exists
        const existingUser = await WebUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Create a new user
        const newUser = new WebUser({
            firstName,
            lastName,
            contactNo,
            whatsappNo,
            email,
            state,
            referralCode,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully.' });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return next(new ErrorHandler(messages.join(', '), 400));
        }
        next(error);
    }
});

//login
exports.webLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    const user = await WebUser.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    if (!user.isActive) {
        return next(new ErrorHandler('Your account is inactive', 401));
    }

    if (!(await user.isValidWebPassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendWebToken(user, 200, res);
});


//update
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
        delete updateData.password;
    }

    const user = await WebUser.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});

//get all
exports.getAllUsers = catchAsyncError(async (req, res) => {
    const users = await WebUser.find().select('-password');

    res.status(200).json({
        success: true,
        users
    });
});