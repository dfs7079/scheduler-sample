/**
 * scheduler server side app
 *
 */
const express = require('express'),
      ScheduleReporter = require('./lib/ScheduleReporter');

let app = express();

// set up route for getting arrival schedules
app.get('/schedule/:count', (req, res, next)=> {
    console.log('get /schedule/' + req.params.count);

    res.json({
        arrivals:  ScheduleReporter.getAllRouteTimes(req.params.count)
        //ScheduleReporter._getArrivalTime(new Date(1472005866263), 0)
    });
});

// serve static files
app.use('/public/build', express.static(__dirname + '/public/build'));
app.use('/public/css', express.static(__dirname + '/public/css'));

// serve index.html
app.get('/', (req, res, next) => res.sendFile(__dirname + '/index.html'));


// start server
app.listen(8080, ()=> console.log('server.js started listening on port 8080'));




