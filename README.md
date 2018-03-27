custom-react-big-calendar
===

A custom implementation of [react-big-calendar](https://github.com/intljusticemission/react-big-calendar) for a personal project of mine. This implementation supports dynamically adding events with the use of a modal which presents the user with a series of options. Recurring events are also supported.

Installation/Usage
==

1. Download the source code for the project or clone it with `git clone https://github.com/brandonrninefive/custom-react-big-calendar.git`.

2. From within the root project directory, use `yarn install` or `npm install` to install the project dependencies.

3. Use `yarn start` or `npm run start` to start the project server.

4. Open your browser and visit `localhost:3000` to test the project.

Supported Options
==

- Event Type: Either Single, Weekly, BI-Weekly, or Monthly.

- Title: The title of your calendar event.

- Description: A short description of your event.

- Event Date: The date of your event in the case that it is either a Single event or Monthly event. Otherwise, this is the start date of your event.

- End Date: The end date for your event if its event type is either Weekly or BI-Weekly.

- Starting Time: The starting time for your event.

- Ending Time: The ending time for your event.

- Recurring Days: In the case that your event is either Weekly or BI-Weekly, these are the days of the week that it will recur on.

Components
==

- Calendar.component.js: The modified [react-big-calendar](https://github.com/intljusticemission/react-big-calendar) component. Most of the project code resides here.

- EventModal.component.js: The modal that appears when you click on an event in the calendar.

- NewEventModal.component.js: The modal that appears when you click the "Add an Event" button below the calendar.
