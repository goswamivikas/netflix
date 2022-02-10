const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
const axios = require("axios");

//GET RANDOM
router.get("/random", verify, async (req, res) => {
  console.log("random");
  const type = req.query.type;
  let movie;
  console.log("random");
  try {
    if (type === "series") {
      movie = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`
      );
      console.log(movie.data);
    } else {
      console.log("in movie");
      movie = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`
      );
      console.log(movie.data.results[0]);
    }
    res.status(200).json(movie.data.results[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", verify, async (req, res) => {
  console.log("get a movie by id");
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`
      );
      console.log(movie.data);
    } else {
      console.log("in movie");
      movie = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`
      );
      console.log(movie.data);
    }
    res.status(200).json(movie.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
