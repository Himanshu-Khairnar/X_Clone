import {Router} from "express";
import {
  login,
  register,
  logout,
  getaccesstoken,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);
router.route("/get-refresh-token").post(getaccesstoken);
router.route("/profile").get(getUserProfile);

export default router