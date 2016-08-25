/**
 *
 *
 */


let React = require('react'),
    store = require('./scheduleStore');


module.exports = React.createClass({

    getInitialState() {
        return {
            routeTimes: []
        };
    },

    componentDidMount() {
        this._longPoll = setInterval(()=>this.update(), 10000);
    },

    componentWillUnmount() {
        clearInterval(this._longPoll);
    },

    render() {
        let routeTimes = this.state.routeTimes,
            now = new Date(),
            listItems = [];

        now = {m: now.getMinutes(), h: now.getHours()};

        routeTimes.forEach((route,i) => {
            listItems.push(<li key={i}>
                {route.reduce(
                    (memo, t, i)=> { return memo + (t.m - now.m) + ' mins' + (i !== route.length-1 ? ' and ' : '') },
                    'Route ' + (i+1) + ' in ')}
                </li>);
        });


        return (
            <ul>
                {listItems}
            </ul>
        );
    },

    update() {
        store.dispatch('FETCH_SCHEDULES');
    }

});