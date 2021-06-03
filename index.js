const axios = require("axios");
const cheerio = require("cheerio");
const path = require('path');
const fs = require('fs');


async function download(url, filename){
  const writer = fs.createWriteStream(path.resolve(__dirname, filename));
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}


(async ()=> {
  for(let i = 1020; i>1015; i--) {
    try {
      let response = await axios.get(`https://www.giantitp.com/comics/oots${i}.html`);
      const $ = cheerio.load(response.data);
      let src = $('tbody img').eq(17).attr('src');
      console.log(src);
      let parts = src.split('/');
      await download(src, 'images/'+parts[parts.length-1])
    } catch (err) {
      console.log(err);
    }
    
  }

})();

