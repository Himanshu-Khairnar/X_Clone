import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, username: user.username, fullname: user.fullname },
        process.env.ACCESS_JWT_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" });
};

export const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            throw new ApiError(400, "Emaila and password fields are required")
        }
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(400, "User not found")
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid credentials")
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        const authOptions = {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        };
        
        return res
          .status(200)
          .cookie("refreshToken", refreshToken, authOptions)
          .cookie("accessToken", accessToken, authOptions)
          .json(
            new ApiResponse({
              statusCode: 200,
              data: { user, accessToken, refreshToken },
              message: "Login successful",
            })
          );
    } catch (error) {
        console.log(error);
        throw new ApiError(400, "Something went wrong while login in user")
    }
});