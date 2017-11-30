'use strict';
const dotenv = require('dotenv'),
    fs = require('fs'),
    https = require('https');

dotenv.load();

const httpsOption = {
    key: fs.readFileSync('secure/key.pem'),
    cert: fs.readFileSync('secure/cert.pem'),
    passphrase: process.env.CERT_PASSPHRASE || ''
}

const app = require('./app/app');
const port = process.env.PORT || 3000;

const secureServer = https.createServer(httpsOption, app).listen(port, () => {
    console.log(`Listening on port ${port}`);
});