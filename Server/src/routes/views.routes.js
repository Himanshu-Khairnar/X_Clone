import { Router } from "express";
import {
  views,
  GetviewsByAuthorId,
  GetviewsByViewerId,
} from "../controllers/views.controller.js";
const router = Router();

router.route("/:authorId/tweet/:tweetId").post(views);
router.route("/:authorId/getViews").get(GetviewsByAuthorId);
router.route("/:viewerId/getViews").get(GetviewsByViewerId);
export default router;
