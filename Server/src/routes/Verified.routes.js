import { Router } from "express";
import { verifyJWT } from "../middlewares/VerifyJWT.middleware.js";
import {
  postVerified,
  updateVerified,
} from "../controllers/Verified.controller.js";
const router = Router();
router.use(verifyJWT)
router.route("/").post(postVerified);
router.route("/:verifiedId").put(updateVerified);
export default router;