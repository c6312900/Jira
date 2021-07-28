import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevTools, loadServer} from 'jira-dev-tool';
// import {loadDevTools} from 'jira-dev-tool';
//務必在jira-dev-tool後面引入
import 'antd/dist/antd.less';
import { AppProviders } from 'context';
// import './index.css';

// loadDevTools(() =>
loadServer(() =>
ReactDOM.render(
  <React.StrictMode>
    {/* <DevTools />  可看成 <AppProviders> 下帶入的 children */}
    <AppProviders> 
    <DevTools />
      <App />
    </AppProviders>    
  </React.StrictMode>,
  document.getElementById("root")
))

//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
