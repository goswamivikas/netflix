const mongoose = require("mongoose");

const TrendingSchema = new mongoose.Schema(
  {
    first_air_date: { type: "Date" },
    name: {
      type: "String",
    },
    original_language: {
      type: "String",
    },
    poster_path: {
      type: "String",
    },
    vote_count: {
      type: "Number",
    },
    overview: {
      type: "String",
    },
    vote_average: {
      type: "Number",
    },
    backdrop_path: {
      type: "String",
    },
    id: {
      type: "Number",
    },
    original_name: {
      type: "String",
    },
    origin_country: {
      type: ["String"],
    },
    genre_ids: {
      type: ["Number"],
    },
    popularity: {
      type: "Number",
    },
    media_type: {
      type: "String",
    },
    adult: {
      type: "Boolean",
    },
    original_title: {
      type: "String",
    },
    release_date: {
      type: "Date",
    },
    title: {
      type: "String",
    },
    video: {
      type: "Boolean",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trending", TrendingSchema);
