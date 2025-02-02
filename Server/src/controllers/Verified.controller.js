import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/User.model.js"
import Verified from "../models/Verified.model.js"
export const postVerified = asyncHandler(async (res, req) => {
  try {
    const user = req.user;
    const { isVerified, month, packages } = req.body;
    if(!isVerified && !month && !packages)
        throw new ApiError(404,"field are req")
    const users = await User.findbyId(user._id);
    if(!users)
        throw ApiError(404,"User not found")

    const verified = await Verified.create({
        isVerified,
        month,
        package:packages,
        userId:user._id
    })

    if(!verified)
        throw ApiError(500,"error in creating doc")

    return res.status(200).json(new ApiResponse(200,verified,"Successfully verified"))
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error while verifing user");
  }
});

export const updateVerified = asyncHandler(async (res, req) => {
  try {

    const { isVerified, month, packages } = req.body;
    const {verifiedId} = req.params;
    if (!isVerified && !month && !packages)
      throw new ApiError(404, "field are req");
    const users = await User.findbyId(user._id);
    if (!users) throw ApiError(404, "User not found");

    const verified = await Verified.findByIdAndUpdate(verifiedId,{
      isVerified,
      month,
      package: packages,
      userId: user._id,
    },{new:true});

    if (!verified) throw ApiError(500, "error in creating doc");

    return res
      .status(200)
      .json(new ApiResponse(200, verified, "Successfully updated verified"));
  } catch (error) {
    console.log(error);
    throw ApiError(500, "Error while verifing user");
  }
});

// const verifiedSchema = new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     month:{
//         type: String

//     },
//     package:{
//         type: String
//     }
// })
