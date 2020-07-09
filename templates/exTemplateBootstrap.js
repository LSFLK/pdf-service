
const baseURL = process.env.BASE_URL;

module.exports = (data) => {
    return (
        `
        <!doctype html>
        <html lang="en">
        <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="${baseURL}/css/bootstrap.min.css" >
        </head>
        <body>
            <div class="container">
                <div class="jumbotron">
                    <h1 class="display-4">${data.title}</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr class="my-4">
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
            </div>
        </body>
        </html>
        `
    );
}