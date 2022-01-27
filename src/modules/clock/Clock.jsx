import { Text, View } from '@nodegui/react-nodegui';
import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import fonts from '../../fonts';
import { StackedTime } from '../../components/index';

const clockStyle = `
  #clock {
    flex-direction: column;
  }

  #clock--date {
    font-family: '${fonts.JosefinSans}';
    font-weight: 200;
    font-size: 20;
    qproperty-alignment: AlignHCenter;
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
    <View id="clock" styleSheet={clockStyle}>
      <StackedTime datetime={currentTime} />
      <Text id="clock--date">{format(currentTime, 'MMMM Lo')}</Text>
    </View>
  );
}

export default Clock;
