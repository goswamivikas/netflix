const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
  {
    id: { type: Integer },
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = GenreSchema;
