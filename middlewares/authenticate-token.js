import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        res.send(401).json({
            "message": "invalid token"
        })
    } 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        req.username = user;
        next();
    });
}