import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './pages/Header';
import Footer from './pages/Footer';

ReactDOM.render(
    <><div className="d-flex flex-row" style={{ width: '100%' }}></div><div className="d-flex flex-row header justify-content-center align-items-center">
    <Header />
  </div><div className="d-flex flex-row  justify-content-center align-items-center">
      <App />
    </div><div className="d-flex flex-row" style={{ width: '100%' }}></div><div className="d-flex flex-row justify-content-center align-items-center footer">
      <Footer />
    </div></>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
