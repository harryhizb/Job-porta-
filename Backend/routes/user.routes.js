import express from "express";
import {
  login,
  logout,
  register,
  updateUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, updateUser);
router.route("/profile").post(isAuthenticated, singleUpload, getUserProfile);
router.route("/profile/logout").get(logout);

export default router;
