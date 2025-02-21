import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import EventController from "../controllers/event.controller";

export const router = Router();

router.post("/:room", EventController.createEvent);
router.get("/:id", EventController.getEventById);
router.get("/room/:room", EventController.getRoomEvents);
router.get("/user/:id", EventController.getUserEvents);

router.put("/:id", EventController.updateEventById);

router.delete("/:id", EventController.deleteEventById);

export default router;
