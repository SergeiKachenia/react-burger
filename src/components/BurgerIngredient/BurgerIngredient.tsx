import React from "react";
import IngredientStyles from "./BurgerIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerIngredient(props: any) {
  return (
    <a className={IngredientStyles.ingredient__link} href="#">
      <img src={props.item.image} alt={props.item.name} />
      <div className={IngredientStyles.ingredient__price}>
        <span className={"text text_type_digits-default"}>
          {props.item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h3
        className={`${IngredientStyles.ingredient__title} text text_type_main-default`}
      >
        {props.item.name}
      </h3>
    </a>
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
