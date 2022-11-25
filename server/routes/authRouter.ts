import { Router } from "express";
import authControl from "../controllers/authController";
const router = Router()

router.post("/register", authControl.register)
router.post("/login", authControl.login)
router.post("/logout/:id", authControl.logout)

export default router