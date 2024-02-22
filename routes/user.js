import express from "express";
import { createNewUser, logout, userDetails, userLogin } from "../controllers/user/user.js";
import { isAuthenticated } from "../middlewares/Auth/Auth.js";

const router = express.Router();

router.post('/register',createNewUser);

router.get('/login', userLogin);

router.get('/profile', isAuthenticated, userDetails);

router.get('/logout', logout);



export default router;