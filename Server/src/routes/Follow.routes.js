import { Router } from "express";
import {
  Follow,
  getFollower,
  getFollowing,
} from "../controllers/follow.controller.js";
const router = Router();

router.route("/:followingId").post(Follow).get(getFollower);
router.route("/").get(getFollowing);
export default router;
