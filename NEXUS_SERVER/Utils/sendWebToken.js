const sendWebToken = (user, statusCode, res) => {
    const token = user.getJWTWebtoken();

    // Set expiration to 30 days
    const expiresIn = 30 * 24 * 60 * 60 * 1000; 
    const options = {
        expires: new Date(Date.now() + expiresIn),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
};

module.exports = sendWebToken;