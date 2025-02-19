import { Router } from "express";
import RoomController from "../controllers/room.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const router = Router();

router.post("/register", authMiddleware, RoomController.createRoom);
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoomById);
router.put("/:id", authMiddleware, RoomController.updateRoomById);
router.delete("/:id", authMiddleware, RoomController.deleteRoomById);

export default router;
