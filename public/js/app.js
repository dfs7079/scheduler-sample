/**
 * client app entry point
 *
 */

let React = require('react'),
    ReactDOM = require('react-dom'),
    Layout = require('./layout.jsx'),
    request = require('superagent'),
    store = require('./scheduleStore');

let main = document.getElementById('content');

ReactDOM.render(
    React.createElement(Layout, {...res.body}),
    main
);

request.get('/schedule/2')
    .end((err, res) => {
        if (!err) {
            store.dispatch('FETCH_SCHEDULES', res.body);
        } else {
            store.dispatch('API_ERROR', err)
        }
    });


