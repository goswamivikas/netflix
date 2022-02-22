const router = require("express").Router();
const verify = require("../verifyToken");
const axios = require("axios");
const List = require("../models/List");
const logger = require("../utils/logger");

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
  const { media_type, genre } = req.query;

  dbQuery = {};

  if (media_type) dbQuery["media_type"] = media_type;
  if (genre) dbQuery["genre.id"] = parseInt(genre);

  let list = await List.find(dbQuery).limit(10);

  if (!list) return res.status(404).json("no list present");
  return res.status(200).json(list);
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
