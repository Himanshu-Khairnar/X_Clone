import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import LikeModel from "../models/Like.model.js";

export const postLike = asyncHandler(async (res, req) => {
  try {
    const user = req.user;
    const { authorId } = req.params;
    const { postId, commentId } = req.body;
    if (!postId || !commentId) throw ApiError(404, "All fields are required");
    const findLike = await LikeModel.findOne({
      $or: [postId, commentId, authorId, (userId = user._id)],
    });
    if (findLike) {
      const updateLike = await LikeModel.findByIdAndUpdate(findLike._id, {
        like: false,
      });
      return res
        .status(200)
        .json(new ApiResponse(200, updateLike, "Successfully updated like"));
    }
    const createLike = await LikeModel.create({
      like: true,
      authorId,
      postId,
      commentId,
      userId: user._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, createLike, "Successfully created like"));
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Like in liking");
  }
});

// const likeSchema = new Schema(
//   {
//     authorId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     postId: {
//       type: Schema.Types.ObjectId,
//       ref: "Post",
//       required: true,
//     },
//     commentId: {
//       type: Schema.Types.ObjectId,
//       ref: "Comment",
//       required: false,
//     },
//   },
//   { timestamps: true }
// );
