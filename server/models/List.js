const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    api_name: { type: String },
    media_type: { type: String },
    genre: { id: { type: String }, name: { type: String } },
    content: { type: Array },
    api_url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
