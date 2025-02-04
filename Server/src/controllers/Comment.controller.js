import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Comment } from "../models/Comment.model";
import { Tweet } from "../models/Tweet.model";
import { User } from "../models/User.model";

export const createComment = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.params;
    const { comment } = req.body;
    const user = req.user;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new ApiError(404, "Tweet not found");
    }
    const newComment = Comment.create({
      authorId: user._id,
      postId: tweetId,
      content: comment,
    });
    if (!newComment) {
      throw new ApiError(500, "Error in creating comment");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment created successfully", newComment));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error in creating comment");
  }
});

export const getComments = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid videoId");

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      throw new ApiError(404, "Tweet not found");
    }
    const skip = (page - 1) * limit;
    const pipeline = [
      {
        $match: {
          tweetId: new mongoose.Types.ObjectId(tweetId), // Ensure videoId is an ObjectId
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $project: {
          _id: 1,
          text: 1,
          createdAt: 1,
          userDetails: { $arrayElemAt: ["$userDetails", 0] },
        },
      },
    ];

    const comments = await Comment.aggregate(pipeline);

    if (!comments) {
      throw new ApiError(500, "Error in getting comments");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Comments fetched successfully", comments));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error in getting comments");
  }
});

export const getCommentByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const comments = await Comment.find({ authorId: userId });
    if (!comments) {
      throw new ApiError(500, "Error in getting comments");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Comments fetched successfully", comments));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error in getting comments");
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      throw new ApiError(500, "Error in deleting comment");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Comment deleted successfully", deletedComment)
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error in deleting comment");
  }
});

export const updateComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const commentPresent = await Comment.findById(commentId);

    if (!commentPresent) {
      throw new ApiError(404, "Comment not found");
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content: comment },
      { new: true }
    );
    if (!updatedComment) {
      throw new ApiError(500, "Error in updating comment");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Comment updated successfully", updatedComment)
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error in updating comment");
  }
});

export const commnetonComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { user } = req.user;
    const { comment } = req.body;
    const commentPresent = await Comment.findById(commentId);
    if (!commentPresent) {
      throw new ApiError(404, "Comment not found");
    }
    if (!user) throw new ApiError(404, "User not found");

    const newComment = Comment.create({
      authorId: user._id,
      CommentId: commentId,
      content: comment,
      postId: commentPresent.postId,
    });

    if (!newComment) {
      throw new ApiError(500, "Error in creating comment");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Comment created successfully", newComment));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error in creating comment");
  }
});

// const commentSchema = new Schema({
//   authorId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   postId: {
//     type: Schema.Types.ObjectId,
//     ref: "Post",
//     required: true,
//   },
//   CommentId: {
//     type: Schema.Types.ObjectId,
//     ref: "Comment",
//     required: false,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });
