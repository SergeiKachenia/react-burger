import { combineReducers } from 'redux'

import { ingredientsReducer } from './slice/ingredients'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})

export default rootReducer