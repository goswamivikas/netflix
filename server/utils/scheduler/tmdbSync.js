const axios = require("axios");
const Trending = require("../../models/Trending");
const Movie = require("../../models/Movie");
const Tv = require("../../models/Tv");
const logger = require("../logger");

module.exports = function (agenda) {
  agenda.define("sync tmdb", async (job) => {
    logger.info("starting sync tmdb job");
    const pages = [1]; //20 responses per page
    //fetch 100 trending movies
    const trendingMovies = [];
    logger.info("retrieve trending movies");
    await Promise.all(
      pages.map((page) =>
        axios
          .get(
            `${process.env.TMDB_BASE_URL}/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&page=${page}`
          )
          .then((res) => {
            trendingMovies.push(...res.data.results);
          })
          .catch((err) => console.log(err))
      )
    ).catch((err) => logger.error(err));

    logger.info("retrieved trending movies", { count: trendingMovies.length });

    logger.info("retrieve trending tvs");
    const trendingTv = [];
    await Promise.all(
      pages.map((page) =>
        axios
          .get(
            `${process.env.TMDB_BASE_URL}/trending/tv/day?api_key=${process.env.TMDB_API_KEY}&page=${page}`
          )
          .then((res) => trendingTv.push(...res.data.results))
      )
    );
    logger.info("retrieved trending movies", { count: trendingTv.length });

    const movie_ids = trendingMovies.map((movie) => movie.id).slice(0, 1);
    const tv_ids = trendingTv.map((tv) => tv.id).slice(0, 1);

    const movies = [];
    const tvs = [];

    logger.info("start: retreiving all trending movie and tv docs", {
      movie_ids,
      tv_ids,
    });
    await Promise.all(
      movie_ids.map((id) =>
        axios
          .get(
            `${process.env.TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
          )
          .then((res) => {
            movies.push(res.data);
          })
          .catch((err) => logger.error(err))
      )
    );
    await Promise.all(
      tv_ids.map((id) =>
        axios
          .get(
            `${process.env.TMDB_BASE_URL}/tv/${id}?api_key=${process.env.TMDB_API_KEY}`
          )
          .then((res) => tvs.push(res.data))
          .catch((err) => logger.error(err))
      )
    );

    logger.info("end: retreiving all trending movie and tv docs", {
      movies: movies.length,
      tvs: tvs.length,
    });
    try {
      logger.info("start: delete tv, movie and trending collection");
      await Trending.deleteMany({});
      await Movie.deleteMany({});
      await Tv.deleteMany({});
      logger.info("end: delete tv, movie and trending collection");

      logger.info("inserting tvs, movies, trending items into mongodb");
      await Trending.insertMany(trendingMovies);
      await Trending.insertMany(trendingTv);
      await Movie.insertMany(movies);
      await Tv.insertMany(tvs);

      logger.info("Job Completed", { movies: movies.length, tvs: tvs.length });
    } catch (err) {
      console.log("tmdb sync error ->", err);
    }
  });
};
