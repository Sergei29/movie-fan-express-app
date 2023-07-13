const express = require("express");
const { fetchData } = require("../utils/fetch");
const {
  formatResults,
  formatMovieDetails,
  formatQueryResults,
} = require("../utils/adaptors");
const { THE_MOVIE_DB_API_KEY, THE_MOVIE_DB_BASE_URL } = require("../constants");

const router = express.Router();

const nowPlayingUrl = `${THE_MOVIE_DB_BASE_URL}/movie/top_rated?api_key=${THE_MOVIE_DB_API_KEY}`;
const allMoviesUrl = `${THE_MOVIE_DB_BASE_URL}/movie?api_key=${THE_MOVIE_DB_API_KEY}`;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const { data, error } = await fetchData(allMoviesUrl, { method: "GET" });

  if (error) {
    res.render("error", {
      message: error || "Oups, an error occurred!",
      error: { status: error, stack: "" },
    });
    return;
  }

  res.render("index", { results: formatResults(data.results) });
});

router.get("/movie/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;
  const movieUrl = `${THE_MOVIE_DB_BASE_URL}/movie/${movieId}?api_key=${THE_MOVIE_DB_API_KEY}`;
  const { data, error } = await fetchData(movieUrl, { method: "GET" });

  if (error) {
    res.render("error", {
      message: error || "Oups, an error occurred!",
      error: { status: error, stack: "" },
    });
    return;
  }

  res.render("single-movie", { movie: formatMovieDetails(data) });
});

router.post("/search", async (req, res, next) => {
  const { cat, movieSearch } = req.body;

  const searchUrl = `${THE_MOVIE_DB_BASE_URL}/search/${cat}?query=${encodeURI(
    movieSearch,
  )}&api_key=${THE_MOVIE_DB_API_KEY}`;
  const { data, error } = await fetchData(searchUrl, { method: "GET" });

  if (error) {
    res.render("error", {
      message: error,
      error: { status: error, stack: "" },
    });
    return;
  }

  const { movies } = formatQueryResults(data.results, cat);

  res.render("index", { results: movies });
});

module.exports = router;
