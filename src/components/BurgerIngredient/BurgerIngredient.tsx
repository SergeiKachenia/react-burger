import React from "react";
import IngredientStyles from "./BurgerIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { showIngredientDetails } from "../../services/slice/ingredients";
import { Link, useLocation } from 'react-router-dom'
function BurgerIngredient({ item }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item,
  });
  const location = useLocation()
  return (
    <ul
      onClick={() => {
        dispatch(showIngredientDetails(item));
      }}
      className={IngredientStyles.ingredient__list}
    >
      <li>
        <Link ref={dragRef} to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }}
        className={IngredientStyles.ingredient__link} href="#">
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
}

export default BurgerIngredient;

BurgerIngredient.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  handler: PropTypes.any,
};
