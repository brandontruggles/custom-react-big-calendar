
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NCalendar from './Calendar/Calendar.component';
import EventModal from './Calendar/EventModal.component';
import NewEventModal from './Calendar/NewEventModal.component';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen     : false,
      newModalOpen  : false,
      selectedEvent : null,
      events        : [ 
           {id: 0, title: "test event", start: new Date(2018, 0, 21), end: new Date(2018, 0, 22), startTime: "00:00", endTime: "00:30", recurringDays: [0, 1], desc: "Description"},
           {id: 1, title: "test event 2", start: new Date(2018, 0, 22), end: new Date(2018, 0, 23), startTime: "00:00", endTime: "00:30", recurringDays: [2, 4], desc: "Description"}
      ]
    };
  }

  toggleModal = (evt) => {
    if(!this.state.modalOpen) {
      this.setState({modalOpen: !this.state.modalOpen, selectedEvent: evt});
      //console.log(evt);
    }
    else {
      this.setState({modalOpen: !this.state.modalOpen});
    }
  }

  toggleNewModal = () => {
    this.setState({newModalOpen: !this.state.newModalOpen});
  }

  addEvent = (evt) => {
    var events = this.state.events;
    evt["id"] = events.length;
    events.push(evt);
    this.setState({events: events});
    this.toggleNewModal();
  }

  close = () => {
    this.setState({newModalOpen: false, modalOpen: false});
  }

  render() {
    return (
      <div className="App">
        <h1>Calendar Test</h1>
        <div id="calendarDiv">
          <NCalendar events={this.state.events} onSelectEvent={(evt) => {this.toggleModal(evt)}}/>
        </div>
        <Button id="eventButton" bsStyle = "primary" onClick={this.toggleNewModal}>Add an Event</Button>
        <EventModal isOpen={this.state.modalOpen} toggle={this.toggleModal} evt={this.state.selectedEvent} close={this.close} />
        <NewEventModal isOpen={this.state.newModalOpen} toggle={this.toggleNewModal} addEvent={this.addEvent} close={this.close}/>
      </div>
    );
  }
}

