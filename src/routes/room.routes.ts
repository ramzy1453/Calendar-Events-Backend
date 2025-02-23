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

//joinRoomWithMagicLink
//generateMagicLink

router.get("/join/:room", UserRoomController.joinRoomWithMagicLink);
router.post("/magic-link/:room", UserRoomController.generateMagicLink);

router.post("/leave/:room", UserRoomController.leaveRoom);

router.get("/:room/user", UserRoomController.getRoomMembers);

router.post("/:room/grant/:user", UserRoomController.grantRole);

export default router;
