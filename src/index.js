import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "reactjs-popup/dist/index.css";
ReactDOM.render(
  <BrowserRouter>
    <div className="w-screen h-screen bg-black text-white font-mono flex flex-col select-none">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);