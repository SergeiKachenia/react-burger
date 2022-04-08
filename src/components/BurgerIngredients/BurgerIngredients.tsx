import React, { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsStyles from "./BurgerIngredients.module.css";
import { AppPropsItem } from "../../utils/types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  ingredientsSelector,
  removeIngredientDetails,
} from "../../services/slice/ingredients";
import { useSelector, useDispatch } from "react-redux";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients, activeIngredientDetailsModal, ingredientDetails } =
    useSelector(ingredientsSelector);
  const [current, setCurrent] = React.useState("bun");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const scrollRef = useRef(null);

  const ingredientsBun = ingredients.filter((i) => i.type === "bun");
  const ingredientsSauce = ingredients.filter((i) => i.type === "sauce");
  const ingredientsMain = ingredients.filter((i) => i.type === "main");

  const clickTab = (e: any, ref: any) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrollPosition = scrollRef.current.getBoundingClientRect().top;

    const bunTitle = Math.abs(
      scrollPosition - bunRef.current.getBoundingClientRect().top
    );
    const sauceTitle = Math.abs(
      scrollPosition - sauceRef.current.getBoundingClientRect().top
    );
    const mainTitle = Math.abs(
      scrollPosition - mainRef.current.getBoundingClientRect().top
    );

    const min = Math.min(bunTitle, sauceTitle, mainTitle);
    if (min === sauceTitle) {
      setCurrent("sauce");
    } else if (min === mainTitle) {
      setCurrent("main");
    } else setCurrent("bun");
  };

  return (
    ingredients && (
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
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <section id={"bun"} ref={bunRef}>
            <h2 className={"text text_type_main-medium"}>Булки</h2>
            <ul className={IngredientsStyles.ingredients__list}>
              {ingredientsBun.map((item: AppPropsItem) => (
                <li key={item._id}>
                  <BurgerIngredient item={item} />
                </li>
              ))}
            </ul>
          </section>
          <section id={"sauce"} ref={sauceRef}>
            <h2 className={"text text_type_main-medium"}>Соусы</h2>
            <ul className={IngredientsStyles.ingredients__list}>
              {ingredientsSauce.map((item: AppPropsItem) => (
                <li key={item._id}>
                  <BurgerIngredient item={item} />
                </li>
              ))}
            </ul>
          </section>
          <section id={"main"} ref={mainRef}>
            <h2 className={"text text_type_main-medium"}>Начинки</h2>
            <ul className={IngredientsStyles.ingredients__list}>
              {ingredientsMain.map((item: AppPropsItem) => (
                <li key={item._id}>
                  <BurgerIngredient item={item} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    )
  );
}

export default BurgerIngredients;
