import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home/App.js';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
