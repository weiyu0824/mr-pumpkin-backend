function accessController (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.get('Access-Control-Request-Headers')) {
        res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
    }
    if (req.get('Access-Control-Request-Method')) {
        res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'));
    }
    next();
}
export default accessController