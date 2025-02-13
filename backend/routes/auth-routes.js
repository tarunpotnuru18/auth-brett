import express from "express";
import {
  login,
  signup,
  logout,
  verifyEmail,
  forgotPassword,
  changePassword,
  checkAuth,
} from "../controllers/auth-controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

let router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", verifyToken, forgotPassword);
router.post("/change-password", verifyToken, changePassword);
router.get("/check-auth", verifyToken, checkAuth);
export default router;
