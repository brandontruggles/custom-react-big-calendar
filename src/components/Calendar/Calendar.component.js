import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

export default class Calendar extends BigCalendar {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <BigCalendar 
        events={this.props.events}
        onSelectEvent={this.props.onSelectEvent}
      />
    );
  }
}

Calendar.defaultProps = {
  events: [
           {id: 0, title: "test event", start: new Date(2018, 0, 21), end: new Date(2018, 0, 22), startTime: "00:00", endTime: "00:30", recurringDays: [0, 1], desc: "Description", category: "test"},
           {id: 1, title: "test event 2", start: new Date(2018, 0, 22), end: new Date(2018, 0, 23), startTime: "00:00", endTime: "00:30", recurringDays: [2, 4], desc: "Description", category: "test"}
          ],
  onSelectEvent:  null
};

Calendar.propTypes = {
    events: PropTypes.array,
    onSelectEvent: PropTypes.func
};
