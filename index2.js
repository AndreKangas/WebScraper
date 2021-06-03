const axios = require("axios");
const cheerio = require("cheerio");

(async ()=> {
   for(let i = 1020; i>1010; i--){
      let response = await axios.get(`https://www.giantitp.com/comics/oots${i}.html`);
      const $ = cheerio.load(response.data);
      console.log($('tbody img').eq(17).attr('src'));
   }
})();

