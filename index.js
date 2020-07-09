require('./config');

const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const slowDown = require("express-slow-down");
const upload = multer();
let app = express()
const port = process.env.PORT;

// boot up browser
require('./puppeteer');

require('./purge_expired');

if (process.env.TRUST_PROXY) { // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    app.enable("trust proxy");
}

const speedLimiter = slowDown({
  windowMs: 1000 * 60 * process.env.RATE_LIMIT_WINDOW, // [defaults to 60000 (1 minute)]
  delayAfter: process.env.RATE_LIMIT_DELAY_AFTER, // allow (N) requests [defaults to 1] to go at full-speed, then...
  delayMs: process.env.RATE_LIMIT_DELAY_MS // eg:- if given as 100, 2nd request has a 100ms delay, 3rd has a 200ms delay, 4th gets 300ms, etc. [defaults to Infinity]
});


app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(upload.array());
app.use(express.static('static'))

// activate request rate limiter by uncommenting below if service hosted with public access
// when uncommenting make sure to update env variables for speedlimiter accordingly (check .env.example)
// app.use(speedLimiter);

app = require('./routes').register(app);

app.use(express.static('static'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
