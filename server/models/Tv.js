const mongoose = require("mongoose");

const TvSchema = new mongoose.Schema(
  {
    adult: {
      type: "Boolean",
    },
    backdrop_path: {
      type: "String",
    },
    created_by: {
      type: ["Mixed"],
    },
    episode_run_time: {
      type: ["Number"],
    },
    first_air_date: {
      type: "Date",
    },
    genres: {
      type: ["Mixed"],
    },
    homepage: {
      type: "String",
    },
    id: {
      type: "Number",
    },
    in_production: {
      type: "Boolean",
    },
    languages: {
      type: ["String"],
    },
    last_air_date: {
      type: "Date",
    },
    last_episode_to_air: {
      air_date: {
        type: "Date",
      },
      episode_number: {
        type: "Number",
      },
      id: {
        type: "Number",
      },
      name: {
        type: "String",
      },
      overview: {
        type: "String",
      },
      production_code: {
        type: "String",
      },
      season_number: {
        type: "Number",
      },
      still_path: {
        type: "String",
      },
      vote_average: {
        type: "Number",
      },
      vote_count: {
        type: "Number",
      },
    },
    name: {
      type: "String",
    },
    networks: {
      type: ["Mixed"],
    },
    next_episode_to_air: {
      type: "Mixed",
    },
    number_of_episodes: {
      type: "Number",
    },
    number_of_seasons: {
      type: "Number",
    },
    origin_country: {
      type: ["String"],
    },
    original_language: {
      type: "String",
    },
    original_name: {
      type: "String",
    },
    overview: {
      type: "String",
    },
    popularity: {
      type: "Number",
    },
    poster_path: {
      type: "String",
    },
    production_companies: {
      type: ["Mixed"],
    },
    production_countries: {
      type: ["Mixed"],
    },
    seasons: {
      type: ["Mixed"],
    },
    spoken_languages: {
      type: ["Mixed"],
    },
    status: {
      type: "String",
    },
    tagline: {
      type: "String",
    },
    type: {
      type: "String",
    },
    vote_average: {
      type: "Number",
    },
    vote_count: {
      type: "Number",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tv", TvSchema);
