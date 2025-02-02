import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    CommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
