const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const isNullOrUndefined = (value) =>
  typeof value === "undefined" || value === null;

const isEmpty = (value) => {
  if (isNullOrUndefined(value)) return true;
  if (value === "") return true;
  if (value instanceof Date) return false;
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

/**
 * @description formats the movies results received from the API payload
 * @param {{ adult: boolean;
 * backdrop_path: string;
 * genre_ids: number[];
 * id: number;
 * original_language: string;
 * original_title: string;
 * overview: string;
 * popularity: number;
 * poster_path: string;
 * release_date: string;
 * title: string;
 * video: boolean;
 * vote_average: number;
 * vote_count: number;}[]} results
 * @returns {{ adult: boolean;
 * backdrop_path: string;
 * genre_ids: number[];
 * id: number;
 * original_language: string;
 * original_title: string;
 * overview: string;
 * popularity: number;
 * poster_path: string;
 * release_date: string;
 * title: string;
 * video: boolean;
 * vote_average: number;
 * vote_count: number;}[]}
 */
const formatResults = (results) =>
  results.map((item) => ({
    ...item,
    poster_path: imageBaseUrl + item.poster_path,
  }));

const movieDetails = {
  adult: false,
  backdrop_path: "/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg",
  belongs_to_collection: {
    id: 84,
    name: "Indiana Jones Collection",
    poster_path: "/lpxDrACKJhbbGOlwVMNz5YCj6SI.jpg",
    backdrop_path: "/6kh59mZizZsttZPR0HAdXk6Ve2n.jpg",
  }, // | null
  budget: 60000000,
  genres: [
    { id: 14, name: "Fantasy" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
  homepage: "https://kotzmovie.com", // | null
  id: 455476,
  imdb_id: "tt6528290",
  original_language: "en",
  original_title: "Knights of the Zodiac",
  overview:
    "When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?",
  popularity: 3963.447,
  poster_path: "/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg",
  production_companies: [
    {
      id: 11341,
      logo_path: "/xytTBODEy3p20ksHL4Ftxr483Iv.png",
      name: "Stage 6 Films",
      origin_country: "US",
    },
    {
      id: 5542,
      logo_path: "/ayE4LIqoAWotavo7xdvYngwqGML.png",
      name: "Toei Animation",
      origin_country: "JP",
    },
  ],
  production_countries: [
    { iso_3166_1: "JP", name: "Japan" },
    { iso_3166_1: "US", name: "United States of America" },
  ],
  release_date: "2023-04-27",
  revenue: 6794519,
  runtime: 113,
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
  ],
  status: "Released",
  tagline: "Go beyond your destiny.",
  title: "Knights of the Zodiac",
  video: false,
  vote_average: 6.533,
  vote_count: 380,
};

/**
 * @description formats single movie payload received from api
 * @param { typeof movieDetails } movie
 * @returns { typeof movieDetails}
 */
const formatMovieDetails = (movie) => ({
  ...movie,
  poster_path: imageBaseUrl + movie.poster_path,
  production_companies: !isEmpty(movie.production_companies)
    ? movie.production_companies.map((current) => ({
        ...current,
        logo_path: imageBaseUrl + current.logo_path,
      }))
    : [],
  belongs_to_collection: !isEmpty(movie.belongs_to_collection)
    ? {
        ...movie.belongs_to_collection,
        poster_path: imageBaseUrl + movie.belongs_to_collection.poster_path,
        backdrop_path: imageBaseUrl + movie.belongs_to_collection.backdrop_path,
      }
    : {},
});

const searchResultActor = {
  adult: false,
  gender: 2,
  id: 287,
  known_for_department: "Acting",
  name: "Brad Pitt",
  original_name: "Brad Pitt",
  popularity: 54.389,
  profile_path: "/g9PlkwTqqXmBwAVqdJhQ4aTloO7.jpg",
  known_for: [
    {
      adult: false,
      backdrop_path: "/8pEnePgGyfUqj8Qa6d91OZQ6Aih.jpg",
      id: 16869,
      title: "Inglourious Basterds",
      original_language: "en",
      original_title: "Inglourious Basterds",
      overview:
        'In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as "The Basterds" are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis. The Basterds, lead by Lt. Aldo Raine soon cross paths with a French-Jewish teenage girl who runs a movie theater in Paris which is targeted by the soldiers.',
      poster_path: "/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
      media_type: "movie",
      genre_ids: [18, 53, 10752],
      popularity: 66.688,
      release_date: "2009-08-19",
      video: false,
      vote_average: 8.215,
      vote_count: 20386,
    },
  ],
};

/**
 * @param {(typeof searchResultActor)[]} results
 * @returns {(typeof searchResultActor)[]}
 */
const formatSearchResultActors = (results) =>
  results.map((actor) => ({
    ...actor,
    profile_path: imageBaseUrl + actor.profile_path,
    known_for: formatResults(actor.known_for),
  }));

/**
 * @param {{ adult: boolean;
 * backdrop_path: string;
 * genre_ids: number[];
 * id: number;
 * original_language: string;
 * original_title: string;
 * overview: string;
 * popularity: number;
 * poster_path: string;
 * release_date: string;
 * title: string;
 * video: boolean;
 * vote_average: number;
 * vote_count: number;}[]|(typeof searchResultActor)[]} results
 * @param {"movie"|"person"} category
 * @returns {{ movies: ReturnType<typeof formatResults>|null; actors: ReturnType<typeof formatSearchResultActors>|null; }}
 */
const formatQueryResults = (results, category = "movie") => {
  const actors =
    category === "person" ? formatSearchResultActors(results) : null;
  return {
    movies:
      category === "movie"
        ? formatResults(results)
        : actors.reduce((allMovies, { known_for }) => {
            return [...allMovies, ...known_for];
          }, []),
    actors,
  };
};

module.exports = {
  formatResults,
  formatMovieDetails,
  formatQueryResults,
  imageBaseUrl,
  isNullOrUndefined,
  isEmpty,
};
