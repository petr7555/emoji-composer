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

app.get('/emoji/:emojiName/:vendor', async (req, res, next) => {
  try {
    // Get URL params
    const emojiName = req.params.emojiName;
    const vendor = req.params.vendor;

    // Get Emojipedia page for given emoji
    let html;
    try {
      const { data } = await axios.get(`https://emojipedia.org/${encodeURIComponent(emojiName)}/`);
      html = data;
    } catch (e: unknown) {
      let message = e;
      if (axios.isAxiosError(e)) {
        message = e.message;
      }
      return res.status(404).send(message);
    }

    const $ = cheerio.load(html);
    const imgTags = $('.vendor-image > img');

    const sources = [...imgTags].map((el) => {
      return el.attribs.src;
    });

    const vendorSrc = sources.filter((src) => {
      return src.includes(vendor);
    })[0];

    res.send(vendorSrc);
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
