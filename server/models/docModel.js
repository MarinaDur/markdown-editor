import mongoose from "mongoose";

const Schema = mongoose.Schema;

const docSchema = new Schema({
  name: {
    type: String,
    required: [true, "Document must have a title"],
  },

  content: {
    type: String,
    default: "",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Document must belong to a user"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an index on the user field for faster queries
docSchema.index({ user: 1 });

const Doc = mongoose.model("Doc", docSchema);

export default Doc;
