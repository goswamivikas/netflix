const axios = require("axios");
const Trending = require("../../models/Trending");
const Movie = require("../../models/Movie");
const Tv = require("../../models/Tv");
const Video = require("../../models/Video");
const logger = require("../logger");
const List = require("../../models/List");

const fetchFromTMDB = async ({ apiUrl, count }) => {
  let pages = new Array(Math.ceil(count / 20))
    .fill(0)
    .map((item, idx) => idx + 1); //[1,2,3] 20 items per page

  const result = [];
  await Promise.all(
    pages.map((page) =>
      axios
        .get(
          `${process.env.TMDB_BASE_URL}${apiUrl}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
        )
        .then((res) => {
          result.push(...res.data.results);
        })
        .catch((err) => logger.error(err))
    )
  ).catch((err) => logger.error(err));

  return result;
};

const fetchTitlesByIdFromTMDB = async ({ ids, media_type }) => {
  const results = [];
  await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await axios.get(
          `${process.env.TMDB_BASE_URL}/${media_type}/${id}?api_key=${process.env.TMDB_API_KEY}`
        );
        const vid_res = await axios.get(
          `${process.env.TMDB_BASE_URL}/${media_type}/videos?api_key=${process.env.TMDB_API_KEY}`
        );
        const result = res.data;
        result["videos"] = vid_res?.data?.results || [];
        results.push(result);
      } catch (err) {
        logger.error({ id }, err);
      }
    })
  );
  return results;
};

const clearDb = async () => {
  await Trending.deleteMany({});
  await Movie.deleteMany({});
  await Tv.deleteMany({});
  await List.deleteMany({});
};

const populateDb = async ({ trendingMovies, trendingTvs, movies, tvs }) => {
  await Trending.insertMany(trendingMovies);
  await Trending.insertMany(trendingTvs);
  await Movie.insertMany(movies);
  await Tv.insertMany(tvs);
};

const getIds = ({ trendingMovies, popularMovies, trendingTvs, popularTvs }) => {
  let movieIds = [...trendingMovies, ...popularMovies].map((movie) => movie.id);
  let tvIds = [...trendingTvs, ...popularTvs].map((tv) => tv.id);

  movieIds = [...new Set(movieIds)];
  tvIds = [...new Set(tvIds)];

  return { movieIds, tvIds };
};

const buildLists = async ({
  trendingMovies,
  popularMovies,
  trendingTvs,
  popularTvs,
  movies,
  tvs,
}) => {
  await buildPopularLists({
    movies: popularMovies.slice(0, 20),
    tvs: popularTvs.slice(0, 20),
  });
  await buildTrendingLists({
    movies: trendingMovies.slice(0, 20),
    tvs: trendingTvs.slice(0, 20),
  });
  await buildGenreLists({ titles: movies, media_type: "movie" });
  await buildGenreLists({ titles: tvs, media_type: "tv" });
};

module.exports = function (agenda) {
  agenda.define("sync tmdb", async (job) => {
    logger.info("starting sync tmdb job");

    const trendingMovies = await fetchFromTMDB({
      apiUrl: "/trending/movie/week",
      count: 20,
    });

    const trendingTvs = await fetchFromTMDB({
      apiUrl: "/trending/tv/week",
      count: 20,
    });

    const popularMovies = await fetchFromTMDB({
      apiUrl: "/movie/popular",
      count: 20,
    });

    const popularTvs = await fetchFromTMDB({
      apiUrl: "/tv/popular",
      count: 20,
    });

    const { movieIds, tvIds } = getIds({
      trendingMovies,
      popularMovies,
      trendingTvs,
      popularTvs,
    });

    const movies = await fetchTitlesByIdFromTMDB({
      ids: movieIds,
      media_type: "movie",
    });
    const tvs = await fetchTitlesByIdFromTMDB({ ids: tvIds, media_type: "tv" });

    await clearDb();
    await populateDb({ trendingMovies, trendingTvs, movies, tvs });

    await buildNetflixLists({
      trendingMovies,
      popularMovies,
      trendingTvs,
      popularTvs,
      movies,
      tvs,
    });
  });
};

const buildTrendingLists = async ({ movies, tvs }) => {
  logger.info("start - buildTrendingLists");
  let mlist = movies.map((movie) => {
    return { id: movie.id, media_type: "movie" };
  });

  let tlist = tvs.map((tv) => {
    return { id: tv.id, media_type: "tv" };
  });

  let top10 = [...mlist.slice(0, 5), ...tlist.slice(0, 5)].sort(
    () => Math.random() - 0.5
  );

  const top10List = {
    title: "Trending in Top 10",
    api_name: "top10",
    media_type: "mix",
    genre: null,
    content: top10,
  };

  const trendingInTV = {
    title: "Trending in TV",
    api_name: "trendingInTv",
    media_type: "tv",
    genre: null,
    content: tlist,
  };

  const trendingInMovie = {
    title: "Trending in Movies",
    api_name: "trendingInMovies",
    media_type: "movie",
    genre: null,
    content: mlist,
  };

  await saveList(top10List);
  await saveList(trendingInTV);
  await saveList(trendingInMovie);
  logger.info("end - buildTrendingLists");
};

const buildPopularLists = async ({ movies, tvs }) => {
  logger.info("start - buildPopularLists");
  let mlist = movies.map((item) => {
    return { id: item.id, media_type: "movie" };
  });

  let tlist = tvs.map((item) => {
    return { id: item.id, media_type: "tv" };
  });

  const popularInTv = new List({
    title: "Popular in TV",
    api_name: "trendingInTv",
    media_type: "tv",
    genre: null,
    content: tlist,
  });
  await popularInTv.save();
  const popularInMovie = new List({
    title: "Popular In Movies",
    api_name: "trendingInMovies",
    media_type: "movie",
    genre: null,
    content: mlist,
  });
  await popularInMovie.save();
  logger.info("end - buildPopularLists");
};

const buildGenreLists = async ({ titles, media_type }) => {
  logger.info("start - buildGenreLists");
  let itemsByGenreId = {};
  titles.forEach((item) => {
    item.genres.forEach((genre) => {
      if (genre.id in itemsByGenreId) {
        itemsByGenreId[genre.id]["items"].push(item.id);
      } else {
        itemsByGenreId[genre.id] = {};
        itemsByGenreId[genre.id]["name"] = genre.name;
        itemsByGenreId[genre.id]["items"] = [item.id];
      }
    });
  });
  logger.debug(itemsByGenreId);
  for (id in itemsByGenreId) {
    const { items, name } = itemsByGenreId[id];
    if (items.length > 5) {
      let content = items.map((item) => ({ id: item, media_type: "movie" }));
      let list = {
        title: `${name} ${media_type}s`,
        api_name: "",
        content: content,
        genre: { id, name },
      };
      await saveList(list);
      logger.debug("saved ", list);
    }
  }
  logger.info("end - buildGenreLists");
};

const saveList = async (list) => {
  await new List(list).save();
};
