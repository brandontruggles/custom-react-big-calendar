import React, { Component } from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import Calendar from './components/Calendar/Calendar.component';
import EventModal from './components/Calendar/EventModal.component';
import NewEventModal from './components/Calendar/NewEventModal.component';
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
           {id: 0, title: "test event", start: moment().toDate(), end: moment().toDate(), startTime: moment(), endTime: moment(), recurringDays: [0, 1], desc: "Description"},
           {id: 1, title: "test event 2", start: moment().toDate(), end: moment().toDate(), startTime: moment(), endTime: moment(), recurringDays: [2, 4], desc: "Description"}
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
    if(evt["type"] === "BI") {
      var startDate = moment(evt["start"]);
      var endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        console.log(moment(startDate));
        startDate = startDate.add(1, "days");
        if(recurringDayValues.indexOf(startDate.day()) != -1) {
          var evtCopy = Object.assign({}, evt);
          evtCopy["start"] = startDate.toDate();
          evtCopy["end"] = startDate.toDate();
          events.push(evtCopy);
        }
      }
    }
    else if(evt["type"] === "Week") {
      var startDate = moment(evt["start"]);
      var endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        console.log(moment(startDate));
        startDate = startDate.add(1, "days");
        if(recurringDayValues.indexOf(startDate.day()) != -1) {
          var evtCopy = Object.assign({}, evt);
          evtCopy["start"] = startDate.toDate();
          evtCopy["end"] = startDate.toDate();
          events.push(evtCopy);
        }
      }
    }
    else if(evt["type"] === "Month") {
      var startDate = moment(evt["start"]);
      var endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        startDate = startDate.add(1, "month");
        var evtCopy = Object.assign({}, evt);
        evtCopy["start"] = startDate.toDate();
        evtCopy["end"] = startDate.toDate();
        events.push(evtCopy);
      }
    }
    else {
    events.push(evt);
    }
    //evt["start"].setHours(evt["startTime"].hours());
    //evt["start"].setMinutes(evt["startTime"].minutes());
    //evt["end"].setHours(evt["endTime"].hours());
    //evt["end"].setMinutes(evt["endTime"].minutes());
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
