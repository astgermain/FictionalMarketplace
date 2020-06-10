const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../models/user-model')
require('dotenv').config()

const {
  AUTH_SECRET,
} = process.env

//Passport middleware that handles signup
passport.use('signup', 
    new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    }, 
    async (req, email, password, done) => {
        try {
            const userCheck = await UserModel.findOne({ email })
            //Check to see if user is already present in DB
            if(userCheck != null){
                return done({email: 'Email already in user, please try another'}, null, null)
            }
            //Save the information provided by the user to the the database **Can slient error is issue with values passed in and schema**
            const user = await UserModel.create({ name: req.body.name, email: email, password: password })

            return done(false, user, { message : 'Successfully Signed Up'})
        } 
        catch(error) { return done({ main : 'Something is wrong'}, true, null) }
    }
    )
)

//Passport middleware that handles login
passport.use('login', 
    new localStrategy({
        usernameField : 'email',
        passwordField : 'password'
    },
    async (email, password, done) => {
        try {
            //Find the user associated with the email provided by the user
            const user = await UserModel.findOne({ email })
            //If the user isn't found in the database, return a message
            if(!user) return done({ email : 'User not found'}, true, null)
            //Validate password and make sure it matches with the corresponding hash stored in the database
            //If the passwords match, it returns a value of true.
            const validate = await user.isValidPassword(password)
            if(!validate) return done({ password : 'Invalid password'}, true, null)
            
            //Send the user information to the next middleware
            return done(false, user, { message : 'Logged in Successfully'})
        } 
        catch(error) { return done({ main : 'Fatal error'}, true, null); }
    }
    )
)

const JWTstrategy = require('passport-jwt').Strategy
//Extracts JWT sent by user
const ExtractJWT = require('passport-jwt').ExtractJwt

//Verify valid token
passport.use(
    new JWTstrategy({
        //Secret we used to sign our JWT. Needs to be assigned via env variable
        secretOrKey : AUTH_SECRET,
        //Take in token from user as query parameter secret_token
        jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
    }, 
    async (token, done) => {
        try {
            //Pass the user details to the next middleware
            return done(null, token.user)
        } 
        catch(error) { done(error) }
    }
    )
)
