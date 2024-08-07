import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import {Toaster} from 'sonner'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster richColors position="top-right"/>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
