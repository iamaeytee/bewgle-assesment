const express = require('express');
const Data = require('./dataModel');

const app = express();

app.all('/process/*', (req, res) => {
    const start = process.hrtime.bigint();
    const date = new Date().toISOString();
    
    setTimeout( async () => {
        const end = process.hrtime.bigint();
        
        const method = req.method;
        const headers = req.headers;
        const path = req.originalUrl;
        const query = req.query;
        const body = req.body;
        const duration = parseInt((end-start)/BigInt("1000000000"));

        await Data.create({ date, method, headers, path, query, body, duration });
        
        res.status(200).json({ date, method, headers, path, query, body, duration: `${duration} seconds` });
    }, 5000 + Math.random() * (30 - 5) * 1000);
});


module.exports = app;