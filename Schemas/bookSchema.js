const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
   name : String,
   author : String,
   price : Number,
description : String
});



// تصدير النموذج
module.exports = mongoose.model('Books', bookSchema);
