const JWT = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.authToken;

    if (!token) {
        res.clearCookie("authToken");

        return res.status(401).json({ success: false, status: 401, message: "Invalid token, Unauthorized access!" });
    }

    // Verify auth token
    try {
        const verified = JWT.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (err) {
        res.clearCookie("authToken");

        return res.status(401).json({ success: false, status: 401, message: "Invalid token, Unauthorized access!" });
    }
};

module.exports = verifyJWT;
