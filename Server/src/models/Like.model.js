import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    }
}, { timestamps: true })    

export default Like = mongoose.models.Like || mongoose.model("Like", likeSchema)
