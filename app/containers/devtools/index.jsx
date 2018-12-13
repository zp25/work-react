/* eslint import/no-extraneous-dependencies: ["error", { "peerDependencies": true }] */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const dockMonitor = () => (
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <LogMonitor />
  </DockMonitor>
);

export default createDevTools(dockMonitor());
