const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    mediaType: { type: String },
    genre: { type: String },
    content: { type: Array },
    apiUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
