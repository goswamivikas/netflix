const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    iso_639_1: {
      type: "String",
    },
    iso_3166_1: {
      type: "String",
    },
    name: {
      type: "String",
    },
    key: {
      type: "String",
    },
    site: {
      type: "String",
    },
    size: {
      type: "Number",
    },
    type: {
      type: "String",
    },
    official: {
      type: "Boolean",
    },
    published_at: {
      type: "Date",
    },
    id: {
      type: "ObjectId",
    },
  },
  { timestamps: true }
);

module.exports = VideoSchema;
