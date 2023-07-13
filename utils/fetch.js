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
    let message = error instanceof Error ? error.message : error.toString();
    if (typeof message !== "string") {
      message = "Request failed";
    } else if (message.trim() === "0") {
      message = "Not found";
    }

    return {
      data: null,
      error: message,
    };
  }
};

module.exports = { fetchData };
