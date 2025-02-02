import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    like: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default Like =
  mongoose.models.Like || mongoose.model("Like", likeSchema);
