const {DataTypes} = require('sequelize');
const sequlizeObject = require("../utils/db_related/sequelizeConnection");
const User = sequlizeObject.define('users',{
    key:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:true,
        unique:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:true,
       
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true,
       
    },
     email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

sequlizeObject.sync({alert:true}).then(() => {
    console.log("users table created sucessfully");
}).catch((error) => {
    console.log("unable to create Users table",error);
});

module.exports = User