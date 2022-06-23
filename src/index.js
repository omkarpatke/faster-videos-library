import React from "react";
import "./index.css";
import App from "./App";
import * as ReactDOMClient from 'react-dom/client';
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './store/store';
import { UserContextProvider, ToastContextProvider , VideosContextProvider } from './context/index';

// Call make Server
makeServer();
const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);
root.render(
  <BrowserRouter>
     <UserContextProvider>
      <ToastContextProvider>
        <VideosContextProvider>
            <Provider store={store}>
               <App />
            </Provider>
      </VideosContextProvider>
    </ToastContextProvider>
   </UserContextProvider>
   </BrowserRouter>
);

