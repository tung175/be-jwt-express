import express  from "express";
import apiController from "../controllers/apiController"
import userController from "../controllers/userController"
import groupController from "../controllers/groupController"
const router = express.Router()

export const initApiRoutes =(app) => {
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    //CRUD
    router.get("/user/read", userController.readFC)
    router.post("/user/create", userController.createFC)
    router.put("/user/update", userController.updateFC)
    router.delete("/user/delete", userController.deleteFC)

    router.get("/group/read", groupController.readFC)
    
    return app.use("/api/v1/", router)
}

