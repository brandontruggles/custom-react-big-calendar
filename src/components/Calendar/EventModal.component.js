
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-bootstrap';

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
    var recurringDays = [];
    if(this.props.evt != null) {
      title = this.props.evt.title;
      desc = this.props.evt.desc;
      var dateEndIndex = this.props.evt.start.toString().indexOf(":") - 3;
      startDate = this.props.evt.start.toString().substring(0, dateEndIndex);
      dateEndIndex = this.props.evt.end.toString().indexOf(":") - 3;
      endDate = this.props.evt.end.toString().substring(0, dateEndIndex);
      startTime = this.props.evt.startTime;
      endTime = this.props.evt.endTime;
      for(var day of this.props.evt.recurringDays) {
        recurringDays.push(days[day]);
      }
    }
    var recurringElement = (<p></p>);
    if(recurringDays.length !== 0) {
      recurringElement = (<p>Recurring Days: {recurringDays.toString()}</p>);
    }
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close} >
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <p>Description: {desc}</p>
          <p>Start Date: {startDate.toString()}</p>
          <p>End Date: {endDate.toString()}</p>
          <p>Start Time: {moment().seconds(startTime).format("H:mm")}</p>
          <p>End Time: {moment().seconds(endTime).format("H:mm")}</p>
          {recurringElement}
        </Modal.Body>
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

