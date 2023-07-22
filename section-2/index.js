
const express = require('express');
const app = express();
// function doWork(duration) {
//     const start = Date.now();
//     while (Date.now() - start < duration) {}
// }
app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Welcome Endpoint');
    })
});
app.get('/fast', (req, res) => {
    res.send('Fast API endpoint');
});
app.listen(8000, () => {
    console.log('listening on http://localhost:8000');
})