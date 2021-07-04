import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Stateprovider} from './Stateprovider';
import reducer, {initalState} from './reducer'

ReactDOM.render(
  <React.StrictMode>
    <Stateprovider initalState={initalState} reducer={reducer}>
      <App />
    </Stateprovider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
