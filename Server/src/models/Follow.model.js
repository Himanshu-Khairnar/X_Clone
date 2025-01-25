import mongoose,{Schema} from "mongoose";

const followSchema = new Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default Follow = mongoose.models.Follow || mongoose.model("Follow", followSchema)