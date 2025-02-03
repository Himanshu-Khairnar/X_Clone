import { Router } from "express";
import {getTweets,postTweet,updateTweet,deleteTweet} from "../controllers/tweets.controller.js"
import { verifyJWT } from "../middlewares/VerifyJWT.middleware.js";
const router = Router();

router.route("/").get(getTweets).post(verifyJWT,postTweet)
router.route("/:tweetId").put(verifyJWT,updateTweet).delete(verifyJWT,deleteTweet)

export default router;