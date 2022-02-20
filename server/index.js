const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const listsRoute = require("./routes/lists");
const logger = require("./utils/logger");
const morgan = require("morgan");
const agenda = require("./utils/scheduler");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection successfull!");
  })
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/lists", listsRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
  logger.info("server is running", process.env.PORT);
});
