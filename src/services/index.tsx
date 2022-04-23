import { combineReducers } from "redux";
import { ingredientsReducer } from "./slice/ingredients";
import { authReducer } from "./slice/authorisation";
import { webSocketReducer } from "./slice/websocket";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  webSocket: webSocketReducer,
});

export default rootReducer;
