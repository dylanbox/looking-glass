import { Window, hot, View } from '@nodegui/react-nodegui';
import React from 'react';

import Clock from './modules/clock/Clock';
import Calendar from './modules/calendar/Calendar';

const minSize = { width: 720, height: 720 };

function App() {
  const stylesheet = `
    #app--widgets {
      background-color: 'black';
      height: '100%';
      width: '100%';
      display: flex;
      align-items: 'center';
      justify-content: 'center';
    }
  `;

  return (
    <Window
      windowTitle="Looking Glass"
      minSize={minSize}
      styleSheet={stylesheet}
    >
      <View id="app--widgets">
        <Clock />
        <Calendar />
      </View>
    </Window>
  );
}

export default hot(App);
