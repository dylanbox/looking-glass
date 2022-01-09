import { Text, View } from '@nodegui/react-nodegui';
import React, { useEffect, useState } from 'react';

const clockStyle = `
`;

const textStyle = `
  font-size: 50px;
  font-weight: bold;
  color: 'white';
  text-align: center;
`;

function Clock() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  // Clock Update Interval
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [setCurrentTime]);

  return (
    <View style={clockStyle}>
      <Text style={textStyle}>{currentTime}</Text>
    </View>
  );
}

export default Clock;
