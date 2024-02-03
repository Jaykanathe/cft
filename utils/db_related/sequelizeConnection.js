const {Sequelize} = require('sequelize');
const config = require("../../config/config");

let sequelizeConnection;
if(config.environment === 'LOCAL'){
    sequelizeConnection = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        {
            host:config.db.host,
            dialect:'postgres',
        }
    );
}else{
    sequelizeConnection = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:5432/${config.db.database}`);
}
module.exports = sequelizeConnection;