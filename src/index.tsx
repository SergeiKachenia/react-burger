import "./index.css";
import App from "./components/App/App";
import { render } from "react-dom";
import { Provider, useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/index";
import { BrowserRouter as Router } from "react-router-dom";
import { wsMiddleware } from "./services/middleware/wsMiddleware";
import { WSActions } from "./services/slice/websocket";
import React from "react"


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsMiddleware(WSActions)),

});

render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
