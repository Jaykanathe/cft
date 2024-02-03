const e = require("express");
const userQueryHelper = require("../query_helper/userQuery");
const passwordHelper = require("../utils/auth_related/password");
const authenticateHelper = require("../utils/auth_related/token");

module.exports.registerUser = async(req,res)=>{
    try {
        let {firstName ,lastName,email,password} = req.body;

       let hashPassword = await passwordHelper.encodePassword(password);
       let userObject = {
        firstName,
        lastName,
        email,
        password
       }
       userData = await userQueryHelper.registerUser(userObject,req.transaction);
       if (userData != null) {
        return res.status(200).json({
            statuscode:200,
            status:"success",
            data:userData,
            successMessage:"user registered sucessfully"
        })
       }else{
        return res.status(400).json({
            statuscode:400,
            status:"error",
            errMessage:"something went wrong"
        })
       }
    } catch (error) {
        return res.status(500).json({
            statuscode:500,
            status:"error",
            errMessage:error
        });
    }
}

module.exports.login = async(req,res)=>{
    try{
        let email = req.body.email;
        let password = req.body.password;
        let searchObject = {
            email:email
        }
        let userData = await userQueryHelper.getUserDetailBykey(searchObject,transaction);
        if (userData != null) {
            let storedPassword = userData.password;
            let checkPassword = await passwordHelper.checkPassword(password,storedPassword);
            if(checkPassword){
                let tokenObject = {
                    email:userData.email,
                }
                let access_token = await authenticateHelper.generateToken(tokenObject);
                let userObject = {
                    access_token,
                }
                let userKey = {
                    email:email
                }
                let userDataupdate = await userQueryHelper.updateUserdata(userKey,userObject,transaction);
                if (userDataupdate) {
                    return res.status(200).json({
                        status:`success`,
                        message:`sucesssfully login....`,
                        statuscode:200,
                        data:userDataupdate
                    })
                } else {
                   return res.status(400).json({
                    status:`error`,
                    message:"something went wrong",
                    statuscode:400,
                    data:[]
                   }) 
                }
            }else{
                return res.status(400).json({
                    status:`error`,
                    message:"Password did not match",
                    statuscode:400,
                    data:[]
                })
            }

        
        }
    }catch{
        return res.status(500).json({
            statuscode:500,
            status:"error",
            errMessage:error
        });
    }
    }

module.exports.getAlluser = async(req,res)=>{
    try{
        let getalluser = await userQueryHelper.getAllUsers(req.transaction);
        if (getalluser.rowCount>0) {
            return res.status(200).json({
                status:`success`,
                message:`sucesssfully get All user....`,
                statuscode:200,
                data:getalluser
            }) 
        } else {
            return res.status(400).json({
                status:`error`,
                message:"something went wrong",
                statuscode:400,
                data:[]
               }) 
        }
    }catch{
        return res.status(500).json({
            statuscode:500,
            status:"error",
            errMessage:error
        });
    }
}    