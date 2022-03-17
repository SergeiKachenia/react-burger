import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  ingredientsSelector,
} from "../../services/slice/ingredients";

function App() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      <main className={`${AppStyles.main}`}>
        {!error && !loading && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
}
export default App;
