import { Text, Window, hot, View } from '@nodegui/react-nodegui';
import React from 'react';

const minSize = {
  width: 500,
  height: 520,
};

const containerStyle = `
  flex: 1; 
`;

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }
`;

function App() {
  return (
    <Window windowTitle="Hello 👋🏽" minSize={minSize} styleSheet={styleSheet}>
      <View style={containerStyle}>
        <Text id="welcome-text">Welcome to NodeGui 🐕</Text>
      </View>
    </Window>
  );
}

export default hot(App);
