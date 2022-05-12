import React, { useRef, FC, SetStateAction, MutableRefObject } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsStyles from "./BurgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { TIngredient } from "../../services/types/data";
import { useAppSelector } from "../../index";
import { useSelector } from "react-redux";
const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector(ingredientsSelector);
  const [current, setCurrent] = React.useState<string>("bun");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const scrollRef = useRef(null);

  const ingredientsBun = ingredients.filter((i) => i.type === "bun");
  const ingredientsSauce = ingredients.filter((i) => i.type === "sauce");
  const ingredientsMain = ingredients.filter((i) => i.type === "main");

  const clickTab = (
    e: SetStateAction<string>,
    ref: MutableRefObject<HTMLDivElement>
  ) => {
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
            onClick={(e: string) => clickTab(e, bunRef)}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={(e: string) => clickTab(e, sauceRef)}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === "main"}
            onClick={(e: string) => clickTab(e, mainRef)}
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
              {ingredientsBun.map((item: TIngredient) => (
                <li key={item._id}>
                  <BurgerIngredient item={item} />
                </li>
              ))}
            </ul>
          </section>
          <section id={"sauce"} ref={sauceRef}>
            <h2 className={"text text_type_main-medium"}>Соусы</h2>
            <ul className={IngredientsStyles.ingredients__list}>
              {ingredientsSauce.map((item: TIngredient) => (
                <li key={item._id}>
                  <BurgerIngredient item={item} />
                </li>
              ))}
            </ul>
          </section>
          <section id={"main"} ref={mainRef}>
            <h2 className={"text text_type_main-medium"}>Начинки</h2>
            <ul className={IngredientsStyles.ingredients__list}>
              {ingredientsMain.map((item: TIngredient) => (
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
};

export default BurgerIngredients;
