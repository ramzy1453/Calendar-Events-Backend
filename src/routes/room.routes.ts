import { Router } from "express";
import RoomController from "../controllers/room.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import UserRoomController from "../controllers/userRoom.controller";

export const router = Router();

router.post("/", RoomController.createRoom);
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoomById);
router.put("/:id", RoomController.updateRoomById);
router.delete("/:id", RoomController.deleteRoomById);

router.post("/join/:room", UserRoomController.joinRoom);
router.post("/leave/:room", UserRoomController.leaveRoom);

router.get("/:room/user", UserRoomController.getRoomMembers);

router.post("/:room/grant", UserRoomController.grantRole);

export default router;
