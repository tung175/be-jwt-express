import express  from "express";
import { configViewEngine } from "./configs/viewEngine";
import { initWebRoutes } from "./routes/api";
require("dotenv").config()
const app = express()
const port = process.env.PORT || 8080
configViewEngine(app)
initWebRoutes(app)

app.listen(port, () => {
    console.log("BE running on the port:", port);
})