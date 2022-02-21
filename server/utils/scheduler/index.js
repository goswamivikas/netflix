const Agenda = require("agenda");
const tmdbSync = require("./tmdbSync");
require("dotenv").config();

const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URL,
    collection: "agendaJobs",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
});

tmdbSync(agenda);

(async function () {
  // IIFE to give access to async/await
  // await agenda.start();
  // await agenda.now("sync tmdb");
  // await agenda.now("build netflix lists");
})();

module.exports = agenda;
