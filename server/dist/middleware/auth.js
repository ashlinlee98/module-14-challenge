import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret) {
        return res.status(500).send("Internal Server Error: JWT secret is not defined.");
    }
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        if (user && typeof user === 'object' && 'username' in user) {
            req.user = user;
            return next();
        }
        else {
            return res.sendStatus(403); // Forbidden
        }
    });
    return;
};
