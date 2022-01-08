import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(401).json({
            "message": "invalid token"
        })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                // add information to req
                req.username = decoded.username;
                next();
            }
        });
    }
}