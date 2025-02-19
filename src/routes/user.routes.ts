import { Router } from "express";
import UserController from "../controllers/user.controller";

export const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify", UserController.verifyToken);
router.post("/logout", UserController.logout);

export default router;
