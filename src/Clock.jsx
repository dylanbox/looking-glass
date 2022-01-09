import { Text, View } from '@nodegui/react-nodegui';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import fonts from './fonts.js';

const clockStyle = `
  #clock-wrapper {
    padding: 10;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: 'center';
  }

  #time-wrapper {
    flex-direction: row;
  }

  #hours-minutes {
    font-family: '${fonts.BioRhymeExtraBold}';
    font-weight: 800;
    font-size: 75px;
  }

  #detail-wrapper {
    flex-direction: column; 
    justify-content: "center"; 
    padding-left: 10px
  }
  
  #seconds,
  #am-pm {
    font-family: '${fonts.JosefinSans}';
    font-weight: 300;
    font-size: 25px;
  }

  #date {
    font-family: '${fonts.JosefinSans}';
    font-weight: 200;
    font-size: 20px;
  }
`;

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock Update Interval
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [setCurrentTime]);

  return (
    <View styleSheet={clockStyle}>
      <View id="clock-wrapper">
        <View id="time-wrapper">
          <Text id="hours-minutes">{format(currentTime, 'hh:mm')}</Text>
          <View id="detail-wrapper">
            <Text id="seconds">{format(currentTime, 'ss')}</Text>
            <Text id="am-m">{format(currentTime, 'a')}</Text>
          </View>
        </View>
        <View>
          <Text id="date">{format(currentTime, 'MMMM Lo')}</Text>
        </View>
      </View>
    </View>
  );
}

export default Clock;
