import { Router } from "express";
import {
  getTweets,
  postTweet,
  updateTweet,
  deleteTweet,
  getyourTweets,
} from "../controllers/tweets.controller.js";
import { verifyJWT } from "../middlewares/VerifyJWT.middleware.js";
import { upload } from "../middlewares/Multer.middleware.js";
const router = Router();

router
  .route("/")
  .get(getTweets)
  .post(verifyJWT, upload.array(media, 10), postTweet)
  .get(verifyJWT,getyourTweets);
router
  .route("/:tweetId")
  .put(verifyJWT, updateTweet)
  .delete(verifyJWT, deleteTweet);
export default router;
