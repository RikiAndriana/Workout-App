import express from "express";

// controller
import { loginUser, signUpUser } from "../controllers/userController.js";

const router = express.Router();

// login
router.post("/login", loginUser);

// sign up
router.post("/signup", signUpUser);

// logout

export default router;
