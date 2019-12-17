import './bootstrap';
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import AppProviders from './context';

render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root')
);
