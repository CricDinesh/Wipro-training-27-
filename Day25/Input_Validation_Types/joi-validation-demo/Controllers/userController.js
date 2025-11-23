exports.registerUser = (req, res) => {
    res.status(201).json({
        success: true,
        message: "User registered successfully using Joi validation",
        data: req.body
    });
};
