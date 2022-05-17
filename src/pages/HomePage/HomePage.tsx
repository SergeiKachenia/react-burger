import HomeStyles from "./HomePage.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { FC } from "react";
import { useAppSelector} from "../../index";

export const HomePage: FC = () => {
  const { error } = useAppSelector(ingredientsSelector);

  return (
    <main className={`${HomeStyles.main}`}>
      {!error && (
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      )}
    </main>
  );
};
