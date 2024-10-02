const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs'); // تأكد من استخدام bcryptjs بدلاً من bcrypt

const userSchema = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true, unique: true },
    role:String
});

// دالة لمقارنة كلمات المرور
userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// تصدير النموذج
module.exports = mongoose.model('User', userSchema);
