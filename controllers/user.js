const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { signupValidation, loginValidation } = require("../libs/userValidation");

// User signup controller
// POST /api/v1/users/signup
// Public access
exports.createUser = async (req, res) => {
    // Destructure request body
    const { name, email, password } = req.body;

    // Validate credentials
    const { error } = signupValidation(req.body);

    if (error) {
        return res.status(400).json({ success: false, status: 400, message: error.details[0].message });
    }

    // Hash new users password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Add new user to database
    try {
        const user = await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({ success: true, status: 201, message: "User created" });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: "Server error", error: err });
    }
};

// User login controller
// POST /api/v1/users/login
// Public access
exports.loginUser = async (req, res) => {
    // Destructure request body
    const { email, password } = req.body;

    // Validate credentials
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ success: false, status: 400, message: error.details[0].message });
    }

    // Check if user exists
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, status: 400, message: "Invalid credentials" });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ success: false, status: 400, message: "Invalid credentials" });
        }

        // Create and sign JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set cookie
        res.cookie("auth-token", token, { httpOnly: true, maxAge: 3600000 });

        return res.status(200).json({ success: true, status: 200, message: `User ${user.name} has logged in!` });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: "Server error", error: err });
    }
};
