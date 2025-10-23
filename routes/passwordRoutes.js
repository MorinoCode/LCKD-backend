import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createPassword, getPasswords } from "../controllers/passwordController.js";

const router = express.Router();

router.post("/", verifyToken, createPassword);
router.get("/", verifyToken, getPasswords);

export default router;
