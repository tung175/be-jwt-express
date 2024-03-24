import express  from "express";
import homeController from "../controllers/homeController";

const router = express.Router()

export const initWebRoutes =(app) => {
    router.get("/", homeController.handleHelloWord)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateUser)
    return app.use("/", router)
}

