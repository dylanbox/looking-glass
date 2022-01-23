/* eslint-disable import/no-import-module-exports */
import _ from 'lodash';
import { Renderer } from '@nodegui/react-nodegui';
import React from 'react';
import App from './app';
import { ICloudDataSource } from './dataSources/index';
import store from './store/index';
import config from './config.json';

store.config = config;

process.title = 'Looking Glass';

async function setup() {
  // TODO: Setup routine for data sources?
  const iCloud = new ICloudDataSource(
    _.get(store, 'config.credentials.iCloud')
  );
  store.iCloud = iCloud;
  await iCloud.authenticate();
  Renderer.render(<App />);
}

setup();

// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(['./app'], () => {
    Renderer.forceUpdate();
  });
}
