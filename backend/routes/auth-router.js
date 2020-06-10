const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")
require('dotenv').config()
const router = express.Router()

const {
  AUTH_SECRET,
} = process.env

//When this route is called, passport authenticates with middleware in ../controllers/auth-ctrl.js
//Set session to true if you want persistant login after signup **Untested**
router.post('/signup', async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  // Checks validation. If invalid returns the validation messages found in ../validation/register.js
  if(!isValid) return res.json({errors: errors})
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if(err || !user) return res.json({errors: err})
      req.login(user, { session : false }, async (err) => {
        if(err) return next(err)
        //Here we define the information we want to store in the token
        //Later on we may want to store things such as a refresh token here
        const body = { _id : user._id, email : user.email }
        //Here we sign the token and populate the payload with our body defined above
        //
        //***IMPORTANT*** 
        //
        //We should replace top_secret with a secret value used to sign
        //our tokens in an env variable
        const token = jwt.sign({ user : body },AUTH_SECRET)
        
        //Return the token to the user in a response
        return res.json({ token })
        })
       
    }
    catch(error){ return res.json({ error: 'Issue with passport authentication during signup. Check passport imports.' }) }
  })(req, res, next)
})


router.post('/login', async (req, res, next) => {
  
  const { errors, isValid } = validateLoginInput(req.body)
  // Check validation. If invalid returns the validation messages found in ../validation/register.js
  if(!isValid) return res.json({errors: errors})
  
  //When this route is called, passport authenticates with middleware in ../controllers/auth-ctrl.js
  //Also has an async call to with the values returned from ../controllers/auth-ctrl.js (err, user, info)
  passport.authenticate('login', async (err, user, info) => {  
    try {
      if(err || !user) return res.json({errors: err})
      //If error or user not found returns the message defined in ../controllers/auth-ctrl.js as a response
      //if(err || !user) return res.json(info)
      //Set session to true if you want persistant login
      req.login(user, { session : false }, async (error) => {
        if(error) return next(error)

        if(!user) return res.json({error: 'Incorrect login, try again'})
        //Here we define the information we want to store in the token
        //Later on we may want to store things such as a refresh token here
        const body = { _id : user._id, email : user.email }
        //Here we sign the token and populate the payload with our body defined above
        //
        //***IMPORTANT*** 
        //
        //We should replace top_secret with a secret value used to sign
        //our tokens in an env variable
        const token = jwt.sign({ user : body },AUTH_SECRET)
        //Return the token to the user in a response
        return res.json({ token })
      })    
    } 
    catch(error) { return res.json({ error: 'Issue with passport authentication during login. Check passport imports.' }) }
    })(req, res, next)
  })
  
  module.exports = router