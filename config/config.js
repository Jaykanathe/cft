const { Console } = require("winston/lib/winston/transports");

require("dotenv").config();
const ENVIRONMENT =process.env.ENVIRONMENT;
let dbCredentials = null;

if ((/PRODUCTION/).test(ENVIRONMENT)) {
    console.log("server is now on production");
} else {
    dbCredentials = {
        user:process.env.LOCAL_DB_USER || '',
        database:process.env.LOCAL_DB || '',
        password:process.env.LOCAL_DB_PASS||'',
        host:process.env.LOCAL_DB_HOST ||'',
        port :5432,
    }
}

const config = {
    serviceName:process.env.SERVICENAME || 'postgresDB',
    port:process.env.PORT || 4000,
    loggerLevel:process.env.LOGERLEVEL || 'debug',
    db:dbCredentials,
    environment:ENVIRONMENT
}

module.exports = config;