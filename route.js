const express = require('express');

const app = express();

app.all('/process/*', (req, res) => {
    const start = process.hrtime.bigint();
    const date = new Date().toString();
    setTimeout(() =>{
        const end = process.hrtime.bigint();
        const duration = `Time elapsed: ${(end-start)/BigInt("1000000000")} seconds`;
        console.log(`Time elasped ${duration} seconds`);
        res.status(200).json({method: req.method, url: req.originalUrl, query: req.query, body: req.body, headers: req.headers, date, duration });
    }, 5*1000);
});

module.exports = app;