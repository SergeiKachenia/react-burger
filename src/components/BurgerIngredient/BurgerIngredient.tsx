import React, { FC } from "react";
import IngredientStyles from "./BurgerIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import {  useAppDispatch } from "../../index";
import { showIngredientDetails } from "../../services/slice/ingredients";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../services/types/data";
import { TLocationState } from "../../services/types/data";

type TIngredientProps = {
  readonly item: TIngredient;
};
const BurgerIngredient: FC<TIngredientProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item,
  });
  const location = useLocation<TLocationState>();
  return (
    <ul
      onClick={() => {
        dispatch(showIngredientDetails(item));
      }}
      className={IngredientStyles.ingredient__list}
    >
      <li>
        <Link
          ref={dragRef}
          to={{
            pathname: `/ingredients/${item._id}`,
            state: { background: location },
          }}
          className={IngredientStyles.ingredient__link}
          href="#"
        >
          <img src={item.image} alt={item.name} />
          <div className={IngredientStyles.ingredient__price}>
            <span className={"text text_type_digits-default"}>
              {item.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <h3
            className={`${IngredientStyles.ingredient__title} text text_type_main-default`}
          >
            {item.name}
          </h3>
        </Link>
      </li>
    </ul>
  );
};

export default BurgerIngredient;
