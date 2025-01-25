import mongoose, { Schema } from "mongoose";

const viewsSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    viewerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
   
})

export default  Views = mongoose.models.Views || mongoose.model("Views", viewsSchema)