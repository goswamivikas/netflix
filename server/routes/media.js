const router = require("express").Router();
const Movie = require("../models/Movie");
const Tv = require("../models/Tv");
const verify = require("../verifyToken");
const axios = require("axios");
const logger = require("../utils/logger");
const Trending = require("../models/Trending");

//GET RANDOM
router.get("/random", verify, async (req, res) => {
  const { media_type, genreId } = req.query;
  dbQuery = {};
  if (media_type) dbQuery["media_type"] = media_type;
  if (genreId) dbQuery["genre_ids"] = parseInt(genreId);
  console.log(dbQuery);
  const [media] = await Trending.aggregate([
    { $match: dbQuery },
    { $sample: { size: 1 } },
  ]);
  if (!media) return res.status(404).json("no media present");
  return res.status(200).json(media);
});

router.get("/:id", verify, async (req, res) => {
  const { media_type, genre } = req.query;
  const id = parseInt(req.params?.id);
  console.log(id);
  const Media = media_type === "tv" ? Tv : Movie;

  const [media] = await Media.aggregate([
    { $match: { id } },
    { $unwind: { path: "$videos", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        $or: [
          { "videos.site": /youtube/i, "videos.type": /trailer/i },
          { videos: { $exists: false } },
        ],
      },
    },
    { $limit: 1 },
  ]);
  if (!media) return res.status(404).json("no media present");
  return res.status(200).json(media);
});

router.get("/:id/video", verify, async (req, res) => {
  const { media_type, genre } = req.query;
  const id = parseInt(req.params?.id);
  console.log(id);
  const Media = media_type === "tv" ? Tv : Movie;

  const [media] = await Media.aggregate([
    { $match: { id } },
    { $unwind: { path: "$videos", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        $or: [
          { "videos.site": /youtube/i, "videos.type": /trailer/i },
          { videos: { $exists: false } },
        ],
      },
    },
    { $limit: 1 },
  ]);
  if (!media?.videos) return res.status(404).json("no media present");
  return res.status(200).json(media?.videos);
});

module.exports = router;
