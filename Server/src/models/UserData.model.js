import mongoose, { Schema ,Models} from "mongoose";

const userDataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bioData: {
        type: String,
    },
    place:{
        type: String,
        default: "Earth"
    },
    links:{
        type: String

    },
    dateofBirth:{
        type: Date,
        required: true
    }

})

export default  UserData = Models.UserData || mongoose.model("UserData", userDataSchema)