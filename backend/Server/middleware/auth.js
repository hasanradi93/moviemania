const jwt = require("jsonwebtoken");

// status code 401 means unauthorized

const auth = (req, res, next) => {
    try {
        // checking x-auth-token with our jwt token
        const token = req.header("x-auth-token");
        if (!token) {
            return res
                .status(401)
                .json({ msg: "No authentication token, authorization denied." });
        }
        // Grabbing out jwt token, passing our Token_Secret and checking it cordinates with our user we have selected
        const verified = jwt.verify(token, process.env.Token_Secret);
        if (!verified) {
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });
        }
        req.user = verified.id;
        next();
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};


module.exports = auth;