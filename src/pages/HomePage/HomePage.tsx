import HomeStyles from "./HomePage.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/slice/ingredients";

export const HomePage = () => {
  const { loading, error } = useSelector(ingredientsSelector);

  return (
    <main className={`${HomeStyles.main}`}>
      {!error && !loading && (
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      )}
    </main>
  );
};