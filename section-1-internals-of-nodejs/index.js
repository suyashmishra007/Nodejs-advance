process.env.UV_THREADPOOL_SIZE=1

const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const start = Date.now();

const doRequest = function() {
    https.request('https://www.google.com', (res, err) => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('Req ',Date.now() - start);
        })
    }).end();
}

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash ', Date.now() - start);
    })
}

doRequest();

fs.readFile('eventLoop.js', 'utf8', (err, data) => {
    console.log("FS ",Date.now()-start);
})

doHash();
doHash();
doHash();
doHash();