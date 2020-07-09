# Puppeteer HTML to PDF converter REST API

This is a html to pdf converter rest api which converts web pages to pdfs using the headless chrome instance powered by [Puppeteer](https://github.com/GoogleChrome/puppeteer).


## Usage
### `POST /generate`

**Parameters**

The api doesn't care much how you send the parameters. Wether it's form-data form-urlencoded or as raw json. It's all welcome here.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | **Required if no html**. The url of the webpage to convert to pdf |
| `html` | `string` | **Required if no url**. The html to convert to pdf |
| `file` | `string` | **Required if no html or url**. The template and value information to create pdf |
| `scale` | `string` | **Optional**. Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2 |
| `displayHeaderFooter` | `boolean` | **Optional**. Display header and footer. Defaults to `false ` |
| `headerTemplate` | `string` | **Optional**. HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them: `date`, `title`, `url`, `pageNumber`, `totalPages` |
| `footerTemplate` | `string` | **Optional**. HTML template for the print footer. Should use the same format as the `headerTemplate` |
| `printBackground` | `boolean` | **Optional**. Print background graphics. Defaults to `false` |
| `landscape` | `boolean` | **Optional**. Paper orientation. Defaults to `false` |
| `pageRanges` | `string` | **Optional**. Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages |
| `format` | `string` | **Optional**. Paper format. If set, takes priority over width or height options. Defaults to 'Letter' |
| `width` | `integer` | **Optional**. Paper width, accepts values labeled with units |
| `height` | `integer` | **Optional**. Paper height, accepts values labeled with units |
| `margin.top` | `integer` | **Optional**. Top margin, accepts values labeled with units |
| `margin.right` | `integer` | **Optional**. Right margin, accepts values labeled with units |
| `margin.bottom` | `integer` | **Optional**. Bottom margin, accepts values labeled with units |
| `margin.left` | `integer` | **Optional**. Left margin, accepts values labeled with units |
| `preferCSSPageSize` | `boolean` | **Optional**. Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size |

Following examples is using 'curl' on terminal

**Example 1** 
```
curl -H "Content-Type: application/json" -X POST \
-d '{"url":"http://google.com"}' \
<BASE_URL>/generate
```

**Example 2** 
```
curl -H "Content-Type: application/json" -X POST \
-d '{"html":"<h1>This is some title</h1>"}' \
<BASE_URL>/generate
```

**Example 3** 
```
curl -H "Content-Type: application/json" -X POST \
-d '{"file": { "template": "exTemplateBootstrap.js", "title": "This is some title" } }' \
<BASE_URL>/generate
```


**Response**

If the request was succesful the response will look like this:
```
{
    "success": true,
    "url": "https://<BASE_URL>/exports/<AUTO_GENERATED_FILE_NAME>.pdf",
    "path": "/exports/<AUTO_GENERATED_FILE_NAME>.pdf",
    "expires": 1564590505
}
```

If one of the parameters was invalid the request will look something like:
```
{
    "success": true,
    "errors": {
        "errors": [
            {
                "msg": "Must provide either url or html or file",
                "param": "url_html_file",
                "location": "body"
            }
        ]
    }
}
```

## Installation

Aside from the option to deploy this project on Heroku the instruction below is meant for either a local or standalone setup.

1. Clone the repo
2. Navigate in the project directory
```
cd pdf-generate-service
```
3. Install the npm dependencies
```
npm install
```
4. Copy the contents of [config-example.json](config-example.json) and place them in a new config.json
```
cp config-example.json config.json
```
5. Fill in the config.json with your configuration
6. Run the app
```
npm run start
```

## Technologies
[puppeteer](https://github.com/GoogleChrome/puppeteer)

[expressjs](https://github.com/expressjs/express)

[express-slow-down](https://github.com/nfriedly/express-slow-down)

[express-validator](https://github.com/express-validator/express-validator)

[cors](https://github.com/expressjs/cors)

[multer](https://github.com/expressjs/multer)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)