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
      console.log("in series");
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

router.get("/:id/video", verify, async (req, res) => {
  console.log("get a movie video by id");
  const type = req.query.type;
  console.log({ type, id: req.params.id });
  let videos;
  try {
    if (type === "series") {
      videos = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/${req.params.id}/videos?api_key=${process.env.TMDB_API_KEY}`
      );
    } else {
      console.log("in movie");
      videos = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/${req.params.id}/videos?api_key=${process.env.TMDB_API_KEY}`
      );
    }
    console.log({ videos });
    let video =
      videos?.data?.results?.filter((video) => video?.type === "Trailer")[0] ||
      videos?.data?.results[0];

    console.log({ video });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
