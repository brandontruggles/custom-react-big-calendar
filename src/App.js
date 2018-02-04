import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NCalendar from './components/Calendar.component';
import EventModal from './components/EventModal.component';
import NewEventModal from './components/NewEventModal.component';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen     : false,
      newModalOpen  : false,
      selectedEvent : null,
      events        : [ 
           {id: 0, title: "test event", start: moment().toDate(), end: moment().toDate(), startTime: moment().hours() * 3600, endTime: moment().hours() * 3600 + 5 * 60, recurringDays: [0, 1], desc: "Description", color: "#FF0000"},
           {id: 1, title: "test event 2", start: moment().toDate(), end: moment().toDate(), startTime: moment().add(1, "hours").hours() * 3600, endTime: moment().add(1, "hours").hours() * 3600 + 5 * 60, recurringDays: [2, 4], desc: "Description"}
      ]
    };
  }

  toggleModal = (evt) => {
    if(!this.state.modalOpen) {
      this.setState({modalOpen: !this.state.modalOpen, selectedEvent: evt});
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
    evt["start"].setHours(Math.floor(evt["startTime"]/3600));
    evt["start"].setMinutes(evt["startTime"]%(3600 * Math.floor(evt["startTime"]/3600))/60);
    evt["end"].setHours(Math.floor(evt["endTime"]/3600));
    evt["end"].setMinutes(evt["endTime"]%(3600 * Math.floor(evt["endTime"]/3600))/60);
    var recurringDays = evt["recurringDays"];
    var recurringDayValues = [];
    for(let obj of recurringDays) {
      recurringDayValues.push(obj["value"]);
    }
    evt["recurringDays"] = recurringDayValues;
    if(evt["type"] === "BI") {
      let startDate = moment(evt["start"]);
      let startDateDay = startDate.day();
      let endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        if(recurringDayValues.indexOf(startDate.day()) !== -1) {
          let evtCopy = Object.assign({}, evt);
          evtCopy["start"] = startDate.toDate();
          evtCopy["end"] = startDate.toDate();
          events.push(evtCopy);
        }
        let nextDateDay = startDate.add(1, "days").day();
        if(nextDateDay === startDateDay) {
            startDate = startDate.add(8, "days");
        }
        else {
            startDate = startDate.add(1, "days");
        }
      }
    }
    else if(evt["type"] === "Week") {
      let startDate = moment(evt["start"]);
      let endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        if(recurringDayValues.indexOf(startDate.day()) !== -1) {
          let evtCopy = Object.assign({}, evt);
          evtCopy["start"] = startDate.toDate();
          evtCopy["end"] = startDate.toDate();
          events.push(evtCopy);
        }
        startDate = startDate.add(1, "days");
      }
    }
    else if(evt["type"] === "Month") {
      let startDate = moment(evt["start"]);
      let endDate = moment(evt["end"]);
      while(startDate.isBefore(endDate)) {
        let evtCopy = Object.assign({}, evt);
        evtCopy["start"] = startDate.toDate();
        evtCopy["end"] = startDate.toDate();
        events.push(evtCopy);
        startDate = startDate.add(1, "month");
      }
    }
    else {
    events.push(evt);
    }
    this.setState({events: events});
    this.close();
  }

  deleteEvent = (id) => {
    for(var evt of this.state.events) {
      if(evt["id"] === id) {
      
      }
    }
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

