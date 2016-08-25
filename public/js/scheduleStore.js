/**
 *
 * Redux-style store for managing Schedules
 *
 */

let {createStore} = require('redux'),
    reducers = require('./reducers');

const scheduleStore = createStore(reducers);


module.exports = scheduleStore;

