import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { updateUserValidation } from "../validations/userValidation.js";
import { validate } from "../middlewares/validationErrorHandler.js";

const router = express.Router();

router.get("/me", verifyToken, getUserProfile);

router.put(
  "/me",
  verifyToken,
  updateUserValidation,
  validate,
  updateUserProfile
);

router.delete("/me", verifyToken, deleteUser);

export default router;
