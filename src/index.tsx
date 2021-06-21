import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ToDo} from "./components/ToDo/ToDo";

ReactDOM.render(
  <React.StrictMode>
    <ToDo/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
