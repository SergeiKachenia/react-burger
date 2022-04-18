import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/index";
import { BrowserRouter as Router } from 'react-router-dom';
import {wsMiddleware} from "./services/middleware/wsMiddleware";
import {actions} from "./services/slice/websocket";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(wsMiddleware(actions))
});

render(
  <Provider store={store}>
        <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()