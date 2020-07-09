const puppeteer = require('puppeteer');

// when headless state is false, you can preview the output on chromium browser. Yet it malfunctions.
// therefore keep headless state true to get the expected pdf output.
const headlessState = true;

puppeteer.launch({ headless: headlessState, args: ['--no-sandbox'] }).then(function(browser) {
    global.browser = browser;
    console.log('browser ready');
});