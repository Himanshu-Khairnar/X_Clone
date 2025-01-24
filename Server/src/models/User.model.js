import mongoose, { Schema ,Models} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Please enter a valid email address",
            ],
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        avatar: {
            type: String,
            required: true
        },
        coverImage: {
            type: String
        },
        history: [{
            type: Schema.Types.ObjectId,
            ref: "Tweet"
        }],
        refreshToken: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
);

export const User = Models.User || mongoose.model("User", userSchema);
