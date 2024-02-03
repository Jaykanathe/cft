const bcrypt = require('bcryptjs');
module.exports.encodePassword = async(password)=>{
    let salt = await bcrypt.genSalt(10);
    let encodePassword = await bcrypt.hash(password,salt);
    return encodePassword
}
