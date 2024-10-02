const userModel = require('../Schemas/userschema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async function (req, res) {
    try {
        // إنشاء مستخدم جديد باستخدام بيانات الطلب
        let newUser = new userModel(req.body);

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        newUser.password = hashedPassword;

        // حفظ المستخدم في قاعدة البيانات
        let createdUser = await newUser.save();

        // إرسال رد إيجابي للمستخدم
        res.status(201).json({ message: "User created", user: createdUser });
    } catch (err) {
        // إرسال رد بخطأ في حالة الفشل
        res.status(400).json({ message: "Error", data: err.message });
    }
};

exports.login = async function (req, res) {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        // تحقق مما إذا كان المستخدم موجودًا
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        // تحقق من كلمة المرور
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id, role: user.role }, "secret", { expiresIn: '1h' });
            return res.status(200).json({ message: "Login success", token, user: { name: user.name, email: user.email } });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error", data: err.message });
    }
};
