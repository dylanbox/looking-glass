import { Window, hot, View } from '@nodegui/react-nodegui';
import React from 'react';

import Clock from './Clock.jsx';

const minSize = {
  width: 500,
  height: 520,
};

const containerStyle = `
  background-color: 'black';
  height: '100%';
  width: '100%';
  display: flex;
  align-items: 'center';
  justify-content: 'center';
`;

function App() {
  return (
    <Window windowTitle="Looking Glass" minSize={minSize}>
      <View style={containerStyle}>
        <Clock />
      </View>
    </Window>
  );
}

export default hot(App);
