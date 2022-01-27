import _ from 'lodash';
import {
  addDays,
  getDaysInMonth,
  isBefore,
  compareAsc,
  isSameDay,
  lastDayOfMonth,
  startOfHour,
  subDays,
} from 'date-fns/esm';
import iCalJs from 'ical.js';
import { Text, View } from '@nodegui/react-nodegui';
import React, { useEffect, useState } from 'react';
import store from '../../store/index';
import EventDetail from './EventDetail';

const calendarHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendarStyle = `
  #event {
    flex-direction: column; 
  }

  #date {
    color: #FFF;
    font-style:italic;
    font-size: .9em;
    text-transform: uppercase; 
  }

  #summary {
    color: #FFF;
  }
  
  #calendar {
    display: flex;
    width: 294px;
    height: 294px;
    flex-direction: row;
    flex-wrap: wrap;
  }

  #calendar-header,
  #day-current-day,
  #day-current-month,
  #day-next-month,
  #day-last-month {
    font-size: 8px;
    width: 38px;
    height: 38px;
    margin: 2px;
  }
    
  #calendar-header {
    color: #555555;
    text-transform: uppercase;
    qproperty-alignment: AlignBottom AlignCenter; 
  }

  #day-current-day,
  #day-current-month,
  #day-next-month,
  #day-last-month {
    qproperty-alignment: AlignTop AlignLeft; 
  }

  #day-current-month {
    background-color: #111111;
    color: #FFFFFF;
  }

  #day-current-day {
    background-color: #FFFFFF;
    color: #000000;
    font-weight: bold;
  }
  
  #day-next-month,
  #day-last-month {
    color: #555555;
  }

  #upcoming-events-title {
    color: #FFF;
    font-size: 1.2em;
    font-weight: bold;
    border-bottom: 1px solid #FFFFFF;
    padding-bottom: 2px;
    margin-bottom: 5px;
  }

  #upcoming-events {
    width: 294px;
  }
`;

function Calendar() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchCalendars = async () => {
      // Fetch the calendars first
      await store.iCloud.fetchCalendars();

      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      // Get the number of days displayed on the calendar widget
      const startDate = subDays(
        firstDayOfMonth,
        firstDayOfMonth.getDay()
      ).toISOString();
      // Get the number of days for the next month + a week
      const lastDayOfCurMonth = lastDayOfMonth(firstDayOfMonth);
      const endDate = addDays(
        lastDayOfCurMonth,
        6 + 7 - lastDayOfCurMonth.getDay()
      ).toISOString();

      // Next get all of the upcoming calendar objects (events)
      let calendarObjectsByCalendar = await Promise.all(
        _.get(store, 'config.calendars', []).map(({ url }) => {
          const calendar = store.iCloud.findCalendar({ url });
          return store.iCloud.fetchCalendarObjects(calendar, {
            start: startDate,
            end: endDate,
          });
        })
      );
      calendarObjectsByCalendar = _.flatten(calendarObjectsByCalendar);

      calendarObjectsByCalendar = calendarObjectsByCalendar.map(({ data }) => {
        const jcalData = iCalJs.parse(data);
        const vCalendar = new iCalJs.Component(jcalData);
        return new iCalJs.Event(vCalendar.getFirstSubcomponent('vevent'));
      });

      // eslint is throwing a tantrum here
      calendarObjectsByCalendar = _.sortBy(
        calendarObjectsByCalendar,
        (event) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          event.startDate.toJSDate()
        // eslint-disable-next-line function-paren-newline
      );

      setCalendarEvents(calendarObjectsByCalendar);
      // Calendar Update Interval
      // const timeInterval = setInterval(async () => {
      //   const calendars = await store.iCloud.fetchCalendars();
      //   // 1 Minute Updates
      // }, 60000);

      // return () => {
      //   clearInterval(timeInterval);
      // };
    };

    fetchCalendars();

    // Calendar View Update Interval
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [setCurrentTime]);

  const getEventsOnDate = (date) =>
    calendarEvents.filter((event) =>
      isSameDay(date, event.startDate.toJSDate())
    );

  /**
   * Calculated the days needed to populate the calendar
   *
   * @param {Date} currentDate The current date to display on the calendar
   * @returns {object[]} Array of calendar dates with text, styling id, the date, and a key
   */
  function getCalendarDays(currentDate) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth);
    const days = [];
    // Add Last Month days
    for (let i = 0; i < firstDayOfMonth.getDay(); i += 1) {
      const date = subDays(firstDayOfMonth, firstDayOfMonth.getDay() - i);
      const events = getEventsOnDate(date);
      const eventDots = _.fill(Array(events.length), '·').join('');
      const text = `${date.getDate()}\n${eventDots}`;
      days.push({
        date,
        text,
        events,
        id: 'day-last-month',
        key: date.toISOString(),
      });
    }

    // Add Current Month
    for (let i = 0; i < getDaysInMonth(currentDate); i += 1) {
      const date = new Date(currentYear, currentMonth, i + 1);
      const events = getEventsOnDate(date);
      const eventDots = _.fill(Array(events.length), '·').join('');
      const text = `${date.getDate()}\n${eventDots}`;
      days.push({
        date,
        text,
        events,
        id:
          date.getDate() === currentDate.getDate()
            ? 'day-current-day'
            : 'day-current-month',
        key: date.toISOString(),
      });
    }

    // Add days for next month that show up on this calendar
    const nextMonthDays = 7 - (days.length % 7);
    for (let i = 0; i < nextMonthDays; i += 1) {
      const date = new Date(currentYear, currentMonth + 1, i + 1);
      const events = getEventsOnDate(date);
      const eventDots = _.fill(Array(events.length), '·').join('');
      const text = `${date.getDate()}\n${eventDots}`;
      days.push({
        date,
        text,
        events,
        id: 'day-next-month',
        key: date.toISOString(),
      });
    }

    return days;
  }

  const calendarDays = getCalendarDays(currentTime);

  // Get a list of events to show in more detail
  const eventDetail = [];
  const startOfEventDetails = _.findIndex(
    calendarEvents,
    (event) =>
      isBefore(currentTime, event.endDate.toJSDate()) ||
      // If the start of hour is equal to or before the start time
      compareAsc(startOfHour(currentTime), event.startDate.toJSDate()) < 1
  );
  if (startOfEventDetails > -1) {
    eventDetail.push(
      ...calendarEvents.slice(startOfEventDetails, startOfEventDetails + 10)
    );
  }

  return (
    <View styleSheet={calendarStyle}>
      <View id="calendar-wrapper">
        <View id="calendar">
          <>
            {calendarHeaders.map((dateName) => (
              <View id="calendar-cell" key={dateName}>
                <Text id="calendar-header">{dateName}</Text>
              </View>
            ))}
          </>
          <>
            {calendarDays.map(({ text, id, key, date }) => (
              <View id="calendar-cell" key={key}>
                <Text id={id}>{text}</Text>
              </View>
            ))}
          </>
        </View>
      </View>
      {eventDetail.length ? (
        <View id="upcoming-events-wrapper">
          <Text id="upcoming-events-title">Upcoming Events:</Text>
          <View id="upcoming-events">
            {eventDetail.map((event) => (
              <View key={event.uid}>
                <EventDetail event={event} />
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default Calendar;
