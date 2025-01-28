import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const authHeader =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

      if(!authHeader)
        throw new ApiError("Unauthorized", 401);

    const decoded = jwt.verify(authHeader, process.env.ACCESS_JWT_SECRET);
    const user = await User.findById(decoded?._id).select("-password -refreshtoken");
    if(!user)
      throw new ApiError("Unauthorized", 401);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});
