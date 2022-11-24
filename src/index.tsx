import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RowsProvider } from './context/rows.context';

import './sassStyles/_global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RowsProvider>
        <App />
      </RowsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
