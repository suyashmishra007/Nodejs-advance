const express = require('express');
const app = express();

function doWork(duration){
    const start = Date.now();
    while(Date.now() - start < duration){}
}
app.get('/', (req, res) => {
    doWork(5000);
    res.send('Welcome')
});

app.listen(8000,()=>{
    console.log('listening on http://localhost:8000');
})