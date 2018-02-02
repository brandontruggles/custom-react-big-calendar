import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal,  ModalHeader, ModalBody, Button, Input, Label} from 'reactstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import Select from 'react-select';
import moment from 'moment';

import 'react-select/dist/react-select.css';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      startDate: moment(),
      endDate: moment(),
      startTime: moment(),
      endTime: moment(),
      recurringDays: [],
      recurringMonths: []
    };
    this.processNewEvent = this.processNewEvent.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleDaySelectChange = this.handleDaySelectChange.bind(this);
    this.handleMonthSelectChange = this.handleMonthSelectChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({title: "", description: "", startDate: moment(), endDate: moment(), startTime: moment(), endTime: moment(), recurringDays: [], recurringMonths: []});
  }

  processNewEvent() {
    var evt = {id: -1, title: this.state.title, start: this.state.startDate.toDate(), end: this.state.endDate.toDate(), startTime: this.state.startTime, endTime: this.state.endTime, recurringDays: this.state.recurringDays, recurringMonths: this.state.recurringMonths, desc: this.state.description};
    this.props.addEvent(evt);
  }

  handleStartChange(date) {
    this.setState({startDate: date});
  }

  handleEndChange(date) {
    this.setState({endDate: date});
  }

  handleStartTimeChange(time) {
    this.setState({startTime: time});
    this.props.forceOpen();
  }

  handleEndTimeChange(time) {
    this.setState({endTime: time});
    this.props.forceOpen();
  }

  handleDaySelectChange(options) {
    this.setState({recurringDays: options});
  }

  handleMonthSelectChange(options) {
    this.setState({recurringMonths: options});
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>New Calendar Event</ModalHeader>
        <ModalBody>
          <Label>Title:</Label>
          <Input placeholder="Your event title here..." onChange={(evt)=>{this.setState({title: evt.target.value})}}/>
          <Label>Description:</Label>
          <Input placeholder="Your event description here..." onChange={(evt)=>{this.setState({description: evt.target.value})}}/>
          <br/>
          <Label>Start Date: </Label><DatePicker selected={this.state.startDate} dateFormat="DD-MM-YYYY" onChange={this.handleStartChange}/>
          <br/>
          <Label>End Date: </Label><DatePicker selected={this.state.endDate} dateFormat="DD-MM-YYYY" onChange={this.handleEndChange}/>
          <br/>
          <Label>Start Time: </Label><TimePicker defaultValue={this.state.startTime} onChange={this.handleStartTimeChange}/>
          <br/>
          <Label>End Time:</Label><TimePicker defaultValue={this.state.endTime} onChange={this.handleEndTimeChange}/>
          <br/>
          <Label>Recurring Days:</Label><Select multi options={[{label: "Sunday", value: 0}, {label: "Monday", value: 1}, {label: "Tuesday", value: 2}, {label: "Wednesday", value: 3}, {label: "Thursday", value: 4}, {label: "Friday", value: 5}, {label: "Saturday", value: 6}]} onChange={this.handleDaySelectChange} value={this.state.recurringDays}/>
          <br/>
          <Label>Recurring Months:</Label><Select multi options={[{label: "January", value: 0}, {label: "February", value: 1}, {label: "March", value: 2}, {label: "April", value: 3}, {label: "May", value: 4}, {label: "June", value: 5}, {label: "July", value: 6}, {label: "August", value: 7}, {label: "September", value: 8}, {label: "October", value: 9}, {label: "November", value: 10}, {label: "December", value: 11}]} onChange={this.handleMonthSelectChange} value={this.state.recurringMonths}/>
          <br/>
          <Button color="success" onClick={this.processNewEvent}>Add Event</Button>
        </ModalBody>
      </Modal>
    );
  }
}

NewEventModal.defaultProps = {
  isOpen: false,
  toggleModal : null,
  addEvent: null,
  forceOpen: null
};

NewEventModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  addEvent: PropTypes.func,
  forceOpen: PropTypes.func
};
