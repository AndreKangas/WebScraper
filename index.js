const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://www.giantitp.com/Comics.html").then((response) => {
  const $ = cheerio.load(response.data);
  console.log($('.NoIndent img').attr('src'));
});
