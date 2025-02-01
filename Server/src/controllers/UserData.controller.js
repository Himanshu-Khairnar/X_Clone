import UserDataModel from "../models/UserData.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const GetUserData = asyncHandler(async (res, req) => {
  try {
    const user = req.user;
    const userdata = await UserDataModel.findOne({userId:user._id});
    if (!userdata) throw new ApiError();
    return res
      .status(200)
      .json(new ApiResponse(200, { userdata }, "Successfully return userdata"));
  } catch (error) {
    console.log(error);
  }
});

export const AddUserData = asyncHandler(async (res, req) => {
  try {
    const user = req.user;
    const { bioData, place, links, dateofBirth } = req.body;
    if (!bioData || !dateofBirth) throw new ApiError(500, "required all field");
    const finduserData = await UserDataModel.findOne({ userId: user._id });
    if (finduserData) throw new ApiError(500, "Userdata already exists");
    const userdata = await UserDataModel.create({
      userId: user._id,
      bioData,
      place,
      links,
      dateofBirth,
    });
    if (!userdata) throw new ApiError();

    return res
      .status(200)
      .json(
        new ApiResponse(200, { userdata }, "Successfully created userdata")
      );
  } catch (error) {
    console.log(error);
  }
});

export const updateuserData = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { bioData, place, links, dateofBirth } = req.body;
    if (!bioData || !place || !links || !dateofBirth)
      throw new ApiError(500, "field are ");

    const getuserdata = await UserDataModel.findById(user._id);
    if(!getuserdata)
        throw new ApiError(500,"UserData not found")
    const updateuser = await UserDataModel.findByIdAndUpdate(userdataId, {
      bioData,
      place,
      links,
      dateofBirth,
    },{new:true});
    if (!updateuser) throw new ApiError(500, "error in updating");
    return res
      .status(200)
      .json(new ApiResponse(500, updateuser, "Successfully updated userdata"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error in update user data");
  }
});

export const getAnotherUserData = asyncHandler(async (req, res) => {
  try {
    const { userdataID } = req.params;
    const getuserdata = await UserDataModel.findOne({ userId: userdataID });
    if (!getuserdata) throw new ApiError(404, "User not found");
    return res
      .status(200)
      .json(new ApiResponse(200, getuserdata, "Successfully fetched userData"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error in getting userdata");
  }
});

// import mongoose, { Schema } from "mongoose";

// const userDataSchema = new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     bioData: {
//         type: String,
//     },
//     place:{
//         type: String,
//         default: "Earth"
//     },
//     links:{
//         type: String

//     },
//     dateofBirth:{
//         type: Date,
//         required: true
//     }

// })

// export default UserData = mongoose.models.UserData || mongoose.model("UserData", userDataSchema)
