/**
 *
 * reports schedule times
 *
 */

const VALID_ROUTES = [1,2,3];


class ScheduleReporter {

    constructor() {

    }

    /**
     * Get closest arrival time based on route offset.
     *
     * @param minutes  minutes on the hour to get closest arrival time
     * @param route    0 based route number
     * @returns {number}
     * @private
     */
    _getClosestRouteMinutes(minutes, route) {
        let routeMins =  Math.floor(minutes / 15) * 15 + route * 2;

        if (minutes < routeMins) {
            return routeMins;
        }

        // return next interval
        return routeMins + 15;
    }

    /**
     *
     * @param time:Date
     * @param route:Number
     * @returns String
     */
    _getArrivalTime(time, route) {
        if (!time instanceof Date) {
            return 'ScheduleReporter::_getArrivalTime  Invalid time argument: `' + time + '`, expected Date';
        }
        if (isNaN(route) || route === 0 || !route in VALID_ROUTES) {
            return 'ScheduleReporter::_getArrivalTime  Invalid route argument: `' + route + '`, expected Number, accepted routes [' + VALID_ROUTES.toString() + ']';
        }

        let minutes = time.getMinutes(),
            hours = time.getHours();

        // find closest arrival time in minutes
        minutes = this._getClosestRouteMinutes(minutes, route-1);

        // adjust for next hour arrival times
        if (minutes >= 60) {
            minutes %= 60;
            hours++;
        }

        // format minute readout
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        // format to 12hr clock
        hours = hours % 12;

        // midnight
        if (hours === 0) {
            hours = 12;
        }

        return (hours + ':' + minutes);
    }

    /**
     * Return an array of next numTimes arrival times by route
     *
     * @param route
     * @param numTimes
     * @returns {Array}
     */
    _getNextArrivalTimes(route, numTimes) {
        let now = new Date(),
            time,
            out = [];

        for (let i=0; i < numTimes; i++) {
            time = new Date(now.valueOf() + 15*60*1000*i);
            out.push(this._getArrivalTime(time, route));
        }

        return out;
    }

    /**
     * Return next numTimes arrival times for all routes in the system
     *
     * @param numTimes
     * @returns {Array}
     */
    getAllRouteTimes(numTimes) {
        return VALID_ROUTES.map(r => this._getNextArrivalTimes(r, numTimes));
    }

}

module.exports = new ScheduleReporter();