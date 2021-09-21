const express = require('express')
const cors = require('cors')
const axios = require("axios");
const cheerio = require("cheerio");

const app = express()
app.use(cors())

const port = 5001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/emoji/:emojiName', async (req, res) => {
    const {data} = await axios.get(`https://emojipedia.org/${req.params.emojiName}/`);
    const $ = cheerio.load(data);
    const imgTags = $(".vendor-image > img");
    const sources = [...imgTags].map( el => el.attribs.src);
    const appleSrc = sources.filter(src => src.includes("apple"))[0];

    res.send(appleSrc);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
