import { View, Text } from '@nodegui/react-nodegui';
import React from 'react';
import { Event } from 'ical.js';
import PropTypes from 'prop-types';
import { isToday } from 'date-fns/esm';
import { StackedTime } from '../../components/index';
import fonts from '../../fonts';

/**
 * A detail of the event
 *
 * @param {object} props props
 * @param {Event} event Event to be shown
 * @returns
 */
function EventDetail({ event }) {
  const { summary, startDate } = event;
  const startDateTime = startDate.toJSDate();
  const isDateToday = isToday(startDateTime);

  const stylesheet = `
    #event-detail {
      border-radius: 2;
      margin-bottom: 2;
      background-color: ${isDateToday ? '#FFF' : '#111'};
      flex-direction: row;
      align-items: 'center';
      width: 294px;
      padding: 5;
    }
    
    #event-detail--text {
      flex-direction: column;
      flex: 1;
    }
    
    #event-detail--summary {
      color: ${isDateToday ? '#000' : '#FFF'};
      font-family: '${fonts.JosefinSans}';
      font-weight: 200;
      padding-right: 5;
      qproperty-alignment: AlignRight, AlignVCenter;
      qproperty-wordWrap: true;
    }

    #event-detail--time {
      flex: 0;
    }
  `;

  return (
    <View id="event-detail" styleSheet={stylesheet}>
      <View id="event-detail--text">
        <Text id="event-detail--summary">{summary}</Text>
      </View>
      <View id="event-detail--time">
        <StackedTime
          datetime={startDateTime}
          scale={isDateToday ? 0.8 : 0.6}
          formatLarge={isDateToday ? 'h' : 'L/d'}
          formatTop={isDateToday ? 'mm' : 'h'}
          color={isDateToday ? '#000' : '#FFF'}
        />
      </View>
    </View>
  );
}

EventDetail.propTypes = {
  event: PropTypes.instanceOf(Event).isRequired,
};

export default EventDetail;
