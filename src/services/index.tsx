import { combineReducers } from "redux";
import { ingredientsReducer } from "./slice/ingredients";
import {authReducer} from "./slice/authorisation"

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer
});

export default rootReducer;
