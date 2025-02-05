import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadImage } from "../utils/Cloudinary.js";
import TweetModel from "../models/Tweet.model.js";

export const getTweets = asyncHandler(async (res, req) => {
  try {
    const {
      page = 1,
      limit = 10,
      query,
      sortBy = "createdAt",
      sortType = "desc",
      userId,
    } = req.query;

    const pipeline = [
      {
        $match: {
          $or: [
            { hashtags: { $regex: new RegExp(query, "i") } },
            { mentions: { $regex: new RegExp(query, "i") } },
            { content: { $regex: new RegExp(query, "i") } },
          ],
          ...(userId ? { userId } : {}),
        },
      },
      {
        $sort: {
          [sortBy]: sortType === "asc" ? 1 : -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ];

    const tweets = await TweetModel.aggregate(pipeline);
    if (!tweets) throw ApiError(500, "error in finding  tweets");
    return res
      .status(200)
      .json(new ApiResponse(200, tweets, "Successfully fetched tweets"));
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in getting tweets");
  }
});
export const postTweet = asyncHandler(async (res, req) => {
  try {
    const { content, mentions, hashtags, type, parentTweet } = req.body;
    const user = req.user;

    if (!content && type) throw ApiError(404, "Not Found");

    let media = [];
    if (req.files && req.files.length > 0)
      for (const media of req.files) {
        const uploadFile = uploadImage(file.path);
        media.push({
          url: uploadFile.url,
        });
      }

    const tweet = await TweetModel.create({
      author: user._id,
      content,
      media,
      RetweetsAndRequotes: 0,
      type,
      hashtags,
      mentions,
      parentTweet,
    });
    if (!tweet) throw ApiError(500, "Error in creating doc");
    return res
      .status(200)
      .json(new ApiResponse(200, tweet, "Successfully created tweet"));
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in posting tweets");
  }
});
export const updateTweet = asyncHandler(async (res, req) => {
  try {
    const { content, mentions, hashtags, type, parentTweet } = req.body;
    const user = req.user;
    const { tweetId } = req.params;
    if (!content && type) throw ApiError(404, "Not Found");

    let media = [];
    if (req.files && req.files.length > 0)
      for (const media of req.files) {
        const uploadFile = uploadImage(file.path);
        media.push({
          url: uploadFile.url,
        });
      }
    const Updatetweet = await TweetModel.findOneAndUpdate(tweetId, {
      author: user._id,
      content,
      media,
      RetweetsAndRequotes: 0,
      type,
      hashtags,
      mentions,
      parentTweet,
    });
    if (!updateTweet) throw ApiError(404, "Error in updating tweet");
    return res
      .status(200)
      .json(
        new ApiResponse(200, updateTweet, "Successfully created updatetweet")
      );
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in updating tweets");
  }
});
export const deleteTweet = asyncHandler(async (res, req) => {
  try {
    const { tweetId } = req.params;
    const user = req.user;
    const findtweet = await TweetModel.findOne({
      $or: [(_id = tweetId), (author = user._id)],
    });
    if (!findtweet) throw ApiError(404, "Error in finding tweet");
    const deletetweet = await TweetModel.findByIdAndDelete(tweetId);
    if (!deletetweet) throw ApiError(500, "Error in deleting tweet");
    return res
      .status(200)
      .json(new ApiResponse(200, deletetweet, "Successfully deleted tweet"));
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error in deleting tweets");
  }
});
// import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// const tweetSchema = new Schema(
//   {
//     author: {
//       type: Schema.Types.ObjectId,
//       ref: "User", // Reference to the User model
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//       maxlength: 280,
//     },
//     media: [
//       {
//         url: String,
//         type: {
//           type: String,
//           enum: ["image", "video", "gif"],
//         },
//       },
//     ],

//     RetweetsAndRequotes: {
//       type: Number,
//       default: 0,
//     },
//     parentTweet: {
//       type: Schema.Types.ObjectId,
//       ref: "Tweet",
//       default: null,
//     },
//     type: {
//       type: String,
//       enum: ["tweet", "retweet", "requote"],
//       default: "tweet",
//     },

//     hashtags: [String],
//     mentions: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// Tweet.plugin(mongooseAggregatePaginate);

// export default mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
