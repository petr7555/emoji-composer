import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
app.use(cors());

const port = 5001;

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/emoji/:emojiName/:vendor', async (req, res) => {
  // Get URL params
  const emojiName = req.params.emojiName;
  const vendor = req.params.vendor;

  // Get Emojipedia page for given emoji
  const { data: html } = await axios.get(`https://emojipedia.org/${encodeURIComponent(emojiName)}/`);

  const $ = cheerio.load(html);
  const imgTags = $('.vendor-image > img');

  const sources = [...imgTags].map((el) => {
    return el.attribs.src;
  });

  const vendorSrc = sources.filter((src) => {
    return src.includes(vendor);
  })[0];

  res.send(vendorSrc);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
