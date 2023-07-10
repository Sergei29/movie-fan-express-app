const express = require("express");
const { fetchData } = require("../utils/fetch");
const { formatResults } = require("../utils/adaptors");
const { THE_MOVIE_DB_API_KEY, THE_MOVIE_DB_BASE_URL } = require("../constants");

const router = express.Router();

const nowPlayingUrl = `${THE_MOVIE_DB_BASE_URL}/movie/now_playing?api_key=${THE_MOVIE_DB_API_KEY}`;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const { data, error } = await fetchData(nowPlayingUrl, { method: "GET" });

  if (error) {
    res.render("error", { message: error });
    return;
  }

  res.render("index", { movies: formatResults(data.results) });
});

router.get("/movie/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;
  const movieUrl = `${THE_MOVIE_DB_BASE_URL}/movie/${movieId}?api_key=${THE_MOVIE_DB_API_KEY}`;
  const { data, error } = await fetchData(movieUrl, { method: "GET" });
  if (error) {
    res.render("error", { message: error, error });
    return;
  }

  console.log("data :>> ", data);

  res.render("single-movie");
});

module.exports = router;
