const mongoose = require('mongoose');

const studentScheme = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    regDate:{
      type:Date,
      required:true,
      default:Date.now()
    }
});

module.exports = mongoose.model('student',studentScheme);