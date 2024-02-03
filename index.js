const express = require("express");
const app = express();
require('dotenv').config();
require('./config/config');
const bodyParser = require('body-parser');
const config  = require("./config/config");

const customRouter = require("./routers/router");
const router = express.Router();

const PORT = config.port || 4000;
const sequelizeConnection = require("./utils/db_related/sequelizeConnection");

sequelizeConnection.authenticate().then(()=>{
    console.log("connection has been stablished sucess fully")
}).catch((error)=>{
    console.log("unable to connect to the database");
})
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

router.use("/api",customRouter);

app.listen(PORT,()=>{
    console.log(`server is listning on port 4000 `);
});