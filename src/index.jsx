/* eslint-disable import/no-import-module-exports */
import { Renderer } from '@nodegui/react-nodegui';
import React from 'react';
import App from './App.jsx';

process.title = 'Looking Glass';
Renderer.render(<App />);
// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(['./App'], () => {
    Renderer.forceUpdate();
  });
}
