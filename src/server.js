import express  from "express";
import { configViewEngine } from "./config/viewEngine";
import { initWebRoutes } from "./routes/api";
import bodyParser from 'body-parser'
import connection from "./config/connectDB";
require("dotenv").config()

const app = express()
const port = process.env.PORT || 8080
configViewEngine(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
connection()
// parse application/json
initWebRoutes(app)

app.listen(port, () => {
    console.log("BE running on the port:", port);
})