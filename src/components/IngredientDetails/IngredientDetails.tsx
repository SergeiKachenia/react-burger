import IDStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { ingredientsSelector } from "../../services/slice/ingredients";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {
  const { ingredients } = useSelector(ingredientsSelector);
  //@ts-ignore
  const { id } = useParams();
  console.log(id);
  const currentIngredient = ingredients.find((item) => item._id === id);
  return (
    <>
      {currentIngredient && (
        <section className={IDStyles.main}>
          <img
            className={IDStyles.image} //@ts-ignore
            src={currentIngredient.image}
            alt={currentIngredient.name}
          />
          <p //@ts-ignore
            className={"text text_type_main-medium mt-4 mb-8"}
          >
            {currentIngredient.name}
          </p>
          <div>
            <ul className={IDStyles.list}>
              <li
                className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
              >
                Калории,ккал
                <span //@ts-ignore
                  className="text text_type_digits-default"
                >
                  {currentIngredient.calories}
                </span>
              </li>
              <li
                className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
              >
                Белки, г
                <span //@ts-ignore
                  className="text text_type_digits-default"
                >
                  {currentIngredient.proteins}
                </span>
              </li>
              <li
                className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
              >
                Жиры, г
                <span //@ts-ignore
                  className="text text_type_digits-default"
                >
                  {currentIngredient.fat}
                </span>
              </li>
              <li
                className={`${IDStyles.list__item} text text_type_main-default text_color_inactive`}
              >
                Углеводы, г
                <span //@ts-ignore
                  className="text text_type_digits-default"
                >
                  {" "}
                  {currentIngredient.carbohydrates}
                </span>
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default IngredientDetails;
