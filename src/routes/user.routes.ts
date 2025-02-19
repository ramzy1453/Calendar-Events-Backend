import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import UserRoomController from "../controllers/userRoom.controller";

export const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify", authMiddleware, UserController.verify);
router.post("/logout", authMiddleware, UserController.logout);
router.get("/room", authMiddleware, UserRoomController.getUserRooms);

export default router;
