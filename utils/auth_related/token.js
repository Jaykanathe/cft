require('dotenv').config()
const jwt = require('jsonwebtoken');
module.exports.generateToken = async function(userDeatiles){
    let payload = {
        ...userDeatiles
    };
    let option = {
        issuer:"cft.com",
        expireIn:'id'
    }
    let access_token = await jwt.sign(payload.process.env.ACCESS_TOKEN_SECRATE,option)
    return access_token

    }

