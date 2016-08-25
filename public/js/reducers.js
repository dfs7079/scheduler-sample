/**
 * Redux reducers for calculating application state changes
 *
 */

let {combineReducers} = require('redux');


/**
 * Helper to format a raw API response
 * @param routes
 * @returns {Array}
 */
function _parseArrivalsResponse(routes) {
    // converting API strings into convenient
    // data structures with hours, minutes properties
    let items = [];

    routes.forEach(r=>{
        items.push(
            r.map(
                time=> {
                    return {
                        h: time.split(':')[0],
                        m: time.split(':')[1]
                    };
                }
            )
        );
    });

    return items;
}

/**
 * Arrival times reducer
 *
 */
function arrivals(state = {}, action) {
    switch (action.type) {
        case 'FETCH_SCHEDULES':
            return {...state, arrivals: _parseArrivalsResponse(action.value)};
        break;
        case 'API_ERROR':
            return {...state, hasError:true, error: action.value};
        break;
    }
}

module.exports = combineReducers({
    arrivals
});