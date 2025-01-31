import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import FollowModel from "../models/Follow.model.js";
export const Follow = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { following } = req.params;

    const userIsAvailable = await User.findById(user._id);

    if (!following) throw new ApiError(404, "FollowingId is not present");
    if (!userIsAvailable) throw new ApiError(404, "User is unavailable");

    const findfollowing = await FollowModel.findOne({
      $or: [(followerId = following), (followerId = user._id)],
    });
    if (findfollowing) {
      const follow = await FollowModel.findByIdAndDelete(findfollowing._id);
      return res
        .status(200)
        .json(new ApiResponse(200, { follow }, "Successfully unfollowed"));
    }
    const follow = await FollowModel.create({
      followerId: user._id,
      followingId: following,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { follow }, "Successfully followed user"));
  } catch (Error) {
    console.log(Error);
    throw new ApiError(500, "Error in following");
  }
});

export const getFollower = asyncHandler(async (res, req) => {
  try {
    const { following } = req.params;
    if (!following) throw new ApiError(404, "Following Id not found");
    const follower = await FollowModel.findById(following);
    if (!follower) throw new ApiError(404, "User doesnot exist");
    const followingUser = await FollowModel.find({ followerId: following });
    if (!followingUser)
      throw new ApiError(500, "Error in creating follower doc");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { followingUser },
          "Successfully created followe doc"
        )
      );
  } catch (error) {}
});

export const getFollowing = asyncHandler(async (res, req) => {
  try {
    const user = req.user;
    const following = await FollowModel.find({ followerId: user._id });
    if (!following) throw new ApiError(404, "Error in finding User");
    return res
      .status(200)
      .response(
        new ApiResponse(200, { following }, "Successfully got following list")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while getting follwing list");
  }
});
// const followSchema = new Schema({
//     followerId: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     followingId: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     }
// })
