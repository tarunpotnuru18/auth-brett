import express from "express";
import { signin, signup, logout } from "../controllers/auth-controllers.js";

let router = express.Router();

router.post("/signin", signin);
router.get("/signup", signup);
router.get("/logout", logout);
export default router;
