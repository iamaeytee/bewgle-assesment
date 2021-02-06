const express = require('express');
const Data = require('./dataModel');

const app = express();

app.all('/process/*', (req, res) => {
    const start = process.hrtime.bigint();
    let isoDate = new Date();

    const day = isoDate.getDate();
    const month = isoDate.getMonth();
    const year = isoDate.getFullYear();

    const date = {
        day,
        month,
        year
    }
    

    
    setTimeout( async () => {
        const end = process.hrtime.bigint();
        
        const method = req.method;
        const headers = req.headers;
        const path = req.originalUrl;
        const query = req.query;
        const body = req.body;
        const duration = parseInt((end-start)/BigInt("1000000000"));

        await Data.create({ date, method, headers, path, query, body, duration });
        
        return res.status(200).json({ date, method, headers, path, query, body, duration: `${duration} seconds` });
    }, 15000 + Math.random() * (30 - 5) * 1000);
});

app.get('/stats', async (req, res) => {
    try {
        const { startDate, endDate, startYear, endYear } = req.query;

        const fromDate= parseInt(startDate);
        const toDate = parseInt(endDate);
        const fromYear = parseInt(startYear);
        const toYear = parseInt(endYear);

    if(Object.keys(req.query).length === 0){
        const data = await Data.aggregate([
            {
                $group: {
                    _id: '$method',
                    requestCount: {
                        $sum: 1
                    },
                    averageResponseTime: {
                        $avg: "$duration"
                    }
                }
            }
        ]);

        return res.send(data);
    }
    else if(req.query && startDate && endDate && startYear && endYear){
        const data = await Data.aggregate([
            {
                $match: {
                        $and: [{
                          'date.day': {
                                $gte: fromDate,
                                $lte: toDate
                            }
                        },
                        {
                          'date.year': {
                                $gte: fromYear,
                                $lte: toYear
                            }
                        }]
                      }
                },
            {
                $group: {
                    _id: "$method",
                    count: {
                        $sum: 1
                    },
                    avg: {
                        $avg: "$duration"
                    }
                }
            }
        ]);
        return res.send(data);
    }
    else if(!startDate || !endDate || !startYear || !endYear){
        return res.send(`If you are filtering based on date, please enter all fields (startDate, endDate, startYear, endYear)`)
    }
    } catch (error) {
        console.log(error);
        return res.send('something went wrong');
    }
});

module.exports = app;