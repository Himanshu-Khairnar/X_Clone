import mongoose, { Schema, Models } from "mongoose";

const verifiedSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    month: {
      type: String,
    },
    package: {
      type: String,
    },
  },
  { timestamps: true }
);

export default Verified =
  mongoose.models.Verified || mongoose.model("Verified", verifiedSchema);
