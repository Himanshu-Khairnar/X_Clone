import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        content: {
            type: String,
            required: true,
            maxlength: 280, 
        },
        media: [
            {
                url: String, 
                type: {
                    type: String,
                    enum: ["image", "video", "gif"], 
                },
            },
        ],
   
        RetweetsAndRequotes: {
            type: Number,
            default: 0,
        },
        parentTweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet", 
            default: null,
        },
        type: {
            type: String,
            enum: ["tweet", "retweet","requote"], 
            default: "tweet",
        },
      
        hashtags: [String], 
        mentions: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", 
            },
        ],
    },
    {
        timestamps: true, 
    }
);

export default mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
