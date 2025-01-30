import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import Views from "../models/Views.model.js";
import Tweet from "../models/tweet.model.js";
import User from "../models/User.model.js";

export const views = asyncHandler(async (req, res) => {
  try {
    const { authorId, tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new ApiError(404, "Tweet not found");
    }
    const author = await User.findById(authorId);
    if (!author) {
      throw new ApiError(404, "Author not found");
    }
    const view = Views.create({
      postId: tweetId,
      authorId,
      viewerId: req.user.id,
    });

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: { view },
        message: "View created successfully",
      })
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while creating view");
  }
});

export const GetviewsByAuthorId = asyncHandler(async (req, res) => {
  try {
    const { authorId } = req.params;
    const views = await Views.find({ authorId }).countDocuments();
    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: { views },
        message: "Views fetched successfully",
      })
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while fetching views");
  }
});

export const GetviewsByViewerId = asyncHandler(async (req, res) => {
    try {
        const {viewer} = req.params;
        const views = await Views.find({ viewerId: viewer });
        return res.status(200).json(
            new ApiResponse({
                statusCode: 200,
                data: { views },
                message: "Views fetched successfully",})
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(400, "Something went wrong while fetching views");
    }
});

//     authorId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true
// },
// viewerId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true
// },
// postId: {
//     type: Schema.Types.ObjectId,
//     ref: "Post",
//     required: true
// },
