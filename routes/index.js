const express = require("express");
const { fetchData } = require("../utils/fetch");
const { THE_MOVIE_DB_API_KEY, THE_MOVIE_DB_BASE_URL } = require("../constants");

const router = express.Router();

const nowPlayingUrl = `${THE_MOVIE_DB_BASE_URL}/movie/now_playing?api_key=${THE_MOVIE_DB_API_KEY}`;
const imageBaseUrl =
  "https://image.tmdb.org/t/p/w300/1E5baAaEse26fej7uHcjOgEE2t2.jpg";

/* GET home page. */
router.get("/", async (req, res, next) => {
  const { data, error } = await fetchData(nowPlayingUrl, { method: "GET" });
  console.log({ data, error });
  if (error) {
    res.render("error", { message: error });
    return;
  }

  res.json(data);
});

module.exports = router;
