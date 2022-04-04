import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/index";
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
        <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
