import React, { useRef } from "react";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsStyles from "./BurgerIngredients.module.css";
import { burgerIngredientsPropTypes, AppProps } from "../../utils/types";
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";

function BurgerIngredients(props: any) {
  const [current, setCurrent] = React.useState("bun");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const clickTab = (e: any, ref: any) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={IngredientsStyles.ingredients}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>
        Соберите бургер
      </h1>
      <div className={IngredientsStyles.ingredients__tabs}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={(e) => clickTab(e, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={(e) => clickTab(e, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={(e) => clickTab(e, mainRef)}
        >
          Начинки
        </Tab>
      </div>

      <div
        className={`${IngredientsStyles.ingredients__scroll} custom-scroll mt-10`}
      >
        <section id={"bun"} ref={bunRef}>
          <h2 className={"text text_type_main-medium"}>Булки</h2>
          <ul className={IngredientsStyles.ingredients__list}>
            {props.ingredients.map(
              (item: AppProps) =>
                item.type === "bun" && (
                  <li key={item._id}>
                    <BurgerIngredient item={item} />
                  </li>
                )
            )}
          </ul>
        </section>
        <section id={"sauce"} ref={sauceRef}>
          <h2 className={"text text_type_main-medium"}>Соусы</h2>
          <ul className={IngredientsStyles.ingredients__list}>
            {props.ingredients.map(
              (item: AppProps) =>
                item.type === "sauce" && (
                  <li key={item._id}>
                    <BurgerIngredient item={item} />
                  </li>
                )
            )}
          </ul>
        </section>
        <section id={"main"} ref={mainRef}>
          <h2 className={"text text_type_main-medium"}>Начинки</h2>
          <ul className={IngredientsStyles.ingredients__list}>
            {props.ingredients.map(
              (item: AppProps) =>
                item.type === "main" && (
                  <li key={item._id}>
                    <BurgerIngredient item={item} />
                  </li>
                )
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
};
