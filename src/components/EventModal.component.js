import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal,  ModalHeader, ModalBody} from 'reactstrap';

export default class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    var title = "";
    var desc = "";
    var startDate = "";
    var endDate = "";
    var startTime = "";
    var endTime = "";
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var recurringDays = [];
    var recurringMonths = [];
    if(this.props.evt != null) {
      title = this.props.evt.title;
      desc = this.props.evt.desc;
      var dateEndIndex = this.props.evt.start.toString().indexOf(":") - 3;
      startDate = this.props.evt.start.toString().substring(0, dateEndIndex);
      dateEndIndex = this.props.evt.end.toString().indexOf(":") - 3;
      endDate = this.props.evt.end.toString().substring(0, dateEndIndex);
      startTime = this.props.evt.startTime.hour() + ":" + this.props.evt.startTime.minute();
      endTime = this.props.evt.endTime.hour() + ":" + this.props.evt.endTime.minute();
      for(var day of this.props.evt.recurringDays) {
        recurringDays.push(days[day]);
      }
      for(var month of this.props.evt.recurringMonths) {
        recurringMonths.push(months[month]);
      }
    }
    var recurringDaysElement = (<p></p>);
    if(recurringDays.length !== 0) {
      recurringDaysElement = (<p>Recurring Days: {recurringDays.toString()}</p>);
    }
    var recurringMonthsElement = (<p></p>);
    if(recurringMonths.length !== 0) {
      recurringMonthsElement = (<p>Recurring Months: {recurringMonths.toString()}</p>);
    }
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{title}</ModalHeader>
        <ModalBody>
          <p>Description: {desc}</p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          {recurringDaysElement}
          {recurringMonthsElement}
        </ModalBody>
      </Modal>
    );
  }
}

EventModal.defaultProps = {
  isOpen: false,
  toggleModal : null,
  evt: null
};

EventModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  evt: PropTypes.object
};
