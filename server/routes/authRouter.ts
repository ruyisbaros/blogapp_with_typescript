import { Router } from "express";
import authControl from "../controllers/authController";
import { validateRegister, validateLogin } from "../middlewares/valid"
const router = Router()

router.post("/register", validateRegister, authControl.register)
router.post("/activate_account", authControl.activateRegister)
router.post("/login", validateLogin, authControl.login)
router.post("/logout/:id", authControl.logout)

export default router