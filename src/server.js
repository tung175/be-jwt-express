require("dotenv").config();

import express from "express";
import { configViewEngine } from "./config/viewEngine";
import { initApiRoutes } from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import cors from "./config/cors";
import cookieParser from 'cookie-parser'
const app = express();

const PORT = process.env.PORT || 8080;
// Add headers before the routes are defined
cors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

connection();

// parse application/json
initApiRoutes(app);

app.listen(PORT, () => {
  console.log("BE running on the port:", PORT);
});
