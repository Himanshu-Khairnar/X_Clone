import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getTweets = asyncHandler(async (res, req) => {
    try {
        
    } catch (error) {
        console.log(error)
        throw ApiError(500,"Error in getting tweets")
    }
});


export const postTweet = asyncHandler(async (res, req) => {
  try {
    
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in posting tweets");
  }
});


export const updateTweet = asyncHandler(async (res, req) => {
  try {
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in updating tweets");
  }
});


export const deleteTweet= asyncHandler(async (res, req) => {
  try {
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in deleting tweets");
  }
});
router.route("/").get(getTweets).post(verifyJWT, postTweet);
router
  .route("/:tweetId")
  .put(verifyJWT, updateTweet)
  .delete(verifyJWT, deleteTweet);
