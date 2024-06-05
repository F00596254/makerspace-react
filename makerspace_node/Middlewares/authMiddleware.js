const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const authMiddleware = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists
    if (authHeader) {
        // Split the header value into two parts: the authentication scheme and the token
        const [scheme, token] = authHeader.split(' ');

        // Check if the authentication scheme is 'Bearer'
        if (scheme === 'Bearer') {
            try {
                // Verify the token and decode its payload
                const decoded = jwt.verify(token, secret);

                // Extract the email from the decoded payload
                const email = decoded;

                // Attach the email to the request object for further use
                req.email = email;

                // Call the next middleware or route handler
                next();
            } catch (error) {
                // Handle token verification errors
                res.status(401).json({ error: 'Invalid token' });
            }
        } else {
            // Handle unsupported authentication schemes
            res.status(401).json({ error: 'Unsupported authentication scheme' });
        }
    } else {
        // Handle missing authorization header
        res.status(401).json({ error: 'Authorization header missing' });
    }
};

module.exports = authMiddleware;