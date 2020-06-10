const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    lineAccountID: {
        type: String,
        required: false
    },
})

//Pre-hook - before saving password, hashs it and returns it to store
UserSchema.pre('save', async function(next){
    //'this' is the current document
    const user = this
    //Higher salt, more secure but slower **Salt is set to 10**
    const hash = await bcrypt.hash(user.password, 10)
    this.password = hash
    next()
})
  
  //Called in ../controllers/auth-ctrl.js
  UserSchema.methods.isValidPassword = async function(password){
    const user = this
    //Compares password with stored hashed password; returns a boolean
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }
  
  const UserModel = mongoose.model('user',UserSchema)
  
  module.exports = UserModel