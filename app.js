const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./Routers/users'); // تأكد من أن المسار صحيح
const bookRouter = require('./Routers/books');
const app = express();
app.use(bodyParser.json());

// إعداد الاتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://mag:0101mag0101@mag.iszga.mongodb.net/?retryWrites=true&w=majority&appName=mag";
const connectToDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit();
    }
};
connectToDB();

// استخدم الراوتر للمسارات المتعلقة بالمستخدمين
app.use('/api/users', usersRouter); // هنا تستخدم '/api/users' كجزء من المسار
app.use('/api', bookRouter);
// تشغيل السيرفر على المنفذ 9093
app.listen(9094, () => {
    console.log('Server is running on port 9094');
});
