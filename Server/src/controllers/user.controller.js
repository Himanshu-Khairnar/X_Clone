import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      fullname: user.fullname,
    },
    process.env.ACCESS_JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" });
};

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      throw new ApiError(400, "Emaila and password fields are required");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
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
    throw new ApiError(400, "Something went wrong while login in user");
  }
});

export const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    if (!fullname && !username && !email && !password) {
      throw new ApiError(400, "All fields are required");
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new ApiError(400, "User already exists");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser._id);
    newUser.refreshToken = refreshToken;
    await newUser.save();

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
          data: { user: newUser, accessToken, refreshToken },
          message: "User registered successfully",
        })
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while registering user");
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new ApiError(400, "No refresh token found");
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new ApiError(400, "User not found");
    }   
    user.refreshToken = "";      
    await user.save();
    return res
      .status(200)
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .json(
        new ApiResponse({
          statusCode: 200,
          data: {},
          message: "Logout successful",
        })
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while logging out user");
  }
});

export const getaccesstoken = asyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new ApiError(400, "No refresh token found");
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new ApiError(400, "User not found");
    }   
    const accessToken = generateAccessToken(user);
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(
        new ApiResponse({
          statusCode: 200,
          data: { accessToken },
          message: "Refresh token generated successfully",
        })
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while generating refresh token");
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse({
          statusCode: 200,
          data: { user },
          message: "User profile fetched successfully",
        })
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while fetching user profile");  
  }
});