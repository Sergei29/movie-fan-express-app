require("dotenv").config();

const getEnvVariable = (name) => {
  try {
    return process.env[name];
  } catch (error) {
    throw error;
  }
};

const PORT = getEnvVariable("PORT");
const NODE_ENV = getEnvVariable("NODE_ENV");
const THE_MOVIE_DB_BASE_URL = getEnvVariable("THE_MOVIE_DB_BASE_URL");
const THE_MOVIE_DB_API_KEY = getEnvVariable("THE_MOVIE_DB_API_KEY");
const THE_MOVIE_DB_READ_ACCESS_TOKEN = getEnvVariable(
  "THE_MOVIE_DB_READ_ACCESS_TOKEN",
);

module.exports = {
  PORT,
  NODE_ENV,
  THE_MOVIE_DB_BASE_URL,
  THE_MOVIE_DB_API_KEY,
  THE_MOVIE_DB_READ_ACCESS_TOKEN,
};
