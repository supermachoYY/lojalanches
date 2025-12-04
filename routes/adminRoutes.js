import express from "express"
import AdminController from "../controllers/adminController.js"

const router = express.Router()

router.get("/dashboard", AdminController.dashboard)

export default router
