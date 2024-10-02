const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usersController'); // تأكد من أن اسم المجلد صحيح

// تعريف المسارات للـ register و login
router.post('/register', userController.register); // هنا لا تحتاج '/api/users' مرة أخرى
router.post('/login', userController.login); // نفس الشيء هنا

module.exports = router;

