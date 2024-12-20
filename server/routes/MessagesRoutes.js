import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MesagesController.js";

const messagesRoutes = Router();

messagesRoutes.post("/get-messages", verifyToken, getMessages);

export default messagesRoutes;
