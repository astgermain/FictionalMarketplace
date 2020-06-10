const axios = require('axios')
const crypto = require('crypto')
const qs = require('querystring')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user-model')
require('dotenv').config()

axios.defaults.withCredentials = true

const response_type = 'code'
//This scope returns profile info and the display name/profile image url in token
const scope = "openid+profile"

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    NONCE_SECRET,
    RANDOM_STRING_SIZE
} = process.env


const randomString = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}


//Might need to confirm state returned matches
getLineAuthorizationCode = async (req, res, next) => {
    let random = randomString(Number(RANDOM_STRING_SIZE));
    let url = `https://access.line.me/oauth2/v2.1/authorize?response_type=${response_type}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${random}&scope=${scope}&nonce=${NONCE_SECRET}&prompt=consent`
    try{
        await axios.get(url)
                .then(data => {
                    let loginPath = data.request.path
                    res.status(200).json({message: "Request received!", loginURL: loginPath})
                })
                .catch(error => {
                    res.send(error)
                })
    }
    catch(err){
        console.error({err, message: 'Error with API call to LINE. Check for depreciation of API.'})
    }
}

getLineAccessToken = async (req, res, next) => {
    //console.log('Access token: ' + req.signedCookies.access_token.access_token)
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const requestBody = {
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }
    try{
        await axios.post(`https://api.line.me/oauth2/v2.1/token`, qs.stringify(requestBody), config)
        .then(async (data) => {
            let expiration = data.data.expires_in
            let token = data.data.id_token
            //id_token is a JWT just send this to client??
            //There would be two different verify secrets though, the CLIENT_SECRET and the AUTH_SECRET
            //Just make them the same?
            //Regardless I can just return this
            if(token != null){
                let decoded_id_token = jwt.verify(token, CLIENT_SECRET, {
                    audience: CLIENT_ID,
                    issuer: "https://access.line.me",
                    algorithms: ["HS256"]
                })
                //compare the userID **sub** with those userID's in database if matching accept login generate jwt and set as authenticated
                //else prompt to create a new user. Other option is to add a link ability in profile after having logged in to site **lazy ver**
                console.log(decoded_id_token)
                const lineAccountIDCheck = await UserModel.findOne({lineAccountID: decoded_id_token.sub})
                console.log(lineAccountIDCheck)
                if(lineAccountIDCheck){
                    //Create a user, hypothetically we would want to include 
                    //email but we need to request permission in the LINE Developer Console
                }else {
                    //Validate user and and create a return to frontend that generates the jwt to save in local storage
                    return res.json({token})
                }
            }
            else{
                console.log('No profile information')
            }
            let lineToken = {
                access_token: data.data.access_token,
                refresh_token: data.data.refresh_token,
                token_type: data.data.token_type
            }
            //******************************/
            //******************************/
            //
            // Cookie needs to be set to secure.
            //
            //******************************/
            /*******************************/
            res.cookie('access_token', lineToken, {
                maxAge: expiration * 1000,
                secure: true, //Set to true for HTTPS
                httpOnly: true,
                sameSite: 'none',
                signed: true
            })
            res.status(200).json({message: "Request success cookie should be somewhere!"})
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
    }
    catch(err){
        
        console.error({err, message: 'Error with API call to LINE. Check for depreciation of API.'})
    }
}

verifyLineAccessToken = async (req, res, next) => {

}



module.exports = {
    getLineAuthorizationCode,
    getLineAccessToken
}