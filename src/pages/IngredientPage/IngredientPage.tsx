import { IngredientDetails } from "../../components/IngredientDetails/IngredientDetails";

import { useParams } from "react-router-dom";
import { ingredientsSelector } from "../../services/slice/ingredients";
import IPStyles from "./IngredientPage.module.css";
import { useAppSelector } from "../../index";
import { FC } from "react";
export const IngredientPage: FC = () => {

  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector(ingredientsSelector);
  const currentIngredient = ingredients.find((item) => item._id === id);

  return (
    <>
      {currentIngredient && (
        <section
          className={`${IPStyles.ingredientPage__container} pt-20 mt-15`}
        >
          <h1 className="text text_type_main-large">Детали ингредиента</h1>
          <IngredientDetails />
        </section>
      )}
    </>
  );
};
