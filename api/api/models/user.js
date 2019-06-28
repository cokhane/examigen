const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname:{type:String, default:null},
  lastname:{type:String, default:null},
  email:{type:String, required:true},
  password:{type:String, required:true},
  age:{type:Number, default:null},
  company:{type:String, default:null},
  gender:{type:String, default:null},
})

module.exports = mongoose.model('User', userSchema)
