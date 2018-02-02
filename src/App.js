import React, { Component } from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import Calendar from './components/Calendar.component';
import EventModal from './components/EventModal.component';
import NewEventModal from './components/NewEventModal.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      newModalOpen: false,
      selectedEvent: null,
      events: [ 
           {id: 0, title: "test event", start: moment().toDate(), end: moment().toDate(), startTime: moment(), endTime: moment(), recurringDays: [0, 1], recurringMonths: [3,4], desc: "Description"},
           {id: 1, title: "test event 2", start: moment().toDate(), end: moment().toDate(), startTime: moment(), endTime: moment(), recurringDays: [2, 4], recurringMonths: [0], desc: "Description"}
      ]
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNewModal = this.toggleNewModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.forceOpen = this.forceOpen.bind(this);
  }

  toggleModal(evt) {
    if(!this.state.modalOpen) {
      this.setState({modalOpen: !this.state.modalOpen, selectedEvent: evt});
      console.log(evt);
    }
    else {
      this.setState({modalOpen: !this.state.modalOpen});
    }
  }

  toggleNewModal() {
    this.setState({newModalOpen: !this.state.newModalOpen});
  }

  addEvent(evt) {
    var events = this.state.events;
    evt["id"] = events.length;
    var recurringDays = evt["recurringDays"];
    var recurringDayValues = [];
    for(let obj of recurringDays) {
      recurringDayValues.push(obj["value"]);
    }
    evt["recurringDays"] = recurringDayValues;
    var recurringMonths = evt["recurringMonths"];
    var recurringMonthValues = [];
    for(let obj of recurringMonths) {
      recurringMonthValues.push(obj["value"]);
    }
    evt["recurringMonths"] = recurringDayValues;
    evt["start"].setHours(evt["startTime"].hours());
    evt["start"].setMinutes(evt["startTime"].minutes());
    evt["end"].setHours(evt["endTime"].hours());
    evt["end"].setMinutes(evt["endTime"].minutes());
    events.push(evt);
    this.setState({events: events});
    this.toggleNewModal();
  }

  forceOpen() {
    this.setState({newModalOpen: true});
  }

  render() {
    return (
      <div className="App">
        <h1>Calendar Test</h1>
        <div id="calendarDiv">
          <Calendar events={this.state.events} onSelectEvent={(evt) => {this.toggleModal(evt)}}/>
        </div>
        <Button id="eventButton" color="primary" onClick={this.toggleNewModal}>Add an Event</Button>
        <EventModal isOpen={this.state.modalOpen} toggle={this.toggleModal} evt={this.state.selectedEvent}/>
        <NewEventModal isOpen={this.state.newModalOpen} toggle={this.toggleNewModal} addEvent={this.addEvent} forceOpen={this.forceOpen}/>
      </div>
    );
  }
}

export default App;
