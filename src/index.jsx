/**
 Life Cycle:
  Setup
  Register Plugins
  Start UI
  Main Loop
      Check pluging

* */
const { Renderer } = require('@nodegui/react-nodegui');
const React = require('react');
const App = require('./app');

process.title = 'Looking Glass';
Renderer.render(<App />);
// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(['./app'], () => {
    Renderer.forceUpdate();
  });
}
