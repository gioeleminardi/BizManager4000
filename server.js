var app = require('./app/app');
var port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})