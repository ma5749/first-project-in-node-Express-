const bookSchema = require('../Schemas/bookSchema');

exports.getAllBook = async function (req, res) {
    try {
        let books = await bookSchema.find();
        res.json({ message: "success", data: books });
    } catch (err) {
        res.status(400).json({ message: "Error", Error: err });
    }
};

exports.getOneBook = async function (req, res) {
    try {
        let book = await bookSchema.findById(req.params.id);
        res.status(200).json({ message: "success", data: book });
    } catch (err) {
        res.status(400).json({ message: "Error", Error: err });
    }
};

exports.createBook = async function (req, res) {
    try {
        // تحقق من وجود الدور للمستخدم
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        // السماح فقط للـ "admin" بإضافة كتاب جديد
        if (req.user.role === 'admin') {
            const book = await bookSchema.create(req.body);
            res.status(201).json({ message: "success", data: book });
        } else {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error", data: err.message });
    }
};

exports.updateBook = async function (req, res) {
    try {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        // السماح فقط للـ "admin" بإضافة كتاب جديد
        if (req.user.role === 'admin') {
            let book = await bookSchema.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "success", data: book });
        } else {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
        
    } catch (err) {
        res.status(400).json({ message: "Error", Error: err });
    }
};

exports.deleteBook = async function (req, res) {
    try {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        // السماح فقط للـ "admin" بإضافة كتاب جديد
        if (req.user.role === 'admin') {
            await bookSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "success", data: [] });
        } else {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
   
    } catch (err) {
        res.status(400).json({ message: "Error", Error: err });
    }
};
