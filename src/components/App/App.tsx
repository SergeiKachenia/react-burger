import React, { useState, useEffect, useReducer } from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { Context } from '../../services/appContext'

const initialState = {
  ingredients: [],
  totalSum: 0,
  loading: true
}
const reducer = (state ,action) => {
let totalSum = 0;
if (state.ingredients.length > 0) {
  totalSum = (state.ingredients.filter((i) => i.type !== 'bun').reduce((acc, item) => acc + item.price, 0)) + (state.ingredients.find((i) => (i.type==="bun")).price * 2)
}
switch (action.type) {
  case 'ingredients':
    return {...state, ingredients: action.payload}
  case 'totalSum':
    return {...state, totalSum: totalSum}
  default:
    throw new Error(`Wrong type of action: ${action.type}`);
}
}



function App() {
const [state, dispatcher] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://norma.nomoreparties.space/api/ingredients"
        );
        if (!res.ok) {
          throw new Error(`Error status - ${res.status}`);
        }
        const actualData = await res.json();
        dispatcher({type:'ingredients', payload: actualData.data})
        setError(null);
      } catch (error: any) {
        setError(error.message);
        dispatcher({type:'ingredients', payload: []})
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return error ? (
    <div>Ошибка: {error}</div>
  ) : (
    <>
      <AppHeader />
      <main className={`${AppStyles.main}`}>
      <Context.Provider value={{ state, dispatcher }}>
        <BurgerIngredients />
        <BurgerConstructor />
        </Context.Provider>
      </main>
    </>
  );
}
export default App;
