import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://norma.nomoreparties.space/api/ingredients"
        );
        if (!res.ok) {
          throw new Error(`Error status - ${res.status}`);
        }
        let actualData = await res.json();
        setIngredientsData(actualData.data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        setIngredientsData([]);
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
        <BurgerIngredients ingredients={ingredientsData} />
        <BurgerConstructor construct={ingredientsData} />
      </main>
    </>
  );
}
export default App;
