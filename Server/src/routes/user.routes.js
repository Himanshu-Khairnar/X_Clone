import { Router } from "express";
import {
  login,
  register,
  logout,
  getaccesstoken,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  updateAvatar,
  updateCoverImage,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/VerifyJWT.middleware.js";
import {upload } from ""
const router = Router();

router.route("/login").post(login);
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 8 },
  ]),
  register
);
router.route("/logout").post(logout);

//authorized routes
router.route("/get-refresh-token").post(verifyJWT, getaccesstoken);
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/profile/:id").get(verifyJWT, getUserProfile);
router.route("/profile/:id").put(verifyJWT, updateUserProfile);
router.route("/profile/:id").delete(verifyJWT, deleteUserProfile);
router
  .route("/avatar/:id")
  .put(verifyJWT, upload.single("avatar"), updateAvatar);
router
  .route("/cover-image/:id")
  .put(verifyJWT, upload.single("coverImage"), updateCoverImage);
router.route("changePassword").put(verifyJWT, changePassword);
export default router;
