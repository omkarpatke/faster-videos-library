import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider, ToastContextProvider , VideosContextProvider, HistoryVideoContextProvider , WatchLaterContextProvider } from './context/index';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
     <ToastContextProvider>
       <VideosContextProvider>
         <HistoryVideoContextProvider>
         <WatchLaterContextProvider>
            <App />
        </WatchLaterContextProvider>
         </HistoryVideoContextProvider>
       </VideosContextProvider>
     </ToastContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
