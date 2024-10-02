const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        // الحصول على التوكن من الهيدر بصيغة Bearer
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        // إزالة 'Bearer ' من بداية التوكن
        const tokenWithoutBearer = token.replace('Bearer ', '');

        // التحقق من التوكن
        const verified = jwt.verify(tokenWithoutBearer, 'secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
