import React, { useRef, useState, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsStyles from "./BurgerIngredients.module.css";
import { AppPropsItem } from "../../utils/types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Context } from '../../services/appContext';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const {state, dispatcher} = useContext(Context)
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const filterIngredients = (ingredientName) => state.ingredients.filter(i => i.type === ingredientName)

  const clickTab = (e: any, ref: any) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const [isOpened, setIsOpened] = useState(null);

  function toggleModal(item: any) {
    setIsOpened(item);
  }
  return state.ingredients.length && (
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
            {state.ingredients.map(
              (item: AppPropsItem) =>
                filterIngredients('bun') && (
                  <li
                    key={item._id}
                    onClick={() => {
                      toggleModal(item);
                    }}
                  >
                    <BurgerIngredient item={item} handler={toggleModal} />
                  </li>
                )
            )}
          </ul>
        </section>
        <section id={"sauce"} ref={sauceRef}>
          <h2 className={"text text_type_main-medium"}>Соусы</h2>
          <ul className={IngredientsStyles.ingredients__list}>
            {state.ingredients.map(
              (item: AppPropsItem) =>
              filterIngredients('sauce') && (
                  <li
                    key={item._id}
                    onClick={() => {
                      toggleModal(item);
                    }}
                  >
                    <BurgerIngredient item={item} handler={toggleModal} />
                  </li>
                )
            )}
          </ul>
        </section>
        <section id={"main"} ref={mainRef}>
          <h2 className={"text text_type_main-medium"}>Начинки</h2>
          <ul className={IngredientsStyles.ingredients__list}>
            {state.ingredients.map(
              (item: AppPropsItem) =>
              filterIngredients('main')&& (
                  <li
                    key={item._id}
                    onClick={() => {
                      toggleModal(item);
                    }}
                  >
                    <BurgerIngredient item={item} handler={toggleModal} />
                  </li>
                )
            )}
          </ul>
        </section>
      </div>
      {isOpened && (
        <Modal onClose={toggleModal} title={"Детали ингредиента"}>
          <IngredientDetails item={isOpened} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
