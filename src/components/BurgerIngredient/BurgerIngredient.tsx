import React from "react";
import IngredientStyles from "./BurgerIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { AppProps } from "../../utils/types";
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredientDetails, ingredientsSelector } from '../../services/slice/ingredients'

function BurgerIngredient ({ item }) {
  const dispatch = useDispatch()
  const { cartIngredients } = useSelector(ingredientsSelector)
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item
  })

  return (
    <li ref={dragRef} onClick={()=>{dispatch(showIngredientDetails(item))}} >
    <a className={IngredientStyles.ingredient__link} href="#">
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
    </a>
    </li>
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
