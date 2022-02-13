const router = require("express").Router();
const verify = require("../verifyToken");
const axios = require("axios");
const List = require("../models/List");

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("list has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

router.get("/", verify, async (req, res) => {
  const mediaTypeQuery = req.query.type;
  const genreQuery = req.query.genre;
  console.log("get lists", { mediaTypeQuery, genreQuery });
  let list = [];
  try {
    if (mediaTypeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          {
            $sample: { size: 10 },
          },
          { $match: { mediaType: mediaTypeQuery, genre: genreQuery } },
        ]);
      } else {
        console.log("mediaquery only");
        list = await List.aggregate([
          {
            $sample: { size: 10 },
          },
          { $match: { mediaType: mediaTypeQuery } },
        ]);
        console.log({ list });
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can update only your account!");
  }
});

module.exports = router;
