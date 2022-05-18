import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider, ToastContextProvider , VideosContextProvider } from './context/index';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
     <ToastContextProvider>
       <VideosContextProvider>
      <App />
       </VideosContextProvider>
     </ToastContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
