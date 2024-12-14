import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as AlertProvider, transitions, positions } from "react-alert";
import axios from "axios";

import "bootstrap/scss/bootstrap.scss";

import store, { persistor } from "./store";
import { setupAxios } from "./axios";
import App from "./App";
import AlertTemplate from "./components/AlertTemplate";
import reportWebVitals from "./reportWebVitals";

const { PUBLIC_URL } = process.env;

const alertOpts = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  transition: transitions.FADE,
};

setupAxios(axios, store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <AlertProvider template={AlertTemplate} {...alertOpts}>
          <App basename={PUBLIC_URL} />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
