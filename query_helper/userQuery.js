
const User = require("../model/userModel");

module.exports.registerUser = async(userObject,transaction)=>{
    try {
        const userData = await User.create(userObject,{transaction});
        return userData;
    } catch (error) {
        return null;
    }
}
module.exports.getUserDetailBykey = async(searchObject,transaction)=>{
    try {
        const userData = await User.findOne({
            where:searchObject
        },{transaction});
        return userData
    } catch (error) {
        return null;
    }
}

module.exports.updateUserdata = async(keyObject,userObject,transaction) =>{
    try{
const userData = await User.update(
    userObject,{where:keyObject},transaction)
    return userData;
    }catch(error){
        return null;
    }
}

module.exports.getAllUsers = async(transaction)=>{
   try{
    const userData = User.sequelize.query('select * from user',{
    type:User.sequelize.QueryTypes.SELECT,transaction
    })
    return userData;
}catch(error){
return null
}
}