const fetch = require("node-fetch");

/**
 * @description fetch json type data
 * @param { string } url
 * @param { RequestInit } options
 */
const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.statusText | "Request failed");
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : error.toString(),
    };
  }
};

module.exports = { fetchData };
