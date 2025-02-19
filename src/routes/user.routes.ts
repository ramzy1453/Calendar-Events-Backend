import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify", authMiddleware, UserController.verify);
router.post("/logout", authMiddleware, UserController.logout);

export default router;
